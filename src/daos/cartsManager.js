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
}

//crea carrito 
create = () => {
console.log('creando carrito');
}

//traer el carrito por id
getById = () =>{
    console.log('trayendo carrito por id');
}

//agrega un producto al carrito con un id
addProductToCart = () =>{
    console.log('agregando un producto al carrito')
}