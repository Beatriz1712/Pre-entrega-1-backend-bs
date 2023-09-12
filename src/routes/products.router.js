import { Router } from "express";
// 1.importo la clase
import { ProuductManagerFile } from "../daos/productsManager.js";

export const router = Router()
// 2.instanciar la clase
export const productService = new ProuductManagerFile
let products = []

//manager manipula y router crea rutas =conectan
//TRAE todo los PRODUCTOS
// GET  http://localhost:8080/api/products/
router.get('/',async (req, res)=>{
    //console.log('get products')
    const products = await productService.get()
    //console.log(products);
    res.status(200).send({
        status: 'success 😀',
        payload: []
    })
})
//by id
router.get('/:pid',async (req, res)=>{
    //recupero id,de params
    const {pid} = req.params
    //console.log(pid);
    //traigo de manager
    const product = await productService.getById(parseInt(pid))
     res.status(200).send({
        status: 'success ☝',
        payload: product
     });
})
router.post('/',async (req, res) =>{
    const newProduct = req.body
    const result = await productService.add(newProduct)
    res.status(200).send({
        status: 'success',
        payload: result

    })
})

// PUT http://localhost:8080 /api/products /:pid
router.put('/:pid', (req,res)=>{
    let productUpdate = req.body
    let {pid} = req.params

    if (!productUpdate.first_name || !productUpdate.last_name) res.status(400).send({status: 'error', error: 'Datos incompletos'})
    let productIndex = products.findIndex(product => product.id === Number(pid))
    if (productIndex === -1) {
        return res.status(404).send({status: 'error', error: 'Product no found'})
    }
    products[productIndex] = {...productUpdate, id: products[productIndex].id}
    res.send({
        message: 'post api products',
         payload: products})
})
// DELETE http://localhost:8080 /api/products
router.delete('/:pid', (req,res)=>{
    let {pid} = req.params
    console.log(pid)   
    let productIndex = products.findIndex(product => product.id === Number(pid))
    if (productIndex === -1) {
        return res.status(404).send({status: 'error', error: 'Product no found'})
    }

    products = products.filter(product => product.id !== Number(pid))
    
    res.send({message: 'post api products', payload: products})
})

export default router 