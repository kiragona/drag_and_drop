import React, {useMemo} from 'react'
import Task from './Task'

import {Droppable, Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const ColumnContainer = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  background: white;
  display: flex;
  flex-direction: column;
  
`
const ColumnTitle = styled.h3`
  padding: 8px;
`
const TaskListContainer = styled.div`
 padding: 8px;
 background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
 transition: background-color 0.2s ease;
 flex: 1 1 auto;
 min-height: 100px;
`


/*
  example of Droppable snapshot = {
     isDraggingOver: true.
     draggingOverWith: 'column-1'
  }

 */


const Column = ({column, tasks, isDropDisabled, index}) => {
  // Control where could be dropped by folowing Droppable props:
  //  1. by type property:  type={column.id === 'column-3' ? 'done' : 'active'} - enables drop only if start droppable has the same type as end droppable
  // 2. by isDropDisabled property: doesn't matter what type is

  // in this example e enforce that tasks can only move to the right of where they started

  const memoTasksList = useMemo(() => {
    return tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)
  }, [tasks])

  const TasksList = React.memo(({tasks}) => {
    return tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)
  })

  return (
    <Draggable draggableId={column.id} index={index}>
      {
        (provided) => (
          <ColumnContainer
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <ColumnTitle {...provided.dragHandleProps}>{column.title}</ColumnTitle>
            <Droppable droppableId={column.id} isDropDisabled={isDropDisabled} type='task'>
              {(provided, snapshot) => (
                <TaskListContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <TasksList tasks={tasks} />
                  {provided.placeholder}
                </TaskListContainer>
              )}
            </Droppable>
          </ColumnContainer>
        )
      }


    </Draggable>
  )
}
 //
export default Column


