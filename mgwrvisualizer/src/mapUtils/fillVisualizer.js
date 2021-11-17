// import App from "@/App.vue";
import { VizType } from "@/utils/types";
import { useDataStore } from "@/store/dataStore";
import { useSelectionStore } from "@/store/selectionStore";
import * as d3scaleChromatic from 'd3-scale-chromatic';
// import { createPinia } from 'pinia';
// import { createApp } from 'vue';


// const pinia = createPinia()
// const app = createApp(App)
// app.use(pinia)



export const getFillColor = (f) => {

    const selectionStore = useSelectionStore()

    const vizualizationType = selectionStore.getVizualizationType
    let color;
    switch(vizualizationType) {
        case VizType.BANDWITH: {
            color = getBandwithFillColor(f.properties.UID)
            break;
        }
        case VizType.ATTRIBUTE : {
            color = getAttributeFillColor(f.properties)
            break
        }
        default: {
            color = [0, 0, 0, 0]
            break;
        }
    }
    return color
}

const getBandwithFillColor = (targetUID) => {

    const selectionStore = useSelectionStore()
    const dataStore = useDataStore()

    const originUID = selectionStore.getCurrentUID
    const K = selectionStore.getSelectedK
    const W = dataStore.getW

    if (!originUID || !W || W[K][originUID][targetUID] <= 0){
        return [0, 0, 0, 0]
    }

    const colorArr = d3scaleChromatic.interpolateReds(W[K][originUID][targetUID]);
    return colorArr.match(/\d+/g).map(Number)
}

const getAttributeFillColor = (properties) => {

    const selectionStore = useSelectionStore()

    const buckets = selectionStore.getCategoricalBuckets
    const colorRamp = selectionStore.getColorRamp

    const targetAttribute = selectionStore.getSelectedAttribute
    const localAttribute = properties[targetAttribute]

    if (!buckets || !colorRamp || !targetAttribute || !localAttribute){
        return [0, 0, 0, 0]
    }

    for (const [idx, val] of buckets.entries()) {
        if (localAttribute <= val) {
            return colorRamp[idx]
        }
    }
}