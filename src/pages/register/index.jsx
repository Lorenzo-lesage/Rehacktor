import { useState } from "react";
import {
  ConfirmSchema,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";
import { useNavigate } from "react-router";
import { supabase } from "../../supabase/supabase-client.js";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";

function RegisterPage() {
  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  /*
  |-----------------------------------------------------
  | Methods
  |-----------------------------------------------------
  */

  /**
   * Function to submit the form
   * @param {*} event
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
          },
        },
      });
      if (error) {
        toast.error("Something went wrong", {
          className: isDark ? "toast-dark" : "toast-light",
          style: {
            backgroundColor: isDark ? "#1f2937" : "#E0E0E0", // rosso scuro/chiaro
            color: isDark ? "#8b949e" : "#1a237e",
          },
        });
      } else {
        toast.success("Signed up successfully!", {
          style: {
            backgroundColor: isDark ? "#1f2937" : "#E0E0E0", // blu scuro/chiaro
            color: isDark ? "#8b949e" : "#1a237e",
          },
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  /**
   * Function to handle the blur
   * @param {*} property
   * @returns
   */
  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  /**
   * Function to check if the field is invalid
   * @param {*} property
   * @returns
   */
  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return false;
  };

  /**
   * Function to set the field
   * @param {*} property
   * @param {*} valueSelector
   * @returns
   */
  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  /**
   * Function to reset the form
   */
  const handleReset = () => {
    setFormState({
      email: "",
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    });
    setFormErrors({});
    setTouchedFields({});
    setFormSubmitted(false);
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Typography variant="h4" mb={3}>
        Register
      </Typography>
      <form onSubmit={onSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formState.email}
            onChange={setField("email")}
            onBlur={onBlur("email")}
            error={isInvalid("email")}
            helperText={formErrors.email}
            required
            fullWidth
          />
          <TextField
            label="First Name"
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={setField("firstName")}
            onBlur={onBlur("firstName")}
            error={isInvalid("firstName")}
            helperText={formErrors.firstName}
            required
            fullWidth
          />
          <TextField
            label="Last Name"
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={setField("lastName")}
            onBlur={onBlur("lastName")}
            error={isInvalid("lastName")}
            helperText={formErrors.lastName}
            required
            fullWidth
          />
          <TextField
            label="Username"
            type="text"
            name="username"
            value={formState.username}
            onChange={setField("username")}
            onBlur={onBlur("username")}
            error={isInvalid("username")}
            helperText={formErrors.username}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formState.password}
            onChange={setField("password")}
            onBlur={onBlur("password")}
            error={isInvalid("password")}
            helperText={formErrors.password}
            required
            fullWidth
          />

          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              type="reset"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default RegisterPage;
