const knex = require("../database/dbConfig");

module.exports = {
// index: listagem
  // store/create: inclusão
  // update: alteração
  // show: obter 1 registro
  // destroy: exclusão

  async index(req, res) {
    const reviews = await knex
      .select("r.id", "j.foto" ,"r.comentario","j.jnome","r.usuarios_id","u.id","u.nome","u.email", "r.estrelas")
      .from("reviews as r")
      .leftJoin("usuarios as u", "r.usuarios_id", "u.id")
      .leftJoin("jogos as j", "r.jogos_id", "j.id")
      .orderBy("r.id", "desc");
    res.status(200).json(reviews);
  },


  async store(req, res) {
    console.log(req.body)
    const { comentario, estrelas, usuarios_id, jogos_id  } = req.body;

    if (!usuarios_id) {
      res.status(400).json({
        erro: "Algo de errado aconeteceu? voce esta logado?",
      });
      return;
    }
    if (!comentario || !estrelas || !usuarios_id || !jogos_id) {
      res.status(400).json({
        erro: "Enviar comentario estrela e usuario e jogo",
      });
      return;
    }
    try {
      const novo = await knex("reviews").insert({
        comentario, estrelas, usuarios_id, jogos_id
      });
      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },


  async store2(req, res) {
    console.log(req.body)
    const{comentario, estrelas, usuarios_id, jogos_id}=req.body;
    try {
        const novo = await knex("reviews").insert({
            comentario, estrelas, usuarios_id, jogos_id
        })
        res.status(201).json({id:novo[0]})
    } catch (error) {
        res.status(400).json({erro: error.message})
    }
  },

  async pesq(req,res){
    const {usuarios_id, jogos_id} = req.params;
    const like = await knex('reviews').where('usuarios_id', usuarios_id).andWhere('jogos_id', jogos_id)
    res.status(200).json(like)
}


}