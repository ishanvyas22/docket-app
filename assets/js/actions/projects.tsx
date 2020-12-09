import {Inertia} from '@inertiajs/inertia';

import {Project} from 'app/types';
import {confirm} from 'app/components/confirm';

export function archiveProject(project: Project) {
  Inertia.post(`/projects/${project.slug}/archive`);
}

export function unarchiveProject(project: Project) {
  Inertia.post(`/projects/${project.slug}/unarchive`);
}

export async function deleteProject(project: Project) {
  try {
    await confirm('Are you sure? This will destroy all the todos this project contains');
    Inertia.post(`/projects/${project.slug}/delete`);
  } catch (e) {
    // Do nothing the user aborted.
  }
}
