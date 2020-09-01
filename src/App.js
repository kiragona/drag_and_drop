import React, {useCallback, useState} from 'react';
import Column from './Column'
import {DragDropContext} from 'react-beautiful-dnd'
import '@atlaskit/css-reset'
import './App.css';

import InitialData from './initial-data'

const App = () => {
  const [initialData, setInitialData] = useState(InitialData)
  const [startColumnIndex, setStartColumnIndex] = useState(-1)

  //see example-hooks - updating global styles while dragging
  const onDragStart = (start) => {
    document.body.color = 'orange';
    document.body.style.transition = 'background-color 0.2s ease'
    const startColumnIndex = initialData.columnOrder.indexOf(start.source.droppableId)
    setStartColumnIndex(startColumnIndex)
  }

  const onDragUpdate = (update) => {
    const {destination} = update
    const opacity = destination ? destination.index / Object.keys(initialData.tasks).length : 0
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }

  const reorderInTheSameColumn = (result) => {
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

  const onDragEnd = (result) => {
    // document.body.color = 'inherit'
    // document.body.style.backgroundColor = 'inherit'
    /* Example of result object
      result : {
        draggableId: 'task-1'
        type: TYPE,
        reason: 'DROP',
        source: {
            droppableId: 'column-1',
            index: 0
            },
        destination: {
             droppableId: 'column-1',
             index: 1
          } // can be null, if we drop outside the droppable
      }
     */

    const {destination, source, draggableId} = result

    //clear startColumnIndex when the drag ends
    setStartColumnIndex(-1)

    if (!destination) {
      // was dropped outside
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      // location of drop destination the same as source
      return
    }

    if (source.droppableId === destination.droppableId) {
      reorderInTheSameColumn(result)
    } else {
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
  }

  return (
    <DragDropContext onDragStart={onDragStart}
                     onDragEnd={onDragEnd}>
      <div className='columns-container'>
      {initialData.columnOrder.map((columnId, index) => {
        const column = initialData.columns[columnId]
        const columnTasks = column.taskIds.map((taskId) => {
          return initialData.tasks[taskId]
        })

        const isDropDisabled = startColumnIndex >= index

        return <Column
          key={columnId}
          column={column}
          tasks={columnTasks}
          isDropDisabled={isDropDisabled}
        />
      })
      }
      </div>
    </DragDropContext>
  )
}
export default App;
