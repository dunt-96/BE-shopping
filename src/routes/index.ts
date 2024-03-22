import CartRouter from './CartRoute';
import OrderRouter from './OrderRouter';
import ProductRouter from './ProductRouter';
import UserRouter from './UserRouter';

const initRoute = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/order', OrderRouter);
    app.use('/api/cart', CartRouter);
}

export default initRoute;
