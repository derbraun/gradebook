
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('students', function (table) {
            table.increments('id').primary();
            table.string('student');
        }),

        knex.schema.createTable('grades', function (table) {
           table.increments('id').primary();
           table.string('grade');
           table.string('desc');
        }),

        knex.schema.createTable('studentGrade', function (table) {
            table.increments('id').primary();
            table.integer('sid');
            table.integer('gid');
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('students'),
        knex.schema.dropTable('grades'),
        knex.schema.dropTable('studentGrade'),
    ]);
};
