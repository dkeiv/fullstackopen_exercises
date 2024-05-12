import Header from './Header'
import Content from './Content'
import Total from './Total'

const Courses = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </>
  )
}

const Course = ({ course, id }) => {
  return (
    <div id={id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

export default Courses
