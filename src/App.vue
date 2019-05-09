<template>
  <div id="app">
    <MovingSpeed/>
    <SensibleTemperature/>
  </div>
</template>

<script>
import MovingSpeed from "./components/MovingSpeed";
import SensibleTemperature from "./components/SensibleTemperature";
export default {
  name: "App",
  components: {
    MovingSpeed,
    SensibleTemperature
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
