<?php

namespace App\Controllers;

use App\Models\EmployeeModel;
use CodeIgniter\RESTful\ResourceController;

class Employee extends ResourceController
{
    protected $modelName = 'App\Models\EmployeeModel';
    protected $format    = 'json';

    // GET: http://localhost/codeigniter4/public/employees
    public function index()
    {
        $employees = $this->model->findAll();
        return $this->respond($employees);
    }

    // POST: http://localhost/codeigniter4/public/employees
    public function create()
{
    $data = $this->request->getJSON(true);

    $this->model->insert([
        'name' => $data['name'],
        'email' => $data['email'],
        'designation' => $data['designation']
    ]);

    return $this->respondCreated([
        'status' => 'Employee Added Successfully'
    ]);
}
}
