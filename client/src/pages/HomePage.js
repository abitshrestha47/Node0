import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import LandingPage from './LandingPage';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const HomePage = () => {
  const [products, setProducts] = useState();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading,setLoading]=useState(false);

  const [cart,setCart]=useCart();

  //getTotal count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  }
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/product-list/${page}`);
      setLoading(false);
      setProducts(data.products); 
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(()=>{
    if(page===1) return;
    loadMore();
  },[page])
  //load more products
  const loadMore=async()=>{
    try {
      setLoading(true);
        const {data}=await axios.get(`/product-list/${page}`);
        console.log(data);
        setLoading(false);
        setProducts([...products,...data?.products])
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);
  return (
    <Layout>
      <div className='row mt-3'>
        <div className='col-md-12'>
          <LandingPage />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-md-2'></div>
        <div className='col-md-9'>
          <h1 className='text-center'>Shop</h1>
          <div className='d-flex flex-wrap'>
            {
              products?.map(product => (
                <div className="card m-2" style={{ width: '18rem' }} key={product._id}>
                  <img src={`products/image/${product._id}`} className="card-img-top" height='350px' alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description.substring(0, 30)}...</p>
                    <p className="card-text"> $ {product.price}</p>
                    <button className='btn btn-primary ms-1'>More Details</button>
                    <button className='btn btn-secondary ms-1' onClick={()=>{setCart([...cart,product]);localStorage.setItem('cart',JSON.stringify([...cart,product]));toast.success('Item added to cart.')}}>Add to cart</button>
                  </div>
                </div>
              ))
            }
          </div>
          <div className='m-2 p-3'>
            {products && products.length<total && (
            <button className="btn btn-warning" onClick={(e)=>{e.preventDefault();setPage(page+1)}}>
                {loading?'Loading . . .':'Load more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage