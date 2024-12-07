import Part from './Part';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDesc {
  kind: 'basic';
}

interface CoursePartBackground extends CoursePartBaseWithDesc {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartSpecial extends CoursePartBaseWithDesc {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

interface Props {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: Props) => {
  return (
    <>
      {courseParts.map((course, index) => (
        <Part key={index} coursePart={course} />
      ))}
    </>
  );
};

export default Content;
