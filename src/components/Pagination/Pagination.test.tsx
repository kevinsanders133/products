import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filter from '../Filter/Filter';
import Pagination from '../Pagination/Pagination';

test('disables buttons correctly', () => {
    const filter = render(<Filter />);
    const pagination = render(<Pagination />);
    const input = filter.getByTestId('filter__input') as HTMLInputElement;
    fireEvent.input(input, { target: { value: '9' } });
    expect(pagination.getByText('Prev')).toBeDisabled();
    expect(pagination.getByText('Next')).toBeDisabled();
});