<script setup>
import Bandwith from "@/components/Controllers/VizControl/BandwithControl.vue";
import Plotly from 'plotly.js-dist-min';
import { computed, onMounted, reactive, watch } from 'vue';
import { useDataStore } from '../store/dataStore';
import { useSelectionStore } from '../store/selectionStore';

const dataStore = useDataStore()
const selectionStore = useSelectionStore()

watch(
  () => [selectionStore.selectedK],
  (state, prevState) => {
    createPlot()
  },
  { deep: true }
)

const critical = computed(() => dataStore.getParams["critical"] || 0)

// const currentK = computed(() => dataStore.getParams["Y"][selectionStore.getSelectedK || "K0"])

const insignificantY = () => {
  const arr = dataStore.getParams["Y"][selectionStore.getSelectedK || "K0"]
  return arr.filter((el) => el)
}

const significantNegative = () => {
  const arr = dataStore.getParams["Y"][selectionStore.getSelectedK || "K0"]
  return arr.filter((el) => el.ctval < -1. * critical.value)
}

const significantPositive = () => {
  const arr = dataStore.getParams["Y"][selectionStore.getSelectedK || "K0"]
  return arr.filter((el) => el.ctval >  critical.value)
}

// error is crit times mgwr_results.bse[:,0]
// where mgwr_filtered_t[:,0] | ctval  > crit

// const significantYPositive = currentK.value.map((el) => el.data > critical.value)
// const significantYNegative = currentK.value.map((el) => el.data < critical.value)

const insignificantGraph = {
    x: [],
    y: [],
    error_y: {
      type: 'data',
      array: [],
      visible: true,
      color: '#808080',
      thickness: 1.5,
      width: 3,
      opacity: 1
    },
    marker: {
    color: '#808080',
    size: 8
  },
    type: 'scatter'
}

const significantNegativeGraph = {
    x: [],
    y: [],
    error_y: {
      type: 'data',
      array: [],
      visible: true,
      color: '#ff0000',
      thickness: 1.5,
      width: 3,
      opacity: 1
    },
    marker: {
    color: '#808080',
    size: 8
  },
    type: 'scatter'
}

const significantPositiveGraph = {
    x: [],
    y: [],
    error_y: {
      type: 'data',
      array: [],
      visible: true,
      color: '#0000ff',
      thickness: 1.5,
      width: 3,
      opacity: 1
    },
    marker: {
    color: '#808080',
    size: 8
  },
    type: 'scatter'
}

const layout = reactive({
    title: "My graph"
})


onMounted(() => {
    // createPlot()
    console.log(dataStore.getParams["critical"] || 0)
})

// error is crit times mgwr_results.bse[:,0]
// where mgwr_filtered_t[:,0] > crit

const createPlot = () => {
  const selectedCovariateArray =  dataStore.getParams["Y"][selectionStore.getSelectedK || "K0"]
  const totalXEntries = Array(selectedCovariateArray.length).fill(null).map((_, i) => i)
  let remainingXEntries = totalXEntries;
  console.log(remainingXEntries, "START")

  // const significantNegativeYData = significantNegative()
  // const significantNegativeYLength = significantNegativeYData.length
  // insignificantGraph.x = remainingXEntries.splice(0, significantNegativeYLength)
  // //significantNegativeGraph.x = Array(significantNegativeYLength).fill(null).map((_, i) => i)
  // significantNegativeGraph.y = significantNegativeYData.map((el) => el.data)
  // significantNegativeGraph.error_y.array = significantNegativeYData.map((el) => el.error)
  // remainingXEntries.splice(0, significantNegativeYLength)
  // console.log(remainingXEntries)

  const insignificantYData = insignificantY()
  console.log(insignificantYData)
  const insignificantYLength = insignificantYData.length
  insignificantGraph.x = remainingXEntries.splice(0, insignificantYLength)
  // insignificantGraph.x = Array(insignificantYLength).fill(null).map((_, i) => i)
  insignificantGraph.y = insignificantYData.map((el) => el.data)
  insignificantGraph.error_y.array = insignificantYData.map((el) => el.error)
  console.log("BEFORE 2 SPLICE", remainingXEntries)
  remainingXEntries.splice(0, insignificantYLength)
  console.log(remainingXEntries, "AFTER")

  // const significantPositiveYData = significantPositive()
  // const significantPositiveYLength = significantPositiveYData.length
  // insignificantGraph.x = remainingXEntries.splice(0, significantPositiveYLength)
  // //significantPositiveGraph.x = Array(significantPositiveYLength).fill(null).map((_, i) => i)
  // significantPositiveGraph.y = significantPositiveYData.map((el) => el.data)
  // significantPositiveGraph.error_y.array = significantPositiveYData.map((el) => el.error)
  // remainingXEntries.splice(0, significantPositiveYLength)
  // console.log(remainingXEntries)
  

  
  //[insignificantData, significantDataNegative, significantDataPositive]

  Plotly.newPlot("graph", [insignificantGraph]);
}

</script>

<template>
    <button @click="createPlot">CLICK</button>
    <div class="h-full w-full">
        <div id="graph" class="w-full h-full"></div>
        <Bandwith/>
    </div>
</template>