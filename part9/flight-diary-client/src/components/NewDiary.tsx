import { SyntheticEvent } from 'react';
import useField from '../hooks/useField';
import { useAddNewDiaryMutation } from '../redux/services/diaryApi';
import { NewDiaryEntry, Visibility, Weather } from '../types/types';

const NewDiary = () => {
  const [addNewDiary, { data, error, isLoading }] = useAddNewDiaryMutation();

  const date = useField('text');
  const visibility = useField('text');
  const weather = useField('text');
  const comment = useField('text');

  if (isLoading) {
    return <p>adding new diary...</p>;
  }

  if (error) {
    console.log(error);
  }

  const handleOnSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const newDiary: NewDiaryEntry = {
        date: date.value,
        visibility: visibility.value as Visibility,
        weather: weather.value as Weather,
        comment: comment.value,
      };

      await addNewDiary(newDiary);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Add new diary</h1>
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor='date'>date</label>
          <input id='date' {...date} />
        </div>
        <div>
          <label htmlFor='visibility'>visibility</label>
          <input id='visibility' {...visibility} />
        </div>
        <div>
          <label htmlFor='weather'>weather</label>
          <input id='weather' {...weather} />
        </div>
        <div>
          <label htmlFor='comment'>comment</label>
          <input id='comment' {...comment} />
        </div>
        <button type='submit'>add</button>
      </form>
    </>
  );
};

export default NewDiary;
