<template>
  <div>
    <!-- <p>{{$data}}</p> -->
    <div class="test">温度:{{weatherData.main.temp}}</div>
    <div class="test">湿度:{{weatherData.main.humidity}}</div>
    <div class="test">風速:{{windSpeed()}}</div>
    <div class="test">
      屋外日影体感温度:
      {{feelTempreture()}}
    </div>
    <div class="test">
      無風 日影 不快指数:
      {{temperatureHumidityIndex()}}
    </div>
    <div>不快指数 評価:{{THIE(temperatureHumidityIndex())}}</div>
  </div>
</template>

<script>
import store from "./store";
export default {
  name: "SensibleTemperature",
  data() {
    return {
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
    };
  },
  created() {
    store.getLocationData();
    store.$on("GET_LOCATION_COMPLETE", () => {
      this.locationData = store.setLocationData("locationData");
    });
    store.getWeatherData();
    store.$on("GET_AJAX_COMPLETE", () => {
      this.weatherData = store.setWeatherData("weatherData");
    });
  },
  methods: {
    roundToUnit(value, base) {
      return Math.round(value * base) / base;
    },
    windSpeed() {
      const anser = 
        ((this.weatherData.wind.speed * 1000) / 60 / 60)
      ;
      return this.roundToUnit(anser, 100);
    },
    feelTempreture() {
      const anser =
        37 -
        (37 - this.weatherData.main.temp) /
          (0.68 -
            0.0014 * this.weatherData.main.humidity +
            1 /
              (1.76 +
                1.4 * ((this.weatherData.wind.speed * 1000) / 60 / 60) ** 0.75)) -
        0.29 * this.weatherData.main.temp * (1 - this.weatherData.main.humidity / 100);
        return this.roundToUnit(anser, 100);
    },
    temperatureHumidityIndex() {
      const anser =
        0.81 * this.weatherData.main.temp +
        0.01 *
          this.weatherData.main.humidity *
          (0.99 * this.weatherData.main.temp - 14.3) +
        46.3;
      return this.roundToUnit(anser, 100);
    },
    THIE(a) {
      if (a <= 55) {
        return "寒い";
      } else if (a <= 56) {
        return "肌寒い";
      } else if (a <= 60) {
        return "何も感じない";
      } else if (a <= 65) {
        return "快い";
      } else if (a <= 70) {
        return "暑くない";
      } else if (a <= 75) {
        return "やや暑い";
      } else if (a <= 80) {
        return "暑くて汗が出る";
      } else {
        return "暑くてたまらない";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.test {
  color: tomato;
}
</style>
