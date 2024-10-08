import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../redux/store'
import { removeFromCart, updateQuantity } from '../redux/cartSlice'

interface CartItem {
    id: number
    title: string
    quantity: number
    price: number
    image: string
}

const CartPage: React.FC = () => {
    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    )
    const dispatch = useDispatch()

    const handleIncrement = (item: CartItem) => {
        dispatch(
            updateQuantity({
                id: item.id,
                quantity: item.quantity + 1,
            })
        )
    }

    const handleDecrement = (item: CartItem) => {
        if (item.quantity > 1) {
            dispatch(
                updateQuantity({
                    id: item.id,
                    quantity: item.quantity - 1,
                })
            )
        }
    }

    const handleRemove = (itemId: number) => {
        dispatch(removeFromCart(itemId))
    }

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )

    return (
        <div>
            <Link
                to='/'
                className='btn-back'>
                Back to Home Page
            </Link>{' '}
            <Link
                to='/products'
                className='btn-back'>
                Go to Products
            </Link>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className='cart-items'>
                    {cartItems.map((item: CartItem) => (
                        <div
                            key={item.id}
                            className='cart-item'>
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'contain',
                                }}
                            />

                            <h3>{item.title}</h3>
                            <p>Price: ${item.price}</p>
                            <div>
                                <button
                                    onClick={() =>
                                        handleDecrement(item)
                                    }>
                                    -
                                </button>
                                <span> {item.quantity} </span>
                                <button
                                    onClick={() =>
                                        handleIncrement(item)
                                    }>
                                    +
                                </button>
                            </div>
                            <p>
                                Total: $
                                {(item.price * item.quantity).toFixed(
                                    2
                                )}
                            </p>
                            <button
                                onClick={() => handleRemove(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}

                    <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
                </div>
            )}
        </div>
    )
}

export default CartPage
