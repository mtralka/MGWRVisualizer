import { useDataStore } from "@/store/dataStore";
import { useSelectionStore } from "@/store/selectionStore";
import { generateBuckets } from "geobuckets";

export const createCategoricalBuckets = async () => {

    const selectionStore = useSelectionStore()
    const dataStore = useDataStore()

    const numClasses = selectionStore.getSelectedNumberClasses - 1;
    const attributeData = dataStore.getSelectedAttributeData || []
    const type = selectionStore.getClassificationType
    const buckets = await generateBuckets(type, attributeData, numClasses)
    return buckets
}