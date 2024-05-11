import { useState } from 'react'

const Button = ({ name, onClickHandler }) => <button onClick={onClickHandler}>{name}</button>

const Statistic = (props) => {
  const { good, neutral, bad } = { ...props }
  const total = good + bad + neutral
  const avarage = (good * 1 + bad * (-1) + neutral / total).toFixed(1)
  const positive = (good * 100 / total).toFixed(2)

  if (!total) return <p>no feedback given</p>
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="avarage" value={avarage} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  if (text === 'positive') {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Header = ({header}) => <h2>{header}</h2>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClickHandle = () => setGood(good + 1)
  const neutralClickHandle = () => setNeutral(neutral + 1)
  const badClickHandle = () => setBad(bad + 1)

  return (
    <div>
      <Header header="give feed back" />
      <Button name={'good'} onClickHandler={goodClickHandle} />
      <Button name={'neutral'} onClickHandler={neutralClickHandle} />
      <Button name={'bad'} onClickHandler={badClickHandle} />
      <Header header="statistics"/>
      <Statistic
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App