import { Router } from 'express';
import { ProductController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ProductService } from '../services/product.service';

export class ProductRoutes {

  static get routes(): Router {

    const router = Router();
    const productService = new ProductService();
    const controller = new ProductController( productService );
    
    // Definir las rutas
    router.get('/', controller.getProducts );
    router.post('/', [ AuthMiddleware.validateJWT ], controller.createProduct );

    return router;
  }


}

