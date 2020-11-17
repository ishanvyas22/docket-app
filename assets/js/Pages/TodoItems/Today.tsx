import React from 'react';

import {TodoItem} from 'app/types';
import LoggedIn from 'app/layouts/loggedIn';
import TodoItemGroup from 'app/components/todoItemGroup';

type Props = {
  todoItems: TodoItem[];
  view: string | null;
};

export default function TodoItemsToday({todoItems, view}: Props) {
  const defaultDate =
    view === 'today' ? new Date().toISOString().substring(0, 10) : undefined;
  function handleChange(items: TodoItem[]) {
    console.log('new items', items);
  }

  return (
    <LoggedIn>
      <h1>Today</h1>
      <TodoItemGroup
        onReorder={handleChange}
        todoItems={todoItems}
        defaultDate={defaultDate}
        showProject
      />
    </LoggedIn>
  );
}
