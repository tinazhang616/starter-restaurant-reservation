const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name").orderBy("table_name");
}
function create(tableData) {
  return knex("tables")
    .insert(tableData)
    .returning("*")
    .then((data) => data[0]);
}
function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}
function readReservationId(reservation_id){
  return knex("tables as t")
  .join("reservations as r","r.reservation_id","t.reservation_id")
  .select("*")
  .where({"r.reservation_id":reservation_id})
  .first()
}
function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}
function destroy(table_id){
    return knex("tables").where({table_id}).del()
}
module.exports = {
  list,
  read,
  update,
  create,
  destroy,
  readReservationId,
};
