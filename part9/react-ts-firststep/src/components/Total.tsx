interface Props {
  totalExercises: number;
}

const Total = ({ totalExercises }: Props) => {
  return <p>Total number of exercises {totalExercises}</p>;
};

export default Total;
