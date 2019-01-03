import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';


class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  consultarAPI = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=15941-6089299c03fb143b393fc700a&q=${termino}&per_page=30&page=${pagina}`;

    console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes: resultado.hits}))
  }

  datosBusqueda = (termino) => {
      this.setState({
        termino : termino,
        pagina : 1
      }, () => {
        this.consultarAPI();
      })
  }

  paginaAnterior = () => {
    let pagina= this.state.pagina;
    if(pagina === 1) return null;
    pagina--;
    this.setState({pagina}, () => {
      this.consultarAPI();
      this.scroll();
    })
    console.log(pagina);
  }

  paginaSiguiente = () => {
    let pagina= this.state.pagina;
    pagina++;
    this.setState({pagina}, () => {
      this.consultarAPI();
      this.scroll();
    })
    console.log(pagina);
  }

  scroll = () => {
    const elemento = document.querySelector('#resultado');
    elemento.scrollIntoView('smooth', 'start');
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

        <div className="row justify-content-center">
          <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>

      </div>
    );
  }
}

export default App;
