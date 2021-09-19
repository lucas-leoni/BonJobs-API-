const { request, response } = require("express");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const DB = {
  vagas: [
    {
      id: 1,
      nome: "Dev Back End",
      categoria: "Estagiário",
      descrição: "Desejável conhecimento em Python ou Javascript",
      salário: 1000,
      status: true,
    },
    {
      id: 2,
      nome: "Dev Front End",
      categoria: "CLT",
      descrição: "Necessário conhecimento em HTML, CSS e Javascript",
      salário: 1500,
      status: true,
    },
    {
      id: 3,
      nome: "Dev Full Stack",
      categoria: "PJ",
      descrição:
        "Necessário conhecimento em HTML, CSS, Javascript, Node e MongoDB",
      salário: 2000,
      status: false,
    },
  ],
};

app.get("/api/vagas", (req, res) => {
  res.send(DB.vagas);
});

app.get("/api/vaga/:id", (req, res) => {
  const idUser = req.params.id;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const vaga = DB.vagas.find((index) => index.id === id);
    if (vaga !== undefined) {
      res.statusCode = 200;
      res.json(vaga);
    } else {
      res.sendStatus(404);
    }
  }
});

app.post("/api/vaga", (req, res) => {
  const { nome, categoria, descricao, salario } = req.body;
  DB.vagas.push({
    id: Math.floor(Math.random() * 10 + 1),
    nome,
    categoria,
    descricao,
    salario,
    status: true,
  });
  res.send({ message: "Nova vaga criada com sucesso!" });
});

app.delete("/api/vaga/:id", (req, res) => {
  const idUser = req.params.id;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const vaga = DB.vagas.findIndex((index) => index.id === id);
    if (vaga === -1) {
      res.sendStatus(404);
    } else {
      DB.vagas.splice(vaga, 1);
      res.statusCode = 200;
      res.json({ message: "Jogo removido com sucesso!" });
    }
  }
});

app.patch("/api/vaga/:id", (req, res) => {
  const idUser = req.params.id;
  if (isNaN(idUser)) {
    res.statusCode = 400;
    res.send("Ops, o id informado não é um número.");
  } else {
    const id = parseInt(idUser);
    const vaga = DB.vagas.findIndex((index) => index.id === id);
    if (vaga === -1) {
      res.sendStatus(404);
    } else {
      const { id, nome, categoria, descricao, salario, status } = req.body;
      DB.vagas.splice(vaga, 1, {
        id,
        nome,
        categoria,
        descricao,
        salario,
        status,
      });
      res.statusCode = 200;
      res.json({ message: "Vaga atualizada com sucesso!" });
    }
  }
});

app.listen(3000, () => {
  console.log("API Rodando, http://localhost:3000");
});
