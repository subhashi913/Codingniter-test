import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Employee.css";

function Employee() {

const [employees, setEmployees] = useState([]);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [designation, setDesignation] = useState("");

const API_URL = "http://localhost/codeigniter4/public/employees";

useEffect(() => {
fetchEmployees();
}, []);

const fetchEmployees = () => {
axios.get(API_URL)
.then(res => {
setEmployees(res.data);
})
.catch(err => console.log(err));
};

const addEmployee = () => {

if(!name || !email || !designation){
alert("Please fill all fields");
return;
}

axios.post(API_URL,{
name:name,
email:email,
designation:designation
},{
headers:{
"Content-Type":"application/json"
}
})
.then(()=>{
fetchEmployees();
setName("");
setEmail("");
setDesignation("");
})
.catch(err => console.log(err));

};

return (

<div className="container">

<h1 className="title">Employee Management</h1>

<div className="card">

<h2>Add Employee</h2>

<div className="form-group">

<input
type="text"
placeholder="Enter Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<input
type="email"
placeholder="Enter Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="text"
placeholder="Enter Designation"
value={designation}
onChange={(e)=>setDesignation(e.target.value)}
/>

<button onClick={addEmployee}>Add Employee</button>

</div>

</div>

<div className="table-card">

<h2>Employee List</h2>

<table>

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Designation</th>
</tr>
</thead>

<tbody>

{employees.length > 0 ? (
employees.map(emp => (
<tr key={emp.id}>
<td>{emp.id}</td>
<td>{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.designation}</td>
</tr>
))
) : (
<tr>
<td colSpan="4">No Employees Found</td>
</tr>
)}

</tbody>

</table>

</div>

</div>

);

}

export default Employee;
