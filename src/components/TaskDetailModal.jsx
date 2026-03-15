import React, { useState } from 'react';
import { X, Plus, CheckCircle2, Circle, Clock, Tag, Activity, Calendar } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleSubtask, addSubtask, updateTaskTags, updateTaskDueDate } from '../store/tasksSlice';
import { cn } from '../utils/cn';

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const [newSubtask, setNewSubtask] = useState('');
  const [newTag, setNewTag] = useState('');

  if (!isOpen || !task) return null;

  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      dispatch(addSubtask({ taskId: task.id, text: newSubtask.trim() }));
      setNewSubtask('');
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !task.tags.includes(newTag.trim())) {
      dispatch(updateTaskTags({ taskId: task.id, tags: [...task.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    dispatch(updateTaskTags({ taskId: task.id, tags: task.tags.filter(t => t !== tagToRemove) }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAFAFA]">
          <div>
            <span className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 inline-block",
                task.priority === 'High' && "bg-[#D8727D]/5 text-[#D8727D]",
                task.priority === 'Low' && "bg-[#D58D49]/5 text-[#D58D49]",
                task.priority === 'Completed' && "bg-[#68B266]/5 text-[#68B266]"
            )}>
                {task.priority}
            </span>
            <h2 className="text-2xl font-bold text-[#0D062D] leading-tight">{task.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#787486]">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Due Date & Tags Section */}
          <div className="grid grid-cols-2 gap-8">
            <section>
              <div className="flex items-center gap-2 mb-4 text-[#0D062D]">
                <Calendar className="w-5 h-5" />
                <h3 className="font-bold">Due Date</h3>
              </div>
              <input
                type="date"
                value={task.dueDate || ''}
                onChange={(e) => dispatch(updateTaskDueDate({ taskId: task.id, dueDate: e.target.value }))}
                className="w-full h-10 px-4 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#5030E5]/30"
              />
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4 text-[#0D062D]">
                <Tag className="w-5 h-5" />
                <h3 className="font-bold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {task.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-[#5030E5]/5 text-[#5030E5] rounded-full text-xs font-semibold flex items-center gap-2 group">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <form onSubmit={handleAddTag} className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag"
                  className="flex-1 h-10 px-4 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#5030E5]/30"
                />
                <button type="submit" className="px-3 bg-white border border-[#EAEAEA] rounded-lg hover:bg-gray-50 text-[#5030E5]">
                  <Plus className="w-4 h-4" />
                </button>
              </form>
            </section>
          </div>

          {/* Subtasks Section */}
          <section>
            <div className="flex items-center justify-between mb-4 text-[#0D062D]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold">Subtasks</h3>
              </div>
              <span className="text-xs font-bold text-[#787486]">
                {task.subtasks?.filter(s => s.completed).length || 0}/{task.subtasks?.length || 0}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {task.subtasks?.map(subtask => (
                <div 
                  key={subtask.id}
                  onClick={() => dispatch(toggleSubtask({ taskId: task.id, subtaskId: subtask.id }))}
                  className="flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-xl cursor-pointer hover:bg-gray-50 transition-colors group"
                >
                  {subtask.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-[#68B266]" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#BDBDBD] group-hover:text-[#5030E5]" />
                  )}
                  <span className={cn(
                    "text-sm font-medium",
                    subtask.completed ? "text-[#BDBDBD] line-through" : "text-[#0D062D]"
                  )}>
                    {subtask.text}
                  </span>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddSubtask} className="flex gap-2">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 h-10 px-4 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#5030E5]/30"
              />
              <button type="submit" className="px-4 bg-white border border-[#EAEAEA] rounded-lg hover:bg-gray-50 text-[#5030E5]">
                <Plus className="w-5 h-5" />
              </button>
            </form>
          </section>

          {/* Activity Log */}
          <section>
            <div className="flex items-center gap-2 mb-4 text-[#0D062D]">
              <Activity className="w-5 h-5" />
              <h3 className="font-bold">Activity Log</h3>
            </div>
            <div className="space-y-4">
              {task.activities?.map(activity => (
                <div key={activity.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E0E0E0]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#787486]" />
                  </div>
                  <div>
                    <p className="text-sm text-[#0D062D]">{activity.content}</p>
                    <p className="text-[10px] text-[#BDBDBD]">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
