
exports.up = function (knex) {
    return knex.schema.createTable('keys', table => {
        table.increments('id').primary()
        table.string('key').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('keys')
};
