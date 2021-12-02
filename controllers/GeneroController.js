const knex = require("../database/dbConfig");

module.exports = {

  async index(req, res) {
    const generos = await knex("generos").orderBy("nome");
    res.status(200).json(generos);
  },

  async estatistica(req, res) {
    const generos = await knex
      .select("g.nome")
      .count("j.id as num")
      .from("generos as g")
      .leftOuterJoin("jogos as j", "g.id", "j.genero_id")
      .groupBy("g.nome")
      .having("num", ">", 0)

    res.status(200).json(generos);
  }
};
