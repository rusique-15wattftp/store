import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import axios from 'axios'

interface Product {
    id: number
    title: string
    image: string
}

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    'https://fakestoreapi.com/products'
                )
                setProducts(response.data.slice(0, 5))
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error)
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <nav>
                <Link
                    to='/products'
                    className='nav-link'>
                    Go to Products Page
                </Link>
                <br />
                <Link
                    to='/cart'
                    className='nav-link'>
                    Go to Cart Page
                </Link>
            </nav>
            <h1>Welcome to the Shopping App</h1>

            <div
                className='carousel-container'
                style={{ maxWidth: '600px', margin: '0 auto' }}>
                <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={3000}
                    stopOnHover={true}
                    showStatus={false}>
                    {products.map(product => (
                        <div key={product.id}>
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{
                                    height: '300px',
                                    objectFit: 'contain',
                                }}
                            />
                            <p className='legend'>{product.title}</p>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default HomePage
