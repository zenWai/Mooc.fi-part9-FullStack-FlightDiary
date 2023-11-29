import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App';
import '@testing-library/jest-dom';
import {act} from "react-dom/test-utils";

// Mock Axios module and default
vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    CancelToken: {
      source: () => ({
        token: {},
        cancel: vi.fn(),
      }),
    },
  },
  get: vi.fn(),
  post: vi.fn(),
}));

describe('App', () => {

  it('renders correctly and shows loading message', async () => {
    // Create a promise that we can resolve later
    let resolvePromise: (arg0: { data: never[]; }) => void;
    const promise = new Promise(resolve => {
      resolvePromise = resolve;
    });

    vi.mocked(axios.get).mockResolvedValue(promise)

    // Render the component (it should be in the loading state)
    await act(async () => {
      render(<App />);
    });
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();

    act(() => {
      resolvePromise({ data: [] });
    });

    // Wait for the component to update
    await waitFor(() => {
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    });
  });

  it('displays diary entries after loading', async () => {
    const mockDiaries = [
      { id: 1, date: '2023-01-01', weather: 'sunny', visibility: 'great', comment: 'Nice day' },
    ];
    vi.mocked(axios.get).mockResolvedValue({ data: mockDiaries })

    await act(async () => {
      render(<App />);
    });
    await waitFor(() => expect(screen.getByText(/Nice day/i)).toBeInTheDocument());
  });

  it('adds a new diary entry via the form and updates the list', async () => {
    vi.mocked(axios.get).mockResolvedValue({ data: [] })

    const newDiary = { id: 3, date: '2023-01-03', weather: 'cloudy', visibility: 'ok', comment: 'Very nice comment' };
    vi.mocked(axios.post).mockResolvedValue({ data: newDiary })

    await act(async () => {
      render(<App />);
    });
    act(() => {
      // Simulate filling the form fields
      fireEvent.change(screen.getByLabelText(/date/i), {target: {value: '2023-01-03'}});
      fireEvent.change(screen.getByLabelText(/weather/i), {target: {value: 'cloudy'}});
      fireEvent.change(screen.getByLabelText(/visibility/i), {target: {value: 'ok'}});
      fireEvent.change(screen.getByLabelText(/comment/i), {target: {value: 'Very nice comment'}});

      // Simulate form submission
      fireEvent.click(screen.getByText(/add entry/i));
    });

    // Verify the new entry is added to the list
    await waitFor(() => expect(screen.getByText(/Very nice comment/i)).toBeInTheDocument());
  });

});