<script setup>
import { useDataStore } from "@/store/dataStore";
import { useSelectionStore } from "@/store/selectionStore";
import { onMounted } from 'vue';

const dataStore = useDataStore()
const selectStore = useSelectionStore()

onMounted(async () => {
  
  const urlParams = new URLSearchParams(window.location.search);
  const dataSetName = urlParams.get("name");

  if (dataSetName === "local"){
    dataStore.loadData("http://localhost:8000/data.json")
  } else if (dataSetName === "file"){
    // not implemented
    console.log("Setting from file")
    // dataStore.setData()
  }
  else {
    try {
      console.log("Not local")
      // dataStore.loadData("http://localhost:8000/data.json")
    } catch(error){
      console.error("Error fetching non-local dataset")
    }
  }
  // selectStore.selectedK = dataStore.getCovariateKeys.at(0)
})

</script>

<template>
  <div
  font="sans subpixel-antialiased"
  >

  
  <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/dashboard">viz</router-link>
  </div> -->
    <router-view class="min-h-screen w-screen overflow-x-hidden"/>
  </div>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #344955;
} */
</style>
