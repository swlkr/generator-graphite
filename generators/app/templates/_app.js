var config         = require("./config"),
    app            = require("koa")(),
    bodyParser     = require("koa-bodyparser"),
    overrideMethod = require("koa-override-method"),
    logger         = require("koa-logger"),
    jwt            = require("koa-jwt"),
    route          = require("koa-route"),
    routes         = require("./routes")(app, route);

app.use(logger());
app.use(bodyParser());
app.use(function *(next) {
  this.request.method = overrideMethod.call(this, this.request.body);
  yield next;
});

// Error handling
app.use(function *(next) {
  try {
    yield next;
  } catch(error) {
    console.log(error);
    this.status = error.status || 500;
    this.body = { message: error.message };
  }
});

// Routes without authentication
routes.open().map(routes.setup);

// Eveything below this requires authentication
app.use(jwt({ secret: config.app.secret }));

// Routes with authentication
routes.auth().map(routes.setup);

app.listen(config.app.port);
console.log("Listening on port %d", config.app.port);
