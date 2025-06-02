import { useState } from "react";
import {
  FormSchemaLogin,
  ConfirmSchemaLogin,
  getErrors,
  getFieldError,
} from "../../lib/validationForm";
import { useNavigate } from "react-router";
import { supabase } from "../../supabase/supabase-client.js";
import { Box, Button, TextField, Typography, Stack } from "@mui/material";
import { showToast } from "../../components/toast/toastHelper.jsx";

function LoginPage() {
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
    password: "",
  });
  const navigate = useNavigate();

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
        showToast("error", "Something went wrong");
      } else {
        showToast("success", "Signed in successfully!");
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
    const message = getFieldError(FormSchemaLogin, property, formState[property]);
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
          {formErrors.email && <p>{formErrors.email}</p>}
          
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
          {formErrors.password && <p>{formErrors.password}</p>}

          <Stack direction="row" spacing={2}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Button variant="outlined" type="reset" onClick={handleReset}>
              Reset
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

export default LoginPage;
