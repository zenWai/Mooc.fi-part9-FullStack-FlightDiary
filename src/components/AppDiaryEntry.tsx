import {DiaryEntry} from '../types/DiaryTypes';
import {FC} from "react";

interface Props {
  diaries: DiaryEntry[];
}

const AppDiaryEntry: FC<Props> = ({diaries}) => {
  return (
    <div>
      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>Date: {diary.date}</h3>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          <p>Comment: {diary.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default AppDiaryEntry;