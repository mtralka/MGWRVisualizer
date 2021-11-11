import { useSelectionStore } from "@/store/selectionStore";
import * as geostats from "geostats";
import { useDataStore } from "../store/dataStore";


export const createCategoricalBuckets = async () => {

    const selectionStore = useSelectionStore()
    const dataStore = useDataStore()

    const numClasses = selectionStore.getSelectedNumberClasses - 1;
    const attributeData = dataStore.getSelectedAttributeData
    const type = selectionStore.getClassificationType
    const gstats = new geostats(attributeData);
    let buckets;
    switch (type) {
        case "EQI":
          buckets = gstats.getClassEqInterval(numClasses);
          break;
        case "QNT":
          buckets = gstats.getClassQuantile(numClasses);
          break;
        case "STD":
          buckets = gstats.getClassStdDeviation(numClasses);
          break;
        case "GPG":
          buckets = gstats.getClassGeometricProgression(numClasses);
          break;
        case "APG":
          buckets = gstats.getClassArithmeticProgression(numClasses);
          break;
        case "JNK":
          buckets = gstats.getClassJenks2(numClasses);
          break;
    }
    return buckets
}