import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Edit() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const { id } = useParams(); // Get the student ID from URL params
  const navigate = useNavigate(); // To navigate after saving

  // Fetch student data on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:5005/get_student/${id}`) // Make sure to include the full backend URL
      .then((res) => {
        if (res.data.length > 0) {
          setStudent(res.data[0]); // Set the state with the fetched data
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated data to backend
    axios
      .post(`http://localhost:5005/edit_user/${id}`, student)
      .then((res) => {
        console.log(res);
        navigate("/"); // Navigate to the homepage after saving
      })
      .catch((err) => console.log(err));
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Edit User {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            value={student.name}
            type="text"
            name="name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            value={student.email}
            type="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="gender">Gender</label>
          <input
            value={student.gender}
            type="text"
            name="gender"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            value={student.age}
            type="number"
            name="age"
            required
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;