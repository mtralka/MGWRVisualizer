<script setup>
import { useDataStore } from '@/store/dataStore';
import { useSelectionStore } from '@/store/selectionStore';
import { config, insigGraph, layout, sigNegativeGraph, sigPositiveGraph } from "@/utils/caterpillarSettings";
import Plotly from 'plotly.js-dist-min';
import { computed, onMounted, watch } from 'vue';
const dataStore = useDataStore()
const selectionStore = useSelectionStore()

watch(
  () => [selectionStore.selectedK],
  (state, prevState) => {
    createPlot()
  },
  { deep: true }
)
const critical = computed(() => dataStore.getParams["critical"])

// error is crit times mgwr_results.bse[:,0]
// where mgwr_filtered_t[:,0] | ctval  > crit

onMounted(() => {
    createPlot()
})

const assignData = (graphArray, dataArray) => {
  let graphData = {...graphArray}
  graphData.x = dataArray.map((el) => el.x)
  graphData.y = dataArray.map((el) => el.y)
  graphData.error_y.array = dataArray.map((el) => parseFloat(el.error))
  return graphData 
}

const createPlot = () => {
  const selectedCovariateArray =  dataStore.getParams[selectionStore.getSelectedK || "K0"] || []
  const sortedArray = selectedCovariateArray.sort((a,b) => a.y - b.y)

  const significantNegativeArray = sortedArray.filter((el) => el.ctval < -1. * critical.value)
  const significantNegative = assignData(sigNegativeGraph, significantNegativeArray)
  
  const significantPositiveArray = sortedArray.filter((el) => el.ctval >  critical.value)
  const significantPositive = assignData(sigPositiveGraph, significantPositiveArray )
  
  const insignificantArray = sortedArray.filter((el) => el.ctval > -1 * critical.value && el.ctval < critical.value)
  const insignificant = assignData(insigGraph, insignificantArray)
  
  Plotly.newPlot("graph", [significantNegative, significantPositive, insignificant], layout, config);
}

</script>

<template>
    <div class="h-full w-full">
        <div id="graph" class="w-full h-full"></div>
    </div>
</template>
