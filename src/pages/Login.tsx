import { useEffect, useState } from "react";
import supabase from "../../backend/utils/client";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { token, setToken } = useAuth();  

  useEffect(() => {
    // Example: Check if token is null and redirect to login if necessary
    if (!token) {
      console.log("No token, redirecting to login");
      // You could use `navigate` from `react-router-dom` to redirect
    }
  }, [token]);

  console.log("token", token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;
      setToken(JSON.stringify(data.user));
      navigate("/ingredients");
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
          login
        </h3>
        <form onSubmit={handleSubmit}>
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
            log in
          </button>
        </form>
        <div className="text-center mt-3">
          don’t have an account? <Link to="/signup">sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
