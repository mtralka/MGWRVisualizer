<script setup>
import { useSelectionStore } from "@/store/selectionStore";
import { VizType } from "../../../mapUtils/types";
import RadioItem from "../../RadioItem.vue";
import AttributeVue from "./AttributeControl.vue";
import BandwithVue from "./BandwithControl.vue";

const selectionStore = useSelectionStore()


const handleRadioClick = (event) => {
    selectionStore.vizualizationType = event.target.value
}


</script>

<template>
    <div class="h-full w-full text-black flex flex-col items-center justify-center space-y-2">
        <div class="w-full bg-gray-400 flex justify-center py-2">
            <div class="flex flex-row space-x-4 font-bold font-medium flex-shrink-0 flex-grow-0 items-center">
                <p class="font-bold text-lg"> 
                    Visualize:
                </p>
                <RadioItem group-name="visualizationOption" :value="VizType.BANDWITH" :checked="true" @change="handleRadioClick">
                    Bandwith
                </RadioItem>
                <RadioItem  group-name="visualizationOption" :value="VizType.ATTRIBUTE" :checked="false"  @change="handleRadioClick">
                    Attribute
                </RadioItem>
            </div> 
        </div>
        <component :is="selectionStore.getVizualizationType === 'AT' ? AttributeVue : BandwithVue" class="flex-grow py-2 px-4"></component>
    </div>
</template>