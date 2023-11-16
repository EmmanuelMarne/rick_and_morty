// modulos
const express = require("express");
const routers = express.Router();

// controllers
const getCharById = require("../controllers/getCharById");
const login = require("../controllers/login");
const { postFav, deleteFav } = require("../controllers/handleFavorites");
const postUser = require("../controllers/postUser");

routers.get("/", (req, res) => {
  res.send("Hi!, I'm manu's server");
});

routers.get("/characters/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const character = await getCharById(id);
    res.status(200).json(character);
  } catch (error) {
    const errorId = error.response.data.error;
    if (errorId === "Character not found") {
      return res.status(404).json({ message: "Not fount" });
    }
    res.status(500).json({ message: error.message });
  }
});

routers.post("/login", postUser);
routers.get("/login", login);
routers.post("/fav", postFav);
routers.delete("/fav/:id", deleteFav);

module.exports = routers;
