import fileSystem from 'node:fs'

const { promises } = fileSystem
const fs = promises

export class CartsManagerFile{
    constructor(){
        this.path = './src/files/Carts.json'
    }

    readFileProducts = async () => {
        try {
            const productsJson = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(productsJson)            
        } catch (error) {
            return []
        }
    }
    //para incrementar Id
    incrementarId(){
        return this.cartIdCounter++;
    }
//crea carrito 
    create =async () => {
        const carts = await this.readFileProducts();
        const carrito = {
            cid: this.incrementarId(),
            products:[]
        }
        carts.push(carrito);
        await fs.writeFile(this.path, JSON.stringify(carts, null,2), 'utf-8')
        return "Carrito creado";
        
    }
        
       
        

//traer el carrito por id
getById = async(cid) =>{
    const carts = await this.readFileProducts()
    if(carts.length === 0 ) return 'no hay carrito'
    console.log('trayendo carrito por id');
    const cart = carts.find(cart => cart.id === cid)
    if(!cart) return 'No se encuentra el carrito'

    return cart
}



//agrega un producto al carrito con un id
addProductToCart = async ( { title, description, price, img, code, stock } ) =>{
    if(!title || !description || !price || !img || !code || !stock)
     return 'ingrese todos los parámetros'
     const products =  await this.readFileProducts() 
     const productExist = products.findIndex(product => product.code === code) 
     if (productExist !== -1) return 'ya éxiste el producto con ese código'

     carts.push({ title, description, price, img, code, stock, id: products.length + 1 })

     await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8' )
     //console.log('agregando un producto al carrito')
     return 'producto agregado'
    
}

}

