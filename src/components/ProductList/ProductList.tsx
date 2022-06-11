import React, { useContext } from 'react';
import Product from '../Product/Product';
import { AppContext } from '../../App';

const ProductList: React.FC = () => {

    const { products, filterId, currPageId } = useContext(AppContext);
    const startIndex = currPageId ? (currPageId - 1) * 5 : 1;

    return (
        <ul className="products-list">
            {
            filterId
            ?
            (products?.filter(p => p.id === filterId))
            ?.slice(startIndex, startIndex + 5)
            ?.map(p => <Product key={p.id} {...p} />)
            :
            products
            ?.slice(startIndex, startIndex + 5)
            ?.map(p => <Product key={p.id} {...p} />)
            }
        </ul>
    );
}

export default ProductList;