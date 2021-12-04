<script setup>
import { useSelectionStore } from '@/store/selectionStore';
import { VizType } from '@/utils/types';
import * as d3scaleChromatic from 'd3-scale-chromatic';
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

<div class="min-w-30 md:min-w-48 bg-white z-50 w-40 flex justify-center flex-col ">
    <div v-if="selectionStore.getVizualizationType == VizType.ATTRIBUTE && selectionStore.getSelectedAttribute != null" class="py-1 md:py-2">
        <div v-for="(bucket, index) in selectionStore.getCategoricalBuckets" :key="index"  class="key" > 
            <div class="text">
                {{selectionStore.getCategoricalBuckets[index - 1] ? selectionStore.getCategoricalBuckets[index - 1].toFixed(2).toString() : "min"}}
                -
                {{bucket.toFixed(2).toString()}}
            </div>
            <div
            class="color"
            :style="{'background-color' : getColor(index)}"
            >
            </div>
        </div>
    </div>
    <div v-if="selectionStore.getVizualizationType == VizType.BANDWITH" class="py-1 md:py-2">
        <div v-for="(number, index) in bandwithRange" :key="index"  class="key" > 
            <div class="text">
                {{bandwithRange[index] ? bandwithRange[index - 1]  : "0"}}
                -
                {{number }}
            </div>
            <div
            class="color"
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

.key {
    @apply flex flex-row justify-evenly w-full;
}

.key .text {
    @apply flex-shrink-0 w-[4.5rem] flex-grow font-mono text-xs text-black px-1 md:px-2 leading-none tracking-tighter flex justify-center items-center;
}

.key .color {
    @apply flex-grow min-h-8 flex-grow-[3];
}
</style>