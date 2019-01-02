import React, { Component } from 'react';
import Buscador from './componentes/Buscador';


class App extends Component {

  state = {
    termino: '',
    imagenes: []
  }

  consultarAPI = () => {
    const termino = this.state.termino;
    const url = `https://pixabay.com/api/?key=15941-6089299c03fb143b393fc700a&q=${termino}`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes: resultado.hits}))
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
