import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import RecheckCart from '../RecheckCart/RecheckCart';
import './Ordders.css'

const Orders = () => {
    const [products, setProducts] = useProducts();
    const [cart, setCart] = useCart();
    const navigation = useNavigate();

    const handlRemoveItem = product => {
        const rest = cart.filter(pd => pd._id !== product._id)
        setCart(rest);
        removeFromDb(product._id);
    }

    return (
        <div className='shop-container'>
            <div className="recheck-cart-container">
                {
                    cart.map(product => <RecheckCart
                        hey={product.key}
                        product={product}
                        handlRemoveItem={handlRemoveItem}
                    ></RecheckCart>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={() => navigation('/*')}>Confirm Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;