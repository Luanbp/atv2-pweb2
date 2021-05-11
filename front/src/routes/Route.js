import React from 'react';
import {Route, Redirect} from 'react-router-dom';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const token = localStorage.getItem('token');
  const signed = !!token;

  if(!signed && isPrivate){
    return <Redirect to="/" />;
  }

  if(signed && !isPrivate){
    return <Redirect to="/contatos"/>;
  }
  return  <Route {...rest} component={Component}/>;
}