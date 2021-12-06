import { defineStore } from 'pinia'
import { useSelectionStore } from './selectionStore'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    geoJsonData: {},
    W: {},
    params: {},
    covaraites: {},
    diagnosticInfo: {},
    modelResults: {}
  }),
  getters: {
    getGeoJsonData(state){
      return state.geoJsonData || {}
    },
    getW(state){
      return state.W
    },
    getCovariateKeys(state){
      return Object.keys(state.covaraites)
    },
    getCovariateInfo(state) {
      return state.covaraites
    },
    getGeoJsonPropertyKeys(state){
      return Object.keys(state.geoJsonData.features[0].properties)
    },
    getSelectedAttributeData(state){
      const selectionStore = useSelectionStore()
      const selectedAttr = selectionStore.getSelectedAttribute
      return state.geoJsonData.features.map(el => el.properties[selectedAttr])
    },
    getSelectedCovariateInfo(state){
      const selectionStore = useSelectionStore()
      const selectedK = selectionStore.getSelectedK || "K0"
      return state.covaraites[selectedK]
    },
    getParams(state){
      return state.params
    },
    getDiagnosticInformation(state){
      return state.diagnosticInfo
    },
    getModelResults(state){
      return state.modelResults
    }
  },
  actions: {
  },
})
