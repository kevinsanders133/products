import React, { useState, useEffect, createContext } from 'react';
import Filter from './components/Filter/Filter';
import ProductList from './components/ProductList/ProductList';
import Pagination from './components/Pagination/Pagination';
import IAppContext from './interfaces/IAppContext';
import IProduct from './interfaces/IProduct';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

const PRODUCTS_API = "https://reqres.in/api/products";

export const AppContext = createContext<IAppContext>({
  products: null,
  filterId: null,
  setFilterId: null,
  numberOfPages: null,
  setNumberOfPages: null,
  currPageId: NaN,
  setCurrPageId: null,
  changeURL: null,
  changePaginationParams: null
});

const App: React.FC = () => {

  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [filterId, setFilterId] = useState<number | null>(null);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currPageId, setCurrPageId] = useState<number>(1);

  useEffect(() => {
    const loadData = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const filter = urlParams.get('filterId');
      const page = urlParams.get('page');
      setFilterId(filter === null ? filter : Number(filter));
      setCurrPageId(page === null ? 1 : Number(page));

      const res = await fetch(PRODUCTS_API);
      const parsedRes = await res.json();
      let data: IProduct[] = [];
      for (let i = 0; i < parsedRes.total; i++) {
        const product = await fetch(`${PRODUCTS_API}/${i + 1}`);
        const parsedProduct = await product.json();
        data.push(parsedProduct.data);
      }
      setProducts(data);
      let currNumberOfProducts;
      if (filter === null) {
        currNumberOfProducts = data?.length;
      } else {
        currNumberOfProducts = data?.filter(p => p.id === Number(filter)).length;
      }
      if (currNumberOfProducts !== undefined){
        setNumberOfPages?.(currNumberOfProducts === 0 ? 1 : Math.ceil(currNumberOfProducts / 5));
      }
    }
    loadData();
  }, []);

  const changeURL = (filterId: number | null, page: number | null) => {
    const nextURL = `http://localhost:3000/?filterId=${filterId}&page=${page}`;
    const nextTitle = 'Title';
    const nextState = { additionalInformation: 'Updated the URL' };
    window.history.pushState(nextState, nextTitle, nextURL);
    window.history.replaceState(nextState, nextTitle, nextURL);
  }

  const changePaginationParams = (newFilterId: number | null) => {
    let currNumberOfProducts;
    if (newFilterId === null) {
        currNumberOfProducts = products?.length;
    } else {
        currNumberOfProducts = products?.filter(p => p.id === newFilterId).length;
    }
    if (currNumberOfProducts !== undefined){
        setNumberOfPages?.(currNumberOfProducts === 0 ? 1 : Math.ceil(currNumberOfProducts / 5));
    }
    setFilterId?.(newFilterId);
    setCurrPageId?.(1);
    changeURL?.(newFilterId, 1);
  }

  return (
    <AppContext.Provider value={{
        products,
        filterId,
        setFilterId,
        numberOfPages,
        setNumberOfPages,
        currPageId,
        setCurrPageId,
        changeURL,
        changePaginationParams
      }}>
      <CssBaseline>
        <div className="App">
          <main className="main">
            <Filter />
            <ProductList />
            <Pagination />
          </main>
        </div>
      </CssBaseline>
    </AppContext.Provider>
  );
}

export default App;
