<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Task extends ResourceController
{
    protected $modelName = 'App\Models\TaskModel';
    protected $format = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

public function create()
{
    $data = $this->request->getJSON(true);

    // Default status
    $data['status'] = $data['status'] ?? 'pending';

    $this->model->insert($data);

    return $this->respondCreated([
        "message" => "Task Added"
    ]);
}

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $this->model->update($id, $data);

        return $this->respond([
            "message" => "Task Updated"
        ]);
    }

    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respond([
            "message" => "Task Deleted"
        ]);
    }
}
