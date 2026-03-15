import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from '@hello-pangea/dnd';
import { moveTask, addTask } from '../store/tasksSlice';
import Column from './Column';
import TaskModal from './TaskModal';
import TaskDetailModal from './TaskDetailModal';

const Board = () => {
  const { columns, tasks, columnOrder, filterPriority, searchQuery } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const onDragEnd = (result) => {
    dispatch(moveTask(result));
  };

  const handleOpenModal = (columnId) => {
    setActiveColumn(columnId);
    setModalOpen(true);
  };

  const handleOpenDetailModal = (taskId) => {
    setSelectedTaskId(taskId);
    setDetailModalOpen(true);
  };

  const handleAddTask = (taskData) => {
    dispatch(addTask(taskData));
  };

  return (
    <div className="px-12 pb-12">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-8 overflow-x-auto pb-4 custom-scrollbar">
          {columnOrder.map((columnId) => {
            const column = columns[columnId];
            let columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

            // Apply priority filter
            if (filterPriority !== 'All') {
              columnTasks = columnTasks.filter(task => task.priority === filterPriority);
            }

            // Apply search filter
            if (searchQuery) {
              const query = searchQuery.toLowerCase();
              columnTasks = columnTasks.filter(task => 
                task.title.toLowerCase().includes(query) || 
                task.description.toLowerCase().includes(query)
              );
            }

            return (
              <Column
                key={column.id}
                column={column}
                tasks={columnTasks}
                onAddTask={handleOpenModal}
                onTaskClick={handleOpenDetailModal}
              />
            );
          })}
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddTask}
        columnId={activeColumn}
      />

      <TaskDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        task={tasks[selectedTaskId]}
      />
    </div>
  );
};

export default Board;
