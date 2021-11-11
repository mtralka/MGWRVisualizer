<script setup>
import { VizType } from '@/mapUtils/types';
import * as d3scaleChromatic from 'd3-scale-chromatic';
import { useSelectionStore } from '../../store/selectionStore';
const selectionStore = useSelectionStore()

const bandwithRange = [
    0, .05, .1, .2, .3, .4, .5, .6, .7, .8, .9
]

const getColor = (index) => {
    const ramp = selectionStore.getColorRamp[index]
    const r = ramp[0]
    const g = ramp[1]
    const b = ramp[2]
    return `rgb(${r}, ${g}, ${b})` 
}
</script>

<template>

<div class="min-w-48 w-auto bg-white z-50 w-40 flex justify-center flex-col ">
    <div v-if="selectionStore.getVizualizationType == VizType.ATTRIBUTE && selectionStore.getSelectedAttribute != null" class="py-2">
        <div v-for="(bucket, index) in selectionStore.getCategoricalBuckets" :key="index"  class="flex flex-row justify-evenly w-full" > 
            <div class="flex-shrink-0 w-[4.5rem] flex-grow font-mono text-xs text-black px-2 leading-none tracking-tighter flex justify-center items-center">
                {{selectionStore.getCategoricalBuckets[index - 1] ? selectionStore.getCategoricalBuckets[index - 1].toFixed(2).toString() : "min"}}
                -
                {{bucket.toFixed(2).toString()}}
            </div>
            <div
            class=" flex-grow  min-h-8 flex-grow-[3]"
            :style="{'background-color' : getColor(index)}"
            >
            </div>
        </div>
    </div>
    <div v-if="selectionStore.getVizualizationType == VizType.BANDWITH" class="py-2">
        <div v-for="(number, index) in bandwithRange" :key="index"  class="flex flex-row justify-evenly w-full" > 
            <div class="flex-shrink-0 w-[4.5rem] flex-grow font-mono text-xs text-black px-2 leading-none tracking-tighter flex justify-center items-center">
                {{bandwithRange[index] ? bandwithRange[index - 1]  : "0"}}
                -
                {{number }}
            </div>
            <div
            class=" flex-grow  min-h-8 flex-grow-[3]"
            :style="{'background-color' : d3scaleChromatic.interpolateReds(number)}"
            >
            </div>
        </div>
    </div>
</div>


</template>

<style>
select {
    background-color: (233,299,321);
}
</style>