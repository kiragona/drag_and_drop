import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

import styled from 'styled-components'


const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props =>
  props.draggingOver
    ? 'lightgreen'
    : props.isDragging
    ? 'lightgrey'
    : 'white'

};
  
  display: flex;
`
/*
  example of Draggable snapshot = {
     isDragging: true.
     draggingOver: 'column-1'
  }

 */
const Task = ({task, index}) => {

  const isDragDisabled = false// task.id === 'task-1'

  // draggingOver in Draggable snapshot - id , What Droppable (if any) the Draggable is currently over
  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          draggingOver={snapshot.draggingOver}
          isDragDisabled={isDragDisabled}
        >
          {task.content}

        </Container>
      )}
    </Draggable>
  )
}

export default Task
