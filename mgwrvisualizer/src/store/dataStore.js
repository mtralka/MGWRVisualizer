import { defineStore } from 'pinia'
import { useSelectionStore } from './selectionStore'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    geoJsonData: {},
    W: {},
    params: {}
  }),
  getters: {
    getGeoJsonData(state){
      return state.geoJsonData || {}
    },
    getW(state){
      return state.W
    },
    getCovariateKeys(state){
      return Object.keys(state.W)
    },
    getGeoJsonPropertyKeys(state){
      return Object.keys(state.geoJsonData.features[0].properties)
    },
    getSelectedAttributeData(state){
      const selectionStore = useSelectionStore()
      const selectedAttr = selectionStore.getSelectedAttribute
      return state.geoJsonData.features.map(el => el.properties[selectedAttr])
    },
    getParams(state){
      return state.params
    }
  },
  actions: {
  },
})