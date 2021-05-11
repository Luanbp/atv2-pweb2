import React from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Contatos from '../pages/Contatos';

export default function Routes(){
  return(
      <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/contatos" component={Contatos} isPrivate/>
      </Switch>
      </BrowserRouter>
  );
}