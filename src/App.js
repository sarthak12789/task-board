import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';

const initialColumns = {
  default: [{ id: 1, title: 'Welcome card' }],
  todo: [{ id: 2, title: 'Design login page' }, { id: 3, title: 'Setup routing' }],
  inprogress: [{ id: 4, title: 'Implement dashboard' }],
  testing: [{ id: 5, title: 'Unit tests' }],
  completed: [{ id: 6, title: 'Setup project' }]
};

const COLUMN_ORDER = ['default', 'todo', 'inprogress', 'testing', 'completed'];
const COLUMN_TITLES = {
  default: 'Default',
  todo: 'To Do',
  inprogress: 'In Progress',
  testing: 'Testing',
  completed: 'Completed'
};

export default function App() {
  const [columns] = useState(initialColumns);

  return (
    <div className="app-shell">
      <Header />
      <Board columns={columns} columnTitles={COLUMN_TITLES} columnOrder={COLUMN_ORDER} />
    </div>
  );
}
