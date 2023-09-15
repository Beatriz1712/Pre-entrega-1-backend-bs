import { Router } from 'express'
import { CartsManagerFile } from '../daos/cartsManager.js'

export const router = Router()
export const cartService = new CartsManagerFile

const carts = []
let lastId = 0

// GET  http://localhost:8080/api/carts/
router.get('/',async (req, res)=>{
//const carts =  cartService.get
res.status(200).send({
    status: 'success 😁',
    payload: carts
})
})

//POST  http://localhost:8080/api/carts/
router.post('/', (req,res) => {
    
    function generateId() {
        return (++lastId).toString()   
    }
    const cart = {
        id: generateId(), 
        products: []//ojo
    }
    //console.log(cart.id),
    carts.push(cart);
    console.log(carts);
    res.status(200).json(cart);
});

// GET  http://localhost:8080/api/carts/4
router.get('/:cid',async (req, res)=>{
    const {cid}= req.params
    const cart = await cartService.getById(parseInt(cid))
    res.status(200).send({
        status: 'success ',
        payload: cart

    })
})

//POST(‘/:cid/adProductToCart/:pid’
//POST http://localhost:8080/api/carts/1/12
router.post('/:cid/addProductToCart/:pid', async (req, res) => {

    const { cid, pid } = req.params;
    const { title, description, price, img, code, stock } = req.body;
    if (!title || !description || !price || !img || !code || !stock) {
       res.status(400).send({
            status: 'error',
            message: 'Ingresa todos los parámetros del producto.'
        });
        return;
    }
    try {
        const result = await cartService.addProductToCart(parseInt(cid), parseInt(pid), {
            title, description, price, img, code, stock
        });
          res.status(200).send({
            status: 'success',
            payload: result
        });

    } catch (error) {

        res.status(500).send({
            status: 'error',
            message: 'Error al agregar el producto al carrito.'
         });
     }

});

export default router
