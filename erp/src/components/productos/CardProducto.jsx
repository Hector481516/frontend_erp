import './CardProducto.css'
import { PATH_IMAGEN_ZAPATOS } from '../../config/env'
function ProductCard({ product }) {
    return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={`${PATH_IMAGEN_ZAPATOS}${product.imagen}`}
          alt={product.modelo}
          className="product-image"
        />

        <span className="product-category">
          {product.clasificacion}
        </span>
      </div>

      <div className="product-content">
        <div className="product-header">
          <div>
            <p className="product-key">
              {product.clave}
            </p>

            <h3 className="product-title">
              {product.modelo}
            </h3>

            <p className="product-brand">
              {product.marca} · {product.color}
            </p>
          </div>
        </div>

        <div className="sizes-section">
          <p className="section-label">
            Tallas disponibles
          </p>

          <div className="sizes-container">
            {product.tallas.map((talla) => (
              <div
                key={talla.talla}
                className={`size-chip ${
                  talla.stock <= 0 ? 'size-chip-empty' : ''
                }`}
              >
                <span>{talla.talla}</span>

                <small>
                  {talla.cantidad}
                </small>
              </div>
            ))}
          </div>
        </div>

        <div className="product-footer">
          <div>
            <p className="section-label">
              Inventario total
            </p>

            <h4 className="inventory-total">
              {product.cantidad_total} piezas
            </h4>
          </div>

          <button className="details-button">
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard