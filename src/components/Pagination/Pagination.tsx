import React, { useContext } from 'react';
import { AppContext } from '../../App';
import Button from '@mui/material/Button';

const Pagination: React.FC = () => {

    const { numberOfPages, currPageId, setCurrPageId, filterId, changeURL } = useContext(AppContext);

    const goToPrevPage = () => {
        setCurrPageId?.(prev => prev === 1 ? prev : prev - 1);
        changeURL?.(filterId, currPageId - 1);
    }

    const goToNextPage = () => {
        setCurrPageId?.(prev => prev === numberOfPages ? prev : prev + 1);
        changeURL?.(filterId, currPageId + 1);
    }

    return (
        <div className="pagination">
            <Button
                variant="contained"
                className="pagination__prev"
                onClick={goToPrevPage}
                disabled={currPageId === 1 || !currPageId ? true : false}
            >
                Prev
            </Button>
            <Button
                variant="contained"
                className="pagination__next"
                onClick={goToNextPage}
                disabled={currPageId === numberOfPages ? true : false}
            >
                Next
            </Button>
        </div>
    );
}

export default Pagination;