//@ts-ignore
import Client from "../database"

type OrderType = {
    id ?: number;
    status: string;
    user_id: string
}
class OrderModel{
    // async create(order: OrderType){
    //     try {
    //         // @ts-ignore
    //         const conn = await Client.connect()
    //         const sql = 'INSERT INTO orders (user_id,status) VALUES ($1,$2) RETURNING *'
          
    //         const result = await conn.query(sql, [order.user_id, order.status])
          
    //         conn.release()
          
    //         return  result.rows[0]
    //     } catch (error) {
    //         throw new Error(`can not make new order: ${error}`) 
    //     }
    // }
    // async show(id: string){
    //     try {
    //       //@ts-ignore
    //         const conn = Client.connect()
    //         const sql = 'SELECT * FROM orders where id = ($1)'
    //         const result = await conn.query(sql, [id])
    //         conn.release()
    //         return result.rows[0]
    //     } catch (error) {
    //         throw new Error(`can not get order of id ${id}: ${error}`) 
    //     }
    // }
    // async index(){
    //     try {
    //         //@ts-ignore
    //         const conn = Client.connect()
    //         const sql = 'SELECT * FROM orders'
    //         const result = await conn.query(sql)
    //         conn.release()
    //         return result.rows
    //     } catch (error) {
    //        throw new Error(`can not get list of orders: ${error}`) 
    //     }
    // }
    // async addProduct(quantity: number, orderId: string, productId: string): Promise<OrderType> {
    //     try {
    //       const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
    //       //@ts-ignore
    //       const conn = await Client.connect()
    
    //       const result = await conn
    //           .query(sql, [quantity, orderId, productId])
    
    //       const order = result.rows[0]
    
    //       conn.release()
    
    //       return order
    //     } catch (err) {
    //       throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
    //     }
    //   }
    async getCurrentOrderByUser(user_id: string){
        try {
                        //@ts-ignore
            const conn = await Client.connect()
            const sql = 'SELECT status,user_id,quantity,order_id,product_id FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE user_id=($1)'
            const result = await conn.query(sql,[user_id])
            conn.release()
            return result.rows[0]
        } catch (error) {
             throw new Error(`Could not get order : ${error}`)

        }
    }
}

export {OrderModel}