const restify = require("restify");

const { Op } = require("sequelize");

const carro = require("./models/carro");

const name = "ec021";

const server = restify.createServer({
  name,
});

const route = `/${name}/carro`;

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

server.post(route, async (req, res) => {
  const carroBody = req.body;

  let carroBd = await carro.create(carroBody);

  carroBd = await carro.findByPk(carroBd.id);

  res.json(carroBd);
});

server.put(`${route}/:id`, async (req, res) => {
  const carroBody = req.body;
  const id = req.params.id;

  let carroBd = await carro.update(carroBody, { where: { id: id } });

  carroBd = await carro.findByPk(id);

  res.json(carroBd);
});

server.get(route, async (req, res) => {
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
    } else {
      carros = await carro.findAll();
    }
  }

  res.json(carros);
});

const port = 3000;

server.listen(port, () => {
  console.log("%s listening at %s", server.name, server.url);
});
