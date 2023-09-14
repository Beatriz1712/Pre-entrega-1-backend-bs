import fileSystem from 'node:fs'

const { promises } = fileSystem
const fs = promises

export class ProductManagerFile {  // dao persistencia archivo
    constructor(){
        this.path = './src/files/Products.json'  
    }
//lee todos los productos
    readFileProducts = async () => {
        try {
            const productsJson = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(productsJson) 
        } catch (error) {
            return []
        }
    }
    // devuelve todos los productos
    get = async () => await this.readFileProducts() 

    //traer producto por id
    getById = async (pid)=> {
       const products = await this.readFileProducts()
       if(products.length === 0 ) return 'no hay productos' 

       const product = products.find(product => product.id === pid)
       if(!product) return 'No se encuentra el producto'

       return product
    }
    
    add = async ( { title, description, price, img, code, stock } ) => {
        if(!title || !description || !price || !img || !code || !stock)
        return 'ingrese todos los parámetros'

        const products = await this.readFileProducts()        
        // console.log(products)
        const productExist = products.findIndex(product => product.code === code) 

        if (productExist !== -1) return 'ya éxiste el producto con ese código'

        products.push({ title, description, price, img, code, stock, id: products.length + 1 })

        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8' )

        return 'producto agregado'
    }
    // actualizar
    update = async({pid, ...product}) => {
        let productOld = await this.readProducts()
        let productsModif = [{...product, id}, ...productOld]
        await fs.writeFile(this.path, JSON.stringify(productsModif))
        return 'PRODUCTO ACTUALIZADO'+pid
    }

    delete = async(pid)=> {
        let respuestaDelete = await this.readProducts()
        let productFilter = respuestaDelete.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(productFilter))
        //console.log("PRODUCTO ELIMINADO");

        return 'CARRITO BORRADO'+pid
    }
}