import express , {Request,Response} from "express"
import { OrderModel } from "../models/orderModel"
import { verifyAuthToken } from "./Users"
const getCurrentOrderByUser = async (req: Request, res: Response) => {
    try {
        const orderModel = new OrderModel()
        const order = await orderModel.getCurrentOrderByUser(req.query.userId as unknown as string)
        res.json({order}) 
    } catch (error) {
        res.status(400)
        res.send(error)
    }
} 

const OrderRoutes = (app: express.Application) => {
    app.get('/orders' , verifyAuthToken , getCurrentOrderByUser)
}

export {OrderRoutes}