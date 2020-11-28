<?php
declare(strict_types=1);

namespace App\Controller;

use Cake\Http\Exception\BadRequestException;
use Cake\Http\Exception\NotFoundException;

/**
 * Projects Controller
 *
 * @property \App\Model\Table\ProjectsTable $Projects
 * @method \App\Model\Entity\Project[]|\Cake\Datasource\ResultSetInterface paginate($object = null, array $settings = [])
 */
class ProjectsController extends AppController
{
    /**
     * Add method
     *
     * @return \Cake\Http\Response|null|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $project = $this->Projects->newEmptyEntity();
        $this->Authorization->authorize($project, 'create');
        if ($this->request->is('post')) {
            $project = $this->Projects->patchEntity($project, $this->request->getData());
            $project->user_id = $this->request->getAttribute('identity')->getIdentifier();

            if ($this->Projects->save($project)) {
                return $this->response->withStatus(201);
            }

            return $this->validationErrorResponse($project->getErrors());
        }
    }

    /**
     * Edit method
     *
     * @param string|null $id Project id.
     * @return \Cake\Http\Response|null|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $project = $this->Projects->get($id, [
            'contain' => [],
        ]);
        $this->Authorization->authorize($project);

        if ($this->request->is(['patch', 'post', 'put'])) {
            $project = $this->Projects->patchEntity($project, $this->request->getData());
            if ($this->Projects->save($project)) {
                $this->Flash->success(__('The project has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The project could not be saved. Please, try again.'));
        }
        $this->set(compact('project'));
    }

    /**
     * Delete method
     *
     * @param string|null $id Project id.
     * @return \Cake\Http\Response|null|void Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $project = $this->Projects->get($id);
        $this->Authorization->authorize($project);

        if ($this->Projects->delete($project)) {
            $this->Flash->success(__('The project has been deleted.'));
        } else {
            $this->Flash->error(__('The project could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }

    public function reorder()
    {
        $projectIds = $this->request->getData('projects');
        if (!is_array($projectIds)) {
            throw new BadRequestException('Invalid project list.');
        }
        $projectIds = array_values($projectIds);
        $query = $this->Projects
            ->find('active')
            ->where(['Projects.id IN' => $projectIds]);
        $query = $this->Authorization->applyScope($query, 'index');

        $items = $query->toArray();
        if (count($items) != count($projectIds)) {
            throw new NotFoundException('Some of the requested items could not be found.');
        }
        $sorted = [];
        foreach ($items as $item) {
            $index = array_search($item->id, $projectIds);
            $sorted[$index] = $item;
        }
        ksort($sorted);
        $this->Projects->reorder($sorted);

        return $this->redirect($this->referer(['action' => 'index']));
    }
}
