
exports.up = (knex) => {
  return knex.schema.createTable('jogos', (table) => {
    table.increments();
    table.string('jnome', 80).notNullable();
    table.string('foto').notNullable();
    table.string('descricao', 255).notNullable();
    table.boolean('destaque').notNullable().defaultTo(false);
    table.integer("genero_id").notNullable().unsigned();
    table.foreign('genero_id')
         .references("generos.id")
         .onDelete("restrict")
         .onUpdate("cascade")
    // cria os campos created_at e updated_at
    table.timestamps(true, true);
  })
};

exports.down = (knex) => knex.schema.dropTable('jogos');