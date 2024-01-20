import { useState } from "react"

const Anecdote = ({anecdotes, selected, points}) => {
  return(
    <>
   <div>
   {anecdotes[selected]}
   <p>has {points} votes</p>
   </div> 

   </>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <div>
    <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const initPoints = Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints]= useState(initPoints)
  console.log(anecdotes.length-1)


  const nextAnecdote = ()  => setSelected(Math.ceil(Math.random()*anecdotes.length-1))
  const vote = ()  => {
    const newPoints = [...points]
    newPoints[selected]+=1
    setPoints(newPoints)

  } 

  console.log("points",points)
  console.log("max points ",Math.max(...points))

    // check what is the highest amount of votes
  const maxPoints =Math.max(...points)
  // get the index of that amount on the points list (array), as it is the same index on the anecdotes list
  const indexOfMaxVotes = points.indexOf(maxPoints)

  return (
    <>
    <h1>Anecdote of the day</h1>
<Anecdote anecdotes={anecdotes} selected={selected} points={points[selected]}/>
<Button handleClick={vote} text={"vote"}/>
<Button handleClick={nextAnecdote} text={"next anecdote"}/>
<h1>Anecdote with most votes</h1>
<Anecdote anecdotes={anecdotes} selected={indexOfMaxVotes} points={maxPoints}/>


    </>
  )
}

export default App
