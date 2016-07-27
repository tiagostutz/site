// server.js (Express 4.0)
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var compress       = require('compression');
var request        = require('request');
var redis          = require('redis');
var fine          = require('debug')('fine')
var info          = require('debug')('info')
var error          = require('debug')('error')
var app            = express();

port = process.env.PORT || 8001;

var prerender = require('prerender-node').set('prerenderToken', 's7zDfbP07ipE4JZKETcm');

fine('Conectando ao REDIS');
var client = redis.createClient(6379,'redis');
client.set('last_start', new Date().getTime());

client.get('last_start', function(err, result) {
  info("Redis ready.... " + result);
});

client.on("error", function (err) {
  error("REDIS-Error " + err);
});

app.use('/*', function(req, res, next) {
    next();
});

app.use(express.static(__dirname + '/public/', { maxAge: 864 * 7 /* 1d */ }));     // set the static files location /public/img will be /img for users

function serve(baseName) {
  app.use(`/${baseName}*`, function(req, res){
    var url = "http://service.prerender.io/http://novo.servidor.adv.br"+req.originalUrl;
    if (!prerender.shouldShowPrerenderedPage(req))  {
      res.sendFile(__dirname + "/public/index.html");
    }else{
      client.get(url, function(err, result) {
        if (!err && result) {
            res.status(200).send(result);
        } else {
            fine('Cacheando...');
            request(url, function(errorSEO, responseSEO, bodySEO) {
              client.set(url, bodySEO);
              fine('Pagina cacheada...');
              res.status(200).send(bodySEO);
            });
        }
      });
    }
  });
}
var pages = ['advogados', 'atuacoes', 'camposdeinteresse', 'segmentos', 'clientes', 'vitorias', 'contato', 'imprensa', 'informes', ''];

for (var i = 0; i < pages.length; i++) {
  serve(pages[i]);
};



app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }))    // parse application/x-www-form-urlencoded
app.use(bodyParser.json())    // parse application/json
app.use(methodOverride());                  // simulate DELETE and PUT
app.use(compress());

app.listen(port);
info('novo.servidor.adv.br rodando na porta ' + port);          // shoutout to the user
