const knex = require("../database/dbConfig");

module.exports = {
  // index: listagem
  // store/create: inclusão
  // update: alteração
  // show: obter 1 registro
  // destroy: exclusão

  async index(req, res) {
    // const jogos = await knex("jogos")
    //   .join("generos", "jogos.genero_id", "=", "generos.id")
    //   .orderBy("jogos.id", "desc");

    const jogos = await knex
      .select("j.id", "j.jnome", "g.nome as genero", "j.descricao", "j.foto", "j.destaque")
      .from("jogos as j")
      .leftJoin("generos as g", "j.genero_id", "g.id")
      .orderBy("j.id", "desc");
    res.status(200).json(jogos);
  },


  async index2(req, res) {
  
    const jogos = await knex
      .select("j.id", "j.jnome","r.comentario","r.usuarios_id","r.estrelas","j.foto","g.nome as genero","j.descricao", "j.foto", "j.destaque")
      .from("jogos as j")
      .leftJoin("generos as g", "j.genero_id", "g.id")
      .leftJoin("reviews as r", "j.id", "r.jogos_id").whereNotNull('r.id')
      .orderBy("j.id", "desc");
    res.status(200).json(jogos);
  },



  async show(req, res) {
    const id = req.params.id; // ou:  const { id } = req.params
    const jogo = await knex
      .select("j.id", "j.jnome", "j.genero_id", "g.nome as genero", "j.descricao",  "j.foto", "j.destaque")
      .from("jogos as j")
      .leftJoin("generos as g", "j.genero_id", "g.id")
      .where("j.id", id)
    res.status(200).json(jogo[0]);
  },

  async search(req, res) {
    const palavra = req.params.palavra; 

    const jogos = await knex
      .select("j.id", "j.jnome", "g.nome as genero", "j.descricao", "j.foto", "j.destaque")
      .from("jogos as j")
      .leftJoin("generos as g", "j.genero_id", "g.id")
      .where("jnome", "like", "%"+palavra+"%")
      .orWhere("g.nome", "like", "%"+palavra+"%")
      .orderBy("j.id", "desc");
    res.status(200).json(jogos);
  },

  async store(req, res) {
    console.log(req.body)

    // desestruturação do objeto request
    const { jnome, genero_id, descricao, foto } = req.body;

    if (!jnome) {
      res.status(400).json({
        erro: "faltou nome do jogo",
      });
      return;
    }

    // se algum dos atributos não for passado
    if (!jnome || !genero_id || !descricao || !foto) {
      res.status(400).json({
        erro: "Enviar nome do jogo, genero_id, descricao e foto do jogo",
      });
      return;
    }

    try {
      const novo = await knex("jogos").insert({
        jnome,
        genero_id,
        descricao,
        foto,
      });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },
  
  async destaque(req, res) {
    const id = req.params.id; // ou:  const { id } = req.params
    dados = await knex("jogos").where({ id });
//    console.log(dados[0]);

    if (dados[0].destaque) {
      try {
        await knex("jogos").update({ destaque: 0 }).where({ id });
        res.status(200).json({ ok: 1 });
      } catch (error) {
        res
          .status(400)
          .json({ ok: 0, msg: `Erro na alteração: ${error.message}` });
      }
    } else {
      try {
        await knex("jogos").update({ destaque: 1 }).where({ id });
        res.status(200).json({ ok: 1 });
      } catch (error) {
        res
          .status(400)
          .json({ ok: 0, msg: `Erro na alteração: ${error.message}` });
      }
    }
  },
  
  async destaques(req, res) {
    const jogos = await knex
      .select("j.id", "j.jnome", "g.nome as genero", "j.descricao", "j.foto", "j.destaque")
      .from("jogos as j")
      .leftJoin("generos as g", "j.genero_id", "g.id")
      .where("j.destaque", true)
      .orderBy("j.id", "desc");
    res.status(200).json(jogos);
  },
 
  async destroy(req, res) {
    const id = req.params.id; // ou:  const { id } = req.params
    try {
      await knex("jogos").del().where({ id });
      res.status(200).json({ ok: 1 });
    } catch (error) {
      res.status(400).json({ ok: 0, msg: `Erro na exclusão: ${error.message}` });
    }
  },
    
};
