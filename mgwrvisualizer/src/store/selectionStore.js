import { createCategoricalBuckets } from '@/mapUtils/bucketGenerator';
import { VizType } from '@/mapUtils/types';
import { defineStore } from 'pinia';

export const useSelectionStore = defineStore('selectionStore', {
  state: () => ({
    vizualizationType: VizType.BANDWITH,
    selectedK: null,
    selectedUID: null,
    selectedAttribute: null,
    selectedNumberClasses: 7,
    classificationType: "JNK",
    classificationBuckets: null,
    colorRamp:  [[230, 171, 2], [217, 95, 2], [117, 112, 179],
    [231, 41, 138], [102, 166, 30], [230, 171, 2], [166, 118, 29], [102, 102, 102]]
  }),
  getters: {
    getVizualizationType(state){
      return state.vizualizationType
    },
    getSelectedK(state) {
      return state.selectedK
    },
    getSelectedAttribute(state){
      return state.selectedAttribute
    },
    getCurrentUID(state) {
      return state.selectedUID
    },
    getClassificationBuckets(state){
      return state.classificationBuckets
    },
    getSelectedNumberClasses(state){
      return state.selectedNumberClasses
    },
    getColorRamp(state){
      return state.colorRamp
    },
    getCategoricalBuckets(state) {
      return state.classificationBuckets
    },
    getClassificationType(state) {
      return state.classificationType
    },
  },
  actions: {
    async generateBuckets() {
      const buckets = await createCategoricalBuckets()
      console.log({buckets})
      this.classificationBuckets = buckets
    },
  },
})