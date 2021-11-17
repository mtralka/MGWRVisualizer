<script setup>
import data from "@/assets/georgia_testBW.json";
import W from "@/assets/KN.json";
import params from "@/assets/params.json";
import covaraites from "@/assets/covariates.json";
import modelResults from "@/assets/model_results.json";
import { useDataStore } from "@/store/dataStore";
import { useSelectionStore } from "@/store/selectionStore";
import { onMounted } from 'vue-demi';

const dataStore = useDataStore()
const selectStore = useSelectionStore()

onMounted(() => {
  // const data = import.meta.glob("/assets/georgia_testBW.json")
  // onst data = require("@/assets/georgia_testBW.json")

  dataStore.geoJsonData = data
  dataStore.W = W
  dataStore.params = params
  dataStore.covaraites = covaraites
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
