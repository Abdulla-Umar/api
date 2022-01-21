import { Product, ProductModel } from "../models/ProductModel";

const store = new ProductModel();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      name: "sunglasses",
      price: 250,
      category: "accessories",
    });
    expect(result.name).toBe('sunglasses')
  });
  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(0)
  });
  it("show method should return the correct product", async () => {
    const result = await store.show("2");
    expect(result.id).toEqual(2);
  });

});
