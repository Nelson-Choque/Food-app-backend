import { Repository } from "typeorm";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import bcrypt from "bcrypt";

export class UserService {
  //*set Repository<User>
  private repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }
  //*functions

  //*findAll users

  async finAll(): Promise<User[]> {
    //*findAll users - select all users

    const users = await this.repository
      .createQueryBuilder("user")
      .select(["user", "store.id"])
      .leftJoin("user.store", "store")
      .getMany();
    return users;
  }

  //*finById

  async finById(id: number): Promise<User> {
    //*finById - select only user by id

    const user: User = await this.repository.findOne({ where: { id: id } });
    if (!user) {
      throw new Error("No se encontro el usuario");
    }
    return user;
  }

  //*create

  async create(Usercreate: User): Promise<User> {
    try {
      //*create - validation

      if (Usercreate == null) {
        throw new Error("Ingrese los datos");
      }

      //*create - create a new user

      const user: User = await this.repository.create(Usercreate);

      //*create - hash password

      const hashedPassword = await bcrypt.hash(user.password, 8);
      user.password = hashedPassword;
      user.state = true;
      //*create - save user in the db

      await this.repository.save(user);

      return user;
    } catch (error) {
      throw new Error("Error: " + error.message);
    }
  }

  //*update - update user

  async update(update: User, id: number) {
    //*update - find user

    const user: User = await this.finById(id);

    //*update - find user - validation

    if (!user) {
      return;
    }

    //*update - hash new password

    const newPassword = await bcrypt.hash(update.password, 8);

    //*update - update user in the db

    const updateUser = await this.repository
      .createQueryBuilder()
      .update(User)
      .set({
        username: update.username,
        store: update.store,
        state: update.state,
        password: newPassword,
      })
      .where("id = :id", { id: id })
      .execute();

    return updateUser;
  }

  //*delete - remove user

  async delete(id: number) {
    //*delete - find user

    const user: User = await this.finById(id);
    //*delete - find user - validation

    if (!user) {
      return;
    }
    //*delete - modify state

    user.state = false;

    //*delete - save change

    await this.repository.save(user);
    return user;
  }
}
