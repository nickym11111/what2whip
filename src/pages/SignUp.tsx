import { useState } from "react";
import supabase  from "../utils/client";
import { Link } from "react-router-dom";
import React from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });
      alert("Check your email for an account verification link!");
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-4" style={{ color: "#660000" }}>
          sign up
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="full name"
              name="fullName"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button
            type="submit"
            className="btn btn-light-red w-100 rounded-pill"
          >
            sign up
          </button>
        </form>
        <div className="text-center mt-3">
          already have an account? <Link to="/login">log in</Link>
        </div>
      </div>
      
    </div>
  );
};

export default SignUp;
