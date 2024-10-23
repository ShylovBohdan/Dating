import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";

// Валідація форми за допомогою yup
const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  })
  .required();

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      // Виклик API для реєстрації користувача
      const response = await axios.post("http://localhost:8000/api/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // Обробка відповіді від сервера
      if (response.status === 201) {
        console.log("User registered successfully", response.data);
        // Можна виконати навігацію або відобразити повідомлення про успіх
        alert("Registration successful!");
      }
    } catch (error: any) {
      // Обробка помилок
      console.error("Error during registration", error);
      if (error.response && error.response.data) {
        // Якщо сервер повернув помилку
        alert(error.response.data.detail || "Registration failed");
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
