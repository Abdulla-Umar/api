import express, { Application ,Request,Response } from "express"
import bodyParser from "body-parser"
import { ProductRoutes } from "./handlers/Products"

import  {UsersRoutes} from "./handlers/Users"
import {OrderRoutes} from "./handlers/orders"
const app:Application = express()

const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

ProductRoutes(app)
OrderRoutes(app)
UsersRoutes(app)

export default app;

