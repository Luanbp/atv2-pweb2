import React, { useCallback, useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Container, Title } from './styles';
import api from '../../services/api';
import { useHistory } from 'react-router';

function Login(){
  const formRef = useRef(null);
  const [usuario, setUsuario] = useState({email:'', senha:''})
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data) => {
      data.preventDefault()
      try{
        const token = await api.post('/user/login', {email: usuario.email, password: usuario.senha});
        localStorage.setItem('token', token.data.token);
        history.push('/contatos');
      } catch(err){
        console.log(err)
      }
    },
    [history, usuario],
  );

  const handleChange = useCallback((e) => {
    setUsuario({ email: e.target.value, senha: usuario.senha })
  }, [usuario.senha])

  const handleChangePass = useCallback((e) => {
    setUsuario({ email: usuario.email, senha: e.target.value })
  }, [usuario])


return (
<Container>
<section>

<div className="container main-section">
  <Title>Login</Title>
  <Form ref={formRef} onSubmit={handleSubmit}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control value={usuario.email} onChange={handleChange} type="email" placeholder="Digite seu email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Senha</Form.Label>
    <Form.Control value={usuario.senha} onChange={handleChangePass}  type="password" placeholder="Senha" />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Entrar
  </Button>
</Form>

  
</div>
</section>
    </Container>
  )
}

export default Login;