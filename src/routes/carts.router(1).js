import { Router } from 'express'
import { CartsManagerFile } from '../daos/cartsManager.js'
import ProductManagerFile from '../daos/productsManager.js'
import { ok } from 'assert'

export const router = Router()
export const cartManager = new CartsManagerFile()
export const productManager = new ProductManagerFile()

router.post('/', (req, res) => {
	let status = cartManager.createNewCart()
	if (status[0]) return res.status(200).send(`Se ha creado el carrito con id ${status[1]}`)
})
router.get('/:cid', (req, res) => {
	const cid = req.params.cid
	const cart = cartManager.getCartProducts(cid)
	if (cart === false) return res.status(400).send(`No existe el carrito con id ${cid}`)
	return res.status(200).send(cart)

	
})
// router.post('/:cid/product/:pid', (req, resp) => {
// 	let cid = Number (req.params.cid), pid = Number (req.params.pid)
// 	let exists = cartManager.cartExists(cid)
// 	if (exists === false) return resp.status(400).send(`No existe el carrito con id ${cid}`)
// 	let product = productManager.getProductByID(pid)
// 	if (!product) return resp.status(400).send(`No existe el producto con id ${pid}`)
// 	let status = cartManager.addProductToCart(cid, product.id)
// 	if (status) return resp.status(200).send(`Se añadio el producto con id ${pid} al carrito`)
// })
router.post('/:cid/product/:pid', (req, res) => {
    const {cid , pid } = req.params;
    
    console.log(cid, pid);
    // Verificar si el carrito existe
     const carAll = cartManager.getCartProducts(cid);
     console.log(carAll);
    if (!carAll) {
        return res.status(400).send(`No existe el carrito con id ${cid}`);
    }

//     // Verificar si el producto existe
    const  product = productManager.getProductByID(pid);
    console.log(product);
    if (!product) {
        return res.status(400).send(`No existe el producto con id ${pid}`);
    }

//     // Agregar el producto al carrito
     const newProduct = {
            id: product.id,
            quantyti:product.stock
           }
     console.log(newProduct);
     carAll.products.push(newProduct)
     cartManager.updateFile()
     return res.status(200).send({
            status: 'product added to cart',
            payload: carAll
     })
         
 });

export default router;
