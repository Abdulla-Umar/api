//@ts-ignore
import Client from "../database";


type Product = {
  id ?: number;
  name: string;
  price: number;
  category: string;
};

class ProductModel {
  async create(b: Product): Promise<Product> {
    try {
  const sql = 'INSERT INTO products (name, price,category) VALUES ($1, $2, $3) RETURNING *'
  // @ts-ignore
  const conn = await Client.connect()

  const result = await conn.query(sql, [b.name, b.price, b.category])

  const product = result.rows[0]

  conn.release()

  return product
    } catch (err) {
        throw new Error(`Could not add new book ${name}. Error: ${err}`)
    }
}

  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
    // @ts-ignore
    const conn = await Client.connect()
    const sql = 'SELECT * FROM products WHERE id=($1)'
    const result = await conn.query(sql, [id])
    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find Product ${id}. Error: ${err}`)
    }
  }



async delete(id: string): Promise<Product> {
  try {
const sql = 'DELETE FROM products WHERE id=($1)'
// @ts-ignore
const conn = await Client.connect()

const result = await conn.query(sql, [id])

const product = result.rows[0]

conn.release()

return product
  } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`)
  }
}

}


export {Product , ProductModel}