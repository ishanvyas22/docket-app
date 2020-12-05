import React from 'react';

import {Project} from 'app/types';
import LoggedIn from 'app/layouts/loggedIn';
import ProjectItem from 'app/components/projectItem';

type Props = {
  archived: Project[];
};

export default function ProjectsArchived({archived}: Props) {
  return (
    <LoggedIn>
      <h1>Archived Projects</h1>
      {archived.length === 0 && <NoProjects />}
      {archived.map(item => (
        <ProjectItem key={item.id} project={item} />
      ))}
    </LoggedIn>
  );
}

function NoProjects() {
  return (
    <div>
      <h2>Nothing to see</h2>
      <p>You don't have any archived projects.</p>
    </div>
  );
}
