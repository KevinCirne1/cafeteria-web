import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


const ClientesModal = ({ show, handleClose, saveCliente }) => {
    const [cliente, setCliente] = useState({
      nome: '',
      email: '',
      nascimento: '',
      cep: ''
    });
  
    const handleChange = (e) => {
      setCliente({ ...cliente, [e.target.name]: e.target.value });
    };

    const saveCliente = (clienteData) => {
        fetch('URL_DO_BACKEND/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clienteData)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Cliente adicionado:', data);
          handleClose();  
        })
        .catch(error => console.error('Error:', error));
      };
  

    const handleSubmit = (e) => {
      e.preventDefault();
      saveCliente(cliente);
      handleClose();
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" name="nome" required onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" name="email" required onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" name="nascimento" required onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CEP</Form.Label>
              <Form.Control type="text" name="cep" required onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Salvar Cliente
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  
  export default ClientesModal;
