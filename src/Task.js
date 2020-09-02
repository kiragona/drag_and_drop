import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

import styled from 'styled-components'


const Container = styled.div`
  border: 3px solid lightgrey;
  padding: 8px;
  margin-right: 8px;
  border-radius: 50%;
  background-color: ${props => props.isDragging ? 'lightgreen' : 'white'};
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:focus {
    outline: none;
    border-color: red;
  }
  
`

// drag handle - provides ability to drag only from this element and not whole draggable container
const Handle = styled.div`
     width: 20px;
     height: 20px;
     background-color: orange;
     border-radius: 4px;
     margin-right: 8px;
     
     
`
/*
  example of Draggable snapshot = {
     isDragging: true.
     draggingOver: 'column-1'
  }

 */
const Task = ({task, index}) => {

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content[0]}

        </Container>
      )}
    </Draggable>
  )
}

export default Task
