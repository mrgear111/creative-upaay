import React, { useState } from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onAdd, columnId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ columnId, title, description, priority, dueDate });
    setTitle('');
    setDescription('');
    setPriority('Low');
    setDueDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-[#EAEAEA]">
        <div className="p-6 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAFAFA]">
          <h2 className="text-xl font-bold text-[#0D062D]">Add New Task</h2>
          <button onClick={onClose} className="text-[#787486] hover:text-[#0D062D] p-1 rounded-full hover:bg-gray-100 transition-all">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#787486] uppercase tracking-wider">Task Title</label>
            <input
              autoFocus
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name..."
              className="w-full h-11 bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl px-4 text-[#0D062D] focus:outline-none focus:border-[#5030E5]/30 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-[#787486] uppercase tracking-wider">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What needs to be done?"
              rows={3}
              className="w-full bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl p-4 text-[#0D062D] focus:outline-none focus:border-[#5030E5]/30 resize-none text-sm"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-bold text-[#787486] uppercase tracking-wider">Priority</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full h-11 bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl px-4 text-[#0D062D] focus:outline-none focus:border-[#5030E5]/30 text-sm appearance-none"
              >
                <option value="Low">Low</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-[11px] font-bold text-[#787486] uppercase tracking-wider">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full h-11 bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl px-4 text-[#0D062D] focus:outline-none focus:border-[#5030E5]/30 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#5030E5] text-white rounded-xl font-bold text-sm shadow-md shadow-[#5030E5]/20 hover:bg-[#5030E5]/90 transition-all active:scale-[0.98] mt-2"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
