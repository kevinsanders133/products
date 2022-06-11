import { Dispatch, SetStateAction } from "react";
import IProduct from "./IProduct";

export default interface IAppContext {
    products: IProduct[] | null;
    filterId: number | null;
    setFilterId: Dispatch<SetStateAction<number | null>> | null;
    numberOfPages: number | null;
    setNumberOfPages: Dispatch<SetStateAction<number>> | null;
    currPageId: number;
    setCurrPageId: Dispatch<SetStateAction<number>> | null;
    changeURL: ((page: number | null, filterId: number | null) => void) | null;
    changePaginationParams: ((newFilterId: number | null) => void) | null;
}