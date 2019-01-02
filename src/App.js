import React, { Component } from 'react';
import Buscador from './componentes/Buscador';


class App extends Component {

  state = {
    termino: ''
  }

  consultarAPI = () => {
    console.log('desde consultar API')
  }

  datosBusqueda = (termino) => {
      this.setState({
        termino
      }, () => {
        this.consultarAPI();
      })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>

      </div>
    );
  }
}

export default App;
