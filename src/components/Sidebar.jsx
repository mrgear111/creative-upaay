import React from 'react';
import { 
  Home, 
  MessageSquare, 
  CheckSquare, 
  Users, 
  Settings, 
  PlusSquare, 
  MoreHorizontal,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../utils/cn';

const menuItems = [
  { icon: Home, label: 'Home' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: CheckSquare, label: 'Tasks' },
  { icon: Users, label: 'Members' },
  { icon: Settings, label: 'Settings' },
];

const projects = [
  { label: 'Mobile App', color: '#7AC555', active: true },
  { label: 'Website Redesign', color: '#FFA500' },
  { label: 'Design System', color: '#E4CCFD' },
  { label: 'Wireframes', color: '#76A5EA' },
];

import { useToast } from './Toast';

const Sidebar = () => {
  const { addToast } = useToast();
  const [activeMenu, setActiveMenu] = React.useState('Tasks');
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <aside className={cn(
      "border-r border-[#EAEAEA] h-screen flex flex-col bg-white sticky top-0 transition-all duration-300 overflow-y-auto",
      collapsed ? "w-[80px]" : "w-[250px]"
    )}>
      {/* Sidebar Header */}
      <div className="p-6 flex items-center justify-between border-b border-[#EAEAEA]">
        {!collapsed && (
          <div className="flex items-center gap-2 animate-in fade-in duration-300">
            <div className="w-6 h-6 bg-[#5030E5] rounded-md flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-[#5030E5]/20">
              <div className="w-2 h-2 rounded-full border border-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0D062D]">Project M.</span>
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-[#787486] p-1 hover:bg-gray-100 rounded-lg transition-all mx-auto"
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform duration-300", collapsed && "rotate-180")} />
        </button>
      </div>

      {/* Main Menu */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveMenu(item.label)}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative",
              activeMenu === item.label 
                ? "bg-[#5030E5]/5 text-[#0D062D] font-bold" 
                : "text-[#787486] hover:bg-gray-50 hover:text-[#0D062D]"
            )}
          >
            <item.icon className={cn(
              "w-6 h-6 transition-colors",
              activeMenu === item.label ? "text-[#5030E5]" : "group-hover:text-[#5030E5]"
            )} />
            {!collapsed && <span className="text-base">{item.label}</span>}
            {activeMenu === item.label && !collapsed && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#5030E5] rounded-l-full shadow-lg shadow-[#5030E5]/20" />
            )}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 mt-4 border-t border-[#EAEAEA]">
        {!collapsed && (
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-[10px] font-bold text-[#787486] uppercase tracking-[0.1em]">My Projects</span>
            <button 
              onClick={() => addToast('Create new project (Coming Soon)', 'success')}
              className="text-[#787486] hover:text-[#5030E5] hover:bg-[#5030E5]/5 p-1 rounded transition-all"
            >
              <PlusSquare className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="space-y-2">
          {projects.map((project) => (
            <button
              key={project.label}
              onClick={() => !project.active && addToast(`Switched to ${project.label}`)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group",
                project.active ? "bg-[#5030E5]/10" : "hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2.5 h-2.5 rounded-full shadow-sm"
                  style={{ backgroundColor: project.color }}
                />
                {!collapsed && (
                  <span className={cn(
                    "font-bold text-sm",
                    project.active ? "text-[#0D062D]" : "text-[#787486]"
                  )}>
                    {project.label}
                  </span>
                )}
              </div>
              {project.active && !collapsed && (
                <MoreHorizontal className="w-4 h-4 text-[#0D062D]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Thoughts Time Card */}
      {!collapsed && (
        <div className="mt-auto p-4 animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-[24px] p-6 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#fde047] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-10 h-10 bg-[#fde047]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <div className="w-4 h-4 bg-[#fde047] rounded-full blur-[3px]" />
            </div>
            <h4 className="font-bold text-sm mb-2 text-[#0D062D]">Thoughts Time</h4>
            <p className="text-[#787486] text-[11px] mb-4 leading-relaxed font-medium">
              Share your thoughts with your peers effortlessly.
            </p>
            <button 
              onClick={() => addToast('Thoughts editor opened!')}
              className="w-full bg-white border border-[#EAEAEA] text-[#0D062D] font-bold py-2.5 rounded-xl text-xs hover:bg-[#FAFAFA] hover:shadow-sm transition-all active:scale-[0.98]"
            >
              Write a message
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
