import React, { useState } from 'react';
import { Filter, Calendar, Share2, Users, List, Grid, Edit3, Link2, PlusSquare, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterPriority } from '../store/tasksSlice';

import { useToast } from './Toast';

const ProjectHeader = () => {
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const filterPriority = useSelector(state => state.tasks.filterPriority);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [view, setView] = useState('grid');

  const priorities = ['All', 'Low', 'High', 'Completed'];

  const handleInvite = () => {
    addToast('Invite link copied to clipboard!');
  };

  const handleShare = () => {
    addToast('Board link shared successfully!');
  };

  return (
    <div className="px-12 py-10">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <h1 className="text-[46px] font-bold text-[#0D062D] leading-tight">Mobile App</h1>
          <div className="flex items-center gap-2 mt-4 ml-2">
            <button 
              onClick={() => addToast('Edit project details (Premium feature)', 'success')}
              className="p-1.5 rounded-lg bg-[#5030E5]/5 text-[#5030E5] hover:bg-[#5030E5]/10 transition-all active:scale-95"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => addToast('Public link generated!', 'success')}
              className="p-1.5 rounded-lg bg-[#5030E5]/5 text-[#5030E5] hover:bg-[#5030E5]/10 transition-all active:scale-95"
            >
              <Link2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleInvite}
            className="flex items-center gap-2 text-[#5030E5] font-bold hover:bg-[#5030E5]/5 px-4 py-2 rounded-xl transition-all active:scale-95"
          >
            <PlusSquare className="w-5 h-5" />
            <span>Invite</span>
          </button>
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/150?u=${i + 10}`}
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                alt="Member"
              />
            ))}
            <div className="w-10 h-10 rounded-full bg-[#fce4e4] border-2 border-white flex items-center justify-center text-[#D25B68] text-xs font-bold shadow-sm">
              +2
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2 bg-white border border-[#EAEAEA] rounded-xl text-[#787486] hover:bg-[#FAFAFA] transition-all text-xs font-bold ${isFilterOpen ? 'border-[#5030E5]' : ''}`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter: {filterPriority}</span>
              <ChevronDown className={`w-3.5 h-3.5 ml-0.5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#EAEAEA] z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                {priorities.map(p => (
                  <button
                    key={p}
                    onClick={() => {
                      dispatch(setFilterPriority(p));
                      setIsFilterOpen(false);
                      addToast(`Filtering by ${p}`);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors ${
                      filterPriority === p ? 'bg-[#5030E5]/5 text-[#5030E5]' : 'text-[#787486] hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => addToast('Today highlighted')}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#EAEAEA] rounded-xl text-[#787486] hover:bg-[#FAFAFA] transition-all text-xs font-bold"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Today</span>
            <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-[#BDBDBD]" />
          </button>
        </div>

        <div className="flex items-center gap-4">
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#EAEAEA] rounded-xl text-[#787486] hover:bg-[#FAFAFA] transition-all text-xs font-bold"
            >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
            </button>
            <div className="w-[1px] h-6 bg-[#EAEAEA] mx-1" />
            <div className="flex items-center gap-2 bg-[#FAFAFA] p-1 rounded-xl border border-[#EAEAEA]">
                <button 
                  onClick={() => setView('grid')}
                  className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-[#5030E5] text-white shadow-md shadow-[#5030E5]/20' : 'text-[#BDBDBD] hover:text-[#787486]'}`}
                >
                    <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-[#5030E5] text-white shadow-md shadow-[#5030E5]/20' : 'text-[#BDBDBD] hover:text-[#787486]'}`}
                >
                    <List className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
