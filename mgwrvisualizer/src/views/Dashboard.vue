<script setup>
import Caterpillar from "@/components/Caterpillar.vue";
import AttributeVue from "@/components/Controllers/AttributeControl.vue";
import ColorKey from "@/components/Map/ColorKey.vue";
import Map from "@/components/Map/Map.vue";
import RadioComponentSelector from "@/components/RadioComponentSelector.vue";
import CovariatesVue from "@/components/Visualizers/Covariates.vue";
import { VizType } from "@/mapUtils/types";
import { useSelectionStore } from "@/store/selectionStore";
import { computed } from 'vue';



const selectionStore = useSelectionStore()

const activeVizComponent = computed(() => selectionStore.getVizualizationType === 'AT' ? AttributeVue : CovariatesVue)

const vizControlOptions = [
    {value: VizType.BANDWITH, checked: true, name: 'Bandwith' },
    {value: VizType.ATTRIBUTE, checked: false,  name: 'Attribute'}
]

</script>


<template>
<div class=" w-full min-h-full px-3 md:px-10 overflow-hidden">
    <div class="w-full min-h-full grid-cols-2 grid gap-1.5rem py-10 ">
        <div class="col-span-full row-span-2 h-[32rem] relative">
            <Map>
                <ColorKey class="absolute right-10 bottom-10 z-50"></ColorKey>
            </Map>
            
        </div>
        <div class="col-span-full md:col-span-1 md:row-span-1  box">
            BOX 1
        </div>

        <!-- Viz Control -->
        <div class="col-span-full md:col-span-1 md:row-span-1  box">
            <RadioComponentSelector :data="vizControlOptions" name="Visualize:" @change="handleRadioClick" :component="activeVizComponent"/>
        </div>

        <div class="col-span-full row-span-2 h-[32rem] box">
            <Caterpillar>
                
            </Caterpillar>
        </div>



    </div>


</div>

</template>


<style scoped>
.box {
    @apply w-full min-h-56 pb-3;
    background-color: #fefefe;
}

</style>