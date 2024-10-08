import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={<HomePage />}
                />
                <Route
                    path='/products'
                    element={<ProductPage />}
                />
                <Route
                    path='/cart'
                    element={<CartPage />}
                />
            </Routes>
        </Router>
    )
}

export default App
