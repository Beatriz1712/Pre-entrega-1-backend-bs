import fileSystem from 'node:fs'

const { promises } = fileSystem
const fs = promises

export class CartsManagerFile{
    constructor(){
        this.path = './src/files/Carts.json'
        this.path = './src/files/Products.json'
    }

    readFileProducts = async () => {
        try {
            const cartsJson = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(cartsJson)            
        } catch (error) {
            return []
        }
    }
    /*
    //para incrementar Id
    incrementarId(){
        console.log(this.incrementarId);
        return this.cartIdCounter++;
    }
    */
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
        //console.log('trayendo carrito por id');
        const cart = carts.find(cart => cart.id === cid)
        if(!cart) return 'No se encuentra el carrito'
        return cart
    }



    //agrega un producto al carrito con un id
    addProductToCart = async ( cid, pid) =>{
        try {
        
        const carts =  await this.readFileProducts() 
        const cartExist = carts.findIndex(cart => cart.cid === cid) 
        if (cartExist !== -1)
        return 'No se encontró el carrito';

        const product = await this.getProductById(pid);
        if (!product) 
        return 'No se encontró el producto';

        const cart = carts[cartIndex];
        cart.products.push(product)

        await fs.writeFile(this.path, JSON.stringify(carts, null, 2), 'utf-8' )
        return 'producto agregado'
        
    } catch (error){
        return 'Error al agregar el producto al carrito'
    }}

}

