const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  )
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

export default Content
