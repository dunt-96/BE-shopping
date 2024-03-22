import ProductRouter from './ProductRouter';
import UserRouter from './UserRouter';
import OrderRouter from './OrderRouter';

const initRoute = (app) => {
    // app.use('/', (req, res) => {
    //     res.send('Root');
    // })
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/order', OrderRouter);
}

export default initRoute;
