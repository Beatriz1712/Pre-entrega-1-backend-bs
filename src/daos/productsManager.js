import fs from 'fs/promises';

//import fileSystem from 'node:fs'

//const { promises } = fileSystem
//const fs = promises

export class ProductManagerFile {  
    #products
    constructor(){
        this.path ='./src/files/Products.json'
        this.loadFile() 
    }    
  
   
    loadFile = async () => {
      try {
          const fileContent = await fs.readFile(this.path, "utf-8");
          const data = JSON.parse(fileContent);
         // Inicializa como un objeto JSON vacío si es nulo
         if(Array.isArray(data)) this.#products = data
         else this.#products = []
      } catch (err) {
          console.log(err);
          return {}; // Devuelve un objeto JSON vacío en caso de error
      }
  }
  

  updateFile = () => {
      try {
          fs.writeFile(this.path, JSON.stringify(this.#products, null, '\t'))
          console.log(fs.readFile(this.path, "utf-8"))
      } catch (err) {
          console.log(err)
      }
  }

  #generateID = () => {
        let id
        if (this.#products.length === 0) id = 1
        else id = this.#products[this.#products.length - 1].id + 1
        return id
      }
  getProducts = () => {
        return this.#products
      }
  addProduct = (title, description, price, thumbnails, code, stock, status, category) => {
        if (thumbnails == undefined) thumbnails = [""]
        let id = this.#generateID()
        let newProduct = {
          id, title, description, price, thumbnails, code, stock, status, category
        }
        if (!this.#products.some( el => el.code === code)){
          this.#products.push(newProduct)
          this.updateFile()
          return true
        }
        else {
          return false
        }
      }
  getProductByID = (id) => {
        const prod = this.#products.find( item => item.id == id)
        if (prod){
          return prod 
        } else {
          return console.log(`No existe el producto con id ${id}`)
        }
      } 
  updateProductByID = (id, newProperties) => {
        if (!this.#products.some( p => p.id === id)){
          return false
        } else {
          let index = this.#products.findIndex( p => p.id === id)
          Object.assign(this.#products[index], newProperties)
          this.updateFile()
          return true
        }
      }
  deleteProduct = (id) => {
        if (!this.#products.some( p => p.id == id)){
          return false
        } else {
          let newProductsList = this.#products.filter( p => p.id !== id)
          this.#products = newProductsList
          this.updateFile()
          return true
        }
      }
    }
  export default ProductManagerFile
  