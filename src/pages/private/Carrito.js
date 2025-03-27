import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { colors } from '../../styles/styles';

const Carrito = () => {
  const [carritoItems, setCarritoItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Simular datos de carrito (luego reemplazarás con datos reales)
  useEffect(() => {
    // Aquí podrías obtener los datos del carrito desde localStorage o una API
    const mockCarrito = [
      {
        _id: "1",
        title: "Automatización Inteligente",
        price: 199.99,
        quantity: 2,
        image: "https://st2.depositphotos.com/2001755/8564/i/450/depositphotos_85647140-stock-photo-beautiful-landscape-with-birds.jpg"
      },
      {
        _id: "2", 
        title: "Sensor de Movimiento Inteligente", 
        price: 89.99,
        quantity: 1,
        image: "https://st2.depositphotos.com/2001755/8564/i/450/depositphotos_85647140-stock-photo-beautiful-landscape-with-birds.jpg"
      }
    ];

    setCarritoItems(mockCarrito);
    calcularTotal(mockCarrito);
  }, []);

  const calcularTotal = (items) => {
    const nuevoTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    setTotal(nuevoTotal);
  };

  const incrementarCantidad = (id) => {
    const nuevoCarrito = carritoItems.map(item => 
      item._id === id 
        ? {...item, quantity: item.quantity + 1} 
        : item
    );
    setCarritoItems(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  const decrementarCantidad = (id) => {
    const nuevoCarrito = carritoItems.map(item => 
      item._id === id && item.quantity > 1
        ? {...item, quantity: item.quantity - 1} 
        : item
    ).filter(item => item.quantity > 0);
    setCarritoItems(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  const eliminarItem = (id) => {
    const nuevoCarrito = carritoItems.filter(item => item._id !== id);
    setCarritoItems(nuevoCarrito);
    calcularTotal(nuevoCarrito);
  };

  const realizarCompra = () => {
    // Lógica para procesar la compra
    alert('Compra realizada con éxito');
    setCarritoItems([]);
    setTotal(0);
  };

  return (
    <Container className="mt-4">
      <h2 style={{color: colors.primaryDark}} className="mb-4">Mi Carrito</h2>
      
      {carritoItems.length === 0 ? (
        <Alert variant="info">
          Tu carrito está vacío
        </Alert>
      ) : (
        <>
          {carritoItems.map((item) => (
            <Card key={item._id} className="mb-3">
              <Card.Body className="d-flex align-items-center">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{width: '100px', height: '100px', objectFit: 'cover', marginRight: '20px'}} 
                />
                <div className="flex-grow-1">
                  <h5>{item.title}</h5>
                  <p>Precio: ${item.price.toFixed(2)}</p>
                  <div className="d-flex align-items-center">
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={() => decrementarCantidad(item._id)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button 
                      variant="outline-secondary" 
                      size="sm" 
                      onClick={() => incrementarCantidad(item._id)}
                    >
                      +
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm" 
                      className="ms-3"
                      onClick={() => eliminarItem(item._id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
                <div>
                  <strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}
                </div>
              </Card.Body>
            </Card>
          ))}
          
          <Card className="mt-4">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <h4>Total: ${total.toFixed(2)}</h4>
              <Button 
                style={{
                  backgroundColor: colors.primaryDark,
                  borderColor: colors.primaryDark
                }}
                onClick={realizarCompra}
              >
                Realizar Compra
              </Button>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
};

export default Carrito;