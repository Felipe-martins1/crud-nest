import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './dto/product';
import { ProductInput } from './dto/product.input';

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
  @Query((returns) => Product, { name: 'getProductById' })
  async getProductById(@Args('id') id: string): Promise<Product> {
    return this.productService.findById(id);
  }

  @Mutation((returns) => Product, { name: 'createProduct' })
  async create(@Args('input') input: ProductInput): Promise<Product> {
    return this.productService.create(input);
  }

  @Mutation((returns) => Boolean, { name: 'deleteProduct' })
  async remove(@Args('id') id: string): Promise<boolean> {
    return this.productService.remove(id);
  }

  @Mutation((returns) => Boolean, { name: 'updateProduct' })
  async update(
    @Args('id') id: string,
    @Args('input') input: ProductInput,
  ): Promise<boolean> {
    return this.productService.update(id, input);
  }
}
