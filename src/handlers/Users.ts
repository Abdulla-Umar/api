import express, { NextFunction, Request, Response } from "express";
import { UserType, UserModel } from "../models/UserModel";
import jwt from "jsonwebtoken"

const userModel = new UserModel();

const {TOKEN_SECRET} = process.env

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        //@ts-ignore
        const token = authorizationHeader.split(' ')[1]
        //@ts-ignore
        jwt.verify(token, TOKEN_SECRET)

        next()
    } catch (error) {
        res.status(401)
    res.json(`Invalid token ${error}`)
}
}

const create = async (req: Request,res: Response) => {
    const newUser: UserType = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    }
    try{
        const user = await userModel.create(newUser)
        // @ts-ignore
        const token = jwt.sign({user} , TOKEN_SECRET)
        res.set({
            'token': token 
          })
        // res.send(`the new user ${newUser.username} is created`) 
        res.json()
    }catch(err){
        res.status(404)
        res.json(err)
    }
}

const authenticate = async (req: Request,res: Response) => {
    try{
        const user = await userModel.authenticate(req.body.username , req.body.password)
        // @ts-ignore
        const token = jwt.sign({user} , TOKEN_SECRET)
         res.set({
            'token': token ,
          })
        res.json() 
    }catch(err){
        res.status(404)
        res.json(err)
    }
}

const index = async (req: Request , res: Response) => {
    try{
        const users = await userModel.index()
        res.json({ users });

    }catch(error) {
        res.status(404)
        res.send(error)
    }
}

const show =async (req:Request , res: Response) => {
    try {
        const result = await userModel.show(req.params.id)
        res.json()
    } catch (error) {
        res.send(error)
    }
}


const UsersRoutes = (app: express.Application) => {
    app.post('/users' , create)
    app.post('/users/auth' , authenticate)
    app.get('/users' , verifyAuthToken ,index)
    app.get('/users/:id' , verifyAuthToken , show)
}


export {UsersRoutes ,verifyAuthToken}