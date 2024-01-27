const Header = ( {course}) => {
    return (
      <div>
        <h1>{course.name}</h1>
      </div>
  
    )
  }
  
  const Part = ({name, exercises}) => {
    return (
      <div>
        <li>
          {name} {exercises}
        </li> 
      </div>
  
    )
  }
  
  const Content = ({props}) => {
    return (
      <div>
        <ul>
            {props.parts.map(part => <Part name={part.name} exercises={part.exercises} key={part.id}/>)}
        </ul>
      </div>
  
    )
  }
  
  const Total = ({props}) => {
    console.log(props.parts)


    let total = props.parts.reduce((exercises, part) => {
 
        return exercises + part.exercises
    }, 0)

    console.log("total ", total)


    
    return (
      <div>
     <p>Total of  {total} exercises</p>
      </div>
  
    )
  }
  

  const Course = ({course}) =>{
    return (
        <>
        <Header course={course}/>
        <Content props={course}/>
        <Total props={course}/>
   
        </>
    
    )
  }

  export default Course