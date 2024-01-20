import { useState } from "react"

const Title = ({text}) => {
  return (
   <div>
    <h1>{text}</h1>
   </div> 
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({text, number}) => {
  return(
    <tr>
  <td>{text}</td>
  <td>{number}</td> 
  </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {

  if(all === 0){
    return(
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
    <StatisticsLine text='good' number={good}/>
    <StatisticsLine text='neutral' number={neutral}/>
   <StatisticsLine text='bad' number={bad}/>
     <StatisticsLine text='all' number={all}/>
    <StatisticsLine text='average' number={average}/>
    <StatisticsLine text='positive' number={positive + " %"} />
    </tbody>
    </table>
    
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
 
  const text = 'give feedback'
  const average = (good-bad)/total
  const positive = good*100/total

  const handleClickGood= () => { 
    const updatedGood = good +1
    setGood(updatedGood)
    setTotal(updatedGood+neutral+bad)
   
  
  }
  const handleClickNeutral= () => { 
    const updatedNeutral = neutral +1
    setNeutral(updatedNeutral)
    setTotal(updatedNeutral+good+bad)
 
  
  }
  const handleClickBad= () => { 
    const updatedBad = bad +1
    setBad(updatedBad)
    setTotal(updatedBad+neutral+good)
 
  
  }


  return (
    <>
    <Title text={text}/>
    <Button text='good' handleClick={handleClickGood}/>     
    <Button text='neutral'handleClick={handleClickNeutral}/> 
    <Button text='bad'handleClick={handleClickBad}/> 
    <Title text='statistics'/>
    <Statistics good={good} bad={bad} neutral ={neutral} all={total} average={average} positive={positive} />


    </>
  )
}

export default App
