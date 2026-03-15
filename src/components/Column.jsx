import React from 'react';
import { Plus } from 'lucide-react';
import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';

const Column = ({ column, tasks, onAddTask, onTaskClick }) => {
  return (
    <div className="flex-1 min-w-[320px] bg-[#FAFAFA] rounded-2xl p-4 flex flex-col border border-[#FAFAFA]">
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <div 
            className="w-2 h-2 rounded-full" 
            style={{ backgroundColor: column.color }}
          />
          <h2 className="text-[#0D062D] font-bold text-sm">{column.title}</h2>
          <span className="w-5 h-5 rounded-full bg-[#E0E0E0]/50 text-[#625F6D] text-[10px] flex items-center justify-center font-bold">
            {tasks.length}
          </span>
        </div>
        <button 
          onClick={() => onAddTask(column.id)}
          className="w-5 h-5 rounded-md bg-[#5030E5]/5 flex items-center justify-center text-[#5030E5] hover:bg-[#5030E5]/10 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div 
        className="w-full h-0.5 mb-6" 
        style={{ backgroundColor: column.color, opacity: 0.6 }}
      />

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 transition-colors rounded-xl ${
              snapshot.isDraggingOver ? 'bg-[#5030E5]/5' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <Card 
                key={task.id} 
                task={task} 
                index={index} 
                onClick={() => onTaskClick(task.id)}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
