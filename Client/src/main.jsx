const originalSetItem = localStorage.setItem;
localStorage.setItem = function () {
  const event = new Event("localStorageChange");
  originalSetItem.apply(this, arguments);
  window.dispatchEvent(event);
};


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider.jsx'
import { AuthProvider } from "./context/AuthProvider.jsx"
import { ProductProvider } from './context/ProductProvider.jsx'
import { CartProvider } from './context/CartProvider.jsx'
import UserOrderProvider from './context/UserOrderProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <ThemeProvider>
            <CartProvider>
              <UserOrderProvider>
                <App />
              </UserOrderProvider>
            </CartProvider>
          </ThemeProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
