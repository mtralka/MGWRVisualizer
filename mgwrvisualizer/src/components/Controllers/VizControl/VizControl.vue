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
    <div class="h-full w-full py-2 px-4 text-black flex flex-col items-center">
        <div class="flex flex-row space-x-4 font-bold font-medium flex-shrink-0 flex-grow-0">
            <RadioItem group-name="visualizationOption" :value="VizType.BANDWITH" :checked="true" @change="handleRadioClick">
                Bandwith
            </RadioItem>
            <RadioItem  group-name="visualizationOption" :value="VizType.ATTRIBUTE" :checked="false"  @change="handleRadioClick">
                Attribute
            </RadioItem>
        </div> 
        <component :is="selectionStore.getVizualizationType === 'AT' ? AttributeVue : BandwithVue" class="flex-grow"></component>
    </div>
</template>