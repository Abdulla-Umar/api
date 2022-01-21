import { OrderModel } from "../models/orderModel";
const TestOrderModel = new OrderModel()

describe('Order model' , () => {


    it('should get current order by user' , async () => {
        expect(TestOrderModel.getCurrentOrderByUser("1")).toBeTruthy()
    })
})