const knex = require("../db/connection");

async function list() {
  return knex("reservations").select("*").whereNot({status:"finished"});
}
function listBydate(reservation_date) {
  return knex("reservations")
    .select("*")
    .where({ reservation_date })
    .whereNot({ status: "finished" })
    .orderBy("reservation_time");
}
function listByMobile(mobile_number){
  return knex("reservations")
  .whereRaw(
    "translate(mobile_number, '() -', '') like ?",
    `%${mobile_number.replace(/\D/g, "")}%`
  )
  .orderBy("reservation_date");
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((data) => data[0]);
}
function update(updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((update) => update[0]);
}

module.exports = {
  list,
  listBydate,
  read,
  create,
  update,
  listByMobile
};
