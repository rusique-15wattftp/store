import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/cartSlice'

interface Product {
    id: number
    title: string
    price: number
    category: string
    image: string
}

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<Product[]>(
                    'https://fakestoreapi.com/products'
                )
                setProducts(response.data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    const handleAddToCart = (product: Product) => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: 1,
                image: product.image,
            })
        )
    }

    if (loading) {
        return <div>Loading products...</div>
    }

    return (
        <div>
            <h1>Product Page</h1>{' '}
            <Link
                to='/'
                className='btn-back'>
                Back to Home Page
            </Link>
            {'             '}
            <Link
                to='/cart'
                className='btn-back'>
                Go to Cart
            </Link>
            <div className='product-list'>
                {products.map(product => (
                    <div
                        key={product.id}
                        className='product-item'>
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: '150px',
                                height: '150px',
                                objectFit: 'contain',
                            }}
                        />
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Category: {product.category}</p>
                        <button
                            onClick={() => handleAddToCart(product)}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductPage
