import React from 'react';
import { Search, Calendar, HelpCircle, Bell, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/tasksSlice';

import { useToast } from './Toast';
import { cn } from '../utils/cn';

const Header = () => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const { searchQuery, tasks } = useSelector(state => state.tasks);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  const remindersCount = Object.values(tasks).filter(task => {
    if (!task.dueDate || task.priority === 'Completed') return false;
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate <= today;
  }).length;

  return (
    <header className="h-[80px] border-b border-[#EAEAEA] px-12 flex items-center justify-between bg-white sticky top-0 z-[100] w-full">
      {/* Search Bar */}
      <div className="flex-1 max-w-[417px]">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#BDBDBD] group-focus-within:text-[#5030E5] transition-all" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search for anything..."
            className="w-full h-[40px] bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl pl-12 pr-4 text-sm focus:outline-none focus:border-[#5030E5]/30 transition-all font-medium"
          />
        </div>
      </div>

      {/* Utilities & Profile */}
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-6 text-[#787486]">
          <button 
            onClick={() => addToast('Calendar view opened')}
            className="p-2 hover:bg-gray-50 rounded-xl transition-all active:scale-95"
          >
            <Calendar className="w-6 h-6" />
          </button>
          <button 
            onClick={() => addToast('Help & Support center')}
            className="p-2 hover:bg-gray-50 rounded-xl transition-all active:scale-95"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
          <button 
            onClick={() => addToast(remindersCount > 0 ? `You have ${remindersCount} reminders!` : 'No new notifications')}
            className="p-2 hover:bg-gray-50 rounded-xl transition-all active:scale-95 relative"
          >
            <Bell className="w-6 h-6" />
            {remindersCount > 0 && (
              <div className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-[#D8727D] rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold px-1 shadow-sm">
                {remindersCount}
              </div>
            )}
          </button>
        </div>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-2xl transition-all active:scale-95"
          >
            <div className="text-right hidden md:block">
              <p className="font-bold text-base text-[#0D062D]">Palak Jain</p>
              <p className="text-sm text-[#787486]">Rajasthan, India</p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <ChevronDown className={cn("w-4 h-4 text-[#787486] transition-transform", isProfileOpen && "rotate-180")} />
          </button>
          
          {isProfileOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#EAEAEA] overflow-hidden py-1 animate-in zoom-in-95 duration-100">
              {['Profile', 'Settings', 'Logout'].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setIsProfileOpen(false);
                    addToast(`${option} clicked`);
                  }}
                  className="w-full text-left px-4 py-2 text-sm font-bold text-[#787486] hover:bg-[#FAFAFA] hover:text-[#0D062D]"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
