exports.up = (knex) => {
    return knex.schema.createTable('likes', (table) => {
      table.increments();
      table.integer("usuarios_id").notNullable().unsigned();
      table.foreign('usuarios_id')
           .references("usuarios.id")
           .onDelete("restrict")
           .onUpdate("cascade")
      table.integer("carros_id").notNullable().unsigned();
      table.foreign('carros_id')
            .references("carros.id")
            .onDelete("restrict")
            .onUpdate("cascade")

      table.integer("gostou").notNullable().defaultTo(0);
      // cria os campos created_at e updated_at
      table.timestamps(true, true);
    })
  };
  
  exports.down = (knex) => knex.schema.dropTable('likes');