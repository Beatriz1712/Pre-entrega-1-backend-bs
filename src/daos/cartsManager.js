import fs from 'fs/promises';

export class CartsManagerFile{
    #carts

    constructor(){
       
        this.path ='./src/files/Carts.json'  
        this.loadFile() 
    }

    loadFile = async () => {
        try {
            const fileData = await fs.readFile(this.path, 'utf-8');
            const data = JSON.parse(fileData);

            if (Array.isArray(data)) {
                this.#carts = data;
            } else {
                // Si el archivo está vacío o no es un JSON válido, crea un carrito vacío.
                this.#carts = [];
                this.createNewCart(); // Crea un nuevo carrito vacío
            }
        } catch (err) {
            console.log('Error al cargar el archivo:', err);
            this.#carts = [];
        }
    }
        updateFile = () => {
            try {
                fs.writeFile(this.path, JSON.stringify(this.#carts, null, '\t'))
                console.log(fs.readFile(this.path, "utf-8"))
            } catch (err) {
                console.log(err)
            }
        }
        #generateID = () => {
            let id = 1; // Valor inicial
            if (this.#carts.length > 0) {
                const lastCart = this.#carts[this.#carts.length - 1];
                if (lastCart && lastCart.id) {
                    id = lastCart.id + 1;
                }
            }
            return id;
        }
        createNewCart = () => {
            const newCart = {
                id: this.#generateID(),
                products: []
            };
            this.#carts.push(newCart); // Agrega el nuevo carrito al arreglo
            this.updateFile();
            return [true, newCart.id];
        }
        getCartProducts = (id) => {
            let cart = this.#carts.find(cart => cart.id == id);
            
            if (cart) {
                return cart; // Supongo que deseas devolver los productos del carrito
            } else {
                return false; // Devolver false si el carrito no se encontró
            }
        }
        cartExists = (id) => {
            let index = this.#carts.findIndex( cart => cart.id === id)
            if (index == -1) return false
            else return true
        }
        // agregar un producto al carrito
        // addProductToCart = (cid, pid) => {
               
        //        console.log(cid, pid);
        //        const productManager = new ProductManagerFile()
        //        const cart= this.#carts.find(cart => cart.id == cid);
        //        console.log(cart);
        //        const product = productManager.getProductByID(pid);
        //         if (!product) return console.log(`No existe el producto con id ${pid}`)
        //         if (!cart) return console.log(`No existe el carrito con id ${cid}`)
        //        const newProduct = {
        //              id: product.id,
        //              quantyti:product.quantyti
        //             }
        //         cart.products.push(newProduct)
        //         this.updateFile()
        //         return cart
        
        // }

        productExistsInCart = (pid, cindex) => {
            let exists = this.#carts[cindex].products.findIndex( product => product.id === pid)
            if (exists === -1 ) return false
            else return exists
        }

	}
export default CartsManagerFile
  