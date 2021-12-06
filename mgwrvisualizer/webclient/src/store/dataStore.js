import { defineStore } from 'pinia'
import { useSelectionStore } from './selectionStore'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    geoJsonData: {
      "type": "FeatureCollection","features": []},
    W: {},
    params: {},
    covaraites: {},
    diagnosticInfo: {},
    modelResults: {}
  }),
  getters: {
    getGeoJsonData(state){
      return state.geoJsonData
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
    async loadData(dataset) {
      const response = await fetch(dataset)
    
      if (response.ok) {
        const data = await response.json()
        this.setData(data)
      } else {
        console.error("Data fetching error")
      }
    },
    async setData(data) {
      this.geoJsonData = data.geojson
      this.W = data.W
      this.params = data.parameters
      this.covaraites = data.covariates
      this.diagnosticInfo = data.diagnosticInfo
      this.modelResults = data.modelResults
    },
  },
})
