var config         = require("./config"),
    koa            = require("koa"),
    app            = new koa(),
    bodyParser     = require("koa-bodyparser"),
    logger         = require("koa-logger"),
    jwt            = require("jsonwebtoken"),
    route          = require("koa-route"),
    routes         = require("./routes")(app, route);

app.use(logger());
app.use(bodyParser());

// Error handling
app.use((ctx, next) => {
  return next()
         .catch((error) => {
           console.log(error);
           ctx.status = error.status || 500;
           ctx.body = { message: error.message };
         });
});

// Routes without authentication
routes.open().map(routes.setup);

// Eveything below this requires authentication
app.use((ctx, next) => {
  return next()
         .then(() => {
           return new Promise((resolve, reject) => {
             jwt.verify(ctx.header['Authorization'], config.app.secret, (err, decoded) => {
               if(err) {
                 return reject(err);
               }

               return resolve(decoded);
             });
           });
         })
         .then((decoded) => {
           ctx.jwt = decoded;
         });
});

// Routes with authentication
routes.auth().map(routes.setup);

app.listen(config.app.port);
console.log("Listening on port %d", config.app.port);
