interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: 'background';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground;

interface Props {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: Props) => {
  return (
    <>
      {courseParts.map((course: CoursePart, index: number) => (
        <p key={index}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
