import { Repository } from "typeorm";
import { Food } from "../entity/Food";
import { AppDataSource } from "../data-source";

export class FoodService {
  private repository: Repository<Food>;

  constructor() {
    this.repository = AppDataSource.getRepository(Food);
  }

  async findAll(): Promise<Food[]> {
    const foods: Food[] = await this.repository.find();

    return foods;
  }

  async findById(id: number): Promise<Food> {
    const food: Food = await this.repository.findOne({ where: { id: id } });

    return food;
  }

  async create(newFood: Food): Promise<Food> {
    const food: Food = await this.repository.create(newFood);

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
