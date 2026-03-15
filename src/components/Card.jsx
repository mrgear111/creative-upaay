import React from 'react';
import { MessageSquare, Files, MoreHorizontal, Calendar } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

import { useToast } from './Toast';
import { cn } from '../utils/cn';

const priorityColors = {
  'Low': { bg: 'bg-[#dfa59e]/20', text: 'text-[#d58d49]', label: 'Low' },
  'High': { bg: 'bg-[#d8727d]/10', text: 'text-[#d8727d]', label: 'High' },
  'Completed': { bg: 'bg-[#83c29d]/20', text: 'text-[#68b266]', label: 'Completed' }
};

const Card = ({ task, index, onClick }) => {
  const { addToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const subtasks = task.subtasks || [];
  const totalSubtasks = subtasks.length;
  const completedSubtasks = subtasks.filter(s => s.completed).length;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
          className={cn(
            "bg-white p-5 rounded-2xl border border-[#FAFAFA] shadow-sm mb-5 group hover:border-[#5030E5]/10 transition-all cursor-pointer relative",
            snapshot.isDragging && "shadow-2xl border-[#5030E5]/20 scale-[1.02] rotate-2"
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <span className={cn(
              "px-2 py-1 rounded-[4px] text-[12px] font-bold",
              priorityColors[task.priority]?.bg,
              priorityColors[task.priority]?.text
            )}>
              {priorityColors[task.priority]?.label}
            </span>
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="text-[#BDBDBD] hover:text-[#0D062D] p-1 rounded-md hover:bg-gray-50 transition-all"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {isMenuOpen && (
                <div 
                  className="absolute top-full right-0 mt-1 w-32 bg-white rounded-xl shadow-xl border border-[#EAEAEA] z-50 overflow-hidden py-1 animate-in zoom-in-95 duration-100"
                  onMouseLeave={() => setIsMenuOpen(false)}
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToast('Edit task details'); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-[#787486] hover:bg-[#FAFAFA] hover:text-[#0D062D]"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToast('Task deleted'); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <h3 className="text-lg font-bold text-[#0D062D] mb-1">{task.title}</h3>
          
          {task.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {task.tags.map(tag => (
                <span key={tag} className="text-[9px] font-bold text-[#5030E5] bg-[#5030E5]/5 px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <p className="text-[#787486] text-[12px] mb-4 leading-relaxed">
            {task.description}
          </p>

          <div className="flex items-center justify-between mb-4">
            {totalSubtasks > 0 ? (
              <div className="flex-1 mr-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#787486]">Subtasks</span>
                  <span className="text-[10px] font-bold text-[#787486]">{completedSubtasks}/{totalSubtasks}</span>
                </div>
                <div className="w-full h-1 bg-[#F5F5F5] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#5030E5] transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            ) : <div className="flex-1" />}

            {task.dueDate && (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#FAFAFA] rounded-md border border-[#EAEAEA] text-[#787486]">
                <Calendar className="w-3 h-3" />
                <span className="text-[9px] font-bold">{new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#FAFAFA]">
            <div className="flex -space-x-1.5">
              {task.assignees.map((id, i) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/150?u=${id}`}
                  className="w-5 h-5 rounded-full border border-white object-cover"
                  alt="Assignee"
                />
              ))}
            </div>

            <div className="flex items-center gap-3 text-[#BDBDBD] text-[10px] font-medium">
              <div className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3" />
                <span>{task.comments}</span>
              </div>
              <div className="flex items-center gap-1">
                <Files className="w-3 h-3" />
                <span>{task.files}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
