import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom"
import Button from './Button';

describe('Button Component', () => {
    test('renders button with children', () => {
        render(<Button>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    test('calls onClick prop when clicked', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click Me</Button>);
        fireEvent.click(screen.getByText('Click Me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('is disabled when disabled prop is true', () => {
        render(<Button disabled>Click Me</Button>);
        expect(screen.getByText('Click Me')).toBeDisabled();
    });

    test('has correct type attribute', () => {
        render(<Button type="submit">Submit</Button>);
        expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
    });
});