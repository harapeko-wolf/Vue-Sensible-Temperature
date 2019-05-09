import Vue from "vue";
import axios from "axios";

const store = new Vue({
  data: {
    weatherData: {
      main: {
        temp: 0,
        humidity: 0
      },
      wind: {
        speed: 0
      }
    },
    locationData: {
      latitude: 0,
      longitude: 0,
      speed: 0,
      timestamp: 0
    }
  },
  methods: {
    getWeatherData() {
      const baseDomain = "https://api.openweathermap.org";
      const baseURL = `${baseDomain}/data/2.5/weather`;
      const key = "57a2cd6d9c1da00e3f8346b685285d42";
      const lat = 34.657183599999996;
      const long = 135.0139864;
      const options = `&lang=ja&units=metric`;
      const url = `${baseURL}?&APPID=${key}&lat=${lat}&lon=${long}${options}`;
      axios
        .get(url)
        .then(response => {
          this.$set(this.$data, "weatherData", response.data);
          this.$emit("GET_AJAX_COMPLETE");
          console.log("⚡");
        })
        .catch(error => {
          console.log(error);
        });
    },
    setWeatherData(name) {
      return this.$data[name];
    },
    getLocationData() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
          this.$set(this.$data, "locationData", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
            timestamp: position.timestamp
          });
          this.$emit("GET_LOCATION_COMPLETE");
          console.log("🚲");
        });
      } else {
        //alert('非対応ブラウザ');
      }
    },
    setLocationData(name) {
      return this.$data[name];
    }
  }
});
export default store;
