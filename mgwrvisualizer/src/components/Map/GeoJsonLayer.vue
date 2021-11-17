<script setup>
import { useSelectionStore } from '@/store/selectionStore';
import { GeoJsonLayer } from '@deck.gl/layers';
import { inject, useAttrs, watch } from 'vue';


const attrs = useAttrs()
const updateLayer = inject('updateLayer')
const selectionStore = useSelectionStore()
const emit = defineEmits(['click', 'hover'])

const layer = createLayer()

// onMounted(() => {
//   updateLayer(createLayer())
// })

watch(
  () => [attrs, selectionStore.getCurrentUID, selectionStore.getSelectedK, selectionStore.getClassificationBuckets],
  () => {
    createLayer()
  },
  { deep: false }
)


function createLayer() {
updateLayer(
    new GeoJsonLayer({
        id: "geojson-layer",
        ...attrs,
        updateTriggers: {
            getFillColor: [
                selectionStore.getCurrentUID,
                selectionStore.getSelectedK,
                selectionStore.getSelectedNumberClasses,
                selectionStore.getClassificationType,
                selectionStore.getSelectedAttribute
            ]
        },
        onClick: (info, event) => emit('click', { info, event }),
        onHover: (info, event) => emit('hover', { info, event }),
        
    })
  )
}

</script>

<template>
</template>