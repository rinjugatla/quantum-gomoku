<script lang="ts">
    import { Checkbox, Button } from 'flowbite-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const onClickedNeedInitDipatch = () => {
        dispatch('onClickedNeedInit');
    };

    let needShowTurnNumber = false;
    const onChangedShowTurnNumberDispatch = () => {
        dispatch('onChangedShowTurnNumber', { needShowTurnNumber: needShowTurnNumber });
    };
</script>

<div class="flex col">
    <Button on:click={onClickedNeedInitDipatch}>初期化</Button>
    <Checkbox on:change={onChangedShowTurnNumberDispatch} bind:checked={needShowTurnNumber}
        >着手番号</Checkbox
    >
</div>
