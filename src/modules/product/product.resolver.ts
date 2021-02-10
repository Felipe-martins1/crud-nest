import { Resolver, Query } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './dto/product';

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query((returns) => [Product], { name: 'getAllProducts' })
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productService.findAll();
    const productsToReturn = products.map((product) => {
      const productToReturn = new Product();
      productToReturn.id = product.id;
      productToReturn.product = product.product;
      productToReturn.price = product.price;
      return productToReturn;
    });
    return productsToReturn;
  }
}
