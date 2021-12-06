<script setup>


const props = defineProps({
//   label: {
//     type: String,
//     required: true
//   },
  groupName: {
      type: String,
      required: true
  },
  checked: {
      type: Boolean,
      required: true,
      default: false
  },
  value: {
      type: String || Object || Number,
      required: true
  },
})


</script>


<template>
    <div class="flex flex-row items-center space-x-2" >
        <label class="cursor-pointer label space-x-3">
            <slot></slot>   
        </label>  
        <input type="radio" :name="groupName" :checked=checked class="radio radio-primary"  :value="value">
    </div> 

</template>