exports.up = (knex) => {
    return knex.schema.createTable('reviews', (table) => {
      table.increments();
      table.integer("usuarios_id").notNullable().unsigned();
      table.foreign('usuarios_id')
           .references("usuarios.id")
           .onDelete("restrict")
           .onUpdate("cascade")
      table.integer("jogos_id").notNullable().unsigned();
      table.foreign('jogos_id')
            .references("jogos.id")
            .onDelete("cascade")
            .onUpdate("cascade")
            table.string('comentario', 100).notNullable();
            table.integer("estrelas").notNullable();
      // cria os campos created_at e updated_at
      table.timestamps(true, true);
    })
  };
  
  exports.down = (knex) => knex.schema.dropTable('reviews');