import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import BookingForm from './BookingForm';

// Helper function to get tomorrow's date in YYYY-MM-DD format
const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
};

describe('BookingForm', () => {
    beforeEach(() => {
        render(<BookingForm />);
    });

    // Test 1: Component renders correctly
    test('renders booking form with all required fields', () => {
        expect(screen.getByRole('heading', { name: /reserve your table at little lemon/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/select date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/party size/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/preferred time/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /reserve table/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /clear form/i })).toBeInTheDocument();
    });

    // Test 2: Form validation - required fields
    test('shows validation errors for empty required fields', async () => {
        const user = userEvent;
        const submitButton = screen.getByRole('button', { name: /reserve table/i });
        
        await user.click(submitButton);
        
        expect(screen.getByText(/date is required/i)).toBeInTheDocument();
        expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
        expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    });

    // Test 3: Email validation
    test('validates email format', async () => {
        const user = userEvent;
        const emailInput = screen.getByLabelText(/email/i);
        
        await user.type(emailInput, 'invalid-email');
        
        expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
        
        await user.clear(emailInput);
        await user.type(emailInput, 'test@example.com');
        
        expect(screen.queryByText(/please enter a valid email address/i)).not.toBeInTheDocument();
    });

    // Test 4: Phone validation
    test('validates phone number', async () => {
        const user = userEvent;
        const phoneInput = screen.getByLabelText(/phone number/i);
        
        // Test short number
        await user.type(phoneInput, '123');
        expect(screen.getByText(/phone number must be at least 10 digits/i)).toBeInTheDocument();
        
        // Test valid UK number
        await user.clear(phoneInput);
        await user.type(phoneInput, '07940076109');
        expect(screen.queryByText(/please enter a valid phone number/i)).not.toBeInTheDocument();
    });

    // Test 5: Name validation
    test('validates name input', async () => {
        const user = userEvent;
        const nameInput = screen.getByLabelText(/full name/i);
        
        // Test single character
        await user.type(nameInput, 'A');
        expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
        
        // Test valid name
        await user.clear(nameInput);
        await user.type(nameInput, 'John Doe');
        expect(screen.queryByText(/name must be at least 2 characters/i)).not.toBeInTheDocument();
    });

    // Test 6: Date validation
    test('validates date selection', async () => {
        const user = userEvent;
        const dateInput = screen.getByLabelText(/select date/i);
        
        // Test past date
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];
        
        await user.type(dateInput, yesterdayString);
        expect(screen.getByText(/please select a future date/i)).toBeInTheDocument();
        
        // Test valid future date
        await user.clear(dateInput);
        await user.type(dateInput, getTomorrowDate());
        expect(screen.queryByText(/please select a future date/i)).not.toBeInTheDocument();
    });

    // Test 7: Sunday validation
    test('prevents Sunday reservations', async () => {
        const user = userEvent;
        const dateInput = screen.getByLabelText(/select date/i);
        
        // Find next Sunday
        const nextSunday = new Date();
        nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));
        const sundayString = nextSunday.toISOString().split('T')[0];
        
        await user.type(dateInput, sundayString);
        expect(screen.getByText(/sorry, we're closed on sundays/i)).toBeInTheDocument();
    });

    // Test 8: Time selection
    test('allows time selection', async () => {
        const user = userEvent;
        const timeSelect = screen.getByLabelText(/preferred time/i);
        
        await user.selectOptions(timeSelect, '19:00');
        expect(timeSelect.value).toBe('19:00');
    });

    // Test 9: Party size selection
    test('allows party size selection', async () => {
        const user = userEvent;
        const partySizeSelect = screen.getByLabelText(/party size/i);
        
        await user.selectOptions(partySizeSelect, '4');
        expect(partySizeSelect.value).toBe('4');
    });

    // Test 10: Form submission with valid data
    test('submits form with valid data', async () => {
        const user = userEvent;
        
        // Fill out form with valid data
        await user.type(screen.getByLabelText(/select date/i), getTomorrowDate());
        await user.selectOptions(screen.getByLabelText(/preferred time/i), '19:00');
        await user.selectOptions(screen.getByLabelText(/party size/i), '4');
        await user.type(screen.getByLabelText(/full name/i), 'John Doe');
        await user.type(screen.getByLabelText(/email/i), 'john@example.com');
        await user.type(screen.getByLabelText(/phone number/i), '07940076109');
        
        const submitButton = screen.getByRole('button', { name: /reserve table/i });
        await user.click(submitButton);
        
        // Check if form shows submitting state
        expect(screen.getByText(/submitting.../i)).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
    });

    // Test 11: Clear form functionality
    test('clears form when clear button is clicked', async () => {
        const user = userEvent;
        
        // Fill out some fields
        await user.type(screen.getByLabelText(/full name/i), 'John Doe');
        await user.type(screen.getByLabelText(/email/i), 'john@example.com');
        
        // Click clear button
        const clearButton = screen.getByRole('button', { name: /clear form/i });
        await user.click(clearButton);
        
        // Check if fields are cleared
        expect(screen.getByLabelText(/full name/i).value).toBe('');
        expect(screen.getByLabelText(/email/i).value).toBe('');
    });

    // Test 12: Debug panel shows form data
    test('displays current form data in debug panel', async () => {
        const user = userEvent;
        
        await user.type(screen.getByLabelText(/full name/i), 'Jane Smith');
        
        expect(screen.getByText(/debug-current form data/i)).toBeInTheDocument();
        expect(screen.getByText(/"customerName": "Jane Smith"/)).toBeInTheDocument();
    });

    // Test 13: Accessibility - ARIA labels
    test('has proper ARIA labels and attributes', () => {
        const dateInput = screen.getByLabelText(/select date/i);
        const emailInput = screen.getByLabelText(/email/i);
        const nameInput = screen.getByLabelText(/full name/i);
        
        expect(dateInput).toHaveAttribute('aria-required', 'true');
        expect(emailInput).toHaveAttribute('aria-required', 'true');
        expect(nameInput).toHaveAttribute('aria-required', 'true');
    });

    // Test 14: Error messages have proper ARIA attributes
    test('error messages have proper ARIA attributes', async () => {
        const user = userEvent;
        const emailInput = screen.getByLabelText(/email/i);
        
        await user.type(emailInput, 'invalid');
        
        const errorMessage = screen.getByText(/please enter a valid email address/i);
        expect(errorMessage).toHaveAttribute('role', 'alert');
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    });

    // Test 15: Special requests field
    test('allows special requests input', async () => {
        const user = userEvent;
        const specialRequestsField = screen.getByLabelText(/special request/i);
        
        await user.type(specialRequestsField, 'Window seat please');
        expect(specialRequestsField.value).toBe('Window seat please');
    });
});