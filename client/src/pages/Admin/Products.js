import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    //to get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/products');
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        }
    }
    useEffect(() => {
        getAllProducts();
    }, []);
    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <h1 className='text-center mt-4'>All Electronics</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map(product => (
                            <Link key={product._id} to={`/dashboard/admin/product/${product.slug}`} className='product-link'>
                                <div className='card m-2' key={product._id} style={{ width: '18rem' }}>
                                    <img src={`/products/image/${product._id}`} className="card-img-top" height='350px' alt={product.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description.substring(0,30)}...</p>
                                        <p className="card-text"> $ {product.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products