const knex = require("../db/connection")

function list(){
    return knex("reservations").select("*")
}
function read(date){
    return knex("reservation")
    .select("*")
    .where({reservation_date:date})
    .first()
}

module.exports={
    list,
    read
}