import { useGetAllDiariesQuery } from '../redux/services/diaryApi';
import Diary from './Diary';

const DiaryList = () => {
  const { data, error, isLoading } = useGetAllDiariesQuery();

  if (isLoading) {
    return <p>getting data...</p>;
  }

  if (error) {
    if ('status' in error) {
      // error is instance of FetchBaseQueryError
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);
      return <p>fetchBase: {errMsg}</p>;
    }
    // error is instance of SerializedError
    return <p>{error.message}</p>;
  }
  if (data) {
    return (
      <>
        <h1>Diray entries:</h1>
        {data.map((d, i) => (
          <Diary key={i} diaryEntry={d} />
        ))}
      </>
    );
  }
  return null;
};

export default DiaryList;
