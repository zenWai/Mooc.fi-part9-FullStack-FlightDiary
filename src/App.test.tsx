import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import '@testing-library/jest-dom';

// Mock Axios module and default
vi.mock('axios', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: [] })),
    post: vi.fn(() => Promise.resolve({ data: {} })),
    CancelToken: {
      source: () => ({
        token: {},
        cancel: vi.fn(),
      }),
    },
  },
  get: vi.fn(() => Promise.resolve({ data: [] })),
  post: vi.fn(() => Promise.resolve({ data: {} })),
}));

describe('App', () => {

  it('renders correctly and shows loading message', async () => {

    (axios.get as vi.Mock).mockResolvedValue({ data: [] });
    render(<App />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('displays diary entries after loading', async () => {
    const mockDiaries = [
      { id: 1, date: '2023-01-01', weather: 'sunny', visibility: 'great', comment: 'Nice day' },
    ];
    (axios.get as vi.Mock).mockResolvedValue({ data: mockDiaries });

    render(<App />);
    await waitFor(() => expect(screen.getByText(/Nice day/i)).toBeInTheDocument());
  });

  it('adds a new diary entry via the form and updates the list', async () => {
    (axios.get as vi.Mock).mockResolvedValue({ data: [] });

    const newDiary = { id: 3, date: '2023-01-03', weather: 'cloudy', visibility: 'ok', comment: 'Very nice comment' };
    (axios.post as vi.Mock).mockResolvedValue({ data: newDiary });

    await waitFor(() => render(<App />));

    // Simulate filling the form fields
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-01-03' } });
    fireEvent.change(screen.getByLabelText(/weather/i), { target: { value: 'cloudy' } });
    fireEvent.change(screen.getByLabelText(/visibility/i), { target: { value: 'ok' } });
    fireEvent.change(screen.getByLabelText(/comment/i), { target: { value: 'Very nice comment' } });

    // Simulate form submission
    fireEvent.click(screen.getByText(/add entry/i));

    // Verify the new entry is added to the list
    await waitFor(() => expect(screen.getByText(/Very nice comment/i)).toBeInTheDocument());
  });

});