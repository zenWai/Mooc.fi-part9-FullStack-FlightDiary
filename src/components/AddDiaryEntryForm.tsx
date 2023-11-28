import {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Weather, Visibility, DiaryEntry} from '../types/DiaryTypes';

interface Props {
  addEntry: (newEntry: Omit<DiaryEntry, 'id'>) => void;
}

const AddDiaryEntryForm: FC<Props> = ({addEntry}) => {
  const [newEntry, setNewEntry] = useState({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  });

  const renderSelectOptions = (enumObject: { [s: string]: string }) => {
    return Object.values(enumObject).map(value => (
      <option key={value} value={value}>
        {value}
      </option>
    ));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setNewEntry({...newEntry, [name]: value});
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    addEntry(newEntry);
    // Reset form Fields
    setNewEntry({
      date: '',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: '',
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date: </label>
          <input id="date" type="date" name="date" value={newEntry.date} onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor="weather">Weather: </label>
          <select id="weather" name="weather" value={newEntry.weather} onChange={handleInputChange}>
            {renderSelectOptions(Weather)}
          </select>
        </div>
        <div>
          <label htmlFor="visibility">Visibility: </label>
          <select id="visibility" name="visibility" value={newEntry.visibility} onChange={handleInputChange}>
            {renderSelectOptions(Visibility)}
          </select>
        </div>
        <div>
          <label htmlFor="comment">Comment: </label>
          <input id="comment" type="text" name="comment" value={newEntry.comment} onChange={handleInputChange}/>
        </div>
        <button type="submit" style={{marginTop: 8}}>Add Entry</button>
      </form>
    </div>
  );
};

export default AddDiaryEntryForm;