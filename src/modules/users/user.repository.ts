import { CreateUserInput, User } from "../../database/models/user.model";

export class UserRepository {
  static async create(data: CreateUserInput) {
    return User.create(data);
  }

  static async findByEmail(email: string) {
    return User.findOne({
      where: { email },
    });
  }

  static async findById(id: string) {
    return User.findByPk(id);
  }

  static async findAll() {
    return User.findAll();
  }

  static async update(id: string, data: Partial<CreateUserInput>) {
    await User.update(data, {
      where: { id },
    });

    return this.findById(id);
  }

  static async delete(id: string) {
    return User.destroy({
      where: { id },
    });
  }
}
