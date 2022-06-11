import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Filter from './Filter';

test('handle input correctly', () => {
    const filter = render(<Filter />);
    const input = filter.getByTestId('filter__input');
    fireEvent.input(input, { target: { value: 'a1b2cd3' } });
    expect(input).toHaveValue('123');
});
