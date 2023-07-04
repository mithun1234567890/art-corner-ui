import { useEffect, useState } from "react";
import classes from "./RegisterPage.module.css";
import { Form, useNavigation, useActionData, Link } from "react-router-dom";
import validators from "./validators";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function UserRegister() {
  const navigation = useNavigation();
  const data = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const [open, setOpen] = useState(data && data.message ? true : false);

  const [userInfo, setUserInfo] = useState({ username: "", fullname: "", email: "", phone: "", address: "", city: "", password: "" });

  useEffect(() => {
    if (data && data.message) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [data]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleInputChange = (event, inputPropName) => {
    const newState = Object.assign({}, userInfo);
    newState[inputPropName] = event.target.value;
    setUserInfo(newState);
    updateValidators(inputPropName, event.target.value);
  };

  const updateValidators = (fieldName, value) => {
    validators[fieldName].errors = [];
    validators[fieldName].state = value;
    validators[fieldName].valid = true;
    validators[fieldName].rules.forEach((rule) => {
      if (rule.test instanceof RegExp) {
        if (!rule.test.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
        }
      } else if (typeof rule.test === "function") {
        if (!rule.test(value)) {
          validators[fieldName].errors.push(rule.message);
          validators[fieldName].valid = false;
        }
      }
    });
  };

  const displayValidationErrors = (fieldName) => {
    const validator = validators[fieldName];
    const result = "";
    if (validator && !validator.valid) {
      const errors = validator.errors[0];
      return <span style={{ color: "red" }}>{errors}</span>;
    }
    return result;
  };

  const isFormValid = () => {
    let status = true;
    Object.keys(validators).forEach((field) => {
      if (!validators[field].valid) {
        status = false;
      }
    });
    return status;
  };

  return (
    <div className={classes.mainRegister}>
      <div className={classes.registerPage}>
        <h2>Register</h2>
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Alert onClose={handleClose} severity="error">
            {data && data.message}
          </Alert>
        </Snackbar>
        <Form method="post">
          <div className={classes.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userInfo.username}
              required
              onChange={(event) => handleInputChange(event, "username")}
            />
            {displayValidationErrors("username")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={userInfo.fullname}
              required
              onChange={(event) => handleInputChange(event, "fullname")}
            />
            {displayValidationErrors("fullname")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              required
              onChange={(event) => handleInputChange(event, "email")}
            />
            {displayValidationErrors("email")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={userInfo.phone}
              required
              onChange={(event) => handleInputChange(event, "phone")}
            />
            {displayValidationErrors("phone")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={userInfo.address}
              required
              onChange={(event) => handleInputChange(event, "address")}
            />
            {displayValidationErrors("address")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={userInfo.city}
              required
              onChange={(event) => handleInputChange(event, "city")}
            />
            {displayValidationErrors("city")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userInfo.password}
              required
              onChange={(event) => handleInputChange(event, "password")}
            />
            {displayValidationErrors("password")}
          </div>
          <button type="submit" disabled={isSubmitting || !isFormValid()}>
            {isSubmitting ? "Please wait..." : "Register"}
          </button>
        </Form>
        <div className="alert alert-warning">
          <span>Already Register?</span>
          <Link
            to="/user/login"
            className="alert-link"
          >
            {" "}
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;

export async function action({ request }) {
  const data = await request.formData();

  const authData = {
    username: data.get("username"),
    fullname: data.get("fullname"),
    email: data.get("email"),
    phone: data.get("phone"),
    address: data.get("address"),
    city: data.get("city"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 403) {
    return response;
  }

  if (!response.ok) {
    return { message: "Something went wrong, Please try again." };
  }

  const resData = await response.json();
  return resData;
}
