import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
      color: '#5030E5'
    },
    'in-progress': {
      id: 'in-progress',
      title: 'On Progress',
      taskIds: ['task-4'],
      color: '#FFA500'
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-5'],
      color: '#8BC34A'
    }
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Brainstorming',
      description: "Brainstorming brings team members' diverse experience into play.",
      priority: 'Low',
      comments: 12,
      files: 0,
      assignees: ['user1', 'user2', 'user3']
    },
    'task-2': {
      id: 'task-2',
      title: 'Research',
      description: 'User research helps you to create an optimal product for users.',
      priority: 'High',
      comments: 10,
      files: 3,
      assignees: ['user1', 'user4']
    },
    'task-3': {
      id: 'task-3',
      title: 'Wireframes',
      description: 'Low fidelity wireframes include the most basic content and visuals.',
      priority: 'High',
      comments: 2,
      files: 0,
      assignees: ['user2', 'user3']
    },
    'task-4': {
      id: 'task-4',
      title: 'Brainstorming',
      description: "Brainstorming brings team members' diverse experience into play.",
      priority: 'Low',
      comments: 12,
      files: 0,
      assignees: ['user1', 'user2', 'user3']
    },
    'task-5': {
      id: 'task-5',
      title: 'Design System',
      description: 'It just needs to adapt the UI from what you did before.',
      priority: 'Completed',
      comments: 12,
      files: 15,
      assignees: ['user1', 'user2']
    }
  },
  columnOrder: ['todo', 'in-progress', 'done'],
  searchQuery: '',
  filterPriority: 'All'
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('boardState');
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return initialState;
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: loadState(),
  reducers: {
    moveTask: (state, action) => {
      const { source, destination, draggableId } = action.payload;

      if (!destination) return;

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      const start = state.columns[source.droppableId];
      const finish = state.columns[destination.droppableId];
      const task = state.tasks[draggableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        state.columns[start.id].taskIds = newTaskIds;
      } else {
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        state.columns[start.id].taskIds = startTaskIds;
        state.columns[finish.id].taskIds = finishTaskIds;

        // Log Activity
        if (task) {
          if (!task.activities) task.activities = [];
          task.activities.unshift({
            id: uuidv4(),
            content: `Moved from ${start.title} to ${finish.title}`,
            timestamp: new Date().toISOString()
          });
        }
      }
    },
    addTask: (state, action) => {
      const { columnId, title, description, priority, tags, dueDate } = action.payload;
      const id = `task-${uuidv4()}`;
      
      state.tasks[id] = {
        id,
        title,
        description,
        priority,
        tags: tags || [],
        dueDate: dueDate || null,
        subtasks: [],
        activities: [{
          id: uuidv4(),
          content: 'Task created',
          timestamp: new Date().toISOString()
        }],
        comments: 0,
        files: 0,
        assignees: ['user1']
      };
      
      state.columns[columnId].taskIds.push(id);
    },
    toggleSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks[taskId];
      if (task) {
        const subtask = task.subtasks.find(s => s.id === subtaskId);
        if (subtask) {
          subtask.completed = !subtask.completed;
          
          task.activities.unshift({
            id: uuidv4(),
            content: `${subtask.completed ? 'Completed' : 'Uncompleted'} subtask: ${subtask.text}`,
            timestamp: new Date().toISOString()
          });
        }
      }
    },
    addSubtask: (state, action) => {
      const { taskId, text } = action.payload;
      const task = state.tasks[taskId];
      if (task) {
        if (!task.subtasks) task.subtasks = [];
        const newSubtask = { id: uuidv4(), text, completed: false };
        task.subtasks.push(newSubtask);
        
        task.activities.unshift({
          id: uuidv4(),
          content: `Added subtask: ${text}`,
          timestamp: new Date().toISOString()
        });
      }
    },
    updateTaskTags: (state, action) => {
      const { taskId, tags } = action.payload;
      const task = state.tasks[taskId];
      if (task) {
        task.tags = tags;
        task.activities.unshift({
          id: uuidv4(),
          content: `Updated tags`,
          timestamp: new Date().toISOString()
        });
      }
    },
    updateTaskDueDate: (state, action) => {
      const { taskId, dueDate } = action.payload;
      const task = state.tasks[taskId];
      if (task) {
        task.dueDate = dueDate;
        task.activities.unshift({
          id: uuidv4(),
          content: dueDate ? `Set due date to ${dueDate}` : 'Removed due date',
          timestamp: new Date().toISOString()
        });
      }
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterPriority: (state, action) => {
      state.filterPriority = action.payload;
    }
  }
});

export const { 
  moveTask, 
  addTask, 
  setSearchQuery, 
  setFilterPriority,
  toggleSubtask,
  addSubtask,
  updateTaskTags,
  updateTaskDueDate
} = tasksSlice.actions;
export default tasksSlice.reducer;
