import { useState } from "react";
import {
  FormSchemaLogin,
  ConfirmSchemaLogin,
  getErrors,
  getFieldError,
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

function LoginPage() {
  /*
  |-----------------------------------------------------
  | Data
  |-----------------------------------------------------
  */

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
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
    const { error, data } = ConfirmSchemaLogin.safeParse(formState);
    if (error) {
      const errors = getErrors(error);
      setFormErrors(errors);
      console.log(errors);
    } else {
      let { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        console.log(error);
        setFormErrors({ password: error.message, email: error.message });
        showToast("error", "Invalid login credentials");
      } else {
        showToast("success", "Signed in successfully!");
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
    const message = getFieldError(
      FormSchemaLogin,
      property,
      formState[property]
    );
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
      password: "",
    });
    setFormErrors({});
    setTouchedFields({});
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
        Sign in
      </Typography>

      {/*Form */}
      <form onSubmit={onSubmit} noValidate onKeyDown={handleKeyPress}>
        <Stack spacing={2}>
          {/*Email field */}
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
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/*Password field */}
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

          {/*Submit and reset buttons */}
          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit" size="small">
              Sign in
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
      </form>

      {/*Register link */}
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              fontWeight: "bold",
              textDecoration: "underline",
              color: "#1976d2",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "none")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "underline")}
          >
            Register!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginPage;
