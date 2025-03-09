import ManageUsersUsecase from "../usecases/manageUsersUsecase";
class UserResolver {
  private manageUsersUsecase;
  constructor(manageUsersUsecase: ManageUsersUsecase) {
    this.manageUsersUsecase = manageUsersUsecase
  }

  async resolvers () {
    return {
      Query: {
        users: async () => await this.manageUsersUsecase.findAll(),
        user: async (_: any , { id }: any) => await this.manageUsersUsecase.finUserById(id)
      }, 
      Mutation: {
        addUser: async (_, { name, email, age }) => await this.manageUsersUsecase.createUser(name, email, age),
        updateUser: async (_, {id,name, email, age}) => await this.manageUsersUsecase.updateUser(id,name, email, age), 
        deleteUser: async (_, {id}) => await this.manageUsersUsecase.deleteUser(id)
      }
    }
  }
}

export default UserResolver;