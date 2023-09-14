import { Router } from 'express'
import { CartsManagerFile } from '../daos/cartsManager.js'

export const router = Router()

export const cartService = new CartsManagerFile
const carts = []

// GET  http://localhost:8080/api/carts/
router.get('/',async (req, res)=>{
const carts = await cartService.get
res.status(200).send({
    status: 'success 😀',
    payload: carts
})
})
// GET  http://localhost:8080/api/carts/4
router.get('/:cid',async (req, res)=>{
    const {cid}= req.params
    const cart = await cartService.getById(parseInt(cid))
    res.status(200).send({
        status: 'success ',
        payload: cart

    })
})


router.post('/', async(req, res)=>{
    const newCart = req.params
    const result = await cartService.addProductToCart(newCart)
    res.status(200).send({
        status: 'success',
        payload: result
    })
})

export default router