
exports.up = function(knex) {
  return knex.schema.table("tables",(t)=>{
    t.boolean("occupied").defaultTo(false);
    t.integer("reservation_id").unsigned()
    t.foreign("reservation_id")
    .references("reservation_id")
    .inTable("reservations")
    .onDelete("cascade")
  })
};

exports.down = function(knex) {
  return knex.schema.table("tables",(t)=>{
    t.dropColumn("occupied")
    t.dropColumn("reservation_id")
  })
};
