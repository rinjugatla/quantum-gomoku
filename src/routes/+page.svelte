<script lang="ts">
    import Board from '$lib/igo/Board.svelte';
    import Setting from '$lib/igo/Setting.svelte';

    let settingComponent: Setting;
</script>

<div class="m-3">
    <Board {settingComponent} />
    <Setting bind:this={settingComponent} />
</div>
