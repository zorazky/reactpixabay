import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import './App.css';


class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: '',
    cargando:false,
    totalPaginas: ''
  }

  consultarAPI = async () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=15941-6089299c03fb143b393fc700a&q=${termino}&per_page=30&page=${pagina}`;

    console.log(url);

    await fetch(url)
      .then(respuesta => {
        this.setState({
          cargando: true
        })
        return respuesta.json()
      })
      .then(resultado => {
        const totalPaginacion = Math.ceil(resultado.totalHits / 30);
        setTimeout(() => {
          this.setState({
            imagenes: resultado.hits,
            cargando: false,
            totalPaginas : totalPaginacion
          })
        }, 1000)
      })
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
    let { pagina }= this.state;
    const { totalPaginas } = this.state;

    if(pagina === totalPaginas) return null;

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
    const cargando = this.state.cargando;
    let resultado;

    if (cargando) {
      resultado = <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                  </div>
    } else {
      resultado = <Resultado 
                    imagenes={this.state.imagenes}
                    paginaAnterior={this.paginaAnterior}
                    paginaSiguiente={this.paginaSiguiente}
                    pagina={this.state.pagina}
                    totalPaginas={this.state.totalPaginas}
                  />
    }
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />
        </div>

        <div className="row justify-content-center">
          {resultado}
        </div>

      </div>
    );
  }
}

export default App;
