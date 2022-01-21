//@ts-ignore
import Client from "../database";
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config();
const { 
 SALT_ROUNDS,
 BCRYPT_PEPPER
} = process.env


type UserType = {
  id ?: number;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

class UserModel {
  async create(u: UserType): Promise<UserType> {
    try {
  const sql = 'INSERT INTO users (first_name, last_name,username,password ) VALUES($1, $2, $3 ,$4) RETURNING *'
  // @ts-ignore
  const conn = await Client.connect()
    // @ts-ignore
  const hash = bcrypt.hashSync(u.password + BCRYPT_PEPPER, parseInt(SALT_ROUNDS))
  const result = await conn.query(sql, [u.first_name, u.last_name, u.username, hash])
  const user = result.rows[0]

  conn.release()

  return user
} catch(err) {
  throw new Error(`unable create user (${u.username}): ${err}`)
}
}



  async index(): Promise<UserType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()

      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<UserType> {
    try {
    // @ts-ignore
    const conn = await Client.connect()
    const sql = 'SELECT * FROM users WHERE id=($1)'
    const result = await conn.query(sql, [id])
    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }


  async authenticate(username: string,password: string): Promise <UserType | null>{
    //@ts-ignore
    const conn = await Client.connect()
    const sql = 'SELECT password FROM users WHERE username=($1)'
    const result = await conn.query(sql,[username])
    if(result.rows.length){
      const user = result.rows[0]
      if(bcrypt.compareSync(password+BCRYPT_PEPPER, user.password)){
        return user
      }
    }
    return null
  }

}


export {UserType , UserModel}