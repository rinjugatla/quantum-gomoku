<script lang="ts">
    import { isShowTurnNumber, needInit } from '$lib/store';
    import { Checkbox, Button } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    let checkedShowTurnNumber: boolean;
    $: {
        isShowTurnNumber.set(checkedShowTurnNumber);
    }

    onMount(() => {
        checkedShowTurnNumber = get(isShowTurnNumber);
    });
</script>

<div class="flex col">
    <Button on:click={() => {needInit.set(true)}}>初期化</Button>
    <Checkbox bind:checked={checkedShowTurnNumber}>着手番号</Checkbox>
</div>
