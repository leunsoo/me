// 공개 API — 바깥에서는 이 파일을 통해서만 import.
// (@/features/workshop/entries 처럼 내부 경로로 직접 들어오지 않기)
export { WorkshopList } from "./components/WorkshopList";
export { EntryHeader } from "./components/EntryHeader";
export { WORKSHOP_CONTENT } from "./content-map";
export { WORKSHOP_ENTRIES, getEntry, sortedEntries } from "./entries";
export type { WorkshopEntry } from "./entries";
