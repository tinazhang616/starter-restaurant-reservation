
exports.up = function(knex) {
  return knex.schema.table("reservations",(t)=>{
    t.string("status").defaultTo("booked")
  })
};

exports.down = function(knex) {
  return knex.schema.table("reservations",(t)=>{
    t.dropColumn("status")
  })
};
