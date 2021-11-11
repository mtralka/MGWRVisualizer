<script setup>
import Plotly from 'plotly.js-dist-min';
import { onMounted, reactive, watch } from 'vue';
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

const data = {
    x: dataStore.getParams["X"],
    //y: dataStore.getParams["Y"][selectionStore.getSelectedAttribute]["data"],
    //.sort(function(a, b){return a.data - b.data}),
    // error_y: {
    //   type: 'data',
    //   array: dataStore.getParams["Y"]["K0"]["ctval"],
    //   visible: true
    // },
    // error_y: {

    //   type: 'percent',

    //   value: 95,

    //   visible: true

    // },
    marker: {
    color: '#85144B',
    size: 8
  },
    type: 'scatter'
}

const layout = reactive({
    title: "My graph"
})


onMounted(() => {
    createPlot()
})

const createPlot = () => {
    data.y = dataStore.getParams["Y"][selectionStore.selectedK || "K0"]["data"] 
    Plotly.newPlot("graph", [data]);
}

</script>

<template>
    <button @click="createPlot">CLICK</button>
    <div class="h-full w-full">
        <div id="graph" class="w-full h-full"></div>
    </div>
</template>