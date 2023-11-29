import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppDiaryEntry from './AppDiaryEntry';
import { DiaryEntry, Weather, Visibility } from '../types/DiaryTypes';

describe('AppDiaryEntry', () => {
  it('renders diary entries', () => {
    const diaries: DiaryEntry[] = [
      { id: 1, date: '2023-01-01', weather: Weather.Sunny, visibility: Visibility.Great, comment: 'Nice day' },
      { id: 2, date: '2023-01-02', weather: Weather.Rainy, visibility: Visibility.Poor, comment: 'Bad weather' },
    ];

    const { getByText } = render(<AppDiaryEntry diaries={diaries} />);

    expect(getByText('Date: 2023-01-01')).toBeTruthy();
    expect(getByText('Weather: sunny')).toBeTruthy();
    expect(getByText('Visibility: great')).toBeTruthy();
    expect(getByText('Comment: Nice day')).toBeTruthy();
    expect(getByText('Date: 2023-01-02')).toBeTruthy();
  });
});