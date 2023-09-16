import { Router } from "express";
import { ProductManagerFile } from "../daos/productsManager.js";

export const router = Router()
// 2.instanciar la clase
export const productManager = new ProductManagerFile()
let products = []


//TRAE todo los PRODUCTOS
// GET  http://localhost:8080/api/products/
router.get('/',(req, res)=>{
    //console.log('get products')
    let products =  productManager.getProducts()
    let limit = req.query.limit
    if (products.length == 0) resp.status(200).send("No hay ningun producto en la lista")
	if (limit){
		let newProducts = products.slice(0, limit)
		products = newProducts
	}
	res.status(200).send(products)
    //console.log(products);
    /*
    res.status(200).send({
        status: 'success 😀',
        payload: products
    })
    */
})
//by id
router.get('/:pid', (req, res)=>{
    //recupero id,de params
    let pid = Number (req.params.pid)
    //console.log(pid);
    //traigo de manager
    let product =  productManager.getById(parseInt(pid))
    if (!product) res.status(400).send(`No existe el producto con id ${id}`)
	else res.status(200).send(product)
    /*
     res.status(200).send({
        status: 'success ☝',
        payload: product
     });
     */
})
//POST http://localhost:8080/api/products
router.post('/', (req, res) =>{
    let { title, description, code, price, stock, category, thumbnails } = req.query
	price = Number (price), stock = Number (stock)
	let productStatus = true
	if (!title || !description || !code || !price || !stock || !category){
		res.status(400).send("No se han completado todos los campos obligatorios")
	}
	let addStatus = productManager.addProduct(title, description, price, thumbnails, code, stock, productStatus, category)
	if (addStatus) res.status(201).send("Producto creado con exito")
	else resp.status(400).send(`Ya existe un producto con code ${code}`) 
   /*
    res.status(200).send({
        status: 'success',
        payload: result

    })
    */
})
// PUT http://localhost:8080/api/products/:pid
router.put('/:pid', (req, res) => {
	let pid = Number (req.params.pid)
	const newProperties = req.body
	const filteredProperties = Object.fromEntries(Object.entries(newProperties).filter(([key, value]) => value !== undefined))
	if (filteredProperties["price"]){
		filteredProperties["price"] = Number (filteredProperties["price"])
	}
	if (filteredProperties["stock"]){
		filteredProperties["stock"] = Number (filteredProperties["stock"])
	}
	const status = productManager.updateProductByID(pid, filteredProperties)
	if (status)	res.status(200).send(`Producto con id ${pid} modificado correctamente`)
	res.status(400).send(`No existe el producto con id ${pid}`)
})

router.delete('/:pid', (req, resp) => {
	let pid = Number (req.params.pid)
	let status = productManager.deleteProduct(pid)
	if (status) resp.status(200).send(`Producto eliminado con exito`)
	else resp.status(400).send(`No existe un producto con id ${pid}`)
})
export default router

