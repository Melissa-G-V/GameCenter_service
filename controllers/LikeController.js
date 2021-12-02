const knex = require("../database/dbConfig");

module.exports = {

  async index(req, res) {
    const marcas = await knex("marcas").orderBy("nome");
    res.status(200).json(marcas);
  },

  async store(req, res) {
    console.log(req.body)
    const{usuario_id, carro_id,gostou}=req.body;
    try {
        const novo = await knex("likes").insert({
            usuario_id,
            carro_id,
            gostou
        })
        res.status(201).json({id:novo[0]})
    } catch (error) {
        res.status(400).json({erro: error.message})
    }
  },

  async pesq(req,res){
      const {usuario_id, carro_id} = req.params;
      const like = await knex('likes').where('usuario_id', usuario_id).andWhere('carro_id', carro_id)
      res.status(200).json(like)
  }


};
