<template>
  <div>
    <div>時速:{{speed()}}</div>
    <div>時速取得時間:{{getDate(locationData.timestamp)}}</div>
  </div>
</template>

<script>
import store from "./store";
export default {
  name: "MovingSpeed",
  data() {
    return {
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
  },
  methods: {
    speed() {
      if (this.locationData.speed === null) {
        return 0;
      } else {
        return this.locationData.speed;
      }
    },
    getDate(timestamp) {
      return new Date(timestamp).toLocaleString();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  color: red;
}
</style>
