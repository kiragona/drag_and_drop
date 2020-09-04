import React, {useState} from 'react';
import Column from './Column'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

// styles
import '@atlaskit/css-reset'
import styled from 'styled-components'
import './App.css';

import InitialData from './initial-data'

const Container = styled.div`
  display: flex;
`

const App = () => {
  const [initialData, setInitialData] = useState(InitialData)
  //see example-hooks - updating global styles while dragging
  const onDragStart = (start) => {
    document.body.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease'
    // const startColumnIndex = initialData.columnOrder.indexOf(start.source.droppableId)
  }

  const onDragUpdate = (update) => {
    const {destination} = update
    const opacity = destination ? destination.index / Object.keys(initialData.tasks).length : 0
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }

  const reorderTasksInTheSameColumn = (result) => {
    const {destination, source, draggableId} = result

    // now we need reorder the task inside the column
    const column = initialData.columns[source.droppableId]
    const newTaskIds = Array.from(column.taskIds); //new array in order not to mutate a data
    newTaskIds.splice(source.index, 1) //remove draggable task from array
    newTaskIds.splice(destination.index, 0, draggableId) //remove nothing, insert draggableId

    const newColumn = {...column, taskIds: newTaskIds}
    const columns = {...initialData.columns}
    columns[newColumn.id] = newColumn
    const newInitialData = {
      ...initialData,
      columns
    }
    setInitialData(newInitialData)
  }

  const reorderTasksBetweenColumns = result => {
    const {source, destination, draggableId} = result
    //moving from one list(column) to another
    const startColumn = initialData.columns[source.droppableId]
    const finishedColumn = initialData.columns[destination.droppableId]

    const startTaskIds = Array.from(startColumn.taskIds) //new array in order not to mutate a data
    startTaskIds.splice(source.index, 1) //remove draggable task from start column
    const updatedStartColumn = {...startColumn, taskIds: startTaskIds}

    const finishedTaskIds = Array.from(finishedColumn.taskIds); //new array in order not to mutate a data
    finishedTaskIds.splice(destination.index, 0, draggableId)
    const updatedFinishedColumn = {...finishedColumn, taskIds: finishedTaskIds}

    const columns = {...initialData.columns}
    columns[startColumn.id] = updatedStartColumn
    columns[finishedColumn.id] = updatedFinishedColumn
    const newInitialData = {
      ...initialData,
      columns
    }
    setInitialData(newInitialData)

  }

  const reorderTasks = result => {
    const {destination, source} = result
    if (!destination) {
      // was dropped outside
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // location of drop destination the same as source
      return
    }

    if (source.droppableId === destination.droppableId) {
      reorderTasksInTheSameColumn(result)
    } else {
      reorderTasksBetweenColumns(result)
    }
  }

  const reorderColumns = result => {
    const {source, destination, draggableId} = result

    const newColumnsOrder = Array.from(initialData.columnOrder)
    // remove from source.index
    newColumnsOrder.splice(source.index, 1)

    //insert to destination.index
    newColumnsOrder.splice(destination.index, 0, draggableId) //remove nothing, insert draggableId

    setInitialData({...initialData, columnOrder: newColumnsOrder})


  }

  const onDragEnd = (result) => {

    const {source, destination, type} = result
    if (!destination) return //was dropped outside

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // location of drop destination the same as source
      return
    }

    if (type === 'task') {
      reorderTasks(result)
    }

    if (type === 'column') {
      reorderColumns(result)
    }

  }

  return (
    <DragDropContext onDragStart={onDragStart}
                     onDragEnd={onDragEnd}>

      <Droppable
        droppableId='main-horizontal-container'
        direction='horizontal'
        type='column'
      >
        {(provided) => (
          <Container
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {initialData.columnOrder.map((columnId, index) => {
              const column = initialData.columns[columnId]
              const columnTasks = column.taskIds.map((taskId) => {
                return initialData.tasks[taskId]
              })

              const isDropDisabled = false// startColumnIndex >= index

              return <Column
                key={columnId}
                column={column}
                tasks={columnTasks}
                isDropDisabled={isDropDisabled}
                index={index}
              />
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default App;
