import React, { Component } from 'react';
import Imagen from './Imagen';
import Navegacion from './Navegacion';

class Resultado extends Component {

    mostrarImagenes = () => {
        const imagenes = this.props.imagenes;
        

        if (imagenes.length === 0 ) return null;

        return (
            <React.Fragment>
                <div className="col-12 p-5 row">
                    {this.props.imagenes.map( imagen => (
                        <Imagen 
                            key={imagen.id}
                            imagen={imagen}
                        />
                    ))}
                </div>
                <Navegacion />
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                {this.mostrarImagenes()}
            </React.Fragment>
        )
    }
}

export default Resultado;