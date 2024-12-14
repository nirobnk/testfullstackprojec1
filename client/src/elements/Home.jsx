import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    axios
      .get("http://localhost:5005/students") // Updated URL to include the correct port
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle deletion of student
  function handleDelete(id) {
    axios
      .delete(`http://localhost:5005/delete/${id}`) // Updated URL to include the correct port
      .then((res) => {
        // Immediately refetch the data after deletion
        setData((prevData) => prevData.filter((student) => student.id !== id));
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid bg-primary vh-100 vw-100">
      <h3>Students</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add Student
        </Link>
      </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>
                <Link
                  className="btn mx-2 btn-success"
                  to={`/read/${student.id}`}
                >
                  Read
                </Link>
                <Link
                  className="btn mx-2 btn-success"
                  to={`/edit/${student.id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="btn mx-2 btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
