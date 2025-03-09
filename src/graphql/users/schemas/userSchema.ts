import { mysqlTable, varchar, int } from "drizzle-orm/mysql-core";
export const userSchema = `
type User {
  id: Int!
  name: String!
  email: String!
  age: Int!
}

type Query {
  users: [User] #obtener todos los usuarios
  user(id: ID!): User #obtener un usuario por id 
}

type Mutation {
  addUser(name: String!, email: String!, age: Int!): String! #agregar un usuario
  updateUser(id: ID!, name: String!, email: String!, age: Int!): String! #actualizar un usuario
  deleteUser(id: ID!): String! #borrar un usuario
}

`;

export const userMysqlSchema = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  age: int("age").notNull()
});
