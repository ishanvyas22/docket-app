import React from 'react';
import axios from 'axios';
import {Inertia} from '@inertiajs/inertia';

import FormError from 'app/components/formError';
import Modal from 'app/components/modal';
import {ValidationErrors} from 'app/types';

type Props = {
  showModal: boolean;
  onClose: () => void;
};

function NewProjectModal({showModal, onClose}: Props) {
  if (!showModal) {
    return null;
  }

  const [errors, setErrors] = React.useState<ValidationErrors>({});
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    // Do an XHR request so we can handle validation errors
    // inside the modal.
    axios
      .post('/projects/add', formData)
      .then(() => {
        onClose();
        Inertia.reload();
      })
      .catch(error => {
        if (error.response) {
          setErrors(error.response.data.errors);
        }
      });
  };

  return (
    <Modal onClose={onClose}>
      <form method="POST" onSubmit={handleSubmit}>
        <h2>New Project</h2>
        <div>
          <label htmlFor="project-name">Name</label>
          <input id="project-name" type="text" name="name" required />
          <FormError errors={errors} field="name" />
        </div>
        <div>
          <label htmlFor="project-color">Color</label>
          <input
            id="project-color"
            type="text"
            name="color"
            required
            defaultValue="ff00ff"
          />
          <FormError errors={errors} field="color" />
        </div>
        <button type="submit">Save</button>
      </form>
    </Modal>
  );
}
export default NewProjectModal;
