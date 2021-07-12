
exports.up = function (knex) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.text('description').notNull()
        table.integer('parentId').unsigned().references('id').inTable('categories')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('categories')
};
