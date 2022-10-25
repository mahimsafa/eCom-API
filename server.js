const express = require("express")
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');
const { getOrder, getOrders, newOrder, updateOrder } = require("./controllers/orders.js")
const { deleteProduct, getProducts, newProduct } = require("./controllers/products.js")
const serverless = require('serverless-http');
const {generateUpload} = require('./controllers/s3')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  console.log(req.headers)
  res.json({ message:'Server is working fine.' })
})

app.get('/s3url', async (req, res) => {
  const url = await generateUpload()
  res.json({ message:'S3 bucket url.', url })
})


app.put('/orders/update', async (req, res) => {
  const { orderId, action } = req.body
  const payload = {
    orderId,
    action,
  }
  const orders = await updateOrder(payload)
  res.json(orders)
})

app.get('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params
  const payload = {
    id: orderId
  }
  const orders = await getOrder(payload)
  res.json(orders)
})

app.post('/orders', async (req, res) => {
  const { customer, products, price } = req.body
  const id = uuidv4()
  const createdAt = new Date().getTime().toString()
  const payload = {
    id,
    createdAt,
    updatedAt: createdAt,
    customer,
    price,
    products,
    delivered: false,
    expiry,
    cvv,
    card
  }
  const order = await newOrder(payload)
  res.json(order)
  // res.json({ message: 'dev' })
})

app.get('/orders', async (req, res) => {
  const orders = await getOrders()
  res.json(orders)
})

app.delete('/products', async (req, res) => {
  const { id } = req.body
  if (!id ) return res.status(400).json({ error: 'id,createdAt fields are required' })

  const payload = {
    id
  }
  const product = await deleteProduct(payload)
  res.json(product)
})

app.post('/products', async (req, res) => {
  const { name, description, img, price } = req.body
  if (typeof (price) !== 'number') return res.status(400).json({ error: 'Price must be in number' })
  const id = uuidv4()
  const createdAt = new Date().getTime().toString()

  const payload = {
    name, description, img, price, id, createdAt
  }
  const product = await newProduct(payload)
  res.json(product)
})


app.get('/products', async (req, res) => {
  const products = await getProducts()
  res.json(products)
})

module.exports.app = app

module.exports.handler = serverless(app);