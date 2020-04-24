const restify = require("restify");

const { Op } = require("sequelize");

const carro = require("./models/carro");

const server = restify.createServer({
  name: "TR1",
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

async function searchCarro(req, res) {
  const id = req.query.id;
  const marca = req.query.marca;
  const modelo = req.query.modelo;
  const anoInicial = req.query.anoInicial;
  const valorInicial = req.query.valorInicial;

  let carros;
  if (id) {
    carros = await carro.findByPk(id);
  } else {
    if (marca && modelo) {
      carros = await carro.findAll({
        where: {
          marca: marca,
          modelo: modelo,
        },
      });
    } else if (marca) {
      carros = await carro.findAll({
        where: {
          marca: marca,
        },
      });
    } else if (anoInicial) {
      carros = await carro.findAll({
        where: {
          ano: {
            [Op.gte]: anoInicial,
          },
        },
      });
    } else if (valorInicial) {
      carros = await carro.findAll({
        where: {
          valor: {
            [Op.gte]: valorInicial,
          },
        },
      });
    }
  }

  res.json(carros);
}

server.get("/ec021/carro", searchCarro);

const port = 3000;

server.listen(port, () => {
  console.log("%s listening at %s", server.name, server.url);
});
