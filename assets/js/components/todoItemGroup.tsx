import React, {useState} from 'react';

import {TodoItem} from 'app/types';
import TodoItemRow from 'app/components/todoItemRow';
import TodoItemAddForm from 'app/components/todoItemAddForm';

type Props = {
  todoItems: TodoItem[];
  defaultDate?: string;
  defaultProjectId?: number;
  showProject?: boolean;
  showDueOn?: boolean;
};

export default function TodoItemsGroup({
  todoItems,
  defaultDate,
  defaultProjectId,
  showProject,
  showDueOn,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <React.Fragment>
      {todoItems.map(todo => (
        <TodoItemRow
          key={todo.id}
          todo={todo}
          showProject={showProject}
          showDueOn={showDueOn}
        />
      ))}
      <div>
        {!showForm && <button onClick={() => setShowForm(true)}>Add Task</button>}
        {showForm && (
          <TodoItemAddForm
            defaultDate={defaultDate}
            defaultProjectId={defaultProjectId}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </React.Fragment>
  );
}
