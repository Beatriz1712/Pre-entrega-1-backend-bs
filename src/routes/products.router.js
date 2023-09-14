import { Router } from "express";
// 1.importo la clase
import { ProductManagerFile } from "../daos/productsManager.js";

export const router = Router()
// 2.instanciar la clase
export const productService = new ProductManagerFile
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
        payload: products
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
//POST http://localhost:8080/api/products
router.post('/',async (req, res) =>{
    const newProduct = req.body
    const result = await productService.add(newProduct)
    res.status(200).send({
        status: 'success',
        payload: result

    })
})

// PUT http://localhost:8080/api/products/:pid
router.put('/:pid',async (req,res)=>{
    const productUpdate =  req.body
    //const productOld =await productService.put(productUpdate)
    const {pid} = req.params
/*
 if (!productUpdate.title || !productUpdate.description || !productUpdate.price || !productUpdate.img || !productUpdate.code || !productUpdate.stock || !productUpdate.id )
     res.status(400).send({
     status: 'error',
     error: 'Datos incompletos'})
   */  
   const productIndex = products.findIndex(product => product.id === Number(pid))
   /*
   if (productIndex === -1) {
       res.status(404).send({
       status: 'error',
       error: 'Product no actualizado'})
    }*/
  // products[productIndex] = {...productUpdate, id: products[productIndex].id}
    res.send({
        message: 'Producto cargado exitosamente',
        payload: productUpdate})
})
// DELETE http://localhost:8080 /api/products
router.delete('/:pid', async(req,res)=>{
    const product = await productService.get()
    const {pid} = req.params
    console.log(pid)   
    let productIndex = product.findIndex(product => product.id === Number(pid))
    if (productIndex === -1) {
        return res.status(404).send({status: 'error', error: 'Producto no encontrado'})
    }

   const  producto = product.filter(product => product.id !== Number(pid))
    
    res.send({
        message: 'Productos guardados', 
        payload: producto})
})

export default router 