<script setup>
import { useDataStore } from '@/store/dataStore';

const dataStore = useDataStore()

</script>

<template>
    <div class="h-full w-full flex flex-col space-y-4 items-center">
        <table class="">
            <tr v-for="(value,name, idx) in dataStore.getModelResults" :key="idx"
            class="flex flex-row space-x-2 justify-evenly">
                <td class="w-full px-4 text-gray-800">{{name}}</td>
                <td class="px-1 min-w-[100px]">{{value}}</td>
            </tr>
        </table> 
    </div>
</template>

<style>
table td:nth-child(1) {
    @apply text-left font-bold pr-3;
}

table td:nth-child(1)::after {
    content: ':';
}

table td {
    @apply ;
}

table tr {
    @apply space-x-3;
}
</style>