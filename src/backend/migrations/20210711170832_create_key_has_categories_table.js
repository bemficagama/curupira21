
exports.up = function (knex) {
    return knex.schema.createTable('urls', table => {
        table.increments('key_id').primary()
        table.string('url').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('urls')
};
