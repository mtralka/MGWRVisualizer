<script setup>
import AttributeVue from "@/components/Controllers/AttributeControl.vue";
import RadioComponentSelector from "@/components/RadioComponentSelector.vue";
import CovariatesVue from "@/components/Visualizers/Covariates.vue";
import { VizType } from "@/mapUtils/types";
import { useSelectionStore } from "@/store/selectionStore";
import { computed } from 'vue';

const selectionStore = useSelectionStore()

const activeComponent = computed(() => selectionStore.getVizualizationType === 'AT' ? AttributeVue : CovariatesVue)

const handleRadioClick = (selection) => {
    selectionStore.vizualizationType = selection
}

const options = [
    {value: VizType.BANDWITH, checked: true, name: 'Bandwith' },
    {value: VizType.ATTRIBUTE, checked: false,  name: 'Attribute'}
]

</script>

<template>
    <RadioComponentSelector :data="options" name="Visualize:" @change="handleRadioClick" :component="activeComponent"/>
</template>