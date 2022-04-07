import React, { useState } from "react";

import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles.js";

const Map = ({ coordinates, setCoordinates, setBounds, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

  

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDkr3wOajq3AqJhTp0cdPDImoh6hIZywus" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        
      >
        {places?.map((place) => (
          <div
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={place}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon fontSize="large" color="primary" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  variant="subtitle2"
                  className={classes.typography}
                  gutterBottom
                >
                  {place.name}
                </Typography>
                <img
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place.name}
                  className={classes.pointer}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
