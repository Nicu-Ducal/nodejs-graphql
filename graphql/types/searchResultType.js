const { GraphQLUnionType } = require("graphql");
const userType = require("./userType");
const postType = require("./postType");
const db = require("../../models");

const searchResultType = new GraphQLUnionType({
  name: "SearchResult",
  types: [userType, postType],
  resolveType: (value) => {
    console.log("Value", value);
    if (value instanceof db.User) {
      return userType.name;
    } else if (value instanceof db.Post) {
      return postType.name;
    }
  },
});
