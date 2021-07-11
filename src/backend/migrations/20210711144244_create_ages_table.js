
exports.up = function(knex) {
    return knex.schema.createTable('ages', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.text('description').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ages')
};
