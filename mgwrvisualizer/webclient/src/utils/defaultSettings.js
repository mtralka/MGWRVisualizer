import { BucketTypes } from "geobuckets/dist/src"

export const MAP_STYLES = {
    SATELLITE: 'mapbox://styles/mapbox/satellite-v9',
    DARK: 'mapbox://styles/mapbox/dark-v10'
} 


export const INITIAL_VIEW_STATE = {
    latitude: 36,
    longitude: -80,
    zoom: 4,
    pitch: 0,
    bearing: 0,
}

export const MAPBOX_SETTINGS = {
    container: 'map',
    width: '100%',
    style: MAP_STYLES.DARK,
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch
}


export const DECKGL_SETTINGS = {
    canvas: "deck-canvas",
    width: "100%",
    height: "100%",
    controller: true,
    initialViewState: INITIAL_VIEW_STATE,
}

export const CLASSIFICATION_CATEGORIES = [

    {
      label: "Equal Interval",
      value: BucketTypes.EQI
    },
    {
      label: "Quantile",
      value: BucketTypes.QNT
    },
    {
      label: "Standard Deviation",
      value: BucketTypes.STD
    },
    {
      label: "Geometric Progession",
      value: BucketTypes.GPG
    },
    {
      label: "Arithmetic Progression",
      value: BucketTypes.APG
    },
    {
      label: "Jenks",
      value: BucketTypes.JNK
    },
  ]


