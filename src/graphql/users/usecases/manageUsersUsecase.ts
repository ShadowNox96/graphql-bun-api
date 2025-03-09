import UserRepository from "../repositories/userRepository";
class ManageUsersUsecase {
  private userRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async findAll(){
    console.log("Llega hasta el caso de usox")
    return await this.userRepository.findAll();
  }

  async finUserById(id: number){
    return await this.userRepository.findById(id);
  }

  async createUser(name: string, email: string, age: number){
    return await this.userRepository.createUser(name, email, age);
  }

  async updateUser(id: number,name: string, email: string, age: number){
    return await this.userRepository.updateUser(id,name, email, age);
  }

  async deleteUser(id: number){
    return await this.userRepository.deleteUser(id)
  }

}

export default ManageUsersUsecase;