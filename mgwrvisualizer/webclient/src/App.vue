<script setup>
import { covariates, diagnosticInfo, geojson, modelResults, parameters, W } from "@/assets/test.json";
import { useDataStore } from "@/store/dataStore";
import { useSelectionStore } from "@/store/selectionStore";
import { onMounted } from 'vue';

const dataStore = useDataStore()
const selectStore = useSelectionStore()

onMounted(() => {
  dataStore.geoJsonData = geojson
  dataStore.W = W
  dataStore.params = parameters
  dataStore.covaraites = covariates
  dataStore.diagnosticInfo = diagnosticInfo
  dataStore.modelResults = modelResults
  // selectStore.selectedK = dataStore.getCovariateKeys.at(0)
})

</script>

<template>
  <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">viz</router-link>
  </div> -->
  <router-view class="min-h-screen w-screen overflow-x-hidden"/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #344955;
}
</style>
