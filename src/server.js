  import express from 'express';
  import {fileURLToPath} from 'url'
  import { dirname } from 'path';
  import cookieParser from 'cookie-parser';
  import bodyParser from 'body-parser';

  import usersRouter from './routes/users.router.js';
  import productsRouter from './routes/products.router.js';
  import cartsRouter from './routes/carts.router.js'
  
  import { uploader } from './utils/multer.js';
  
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)

  const app = express()
  const PORT = 8080
  app.use(bodyParser.json())
  app.use(express.static(__dirname + '/public') )
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.urlencoded({extended:true}) )//para q tome formato json
 
  //defino las rutas - configuro  END POINT
// GET http://localhost:8080 /api/users
app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

  app.listen(PORT, () =>{
    console.log(`Escuchando puerto ${PORT}`);
  })
