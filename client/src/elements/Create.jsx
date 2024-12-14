import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Debugging: Check values before sending
    console.log("Submitting values:", values);

    axios
      .post("http://localhost:5005/add_user", values)
      .then((res) => {
        console.log(res.data);
        alert(res.data.success); // Show success message
        navigate("/"); // Redirect to the homepage
      })
      .catch((err) => {
        console.error("Error occurred while adding student:", err);
        alert("Failed to add student. Please try again.");
      });
  };

  return (
    <div>
      <h1>Add New Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={values.age}
          onChange={handleInputChange}
          required
        />
        <select name="gender" value={values.gender} onChange={handleInputChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}

export default Create;