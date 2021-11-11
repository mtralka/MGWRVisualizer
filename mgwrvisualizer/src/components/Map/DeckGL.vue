<script setup>
import { DECKGL_SETTINGS } from "@/utils/defaultSettings";
import { Deck } from '@deck.gl/core';
import { onMounted, provide, reactive, useAttrs } from 'vue';
import { useSelectionStore } from "../../store/selectionStore";

const selectionStore = useSelectionStore()
const attrs = useAttrs()

let deck = null

const viewState = reactive({
  latitude: 36.102376,
  longitude: -80.649277,
  zoom: 4,
  pitch: 0,
  bearing: 0,
})

onMounted(() => {
  deck = new Deck({
    onViewStateChange: ({ viewState }) => handleViewChange(viewState),
    ...DECKGL_SETTINGS,
    ...attrs
  })
})

function handleViewChange(newState) {
  viewState.longitude = newState.longitude
  viewState.latitude = newState.latitude
  viewState.zoom = newState.zoom
}

function updateLayer(newLayer) {
  
  if (!deck) {
    console.log("NO DECK")
    return
  }
  deck.setProps({ layers: [newLayer] })
}
provide('viewState', viewState)
provide('updateLayer', updateLayer)
</script>

<template>
  <div class="relative h-full w-full">
    <div class="h-full w-full absolute top-0 left-0">
      <slot></slot>
      <canvas
        id="deck-canvas"
        class="h-full w-full absolute top-0 left-0"
      ></canvas>
    </div>
  </div>
</template>