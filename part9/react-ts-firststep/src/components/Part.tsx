import { CoursePart } from './Content';

interface Props {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: Props) => {
  const returnPart = () => {
    switch (coursePart.kind) {
      case 'basic':
        return (
          <>
            <p>
              {coursePart.name} {coursePart.exerciseCount}
            </p>
            <p>{coursePart.description}</p>
          </>
        );
      case 'background':
        return (
          <>
            <p>
              {coursePart.name} {coursePart.exerciseCount}
            </p>
            <p>{coursePart.description}</p>
            <p>{coursePart.backgroundMaterial}</p>
          </>
        );
      case 'group':
        return (
          <>
            <p>
              {coursePart.name} {coursePart.exerciseCount}
            </p>
            <p>{coursePart.groupProjectCount}</p>
          </>
        );
      case 'special':
        return (
          <>
            <p>
              {coursePart.name} {coursePart.exerciseCount}
            </p>
            <p>
              {coursePart.requirements.map((rq, i) => (
                <span key={i}>{rq} </span>
              ))}
            </p>
          </>
        );
      default:
        return <p>Unknown type</p>;
    }
  };

  return returnPart();
};
export default Part;
