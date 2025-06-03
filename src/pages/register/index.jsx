import { useState } from "react";
import {
  ConfirmSchema,
  getErrors,
  getFieldError,
  FormSchema,
} from "../../lib/validationForm";
import { useNavigate, Link } from "react-router";
import { supabase } from "../../supabase/supabase-client.js";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { showToast } from "../../components/toast/toastHelper.jsx";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

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
  const [showPassword, setShowPassword] = useState(false);

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
        showToast("error", "Something went wrong");
      } else {
        showToast("success", "Signed up successfully!");
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
    const message = getFieldError(FormSchema, property, formState[property]);
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
    return undefined;
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

  /**
   * Method to show the password
   * @returns
   */
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  /**
   * Method to handle the mouse down
   * @param {*} event
   */
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  /**
   * Method to handle the mouse up
   * @param {*} event
   */
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  /**
   * Handle key press
   * @param event
   */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit(onSubmit)();
    }
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

      {/* Form */}
      <Box component="form" onSubmit={onSubmit} noValidate onKeyDown={handleKeyPress}>
        <Stack spacing={2}>
          {/* Email field */}
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
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* First name field */}
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
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Last name field */}
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
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Username field */}
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
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Password field */}
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            required
            error={isInvalid("password")}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formState.password}
              onChange={setField("password")}
              onBlur={onBlur("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            {formErrors.password && (
              <FormHelperText>{formErrors.password}</FormHelperText>
            )}
          </FormControl>

          {/* Submit and reset buttons */}
          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit" size="small">
              Register
            </Button>
            <Button
              variant="outlined"
              type="reset"
              onClick={handleReset}
              size="small"
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/*Register link */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              color: "#1976d2",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "none")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "underline")}
          >
            Sign in!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default RegisterPage;
