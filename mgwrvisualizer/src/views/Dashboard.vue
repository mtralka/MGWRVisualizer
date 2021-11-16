<script setup>
import VizControl from "@/components/Controllers/VizControl/VizControl.vue";
import Map from "@/components/Map/Map.vue";
import Caterpillar from "../components/Caterpillar.vue";
import ColorKey from "../components/Map/ColorKey.vue";

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

        <div class="col-span-full md:col-span-1 md:row-span-1  box">
            <VizControl></VizControl>
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