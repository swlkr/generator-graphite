var graphql = require("graphql").graphql,
    schema  = require("../schema/Root");

var GraphQLController = {
  routes: function() {
    return [
      { method: "post", url: "/query", fn: this.query, auth: false },
    ];
  },

  query: function *() {
    var query = this.request.body.query;

    var result = yield graphql(schema, query, this.state);

    var errors = result.errors || [];

    if(errors.length > 0) {
      throw { status: 500, message: errors[0].message };
    }

    this.body = result;
  }
};

module.exports = GraphQLController;
