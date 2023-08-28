const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");
const hasProperties = require("../errors/hasProperties");
const valid_time = require("../errors/valid_time");
const isOnTuesday = require("../errors/isOnTuesday");
const tableService = require("../tables/tables.service");

const Valid_Properties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];
//verify required properties are valid which are reservation_date, reservation_time, and people
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;
  for (let index = 0; index < Object.keys(data).length; index++) {
    let property = Object.keys(data)[index];
    if (property === "reservation_date" && !Date.parse(data[property])) {
      return next({
        status: 400,
        message: `${property} value is not a valid date for date field`,
      });
    }
    if (property === "reservation_time" && !valid_time(data[property])) {
      return next({
        status: 400,
        message: `${property} is not a valid time for time field`,
      });
    }
    if (property === "people" && !Number.isInteger(data[property])) {
      return next({
        status: 400,
        message: `${property} is not a number type for people field`,
      });
    }
  }
  res.locals.reservation = data;
  next();
}
//verify reservation is not on Tuesday or in the past
function reservationInFuture(req, res, next) {
  let {
    reservation: { reservation_date, reservation_time },
  } = res.locals;
  let [year, month, day] = reservation_date.split("-");
  let [hour, mintues] = reservation_time.split(":");
  let today = new Date();
  let reservation = new Date(year, month, day, hour, mintues);
  if (isOnTuesday(reservation_date)) {
    next({
      status: 400,
      message: `Reservation is on a Tuesday--closed`,
    });
  }
  if (today > reservation) {
    next({
      status: 400,
      message: `Reservation is in the past--future`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties(...Valid_Properties);

//return reservation according to required mobile_number or date
async function list(req, res) {
  const { date, mobile_number } = req.query;
  if (mobile_number) {
    let data = await service.listByMobile(mobile_number);
    return res.json({ data: data });
  }
  const data = date ? await service.listBydate(date) : await service.list();
  res.json({ data: data });
}

async function read(req, res) {
  let { reservation: data } = res.locals;
  res.status(200).json({ data });
}
async function reservationExist(req, res, next) {
  const { reservation_id } = req.params;
  let data = await service.read(reservation_id);
  if (data) {
    res.locals.reservation = data;
    return next();
  }
  next({
    status: 404,
    message: `${reservation_id} is not found`,
  });
}

function validStatus(req, res, next) {
  const {
    data: { status },
  } = req.body;
  if (status === "seated" || status === "finished") {
    return next({
      status: 400,
      message: `The status is ${status}`,
    });
  }
  next();
}
async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data: data });
}

// open hour is 10:30-21:30
function timeFrame(req, res, next) {
  let {
    data: { reservation_time },
  } = req.body;
  let time = +reservation_time.split(":").join("");
  if (time < 1030 || time > 2130) {
    return next({
      status: 400,
      message: `Reservation is in not in eligible timeframe`,
    });
  }
  next();
}
async function update(req, res, next) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  if (updatedReservation.status !== "unknown") {
    let { status } = await service.read(res.locals.reservation.reservation_id);
    if (updatedReservation.status === "cancelled" && status === "seated") {
      let response = await tableService.readReservationId(
        res.locals.reservation.reservation_id
      );
      // console.log("this is response table accordingly", response);
      await tableService.update({
        table_id: response.table_id,
        reservation_id: null,
        occupied: false,
      });
    }
    let data = await service.update(updatedReservation);
    res.status(200).json({ data: data });
  } else {
    next({
      status: 400,
      message: `The status is unknown.`,
    });
  }
}
async function notFinished(req, res, next) {
  const { status } = await service.read(req.params["reservation_id"]);
  if (status === "finished") {
    next({
      status: 400,
      message: `a finished reservation cannot be updated`,
    });
  }
  next();
}
module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProperties,
    hasOnlyValidProperties,
    reservationInFuture,
    timeFrame,
    validStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExist), read],
  // only not finished reservation will update its status
  update: [
    asyncErrorBoundary(reservationExist),
    asyncErrorBoundary(notFinished),
    asyncErrorBoundary(update),
  ],
  updateReservation: [
    asyncErrorBoundary(reservationExist),
    hasRequiredProperties,
    hasOnlyValidProperties,
    asyncErrorBoundary(update),
  ],
};
