import { Repository } from "typeorm";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { CustomError } from "../errors/CustomError";

export class ProductService {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    const products: Product[] = await this.repository.find();

    if (products.length === 0) {
      throw new CustomError(
        "No se encontraron comidas",
        "product not found",
        404
      );
    }

    return products;
  }

  async findById(id: number): Promise<Product> {
    const product: Product = await this.repository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new CustomError("Comida no encontrada", "product not found", 404);
    }

    return product;
  }

  async create(newProduct: Product): Promise<Product> {
    console.log("toy aqui2");

    const product: Product = await this.repository.create(newProduct);

    if (!product) {
      console.log("toy aqui");
      throw new CustomError(
        "No se pudo crear la comida",
        "product not created",
        404
      );
    }

    const productCreated = await this.repository.save(product);

    return productCreated;
  }

  async update(updateProduct: Product, id: number) {
    const product: Product = await this.findById(id);

    if (!product) {
      return;
    }

    updateProduct.id = id;

    const productUpdated: Product = await this.repository.save(updateProduct);

    return productUpdated;
  }

  async delete(id: number) {
    const product: Product = await this.findById(id);

    if (!product) {
      return;
    }

    const productDeleted = await this.repository.remove(product);
    return productDeleted;
  }
}
