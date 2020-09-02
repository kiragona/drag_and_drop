import React from 'react'
import Task from './Task'

import {Droppable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  
`
const ColumnTitle = styled.h3`
  padding: 8px;
`
const TaskList = styled.div`
 padding: 8px;
 background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
 transition: background-color 0.2s ease;
 display : flex;
`


/*
  example of Droppable snapshot = {
     isDraggingOver: true.
     draggingOverWith: 'column-1'
  }

 */

const Column = ({column, tasks}) => {
   // Control where could be dropped by folowing Droppable props:
  //  1. by type property:  type={column.id === 'column-3' ? 'done' : 'active'} - enables drop only if start droppable has the same type as end droppable
  // 2. by isDropDisabled property: doesn't matter what type is

  // in this example e enforce that tasks can only move to the right of where they started
  return (
    <ColumnContainer>
      <ColumnTitle>{column.title}</ColumnTitle>
      <Droppable
        droppableId={column.id}
        direction='horizontal'
      >
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </ColumnContainer>
  )
}

export default Column


