const express = require("express");
const routes = express.Router();
const cors = require("cors");

routes.use(cors());

const MarcaController = require('./controllers/MarcaController')
const CarroController = require('./controllers/CarroController')
const UsuarioController = require('./controllers/UsuarioController')
const LikeController = require('./controllers/LikeController')
const ReviewController = require('./controllers/ReviewController')
const login = require("./middleware/login");

routes.get("/marcas", MarcaController.index)
      .get("/marcas_carros", MarcaController.marcas_carros);

routes.get("/carros", CarroController.index)
      .get("/carros2", CarroController.index2)
      .post("/carros", CarroController.store)
      .put("/carros/destaque/:id", CarroController.destaque)
      .put("/carros/like/:id", CarroController.like)
      .get("/carros/destaques", CarroController.destaques)
      .post("/carros/pesq/:palavra", CarroController.search)
      .get("/carros/:id", CarroController.show)
      .delete("/carros/:id", CarroController.destroy)

routes.get("/usuarios",  UsuarioController.index)
      .post("/usuarios",  UsuarioController.store)
      .post("/login", UsuarioController.login);


routes.get("/reviews",  ReviewController.index)
      .post("/reviews",  ReviewController.store)
      .post("/reviews2",  ReviewController.store2)
      .post("/reviews/pesq/:usuarios_id/:carros_id", ReviewController.pesq)

routes.get("/likes",  LikeController.store)
      .post("/likes/pesq/:usuario_id/:carro_id", LikeController.pesq)
      
module.exports = routes;
