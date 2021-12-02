const express = require("express");
const routes = express.Router();
const cors = require("cors");

routes.use(cors());

const GeneroController = require('./controllers/GeneroController')
const JogoController = require('./controllers/JogoController')
const UsuarioController = require('./controllers/UsuarioController')
const ReviewController = require('./controllers/ReviewController')
const login = require("./middleware/login");

routes.get("/generos", GeneroController.index)
      .get("/estatistica", GeneroController.estatistica);

routes.get("/jogos", JogoController.index)
      .get("/jogos2", JogoController.index2)
      .post("/jogos", JogoController.store)
      .put("/jogos/destaque/:id", JogoController.destaque)
      .get("/jogos/destaques", JogoController.destaques)
      .post("/jogos/pesq/:palavra", JogoController.search)
      .get("/jogos/:id", JogoController.show)
      .delete("/jogos/:id", JogoController.destroy)

routes.get("/usuarios",  UsuarioController.index)
      .post("/usuarios",  UsuarioController.store)
      .post("/login", UsuarioController.login);


routes.get("/reviews",  ReviewController.index)
      .post("/reviews",  ReviewController.store)
      .post("/reviews2",  ReviewController.store2)
      .post("/reviews/pesq/:usuarios_id/:jogos_id", ReviewController.pesq)

//routes.get("/likes",  LikeController.store)
 //     .post("/likes/pesq/:usuario_id/:carro_id", LikeController.pesq)
      
module.exports = routes;
