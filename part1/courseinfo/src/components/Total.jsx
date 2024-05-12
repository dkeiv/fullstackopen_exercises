const Total = ({ course }) => {
  const { parts } = { ...course }
  const total = parts.reduce(
    (acc, currentPart) => acc + currentPart.exercises,
    0 // on the first call acc = initialValue = 0
  )
  return <h4>Number of exercises {total}</h4>
}

export default Total
