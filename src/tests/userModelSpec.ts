import { UserModel, UserType } from "../models/UserModel";

const TestUsers = new UserModel();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(TestUsers.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(TestUsers.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(TestUsers.create).toBeDefined();
  });

  it("create method should add a user", async () => {
    const result = await TestUsers.create({
        first_name: "Abdullah",
        last_name: "Omar",
        password: '123456',
        username: "abdullah123"

    });

    expect(result.username).toBe('abdullah123')
  });
  it("index method should return a list of users", async () => {
    const result = await TestUsers.index();
    expect(result.length).toBeGreaterThanOrEqual(0)
  });
  it("show method should return the correct user", async () => {
    const result = await TestUsers.show("1");
    expect(result.id).toEqual(1);
  });


});
