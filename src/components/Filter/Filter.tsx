import React, { useContext } from 'react';
import { AppContext } from '../../App';

const Filter: React.FC = () => {

    const { changePaginationParams } = useContext(AppContext);

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const key = (e as unknown as InputEvent).data;
        if (isNaN(Number(key))) e.preventDefault();
        changePaginationParams?.(Number(input.value));
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        let newFilterId = null;
        if (input.value !== '') {
            newFilterId = Number(input.value);
        }
        changePaginationParams?.(newFilterId);
    }

    return (
        <div className="filter">
            <label htmlFor="filter__input" className="filter__label">Filter by id: </label>
            <input
                type="text"
                data-testid="filter__input"
                id="filter__input"
                className="filter__input"
                onBeforeInput={handleInput}
                onChange={handleChange}
            />
        </div>
    );
}

export default Filter;