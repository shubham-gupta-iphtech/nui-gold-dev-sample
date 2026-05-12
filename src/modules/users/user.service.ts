import bcrypt from "bcrypt";

import { CreateUserInput, User } from "../../database/models/user.model";

import { UserRepository } from "./user.repository";

export class UserService {
  static async createUser(data: CreateUserInput) {
    const existingUser = await UserRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await UserRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  static async getUser(id: string) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  static async getUsers() {
    return UserRepository.findAll();
  }

  static async updateUser(id: string, data: Partial<CreateUserInput>) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return UserRepository.update(id, data);
  }

  static async deleteUser(id: string) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await UserRepository.delete(id);

    return true;
  }
}
