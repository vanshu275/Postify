import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
} from "@mantine/core";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await login(
        formData.username,
        formData.password
      );

      navigate("/", { replace: true });

    } catch (error) {
      setError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">

      <Paper
        shadow="md"
        p="xl"
        radius="md"
        className="w-[400px]"
      >

        <Title order={2} className="mb-6">
          Login
        </Title>


        <form onSubmit={handleSubmit}>

          <TextInput
            label="Username"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />


          <PasswordInput
            label="Password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            mt="md"
          />


          {error && (
            <Text
              c="red"
              mt="md"
            >
              {error}
            </Text>
          )}


          <Button
            type="submit"
            fullWidth
            mt="xl"
            loading={loading}
          >
            Login
          </Button>

        </form>


        <Text ta="center" mt="md">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </Text>
        
      </Paper>

    </div>
  );
}