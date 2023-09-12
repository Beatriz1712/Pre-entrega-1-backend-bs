import { router, productService } from "./products.router.js";

//se llam a req,por
// POST http://localhost:8080/api/products/
router.post('/', async (req, res) => {
    let newProduct = req.body;

    const result = await productService.add(newProduct);
    //  if (!newProduct.first_name || !newProduct.last_name) return res.status(400).send({status: 'error', error: 'Datos incompletos'})
    // newProduct.id = users.length + 1 
    // users.push(newProduct)
    res.send(200).sendStatus({
        status: 'success',
        payload: result
    });
});
