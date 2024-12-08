import { SyntheticEvent } from 'react';
import useField from '../hooks/useField';
import { useAddNewDiaryMutation } from '../redux/services/diaryApi';
import { NewDiaryEntry, Visibility, Weather } from '../types/types';

const NewDiary = () => {
  const [addNewDiary, { error, isLoading }] = useAddNewDiaryMutation();

  const date = useField('date');
  const visibility = useField('radio');
  const weather = useField('radio');
  const comment = useField('text');

  const handleOnSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const newDiary: NewDiaryEntry = {
        date: date.value,
        visibility: visibility.value as Visibility,
        weather: weather.value as Weather,
        comment: comment.value,
      };

      console.log(event);
      await addNewDiary(newDiary);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Add new diary</h1>

      {error && 'status' in error ? (
        <p style={{ color: 'red' }}>{JSON.stringify(error.data)}</p>
      ) : (
        <p>{error?.message}</p>
      )}

      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor='date'>date</label>
          <input id='date' {...date} />
        </div>
        <div>
          <span>visibility: </span>
          {Object.values(Visibility).map((val, id) => (
            <span key={id}>
              <input id={val} {...visibility} name='visibility' value={val} />
              <label htmlFor={val}>{val}</label>
            </span>
          ))}
        </div>
        <div>
          <span>weather: </span>
          {Object.values(Weather).map((val, id) => (
            <span key={id}>
              <input id={val} {...weather} name='weather' value={val} />
              <label htmlFor={val}>{val}</label>
            </span>
          ))}
        </div>
        <div>
          <label htmlFor='comment'>comment</label>
          <input id='comment' {...comment} />
        </div>
        <button type='submit' disabled={isLoading}>
          add
        </button>
      </form>
    </>
  );
};

export default NewDiary;
