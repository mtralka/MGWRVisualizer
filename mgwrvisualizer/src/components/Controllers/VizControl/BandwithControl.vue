<script setup>
import SelectMenu from '@/components/SelectMenu.vue';
import { useDataStore } from '@/store/dataStore';
import { useSelectionStore } from '@/store/selectionStore';

const dataStore = useDataStore()
const selectionStore = useSelectionStore()

const handleCovariateChange = (event) => {
    selectionStore.selectedK = event.target.value
    console.log(event.target.value)
}

</script>

<template>
<div class="h-full w-full flex flex-col space-y-4">
    <p class="text-2xl font-bold">
        Bandwith
    </p>
    <div class="flex flex-col space-y-4">
        <div class="flex flex-row space-x-2 items-center justify-evenly">
            <p>
                Covariate (K)
            </p>
            <SelectMenu :data="dataStore.getCovariateKeys" placeholder="Select K" @change="handleCovariateChange">

            </SelectMenu>
        </div>
    </div>
</div>


</template>