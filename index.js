const restify = require("restify");

const server = restify.createServer({
  name: "TR1",
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

function searchCarro(req, res) {
  let id = req.query.id;

  res.send({
    message: `Hello world ${id}`,
  });
}

server.get("/ec021/carro", searchCarro);

const port = 3000;

server.listen(port, () => {
  console.log("%s listening at %s", server.name, server.url);
});
