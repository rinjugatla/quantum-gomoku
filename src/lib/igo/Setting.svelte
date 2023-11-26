<script lang="ts">
    import { isShowTurnNumber } from '$lib/store';
    import { Checkbox } from 'flowbite-svelte';
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

<div>
    <Checkbox bind:checked={checkedShowTurnNumber}>着手番号</Checkbox>
</div>
