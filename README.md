# Task Management Dashboard

A React-based task management system designed to streamline workflow management through an interactive, persistent dashboard.

## Project Overview

This application was developed as part of a full-stack development assessment. It implements a multi-column task board with drag-and-drop capabilities, advanced task tracking features, and persistent state management.

## Features

### Core Functionality (Level 1)
- Design implementation following Figma specifications using Tailwind CSS.
- Task organization across three primary status columns: To Do, On Progress, and Done.
- Drag-and-drop interface for task movement between columns.
- Content-based search and priority-based filtering.
- State persistence using Redux and LocalStorage.

### Advanced Features (Level 2)
- Nested subtask management with real-time progress tracking.
- Task-specific activity logs documenting status changes and updates.
- Dynamic tagging system for customizable task categorization.
- Due date management with automated status tracking.
- Interactive sidebar with collapsible navigation for optimized screen layout.
- Centralized notification system for user interaction feedback.

## Technical Implementation

### State Management
The application uses Redux Toolkit for centralized state management. The store is configured to synchronize with LocalStorage, ensuring that the board state (tasks, positions, and activities) is maintained across browser sessions.

### Drag and Drop
Interactive task movement is handled via the `@hello-pangea/dnd` library, providing smooth transitions and reliable state updates during reorganizations.

### Component Architecture
Reusable functional components were utilized throughout the project to ensure maintainability. Key components include:
- Board: Orchestrates the task columns and drag-and-drop context.
- TaskDetailModal: Manages complex task interactions including subtasks and activity logs.
- Sidebar & Header: Dynamic navigation components with refined state handling.

## Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd project-directory
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the application:
   Open `http://localhost:5173` in your web browser.

## Design Decisions
- Utilized a minimalist aesthetic to prioritize clarity and readability of task data.
- Implemented a reverse-chronological activity log to provide a clear audit trail for project progress.
- Focused on responsive UI elements that maintain design integrity across different screen sizes.
