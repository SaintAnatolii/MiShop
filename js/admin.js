import { addCategoty } from "./modules/admin/add_category.js";
import { addProduct } from "./modules/admin/add_product.js"
import { authFunc } from './modules/auth.js'

console.log('admin connect')

addCategoty();
addProduct();

// authFunc();