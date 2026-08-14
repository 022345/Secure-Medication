import React, { useState, useEffect } from 'react';

const CART_API_URL = 'https://gateway-eile.onrender.com/gateway/shoppingcartMRS/cart';

function Cart({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = user?.id || 1;
    fetch(`${CART_API_URL}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCartItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener el carrito:', err);
        setLoading(false);
      });
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