import React from 'react';
import {Inertia} from '@inertiajs/inertia';

import {Task} from 'app/types';
import TaskQuickForm from 'app/components/taskQuickForm';

type Props = {
  onCancel: () => void;
  defaultDate?: string;
  defaultProjectId?: number;
};

function TaskAddForm({onCancel, defaultDate, defaultProjectId}: Props) {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.persist();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    Inertia.post('/todos/add', formData, {
      onSuccess: () => onCancel(),
    });
  };
  const task: Task = {
    id: -1,
    title: '',
    body: '',
    due_on: defaultDate ?? null,
    completed: false,
    day_order: 0,
    child_order: 0,
    created: '',
    modified: '',
    project: {
      id: defaultProjectId ? Number(defaultProjectId) : -1,
      name: '',
      slug: '',
      color: '',
      favorite: false,
      archived: false,
    },
  };

  return <TaskQuickForm task={task} onSubmit={onSubmit} onCancel={onCancel} />;
}
export default TaskAddForm;