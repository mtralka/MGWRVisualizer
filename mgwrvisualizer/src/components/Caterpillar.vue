<script setup>
import Bandwith from "@/components/Controllers/VizControl/BandwithControl.vue";
import Plotly from 'plotly.js-dist-min';
import { computed, onMounted, reactive, watch } from 'vue';
import { useDataStore } from '../store/dataStore';
import { useSelectionStore } from '../store/selectionStore';
// import { SCATTER_DEFAULT } from "@/utils/defaultSettings.js";
const dataStore = useDataStore()
const selectionStore = useSelectionStore()

watch(
  () => [selectionStore.selectedK],
  (state, prevState) => {
    //createPlot()
  },
  { deep: true }
)
const critical = computed(() => dataStore.getParams["critical"] || 0)

const SCATTER_DEFAULT = {
  x: [],
  y: [],
  error_y: {
    type: 'data',
    array: [],
    visible: true,
    color: "",
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

// error is crit times mgwr_results.bse[:,0]
// where mgwr_filtered_t[:,0] | ctval  > crit

const layout = reactive({
    title: "My graph"
})


onMounted(() => {
    // createPlot()

})

// error is crit times mgwr_results.bse[:,0]
// where mgwr_filtered_t[:,0] > crit

const assignData = (graphArray, dataArray, errorColor) => {
  graphArray.x = dataArray.map((el) => el.x)
  graphArray.y = dataArray.map((el) => el.y)
  graphArray.error_y.array = dataArray.map((el) => el.error)

  if (errorColor) {
    graphArray.error_y.color = errorColor
  }
  
  return graphArray
}

const createPlot = () => {
  const selectedCovariateArray =  dataStore.getParams["Y"][selectionStore.getSelectedK || "K0"]
  
  const significantNegativeArray = selectedCovariateArray.filter((el) => el.ctval < -1. * critical.value)
  const significantNegatve = assignData(SCATTER_DEFAULT, significantNegativeArray, '#ff0000')

  const significantPositiveArray = selectedCovariateArray.filter((el) => el.ctval >  critical.value)
  const significantPositive = assignData(SCATTER_DEFAULT, significantPositiveArray, '#0000ff')

  const insignificantArray = selectedCovariateArray.filter((el) => el.ctval < -1. * critical.value && el.ctval > critical.value)
  const insignificant = assignData(SCATTER_DEFAULT, significantNegativeArray)

  Plotly.newPlot("graph", [significantNegatve, significantPositive, insignificant]);
}

</script>

<template>
    <button @click="createPlot">CLICK</button>
    <div class="h-full w-full">
        <div id="graph" class="w-full h-full"></div>
        <Bandwith/>
    </div>
</template>