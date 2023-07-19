const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reservations.service")
/**
 * List handler for reservation resources
 */

async function list(req, res) {
  const data = await service.list()
  res.json({data});
}
/* create a new reservation */
async function read(req,res){
  let reservationDate=req.query.date
  const data = await service.read(reservationDate)
  res.json({data})
}
async function create(req,res){//need modify
  res.json({
    data: [],
  });
}

module.exports = {
  list:asyncErrorBoundary(list),
  create:asyncErrorBoundary(create),
  read:asyncErrorBoundary(read)
};
