import { createSchema, createYoga } from "graphql-yoga";

let users = [
  { id: 1, name: "John", email: "john@example.com", age: 30 },
  { id: 2, name: "Jane", email: "jane@example.com", age: 25 },
  { id: 3, name: "Bob", email: "bob@example.com", age: 35 },
];

const findUserById = (id: number) => {
  console.log("Enter into findUserById");
  console.log(typeof id);
  return users.find((user) => user.id === id);
};

const updateUser = (id: number, name: string, email: string, age: number) => {
  console.log("Enter into updateUser", typeof id);
  const userIndex = users.findIndex((user) => user.id === id);
  console.log("User index founded", userIndex);
  if (userIndex === -1) throw new Error("User not found");
  users[userIndex].name = name;
  users[userIndex].email = email;
  users[userIndex].age = age;
  return users[userIndex];
};

const deleteUser = (id: number) => {
  console.log('Into deleteUser')
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) throw new Error("User not found");
  users.splice(userIndex, 1);
  return users[userIndex];
};
const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
      }

      type Query {
        users: [User] #obtener todos los usuarios
        user(id: ID!): User #obtener un usuario por id 
      }

      type Mutation {
        addUser(name: String!, email: String!, age: Int!): User #agregar un usuario
        updateUser(id: ID!, name: String!, email: String!, age: Int!): User #actualizar un usuario
        deleteUser(id: ID!): User #borrar un usuario
      }

    `,
    resolvers: {
      Query: {
        users: () => users,
        user: (_, { id }) => findUserById(Number(id)),
      },
      Mutation: {
        addUser: (_, { name, email, age }) => {
          const newUser = { id: users.length + 1, name, email, age };
          users.push(newUser);
          return newUser;
        },
        updateUser: (_, { id, name, email, age }) =>
          updateUser(Number(id), name, email, Number(age)),
        deleteUser: (_, { id }) => deleteUser(Number(id)),
      },
    },
  }),
});

const server = Bun.serve({
  fetch: yoga,
});

console.info(
  `Server is running on ${new URL(
    yoga.graphqlEndpoint,
    `http://${server.hostname}:${server.port}`
  )}`
);
