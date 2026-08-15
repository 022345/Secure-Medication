import React, { useState, useEffect } from 'react';
import '../css/App.css';

const CART_API = 'https://gateway-eile.onrender.com/gateway/shoppingcartMRS/cart';

function Cart({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${CART_API}/${user?.id || 1}`);
        const data = await response.json();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error al obtener el carrito:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [user]);

  if (loading) return <p style={{ textAlign: 'center' }}>Cargando carrito...</p>;

  return (
    <div className="cart-container">
      <h2 style={{ marginBottom: '2rem' }}>Tu Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p className="no-results-box">No tienes medicamentos en tu carrito.</p>
      ) : (
        <div className="cards-grid">
          {cartItems.map((item) => (
            <div key={item.id} className="medicine-card">
              <div className="card-accent" />
              <h2 className="medicine-name">{item.name || item.medicineName}</h2>
              <p className="medicine-brand"><strong>Marca:</strong> {item.brand}</p>
              <p className="medicine-description">{item.description}</p>
              <div className="technical-info">
                <span><strong>Cantidad:</strong> {item.quantity || 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;