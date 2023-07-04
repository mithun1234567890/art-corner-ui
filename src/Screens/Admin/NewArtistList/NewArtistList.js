import React, { useEffect, useState, useRef } from "react";
import classes from "./NewArtistiList.module.css";
import artistLogo from "../../../assets/images/ii.png";
import { useRouteLoaderData } from "react-router-dom";

const NewArtistList = () => {
  const token = JSON.parse(useRouteLoaderData("root"));
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const initialized = useRef(false);

  const fetchData = async () => {
    const response = await fetch(
      "http://localhost:5000/admin/artist?status=PENDING",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );

    if (response.status === 404) {
      setError("No Record Found");
      return;
    }

    if (!response.ok) {
      setError("Something went wrong, Please try again.");
      return;
    }

    const resData = await response.json();
    setData(resData);
  };

  useEffect(() => {
    if (!initialized.current) {
        initialized.current = true
        fetchData();
      }
  });

  

  return data ? (
    <div className={classes.cardContainer}>
      {data.map((item) => (
        <div key={item.artistId} className={classes.card}>
          <img src={artistLogo} alt="New Artist" />
          <div className={classes.label}>{item.fullname}</div>
        </div>
      ))}
    </div>
  ) : (
    <div className={classes.notFoundContainer}>
        <div className={classes.notFound}>
            <h1>{error}</h1>
        </div>
    </div>
  );
};

export default NewArtistList;
