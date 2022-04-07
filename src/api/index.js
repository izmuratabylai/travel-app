import axios from "axios";

const URL ="https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";



     


export const getPlacesData = async (ne,sw) => {
    try {

        const {
          data: { data },
        } = await axios.get(URL, {
          params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
          },
          headers: {
            "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
            "X-RapidAPI-Key":
              "4b7f58c0afmsh138fe7ac93d991bp108b2djsnf1154bd930a7",
          },
        });
        return data;
    } catch (error) {
        console.log(error)
    }
}