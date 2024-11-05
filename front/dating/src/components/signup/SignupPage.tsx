// src/pages/SignupPage.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { registerUser } from "../../requests/Auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";

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
    age: yup.number().positive().integer().required("Age is required"),
    gender: yup
      .string()
      .oneOf(["male", "female"])
      .required("Gender is required"),
    horoscope: yup.string().required("Horoscope is required"),
    hobbies: yup
      .string()
      .trim()
      .transform((value) =>
        value.split(",").map((hobby: string) => hobby.trim())
      )
      .min(1, "At least one hobby is required"),
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
  const signIn = useUserStore.getState().signIn;
  const navigate = useNavigate();
  const [hobbies, setHobbies] = useState<string[]>([]);
  const handleHobbiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hobbyList = event.target.value
      .split(",")
      .map((hobby) => hobby.trim());
    setHobbies(hobbyList);
  };
  const onSubmit = async (data: any) => {
    try {
      // Виклик функції реєстрації користувача з профілем
      const { userRole, profile } = await registerUser(
        data.name,
        data.email,
        data.password,
        data.age,
        data.gender,
        data.horoscope,
        hobbies
      );
      signIn(profile, userRole);
      navigate("/home");
    } catch (error: any) {
      alert("Invalid credentials");
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
          <TextField
            fullWidth
            label="Age"
            type="number"
            variant="outlined"
            margin="normal"
            {...register("age")}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select {...register("gender")}>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Horoscope"
            variant="outlined"
            margin="normal"
            {...register("horoscope")}
            error={!!errors.horoscope}
            helperText={errors.horoscope?.message}
          />
          <TextField
            fullWidth
            label="Hobbies (separated by commas)"
            variant="outlined"
            margin="normal"
            value={hobbies.join(", ")}
            onChange={handleHobbiesChange}
            error={!!errors.hobbies}
            helperText={errors.hobbies?.message}
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
