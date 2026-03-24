<?php

namespace App\Controllers;

use App\Models\EmployeeModel;
use CodeIgniter\RESTful\ResourceController;

class Employee extends ResourceController
{
    protected $modelName = 'App\Models\EmployeeModel';
    protected $format    = 'json';

    // GET: http://localhost:8080/employees
    public function index()
    {
        $employees = $this->model->findAll();
        return $this->respond($employees);
    }

    // POST: http://localhost:8080/employees
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

    // PUT: http://localhost:8080/employees/{id}
    public function update($id = null)
    {
        $data = $this->request->getJSON(true);

        $this->model->update($id, [
            'name' => $data['name'],
            'email' => $data['email'],
            'designation' => $data['designation']
        ]);

        return $this->respond([
            'status' => 'Employee Updated Successfully'
        ]);
    }

    // DELETE: http://localhost:8080/employees/{id}
    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->respond([
            'status' => 'Employee Deleted Successfully'
        ]);
    }
}
