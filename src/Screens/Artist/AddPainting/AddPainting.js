import { useState } from "react";
import classes from "./AddPainting.module.css"
import { useNavigation, useRouteLoaderData } from "react-router-dom";
import validators from "./validators";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AddPainting = () => {
  const token = JSON.parse(useRouteLoaderData("root"));
  const artistId = token.artistId

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  

  const [userInfo, setUserInfo] = useState({
    title: "",
    type: "",
    description: "",
    date: "",
    paintOne: null,
    paintTwo: null,
    paintThree: null,
    price: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setError("");
  };

  const handlePaintChange = (event, inputPropName) => {
    if (inputPropName === "paintOne") {
      setUserInfo({ ...userInfo, paintOne: event.target.files[0] });
    } else if (inputPropName === "paintTwo") {
      setUserInfo({ ...userInfo, paintTwo: event.target.files[0] });
    } else if (inputPropName === "paintThree") {
      setUserInfo({ ...userInfo, paintThree: event.target.files[0] });
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
    formData.append("artistId", artistId);
    formData.append("title", userInfo.title);
    formData.append("type", userInfo.type);
    formData.append("date", userInfo.date);
    formData.append("price", userInfo.price);
    formData.append("description", userInfo.description);
    formData.append("paintOne", userInfo.paintOne);
    formData.append("paintTwo", userInfo.paintTwo);
    formData.append("paintThree", userInfo.paintThree);

    const response = await fetch("http://localhost:5000/artist/addPaint", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
      body: formData,
    });

    if (response.status === 401) {
      setError("Unauthorized user!");
      setOpen(true);
      return;
    }

    if (!response.ok) {
      setOpen(true);
      setError("Something went wrong, Please try again.");
      return;
    }

    const resData = await response.json();
    document.getElementById("formAddPaint").reset();
    setUserInfo({
      title: "",
      type: "",
      date: "",
      price: "",
      description: "",
      paintOne: null,
      paintTwo: null,
      paintThree: null,
    });
    setOpen(true);
    setError(resData.message);
  };

  return (
    <div className={classes.mainAddPainting}>
      <div className={classes.paintingPage}>
        <h2>Add Painting</h2>
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
        <form onSubmit={handleSubmit} id="formAddPaint">
          <div className={classes.formGroup}>
            <label htmlFor="title">Title of the Painting:</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              onChange={(event) => handleInputChange(event, "title")}
            />
            {displayValidationErrors("title")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="date">Date of the Painting:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              onChange={(event) => handleInputChange(event, "date")}
            />
            {displayValidationErrors("date")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="type">Type of Painting:</label>
            <input
              type="text"
              id="type"
              name="type"
              required
              onChange={(event) => handleInputChange(event, "type")}
            />
            {displayValidationErrors("type")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="price">Price:</label>
            <input
              type="tel"
              id="price"
              name="price"
              required
              onChange={(event) => handleInputChange(event, "price")}
            />
            {displayValidationErrors("price")}
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="file">Upload the first image of painting:</label>
            <input
              type="file"
              accept="image/**"
              id="paintOne"
              name="paintOne"
              onChange={(event) => handlePaintChange(event, "paintOne")}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="file">Upload the second image of painting:</label>
            <input
              type="file"
              accept="image/**"
              id="paintTwo"
              name="paintTwo"
              onChange={(event) => handlePaintChange(event, "paintTwo")}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="file">Upload the third image of painting:</label>
            <input
              type="file"
              accept="image/**"
              id="paintThree"
              name="paintThree"
              onChange={(event) => handlePaintChange(event, "paintThree")}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <label htmlFor="description">Description:</label>
            <textarea
              className={classes.formControl}
              id="description"
              name="description"
              placeholder="description"
              required
              onChange={(event) => handleInputChange(event, "description")}
            ></textarea>
            {displayValidationErrors("description")}
          </div>
          <button type="submit" disabled={isSubmitting || !isFormValid()}>
            {isSubmitting ? "Please wait..." : "Add Painting"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPainting;
