import React,{useEffect,useState} from "react";

import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData } from "./api";
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'


const App = () => {
  

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({})

   const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filtiredPlaces, setfiltiredPlaces] = useState([]);
 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filtiredPlaces = places.filter((place) => place.rating > rating);
    setfiltiredPlaces(filtiredPlaces)
  },[rating])
  
  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);
      getPlacesData( type,bounds.sw, bounds.ne).then((data) => {
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
        setfiltiredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [bounds,type]);


  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filtiredPlaces.length ? filtiredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filtiredPlaces.length ? filtiredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};


export default App
