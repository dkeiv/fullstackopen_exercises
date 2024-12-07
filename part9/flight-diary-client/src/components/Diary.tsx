import { DiaryEntry } from '../types/types';

interface Props {
  diaryEntry: DiaryEntry;
}

const Diary = ({ diaryEntry }: Props) => {
  return (
    <div>
      <h3>{diaryEntry.date}:</h3>
      <p>visibility: {diaryEntry.visibility}</p>
      <p>weather: {diaryEntry.weather}</p>
      {/* <p>comment: {diaryEntry.comment ? diaryEntry.comment : 'no comment'}</p> */}
    </div>
  );
};

export default Diary;
