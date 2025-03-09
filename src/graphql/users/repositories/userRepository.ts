import { userSchema, userMysqlSchema} from "../schemas/userSchema";
import { eq } from "drizzle-orm/expressions";

class UserRepository {
  private userMysqlSchema;
  private databaseConnection;
  constructor(userMysqlSchema: any, databaseConnection: any) {
    this.userMysqlSchema = userMysqlSchema;
    this.databaseConnection = databaseConnection;
  }

  async findAll(){
    console.log('Function to find all users.')
    const users = await this.databaseConnection.select().from(this.userMysqlSchema);
    console.log('Users founded', users)
    return users
  }

  async findById(id: number){
    console.log('Function to find user by id.', id)
    const user = await this.databaseConnection.select().from(this.userMysqlSchema).where(eq(userMysqlSchema.id, id))
    console.log(user)
    return user[0]
  }

  async createUser(name: String, email: String, age: Number) {
    console.log('Create user')
    try {
      const user = await this.databaseConnection.insert(this.userMysqlSchema).values({
        name,
        email,
        age
      })
      console.log('User created', user[0])
      return 'User created successfully'
    } catch (error) {
      console.log('Error creating user', error)
      return 'Cant create user'
    }
  }

  async updateUser(id: number,name: String, email: String, age: Number) {
    console.log('Update user');
    try{
      let userFields = {}
      if (name) userFields.name = name
      if (email) userFields.email = email
      if (age) userFields.age = age
      const updatedUser = await this.databaseConnection.update(this.userMysqlSchema).set(userFields).where(eq(this.userMysqlSchema.id, id))
      console.log('Updated user successfully', updatedUser)
      return 'User updated successfully'
    } catch (error) {
      console.log('Error updating user', error)
      return 'Cant update user'
    }
  }
  async deleteUser(id: number) {
    console.log('Delete user');
    try {
      const deletedUser = await this.databaseConnection.delete(this.userMysqlSchema).where(eq(this.userMysqlSchema.id, id))
      console.log('Deleted user successfully', deletedUser)
      return 'User deleted successfully'
    } catch (error) {
      console.log('Error deleting user', error)
      return 'Cant delete user'
    }
  }
}

export default UserRepository;