import { createCategoricalBuckets } from '@/mapUtils/bucketGenerator';
import { ResultsType, VizType } from '@/utils/types';
import { defineStore } from 'pinia';

export const useSelectionStore = defineStore('selectionStore', {
  state: () => ({
    vizualizationType: VizType.BANDWITH,
    modelResultsType: ResultsType.MODEL_RESULTS,
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
    getModelResultsType(state){
      return state.modelResultsType
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
      console.log("DISPATCHING")
      const buckets = await createCategoricalBuckets()
      this.classificationBuckets = buckets
    },
  },
})