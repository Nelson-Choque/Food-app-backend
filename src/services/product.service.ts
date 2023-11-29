import { InsertResult, Repository, UpdateResult } from "typeorm";
import { Product } from "../entity/Product";
import { AppDataSource } from "../data-source";
import { CustomError } from "../errors/CustomError";

export class ProductService {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    const products: Product[] = await this.repository
      .createQueryBuilder("product")
      .select(["product", "store.id"])
      .leftJoin("product.store", "store")
      .getMany();

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

  async create(newProduct: Product): Promise<InsertResult> {
    const product: InsertResult = await this.repository
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values({
        brand: newProduct.brand,
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        imgUrl: newProduct.imgUrl,
        store: newProduct.store,
      })
      .execute();

    if (!product) {
      throw new CustomError(
        "No se pudo crear la comida",
        "product not created",
        404
      );
    }

    return product;
  }

  async update(updateProduct: Product, id: number) {
    const product: Product = await this.findById(id);

    if (!product) {
      return;
    }

    const productUpdated: UpdateResult = await this.repository
      .createQueryBuilder()
      .update(Product)
      .set({
        name: updateProduct.name,
        description: updateProduct.description,
        brand: updateProduct.brand,
        price: updateProduct.price,
        store: updateProduct.store,
        imgUrl: updateProduct.imgUrl,
      })
      .where("id =:id", { id: id })
      .execute();

    return productUpdated;
  }

  async delete(id: number) {
    const product: Product = await this.findById(id);

    if (!product) {
      return;
    }

    const productDeleted = await this.repository
      .createQueryBuilder()
      .delete()
      .from(Product)
      .where("id=:id", { id: id })
      .execute();
    return productDeleted;
  }
}
