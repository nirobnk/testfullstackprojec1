import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Read() {
  const [data, setData] = useState(null); // Initially set to null, not an empty array
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data); // Store the fetched data
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!data) {
    return (
      <div className="container-fluid vw-100 vh-100 bg-primary">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">Back</Link>

      <ul className="list-group mt-4">
        <li className="list-group-item">
          <b>ID: </b>{data.id}
        </li>
        <li className="list-group-item">
          <b>Name: </b>{data.name}
        </li>
        <li className="list-group-item">
          <b>Email: </b>{data.email}
        </li>
        <li className="list-group-item">
          <b>Age: </b>{data.age}
        </li>
        <li className="list-group-item">
          <b>Gender: </b>{data.gender}
        </li>
      </ul>
    </div>
  );
}

export default Read;