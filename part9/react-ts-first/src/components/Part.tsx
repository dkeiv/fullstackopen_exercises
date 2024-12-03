import { CoursePart } from './Content';
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case 'basic':
      return (
        <div>
          <p>
            {course.name}: {course.exerciseCount} exercises
          </p>
          <p>{course.description}</p>
        </div>
      );
    case 'group':
      return (
        <div>
          <p>
            {course.name}: {course.exerciseCount} exercises
          </p>
          <p>{course.groupProjectCount} project</p>
        </div>
      );
    case 'background':
      return (
        <div>
          <p>
            {course.name}: {course.exerciseCount} exercises
          </p>
          <p>{course.backgroundMaterial}</p>
        </div>
      );

    case 'special':
      return (
        <div>
          <p>
            {course.name}: {course.exerciseCount} exercises
          </p>
          <p>{course.description}</p>
          <p>required skill: {course.requirements.join(', ')}</p>
        </div>
      );

    default:
      assertNever(course);
      return <p>Error</p>;
  }
};
export default Part;
