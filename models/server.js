require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usariosPath = "/api/usuarios";

    //Conectar a base de datos

    this.connectDB();

    //Middleware
    this.middlewares();

    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }
  middlewares() {
    //CORS
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor Express escuchando en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
