const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const reservationService = require("../reservations/reservations.service");

const properties = ["table_name", "capacity"];
const hasRequiredProperties = hasProperties(...properties);

function validUpdate(req, res, next) {
  if (!req.body.data) {
    next({
      status: 400,
      message: `Data is missing`,
    });
  }
  next();
}
function propertyIsValid(req, res, next) {
  let {
    data: { table_name, capacity },
  } = req.body;
  if (table_name.length < 2) {
    next({
      status: 400,
      message: `table_name is less than 2 characters`,
    });
  }
  if (!Number.isInteger(capacity)) {
    next({
      status: 400,
      message: `${typeof capacity} capacity is not a number`,
    });
  }
  next();
}
async function hasReservationId(req, res, next) {
  let {
    data: { reservation_id },
  } = req.body;
  if (reservation_id) {
    let reservation = await reservationService.read(reservation_id);
    if (reservation) {
      next();
    } else {
      next({
        status: 404,
        message: `reservation_id ${reservation_id} is not existing`,
      });
    }
  } else {
    next({
      status: 400,
      message: "reservation_id is missing",
    });
  }
}
// verify table is not occupied and capacity is enough for reservation
async function validTable(req, res, next) {
  let table_id = req.params["table_id"];
  let {
    data: { reservation_id },
  } = req.body;
  let { people } = await reservationService.read(reservation_id);
  let { capacity, occupied } = await service.read(table_id);
  if (capacity < people) {
    return next({
      status: 400,
      message: `capacity is noy enough.`,
    });
  } else if (occupied) {
    return next({
      status: 400,
      message: `Table is occupied`,
    });
  }
  next();
}

async function tableExists(req, res, next) {
  const id = req.params.table_id;
  const data = await service.read(id);
  if (data) {
    res.locals.table = data;
    return next();
  }
  next({
    status: 404,
    message: `${id} is not found`,
  });
}
function read(req, res) {
  const { table: data } = res.locals;
  res.json({ data });
}
async function list(req, res) {
  let data = await service.list();
  res.json({ data });
}
/*Create a table, and set reservation_id to null and occupied to false as default value
Set reservation_id accordingly and occupied is true if create data includes reservation_id, 
and update the reservation as seated accordingly 
 */
async function create(req, res) {
  let createData = req.body.data;
  if (req.body.data.reservation_id) {
    createData = { ...req.body.data, occupied: true };
    await reservationService.update({
      reservation_id: req.body.data.reservation_id,
      status: "seated",
    });
  }
  let data = await service.create(createData);

  res.status(201).json({ data });
}
// make it true, and assign the reservation id to this table
async function update(req, res, next) {
  const updatedTable = {
    ...req.body.data,
    table_id: res.locals.table.table_id,
    occupied: true,
  };
  let { status } = await reservationService.read(
    updatedTable["reservation_id"]
  );
  if (status === "booked") {
    let response = await reservationService.update({
      reservation_id: updatedTable["reservation_id"],
      status: "seated",
    });
  } else if (status === "seated") {
    return next({ status: 400, message: `The reservation is already seated` });
  }
  let data = await service.update(updatedTable);
  res.json({ data });
}
/*only occpied table could be destroy/release. 
Update reservation status to finished, 
and release the table: set the occupied to false, and reservation_id to null */
async function destroy(req, res, next) {
  const table_id = req.params["table_id"];
  const { occupied, reservation_id } = await service.read(table_id);
  if (occupied) {
    await reservationService.update({
      reservation_id: reservation_id,
      status: "finished",
    });
    let table = await service.update({
      table_id: table_id,
      occupied: false,
      reservation_id: null,
    });
    res.json({ data: table });
  } else {
    return next({
      status: 400,
      message: `Table is not occupied`,
    });
  }
}
module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(tableExists), read],
  update: [
    asyncErrorBoundary(tableExists),
    validUpdate,
    asyncErrorBoundary(hasReservationId),
    validTable,
    asyncErrorBoundary(update),
  ],
  create: [hasRequiredProperties, propertyIsValid, asyncErrorBoundary(create)],
  delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)],
};
