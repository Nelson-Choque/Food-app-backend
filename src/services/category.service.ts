import { DeleteResult, Repository } from "typeorm";
import { Category } from "../entity/Category";
import { AppDataSource } from "../data-source";

export class CategoryService {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    const categories: Category[] = await this.repository.find();

    return categories;
  }

  async findById(id: number): Promise<Category> {
    const category: Category = await this.repository.findOne({
      where: { id: id },
    });

    return category;
  }

  async create(newCategory: Category): Promise<Category> {
    const category: Category = await this.repository.create(newCategory);

    await this.repository.save(category);

    return category;
  }

  async update(updateCategory: Category, id: number): Promise<Category> {
    const category: Category = await this.findById(id);

    if (!category) {
      return;
    }

    updateCategory.id = id;

    const categorySave: Category = await this.repository.save(updateCategory);
    return categorySave;
  }

  async delete(id: number): Promise<DeleteResult> {
    const category: Category = await this.findById(id);

    if (!category) {
      return;
    }

    const categoryDeleted: DeleteResult = await this.repository.delete({
      id: id,
    });

    return categoryDeleted;
  }
}
