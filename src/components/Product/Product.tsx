import React from 'react';
import IProduct from '../../interfaces/IProduct';

const Product: React.FC<IProduct> = ({id, year, name, color}) => {
  return (
    <div className="product-list__item" style={{backgroundColor: color}}>
        {id}, {name}, {year}
    </div>
  );
}

export default Product;