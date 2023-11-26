import { writable } from "svelte/store";

export let isShowTurnNumber = writable<boolean>(false);
export let needInit = writable<boolean>(false);