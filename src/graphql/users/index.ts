import { createSchema } from "graphql-yoga"
import { userSchema, userMysqlSchema } from "./schemas/userSchema";
import UserResolver from "./resolvers/userResolvers";
import ManageUsersUsecase from "./usecases/manageUsersUsecase";
import UserRepository from "./repositories/userRepository";
import { db } from "../../db/mysql/db";

const userRepository = new UserRepository(userMysqlSchema, db);
const manageUsersUsecase = new ManageUsersUsecase(userRepository);
const resolvers = new UserResolver(manageUsersUsecase);
export const schema = async ()  => {
  return createSchema({
    typeDefs: [userSchema],
    resolvers: [await resolvers.resolvers()]
  })
} 