import supertest from 'supertest';
import app from '../server';


const request = supertest(app);
let authToken: string


describe('users api', () => {
  it('tests signUp endpoint', async () => {
    const response = await request.post('/users').send({
      "first_name": "ahmed",
      "last_name": "ali",
      "username": "ali123",
      "password": "6789"
    })
    expect(response.status).toBe(200)
  })


  it('tests signIn endpoint', async () => {
    const response = await request.post('/users/auth').send({
      "username": "ali123",
      "password": "6789"
    })
    authToken = response.headers.token
    expect(response.status).toBe(200)
  })

  it('tests get users endpoint', async () => {

    const response = await request.get('/users').set({ "authorization": `Bearer ${authToken}`, Accept: 'application/json' })
    expect(response.status).toBe(200)
  })

  
  it('tests get specific user endpoint', async () => {

    const response = await request.get('/users/1').set({ "authorization": `Bearer ${authToken}`, Accept: 'application/json' })
    expect(response.status).toBe(200)
  })
})

describe('products api', () => {
  it('tests the root api', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('tests get products endpoint', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
  });

  it('tests get product endpoint', async () => {
    const response = await request.get('/products/1');
    expect(response.status).toBe(200);
  });

  it('tests create product endpoint' , async () => {
    const response = await request.post('/products').send({
      name: "black watch",
      price: 150,
      category: "accessories",
    }).set({ "authorization": `Bearer ${authToken}`, Accept: 'application/json' })

    expect(response.status).toBe(200)
  })
});

describe('orders api' , () => {
  it('tests get current order by user endpoint' , async () => {
    const response = await request.get('/orders?userId=1')
    .set({ "authorization": `Bearer ${authToken}`, Accept: 'application/json' })
    
    expect(response.status).toBe(200)
  })
})
