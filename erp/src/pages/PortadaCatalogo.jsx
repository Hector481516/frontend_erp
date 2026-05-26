import { PATH_IMAGEN_ZAPATOS } from '../config/env'
function PortadaCatalogo() {

    return (

        <div className="portada-catalogo">

            <div className="portada-overlay">

                <h1>
                    Catálogo
                </h1>

                <div className="logo-wrapper">

                    <img
                        src={`${PATH_IMAGEN_ZAPATOS}logo-dh.jpg`}
                        className="portada-logo"
                    />

                </div>
                <div className='portada-lema'>
                    <h3>
                        Moda · Calidad · Estilo
                    </h3>
                </div>

                <div className="portada-contacto">

                    <span>
                        228 324 5086
                    </span>
                    <span>
                        228 400 0365
                    </span>

                </div>


            </div>

        </div>

    )

}
export default PortadaCatalogo