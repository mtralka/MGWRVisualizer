<script setup>
import RadioComponentSelector from "@/components/RadioComponentSelector.vue";

import { useSelectionStore } from "@/store/selectionStore";

const selectionStore = useSelectionStore()


const handleRadioClick = (selection) => {
    selectionStore.vizualizationType = selection
}

// DI - Diagnostic Information
// MR - Model Results
const options = [
    {value: "DI", checked: false, name: 'Diagnostic Information' },
    {value: "MR", checked: true,  name: 'Model Results'}
]

</script>

<template>
    <RadioComponentSelector :data="options" name="Visualize:" @change="handleRadioClick" :component="activeComponent"/>
</template>