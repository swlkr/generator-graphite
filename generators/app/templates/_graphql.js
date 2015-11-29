var graphql = require("graphql").graphql,
    schema  = require("../schema/root");

module.exports = {
  routes() {
    return [
      { method: "post", url: "/query", fn: this.query, auth: false },
    ];
  },

  query(ctx) {
    return graphql(schema, ctx.request.body.query, ctx.state)
            .then((result) => {
              if((result.errors || []).length > 0) {
                ctx.body = { status: 500, message: result.errors[0].message };
                return;
              }

              ctx.body = result;
            });
  }
};
