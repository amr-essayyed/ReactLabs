import App from './App.jsx';
import { BrowserRouter, Route } from "react-router";


import { createRoot } from 'react-dom/client'
import Cart from './components/Cart.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
