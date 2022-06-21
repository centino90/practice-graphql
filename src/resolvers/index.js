import path from "path";
import { fileLoader, mergeResolvers } from "merge-graphql-schemas";

const resolversArray = fileLoader(path.join(__dirname));

console.log(`=======RESOLVERS========`)
console.log(resolversArray)
console.log(`=======RESOLVERS========`)

export default mergeResolvers(resolversArray);
