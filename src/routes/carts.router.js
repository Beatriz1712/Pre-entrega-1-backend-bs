import { Router } from 'express'

const router = Router()

router.get('/:cid',(req, res)=>{
    res.status(200).send('get cart cid')
})
router.post('/', (req, res)=>{
    res.status(200).send('create cart')
})
router.post('/:cid/proudct/:pid', (req, res)=>{
    res.status(200).send('add product cart')
})

export default router