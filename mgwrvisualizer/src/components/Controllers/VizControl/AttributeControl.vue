<script setup>
import SelectMenu from '@/components/SelectMenu.vue';
import Slider from "@/components/Slider.vue";
import { useDataStore } from '@/store/dataStore';
import { useSelectionStore } from '@/store/selectionStore';
import { CLASSIFICATION_CATEGORIES } from '@/utils/defaultSettings';
const dataStore = useDataStore()
const selectionStore = useSelectionStore()


let value  = 10

const handleAttributeChange = (event) => {
    selectionStore.selectedAttribute = event.target.value
    selectionStore.generateBuckets()
}

const handleClassificationChange = (event) => {
    console.log("RECEIVED", event.target.value)
    selectionStore.classificationType = event.target.value
    selectionStore.generateBuckets()
}
const handleNumberClassesChange = (event) => {
    selectionStore.selectedNumberClasses = event.target.value
    selectionStore.generateBuckets()
}

</script>


<template>

    <div class="h-full w-full flex flex-col space-y-4">
        <p class="text-2xl font-bold">
            Attribute
        </p>
        <div class="flex flex-col space-y-4 justify-evenly">
            <div class="flex flex-row space-x-10 items-center justify-evenly">
                <p class="w-full text-right">
                    Attribute
                </p>
                <SelectMenu
                :data="dataStore.getGeoJsonPropertyKeys" 
                placeholder="Select Attr" class="flex-shrink-0" 
                @change="handleAttributeChange" >

                </SelectMenu>
            </div>
            <div class="flex flex-row space-x-10 items-center justify-evenly">
                <p class="w-full text-right">
                    Classification Scheme
                </p>
                <SelectMenu
                :data="CLASSIFICATION_CATEGORIES" 
                label-by="label" key-by="value" 
                placeholder="Select Method" 
                class="flex-shrink-0" @change="handleClassificationChange" >

                </SelectMenu>
            </div>
            <div class="flex flex-row space-x-10 items-center justify-evenly">
                <p class="w-full text-right">
                    Number of Classes
                </p>
                <div class="w-1/2 flex-shrink-0">
                <Slider
                    v-model="value" 
                    :min="2"
                    :max="8"
                    @change="handleNumberClassesChange"
                    class="flex-shrink-0 slider"
                >
                </Slider>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style scope>

.slider {
    --slider-handle-width: 46px;
}
</style>