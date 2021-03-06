import React, {useEffect} from 'react';
import {usePage} from '@inertiajs/inertia-react';

import {FlashMessage, Project} from 'app/types';

import FlashMessages from 'app/components/flashMessages';
import ProjectFilter from 'app/components/projectFilter';
import ProfileMenu from 'app/components/profileMenu';
import {ProjectsProvider} from 'app/providers/projects';

type SharedPageProps = {
  flash: null | FlashMessage;
  projects: Project[];
};

type Props = {
  title?: string;
  children: React.ReactNode;
};

function LoggedIn({children, title}: Props) {
  const {projects} = usePage().props as SharedPageProps;
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <ProjectsProvider projects={projects}>
      <Contents>{children}</Contents>
    </ProjectsProvider>
  );
}

/**
 * For the ProjectsProvider component to work it needs to be
 * wrapping components that want to call useProjects().
 *
 * For other elements to be able to access projects they need
 * to be another layers of components down.
 */
function Contents({children}: Props) {
  const {flash} = usePage().props as SharedPageProps;

  return (
    <React.Fragment>
      <main className="layout-three-quarter" data-testid="loggedin">
        <section className="sidebar">
          <ProfileMenu />
          <ProjectFilter />
        </section>
        <section className="content">
          {children}
          <FlashMessages flash={flash} />
        </section>
      </main>
    </React.Fragment>
  );
}

export default LoggedIn;
