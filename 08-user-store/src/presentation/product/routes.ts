import { Router } from 'express';
import { ProductController } from './controller';

export class ProductRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new ProductController();
    
    // Definir las rutas
    router.get('/', controller.getProducts );
    router.post('/', controller.createProduct );

    return router;
  }


}

