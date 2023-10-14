import { Repository } from "typeorm";
import { Food } from "../entity/Food";
import { AppDataSource } from "../data-source";
import { CustomError } from "../errors/CustomError";

export class FoodService {
  private repository: Repository<Food>;

  constructor() {
    this.repository = AppDataSource.getRepository(Food);
  }

  async findAll(): Promise<Food[]> {
    const foods: Food[] = await this.repository.find();

    if (foods.length === 0) {
      throw new CustomError("No se encontraron comidas", "food not found", 404);
    }

    return foods;
  }

  async findById(id: number): Promise<Food> {
    const food: Food = await this.repository.findOne({ where: { id: id } });

    if (!food) {
      throw new CustomError("Comida no encontrada", "food not found", 404);
    }

    return food;
  }

  async create(newFood: Food): Promise<Food> {
    console.log("toy aqui2");

    const food: Food = await this.repository.create(newFood);

    if (!food) {
      console.log("toy aqui");
      throw new CustomError(
        "No se pudo crear la comida",
        "food not created",
        404
      );
    }

    const foodCreated = await this.repository.save(food);

    return foodCreated;
  }

  async update(updateFood: Food, id: number) {
    const food: Food = await this.findById(id);

    if (!food) {
      return;
    }

    updateFood.id = id;

    const foodUpdated: Food = await this.repository.save(updateFood);

    return foodUpdated;
  }

  async delete(id: number) {
    const food: Food = await this.findById(id);

    if (!food) {
      return;
    }

    const foodDeleted = await this.repository.remove(food);
    return foodDeleted;
  }
}
