import React, {useEffect, useState} from 'react';
import {DiaryEntry} from './types/DiaryTypes';
import AddDiaryEntryForm from "./components/AddDiaryEntryForm";
import axios from "axios";
import AppDiaryEntry from "./components/AppDiaryEntry";

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_DIARIES_URL = 'http://localhost:3003/api/diaries'

  const sortDiaryEntriesByDate = (diaryEntries: DiaryEntry[]) => {
    return diaryEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchDiaries = async () => {
      setError('');
      setIsLoading(true);
      try {
        const response = await axios.get(API_DIARIES_URL, {cancelToken: source.token});
        const sortedDiaryEntries = sortDiaryEntriesByDate(response.data)
        setDiaries(sortedDiaryEntries);
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(`Failed to fetch diaries.`);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiaries();

    return () => {
      source.cancel("Component unmounted, request canceled.");
    };

  }, []);

  const addEntry = async (newEntry: Omit<DiaryEntry, 'id'>) => {
    setError('');
    try {
      const response = await axios.post(API_DIARIES_URL, newEntry);
      const updatedDiaryEntries = [...diaries, response.data];
      const sortedDiaryEntries = sortDiaryEntriesByDate(updatedDiaryEntries);
      setDiaries(sortedDiaryEntries);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Error: ${error.response.data || 'An unknown error occurred.'}`);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div>
      <h1>Diaries</h1>
      {isLoading ? <p>Loading...</p> : (
        <>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <AddDiaryEntryForm addEntry={addEntry}/>
          <AppDiaryEntry diaries={diaries}/>
        </>
      )}
    </div>
  );
};

export default App;