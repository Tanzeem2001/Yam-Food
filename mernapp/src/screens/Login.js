import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(
        JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      );
      const response = await fetch("http://localhost:8000/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        alert("Failed to create user. Please check your input.");
        return;
      }

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        localStorage.setItem("userEmail",credentials.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }

      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const onchange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onchange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onchange}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm a new user
          </Link>
        </form>
      </div>
    </div>
  );
}
