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

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

      await register(
        formData.name,
        formData.username,
        formData.password
      );

      navigate("/", { replace: true });

    } catch (error) {
      console.log(error);
      console.log(error.response);

      setError(
        error.response?.data?.message ||
        error.message ||
        "Registration failed"
      );
    }
    finally {
      setLoading(false);
    }
  };


  return (
  <div className="flex min-h-screen items-center justify-center px-4 py-8">
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className="w-full max-w-md"
    >
      <Title
        order={2}
        className="mb-6 text-center text-2xl md:text-3xl"
      >
        Create Account
      </Title>

      <form onSubmit={handleSubmit}>
        <TextInput
          label="Name"
          placeholder="Enter your name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextInput
          mt="md"
          label="Username"
          placeholder="Enter username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <PasswordInput
          mt="md"
          label="Password"
          placeholder="Create password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        {error && (
          <Text c="red" mt="md" size="sm">
            {error}
          </Text>
        )}

        <Button
          type="submit"
          fullWidth
          mt="xl"
          loading={loading}
        >
          Register
        </Button>
      </form>

      <Text ta="center" mt="md" size="sm">
        Already have an account?{" "}
        <Link to="/login" className="font-medium">
          Login
        </Link>
      </Text>
    </Paper>
  </div>
);
}