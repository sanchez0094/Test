var express = require('express');
var bodyParser = require('body-parser');
var debug = require("debug")("server");
var _ = require('lodash');
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

var db = [{
  id:123,
  nombre: "lucia"
},{
  id:246,
  nombre: "juan"
},{
  id:458,
  nombre : "luciana"
}]

app.get('/', function(req, res){
  const cliente = req.query.cliente
  var objetoJSON = {"cliente" : cliente };
  debug("Cliente: %s", cliente);
  debug(objetoJSON);

  res.sendFile(__dirname + '/index.html');
});
app.get('/cliente/:id', function(req, res){
  const idCliente = req.params.id;
  var cliente = _.find(db,function(o){ return o.id == idCliente})
  debug(idCliente, cliente);
  res.send(cliente);
});
app.get('/cliente' , function(req, res){
  res.send(db);
});
app.post('/cliente',function (req, res){
  const cliente = req.body;
  debug(req.body)
    var encontrado = _.find(db,function(o){ return o.id == cliente.id})
  if(!encontrado){
    db.push(req.body);
    debug("bien");
    res.sendStatus(200);
  }else {
    debug("mal");
    res.status(400).send("Pone un nombre gato");
  }

});

app.get('/about', function(req, res){
  res.sendFile(__dirname + '/about.html');
});


app.listen(9000);

debug("Servidor Express escuchando en modo %s", app.settings.env);
