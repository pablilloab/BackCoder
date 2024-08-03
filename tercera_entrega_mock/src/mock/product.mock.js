import { fakerES as faker } from "@faker-js/faker";
import { productModel } from "../persistences/mongo/models/product.model.js";

export const generateProductsMocks = (amount) => {
  const products = [];

  for (let i = 0; i < amount; i++) {
    const product = {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      thumbnail: [faker.image.imageUrl()],
      code: faker.random.alphaNumeric(10),
      stock: faker.number.int({ min: 0, max: 1000 }),
      status: faker.datatype.boolean(),
      price: faker.commerce.price(),
      category: faker.commerce.department(),
    };

    products.push(product);
  }

  productModel.insertMany(products);

  return products;
};
