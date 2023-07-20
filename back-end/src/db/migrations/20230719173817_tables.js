exports.up = function (knex) {
  return knex.schema.createTable("tables", (t) => {
    t.increments("table_id").primary();
    t.string("table_name");
    t.integer("capacity");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
