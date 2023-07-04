import { useState } from "react";
import classes from "./RegisterPage.module.css";
import { Link, useNavigation } from "react-router-dom";
import validators from "./validators";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ArtistRegister = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    experience: "",
    qualification: "",
    website: "",
    address: "",
    city: "",
    password: "",
    samplePaintOne: null,
    samplePaintTwo: null,
    isPortrait: false,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setError("");
  };

  const handlePaintChange = (event, inputPropName) => {
    if (inputPropName === "samplePaintOne") {
      setUserInfo({ ...userInfo, samplePaintOne: event.target.files[0] });
    } else if (inputPropName === "samplePaintTwo") {
      setUserInfo({ ...userInfo, samplePaintTwo: event.target.files[0] });
    }
  };

  const handleCheckboxClick = (event, inputPropName) => {
    console.log(event.target.value);
    if (inputPropName === "isPortrait") {
      setUserInfo({ ...userInfo, isPortrait: !userInfo.isPortrait });
    }
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", userInfo.username);
    formData.append("fullname", userInfo.fullname);
    formData.append("email", userInfo.email);
    formData.append("phone", userInfo.phone);
    formData.append("experience", userInfo.experience);
    formData.append("qualification", userInfo.qualification);
    formData.append("website", userInfo.website);
    formData.append("address", userInfo.address);
    formData.append("city", userInfo.city);
    formData.append("password", userInfo.password);
    formData.append("isPortrait", userInfo.isPortrait);
    formData.append("isWallpainter", false);
    formData.append("samplePaintOne", userInfo.samplePaintOne);
    formData.append("samplePaintTwo", userInfo.samplePaintTwo);

    const response = await fetch("http://localhost:5000/artist/register", {
      method: "POST",
      body: formData,
    });

    if (response.status === 403) {
      const resData = await response.json();
      setOpen(true);
      setError(resData.message);
      return;
    }

    if (!response.ok) {
      setOpen(true);
      setError("Something went wrong, Please try again.");
      return;
    }

    const resData = await response.json();
    document.getElementById("formArtist").reset();
    setUserInfo({
      username: "",
      fullname: "",
      email: "",
      phone: "",
      experience: "",
      qualification: "",
      website: "",
      address: "",
      city: "",
      password: "",
      samplePaintOne: null,
      samplePaintTwo: null,
      isPortrait: false,
    });
    setOpen(true);
    setError(resData.message);
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
            {error}
          </Alert>
        </Snackbar>
        <form onSubmit={handleSubmit} id="formArtist">
          <div className={classes.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
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
              required
              onChange={(event) => handleInputChange(event, "email")}
            />
            {displayValidationErrors("email")}
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                onChange={(event) => handleInputChange(event, "phone")}
              />
              {displayValidationErrors("phone")}
            </div>
            <div className={classes.column}>
              <label htmlFor="experience">Experience:</label>
              <select
                className={classes.formControl}
                id="experience"
                name="experience"
                required
                onChange={(event) => handleInputChange(event, "experience")}
              >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </select>
              {displayValidationErrors("experience")}
            </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="qualification">Qualification:</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              required
              onChange={(event) => handleInputChange(event, "qualification")}
            />
            {displayValidationErrors("city")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="website">Your Website URL(optional):</label>
            <input
              type="text"
              id="website"
              name="website"
              onChange={(event) => handleInputChange(event, "website")}
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="address">Address:</label>
            <textarea
              className={classes.formControl}
              id="address"
              name="address"
              placeholder="Your Address"
              value={userInfo.address}
              required
              onChange={(event) => handleInputChange(event, "address")}
            ></textarea>
            {displayValidationErrors("address")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              onChange={(event) => handleInputChange(event, "city")}
            />
            {displayValidationErrors("city")}
          </div>
          <div className={classes.row}>
            <div className={classes.column}>
            <label htmlFor="file">Sample Paint 1:</label>
            <input
              type="file"
              accept="image/**"
              id="samplePaintOne"
              name="samplePaintOne"
              onChange={(event) => handlePaintChange(event, "samplePaintOne")}
              required
            />
          </div>
          <div className={classes.column}>
            <label htmlFor="file">Sample Paint 2:</label>
            <input
              type="file"
              accept="image/**"
              id="samplePaintTwo"
              name="samplePaintTwo"
              onChange={(event) => handlePaintChange(event, "samplePaintTwo")}
              required
            />
          </div>
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(event) => handleInputChange(event, "password")}
            />
            {displayValidationErrors("password")}
          </div>
          <div className={classes.formGroup}>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="isPortrait"
                name="isPortrait"
                value={userInfo.isPortrait}
                onClick={(event) => handleCheckboxClick(event, "isPortrait")}
              />
              <label htmlFor="isPortrait" className="form-check-label">
                I'm ready to do the client's Portrait
              </label>
            </div>
          </div>
          <button type="submit" disabled={isSubmitting || !isFormValid()}>
            {isSubmitting ? "Please wait..." : "Register"}
          </button>
        </form>
        <div className="alert alert-warning">
          <span>Already Register?</span>
          <Link
            to="/artist/login"
            className="alert-link"
          >
            {" "}
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtistRegister;
