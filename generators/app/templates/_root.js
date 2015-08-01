var graphql           = require("graphql"),
    GraphQLSchema     = graphql.GraphQLSchema,
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString     = graphql.GraphQLString,
    GraphQLNonNull    = graphql.GraphQLNonNull,
    GraphQLList       = graphql.GraphQLList;

var Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Root",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: (context) => {
          return "<%= username %>";
        }
      }
    }
  })
});

module.exports = Schema;
