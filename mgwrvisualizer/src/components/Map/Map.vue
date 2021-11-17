<script setup>
import DeckGL from '@/components/Map/DeckGL.vue';
import GeoJsonLayer from "@/components/Map/GeoJsonLayer.vue";
import Mapbox from '@/components/Map/Mapbox.vue';
import { getFillColor } from '@/mapUtils/fillVisualizer';
import { useDataStore } from "@/store/dataStore";
import { useSelectionStore } from '@/store/selectionStore';
import { MAP_STYLES } from '@/utils/defaultSettings';
import { VizType } from '@/utils/types';
import { onMounted, reactive } from 'vue';

const dataStore = useDataStore()
const selectionStore = useSelectionStore()

const accessToken =
  'pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA'

let passData = reactive({data: null})

const updateTriggers = {
    getFillColor: [
        selectionStore.getCurrentUID,
        selectionStore.getSelectedK
    ]
}

const renderTriggers = [
    selectionStore.getCurrentUID,
    selectionStore.getCurrentK
]

onMounted(()=> {
    passData.data = dataStore.getGeoJsonData
})

const handleHover = ({ info, event }) => {

    if (!info.object){
        return
    }

    if (selectionStore.getVizualizationType != VizType.BANDWITH){
        return
    }

    selectionStore.selectedUID = info.object.properties.UID
}

const handleClick = ({ info, event }) => {


}
</script>

<template>
    <div class="relative h-full w-full">
    <DeckGL>
        <Mapbox :access-token="accessToken" :map-style="MAP_STYLES.DARK"></Mapbox>
        <GeoJsonLayer
        :data="passData.data"
        :pickable="true" :stroked="true"
        :filled="true" :extruded="false"
        :wireframe="true" :lineWidthScale="20" 
        :lineWidthMinPixels="2" 
        :getRadius="100" :getLineWidth="1"
        :getFillColor="getFillColor" :getLineColor="[160, 160, 180, 200]"
        @hover="handleHover" @click="handleClick"
        >
        </GeoJsonLayer>
    </DeckGL>
    <slot></slot>
    </div>
</template>