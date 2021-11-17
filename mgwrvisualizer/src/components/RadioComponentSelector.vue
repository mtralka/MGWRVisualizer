<script setup>
import RadioItem from '@/components/RadioItem.vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    data: {
        type: Array,
        required: true,
    },
    component: {
        required: true
    }
})

const emit = defineEmits(['change'])

const handleChange = (event) => {
    emit('change', event.target.value)
}

</script>

<template>
    <div class="h-full w-full text-black flex flex-col items-center justify-center space-y-2">
        <div class="w-full bg-gray-400 flex justify-center py-2">
            <div class="flex flex-row space-x-4 font-bold font-medium flex-shrink-0 flex-grow-0 items-center">
                <p class="font-bold text-lg"> 
                    {{name}}
                </p>
                <RadioItem 
                v-for="item in data"
                :v-key="item.name"
                :group-name="name"
                :value="item.value"
                :checked="item.checked"
                @change="handleChange">
                    {{item.name}}
                </RadioItem>
            </div> 
        </div>
        <component :is="component" class="flex-grow py-2 px-4"></component>
    </div>
</template>