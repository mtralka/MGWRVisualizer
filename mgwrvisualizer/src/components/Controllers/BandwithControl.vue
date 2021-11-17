<script setup>
import SelectMenu from '@/components/SelectMenu.vue';
import { useDataStore } from '@/store/dataStore';
import { useSelectionStore } from '@/store/selectionStore';

const dataStore = useDataStore()
const selectionStore = useSelectionStore()

const handleCovariateChange = (event) => {
    selectionStore.selectedK = event.target.value
}

</script>

<template>
    <div class="h-full w-full flex flex-col space-y-4">
        <div class="flex flex-row space-x-2 items-center justify-evenly">
            <p class="font-bold text-lg">
                Covariate (K)
            </p>
            <SelectMenu :data="dataStore.getCovariateKeys" placeholder="Select K" @change="handleCovariateChange"/>
        </div>
    </div>
</template>

