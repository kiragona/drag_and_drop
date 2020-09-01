import React from 'react'
import {Draggable} from 'react-beautiful-dnd'

import styled from 'styled-components'


const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 2px;
  background-color: ${props =>
  props.isDragDisabled
    ? 'lightgrey'
    : props.isDragging
    ? 'lightgreen'
    : 'white'

};
  
  display: flex;
`

// drag handle - provides ability to drag only from this element and not whole task
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

  const isDragDisabled = task.id === 'task-1'
  return (
    <Draggable draggableId={task.id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          <Handle
            {...provided.dragHandleProps}
          />
          {task.content}

        </Container>
      )}
    </Draggable>
  )
}

export default Task
