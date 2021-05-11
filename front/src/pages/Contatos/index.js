import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import api from '../../services/api';

import { Container, Title } from './styles';
import { useHistory } from 'react-router';

function Contatos() {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const [modalContatoForm, setModalContatoForm] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);
  const [modalEditForm, setModalEditForm] = useState(false);
  const [novoContato, setNovoContato] = useState({
    nome: '',
    telefone: ''
  });
  const [contatoHaDeletar, setContatoHaDeletar] = useState({
    id:'',
    nome: '',
    telefone: ''
  });

  const [contatoHaEditarEditado, setContatoHaEditarEditado] = useState({
    id: '',
    nome: '',
    telefone: ''
  });

  const [contatos, setContatos] = React.useState();

  useEffect(() => {
    api.get('/contato').then(response => {
      setContatos(response.data);
    });
  }, [contatos])

const deslogar = useCallback(() => {
  localStorage.removeItem('token');
  history.push('/');
}, [history])

const criarContato = useCallback(() => {
  api.post('/contato', novoContato, {
    headers: {
      'Auth-Token': token
    }
  });
  setModalContatoForm(!modalContatoForm)
  setNovoContato({nome:'', telefone: ''})
}, [modalContatoForm, novoContato, token])

const editarContato = useCallback(() => {
  api.put(`/contato/${contatoHaEditarEditado.id}`, contatoHaEditarEditado, {
    headers: {
      'Auth-Token': token
    }
  });

  setModalEditForm(!modalEditForm)
}, [contatoHaEditarEditado, modalEditForm, token])

const contatoDeletar = useCallback(() => {
  api.delete(`/contato/${contatoHaDeletar.id}`,{
    headers: {
      'Auth-Token': token
    }
  });
  // let contatosCopia = [...contatos];
  // let contatoFiltrado = contatosCopia.filter(contato => contato.nome !== contatoHaDeletar.nome && contato.telefone !== contatoHaDeletar.telefone)
  // setContatos(contatoFiltrado);
  setModalDeletar(!modalDeletar)
}, [contatoHaDeletar.id, modalDeletar, token])

const handleModalDeletar = useCallback((contato) => {
  setContatoHaDeletar(contato);
  setModalDeletar(!modalDeletar)
}, [modalDeletar])

const handleModalEditar = useCallback((contato) => {
  setContatoHaEditarEditado(contato)
  setModalEditForm(!modalEditForm)
}, [modalEditForm])

const handleChange = useCallback((e) => {
  setNovoContato({ nome: e.target.value, telefone: novoContato.telefone })
}, [novoContato.telefone])

const handleChangeTelefone = useCallback((e) => {
  setNovoContato({ nome: novoContato.nome, telefone: e.target.value })
}, [novoContato.nome])

const handleChangeNomeEdit = useCallback((e) => {
  setContatoHaEditarEditado({id: contatoHaEditarEditado.id, nome: e.target.value, telefone: contatoHaEditarEditado.telefone })
}, [contatoHaEditarEditado])

const handleChangeTelefoneEdit = useCallback((e) => {
  setContatoHaEditarEditado({ id: contatoHaEditarEditado.id, nome: contatoHaEditarEditado.nome, telefone: e.target.value })
}, [contatoHaEditarEditado])


return (
  <Container>

    <Modal show={modalContatoForm} onHide={() => { setModalContatoForm(!modalContatoForm) }}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Contato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNome">
            <Form.Label>Nome:</Form.Label>
            <Form.Control type="text" onChange={handleChange} value={novoContato.nome} />
          </Form.Group>

          <Form.Group controlId="formTelefone">
            <Form.Label>Telefone:</Form.Label>
            <Form.Control type="text" onChange={handleChangeTelefone} value={novoContato.telefone} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { setModalContatoForm(!modalContatoForm) }}>
          Cancelar
          </Button>
        <Button variant="primary" onClick={criarContato}>
          Criar
          </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={modalDeletar} onHide={() => { setModalDeletar(!modalDeletar) }}>
      <Modal.Header closeButton>
        <Modal.Title>Deletar contato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Deseja excluir o contato: {contatoHaDeletar.nome}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { setModalDeletar(!modalDeletar) }}>
          Cancelar
          </Button>
        <Button variant="danger" onClick={contatoDeletar}>
          Deletar
          </Button>
      </Modal.Footer>

    </Modal>

    <Modal show={modalEditForm} onHide={() => { setModalEditForm(!modalEditForm) }}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Contato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNome">
            <Form.Label>Nome:</Form.Label>
            <Form.Control type="text" onChange={handleChangeNomeEdit} value={contatoHaEditarEditado.nome} />
          </Form.Group>

          <Form.Group controlId="formTelefone">
            <Form.Label>Telefone:</Form.Label>
            <Form.Control type="text" onChange={handleChangeTelefoneEdit} value={contatoHaEditarEditado.telefone} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { setModalEditForm(!modalEditForm) }}>
          Cancelar
          </Button>
        <Button variant="primary" onClick={editarContato}>
          Editar
          </Button>
      </Modal.Footer>
    </Modal>


    <header>
      <nav className="navbar navbar-light bg-light">
        <span className="navbar-brand mb-0 h1 nav-titulo">Agenda</span>
        <Button style={{marginRight: '2px'}} variant="primary" onClick={() => setModalContatoForm(!modalContatoForm)}>
          Criar contato
             </Button>
        <Button variant="warning" onClick={deslogar}>
          Deslogar
             </Button>
      </nav>
    </header>



    <section>

      <div className="container main-section">
        <Title>Contatos</Title>


        {contatos && contatos.map((contato) => (
          <div key={contato.id} className="card shadow-sm bg-white rounded contato">
            <div className="card-body">
              <h3 className="card-title contato-titulo">{contato.nome}</h3>
              <h4 className="card-title">{contato.telefone}</h4>
              <Button variant="secondary" onClick={() => handleModalEditar(contato)}>
                Editar contato
                </Button>
              <Button variant="danger" onClick={() => handleModalDeletar(contato)}>
                Apagar contato
                </Button>

            </div>
          </div>
        )
        )}
      </div>
    </section>

  </Container>
);
}

export default Contatos;
