import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

function Employee() {

const API_URL = "http://localhost:8080/employees";

const [employees,setEmployees] = useState([]);
const [search,setSearch] = useState("");
const [show,setShow] = useState(false);

const [id,setId] = useState("");
const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [designation,setDesignation] = useState("");

useEffect(()=>{
fetchEmployees();
},[]);

const fetchEmployees = ()=>{
axios.get(API_URL)
.then(res=>{
setEmployees(res.data);
});
};

const handleClose = ()=> setShow(false);
const handleShow = ()=> setShow(true);

const saveEmployee = ()=>{

const data = {name,email,designation};

if(id){
axios.put(API_URL+"/"+id,data).then(()=>{
fetchEmployees();
handleClose();
});
}else{
axios.post(API_URL,data).then(()=>{
fetchEmployees();
handleClose();
});
}

clearForm();
};

const editEmployee = (emp)=>{
setId(emp.id);
setName(emp.name);
setEmail(emp.email);
setDesignation(emp.designation);
handleShow();
};

const deleteEmployee = (id)=>{
if(window.confirm("Delete employee?")){
axios.delete(API_URL+"/"+id).then(()=>{
fetchEmployees();
});
}
};

const clearForm = ()=>{
setId("");
setName("");
setEmail("");
setDesignation("");
};

const filteredEmployees = employees.filter(emp =>
emp.name.toLowerCase().includes(search.toLowerCase())
);

return (

<div className="container mt-5">

<h2 className="text-center mb-4">Employee Management Dashboard</h2>

<div className="d-flex justify-content-between mb-3">

<input
className="form-control w-25"
placeholder="Search employee..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button className="btn btn-primary" onClick={()=>{
clearForm();
handleShow();
}}>
Add Employee
</button>

</div>

<table className="table table-bordered table-hover">

<thead className="table-dark">
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Designation</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{filteredEmployees.map(emp=>(
<tr key={emp.id}>

<td>{emp.id}</td>
<td>{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.designation}</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>editEmployee(emp)}
>
Edit
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteEmployee(emp.id)}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

{/* Modal */}

<Modal show={show} onHide={handleClose}>

<Modal.Header closeButton>
<Modal.Title>{id ? "Edit Employee" : "Add Employee"}</Modal.Title>
</Modal.Header>

<Modal.Body>

<input
className="form-control mb-2"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
className="form-control mb-2"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
className="form-control"
placeholder="Designation"
value={designation}
onChange={(e)=>setDesignation(e.target.value)}
/>

</Modal.Body>

<Modal.Footer>

<Button variant="secondary" onClick={handleClose}>
Close
</Button>

<Button variant="primary" onClick={saveEmployee}>
Save
</Button>

</Modal.Footer>

</Modal>

</div>

);

}

export default Employee;
