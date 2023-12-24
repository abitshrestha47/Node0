import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    //total price
    const totalPrice=()=>{
        try {
            let total=0;
            cart?.map(item=>{total=total+item.price})
            return total.toLocaleString('en-US',{
                style:'currency',
                currency:'USD',
            });
        } catch (error) {
            console.log(error);
        }
    }

    //delete cart item
    const removeCartItem=(pid)=>{
        try {
            let myCart=[...cart];
            let index=myCart.findIndex(item=>item._id===pid);
            myCart.splice(index,1);
            setCart(myCart); 
            localStorage.setItem('cart',JSON.stringify(myCart));   
        } catch (error) {
            
        }
    }
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12 mt-4'>
                        <h1 className='text-center p-2'>
                            {`Hello,${auth?.token && auth?.user?.username}`}
                        </h1>
                        <h4 className='text-center mt-1'>
                            {cart?.length ? `You have ${cart?.length} item in your cart ${auth?.token ? "" : "Please login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-8'>
                        {
                            cart?.map(product => (
                                <div className='row mb-2 card flex-row p-4'>
                                    <div className='col-md-3'>
                                        <img src={`/products/image/${product._id}`} className="card-img-top cartImage" alt={product.name} />
                                    </div>
                                    <div className='col-md-9'>
                                        <p>{product.name}</p>
                                        <p>{product.description.substring(0,30)}</p>
                                        <p>{product.price}</p>
                                        <button className='btn btn-danger' onClick={()=>{removeCartItem(product._id)}}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div> 
                    <div className='col-md-4 text-center'>
                        <h4>Cart summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr/>
                        <h4>Total:{totalPrice()}</h4>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage