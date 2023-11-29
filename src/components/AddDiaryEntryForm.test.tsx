import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import AddDiaryEntryForm from './AddDiaryEntryForm';
import {Visibility, Weather} from '../types/DiaryTypes';
import '@testing-library/jest-dom'

describe('AddDiaryEntryForm', () => {

  it('renders correctly', () => {
    render(<AddDiaryEntryForm addEntry={() => {}} />);
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/weather/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/visibility/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('updates input values on change', () => {
    render(<AddDiaryEntryForm addEntry={() => {}} />);

    const dateInput = screen.getByLabelText(/date/i) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });
    expect(dateInput.value).toBe('2023-01-01');

    const weatherSelect = screen.getByLabelText(/weather/i) as HTMLInputElement;
    fireEvent.change(weatherSelect, { target: { value: Weather.Rainy } });
    expect(weatherSelect.value).toBe(Weather.Rainy);

    const visibilitySelect = screen.getByLabelText(/visibility/i) as HTMLInputElement;
    fireEvent.change(visibilitySelect, { target: { value: Visibility.Poor } });
    expect(visibilitySelect.value).toBe(Visibility.Poor);

    const comment = screen.getByLabelText(/comment/i) as HTMLInputElement;
    fireEvent.change(comment, { target: { value: 'Very nice comment' } });
    expect(comment.value).toBe('Very nice comment');

  });

  it('calls addEntry with the new entry on form submission', () => {
    const mockAddEntry = vi.fn();
    render(<AddDiaryEntryForm addEntry={mockAddEntry} />);

    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2023-01-01' } });

    const weatherSelect = screen.getByLabelText(/weather/i);
    fireEvent.change(weatherSelect, { target: { value: Weather.Rainy } });

    const visibilitySelect = screen.getByLabelText(/visibility/i);
    fireEvent.change(visibilitySelect, { target: { value: Visibility.Ok } });

    const comment = screen.getByLabelText(/comment/i);
    // empty string or not
    fireEvent.change(comment, { target: { value: '' } });

    fireEvent.click(screen.getByRole('button'));
    expect(mockAddEntry).toHaveBeenCalledWith({
      date: '2023-01-01',
      weather: Weather.Rainy,
      visibility: Visibility.Ok,
      comment: '',
    });

  });

});