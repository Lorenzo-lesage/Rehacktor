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
  Fade,
  alpha,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { showToast } from "../../utils/snackbarUtils.js";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { FcGoogle } from "react-icons/fc";

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
  const theme = useTheme();

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
        setFormErrors({ password: error.message, email: error.message });
        showToast("error", "Invalid login credentials");
      } else {
        setTimeout(() => {
          showToast("success", "Signed in successfully!");
        }, 150);
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
   * Method to handle the google login
   */
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/auth/callback",
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
      showToast(
        "error",
        `Google login failed: ${
          error.message || "An unexpected error occurred"
        }`
      );
    }
  };

  /*
  |-----------------------------------------------------
  | Return
  |-----------------------------------------------------
  */

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
        Welcome back
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        textAlign="center"
        mb={3}
      >
        Log in to continue your journey with us.
      </Typography>

      {/*Form */}
      <Fade in={true} timeout={1000}>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          p={4}
          borderRadius={1}
          sx={{
            background: `linear-gradient(345deg, ${alpha(
              theme.palette.background.paper,
              0.8
            )} 20%, ${alpha(theme.palette.background.paper, 0.2)} 100%)`,
          }}
        >
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

          {/*Google button */}
          <Box sx={{ my: 2, textAlign: "center" }}>
            <Divider sx={{ mb: 2 }}>or</Divider>

            <Button
              variant="text"
              size="small"
              onClick={handleGoogleLogin}
              startIcon={<FcGoogle />}
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Fade>

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
