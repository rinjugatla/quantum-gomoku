<script lang="ts">
    export let gridInterval: number;
    const shadowOffsetX = -2;
    const shadowOffsetY = 2;

    interface IStonePosition {
        x: number;
        y: number;
    }

    export let blackStones: IStonePosition[] = [];
    export let whiteStones: IStonePosition[] = [];
    export let previewNextStone: IStonePosition | null;
    let isNextWhite = blackStones.length > whiteStones.length;
</script>

<g class="shadow">
    <g class="black">
        {#each blackStones as stone}
            <circle
                cx={gridInterval * stone.x + shadowOffsetX}
                cy={gridInterval * stone.y + shadowOffsetY}
                r="15.68"
                fill="rgba(0, 0, 0, 0.3)"
            />
        {/each}
    </g>
    <g class="white">
        {#each whiteStones as stone}
            <circle
                cx={gridInterval * stone.x + shadowOffsetX}
                cy={gridInterval * stone.y + shadowOffsetY}
                r="15.68"
                fill="rgba(0, 0, 0, 0.3)"
            />
        {/each}
    </g>

    <g class="preview">
        {#if previewNextStone !== null}
            <circle
                cx={previewNextStone.x + shadowOffsetX}
                cy={previewNextStone.y + shadowOffsetY}
                r="15.68"
                fill="rgba(0, 0, 0, 0.2)"
            />
        {/if}
    </g>
</g>
<g class="stone">
    <g class="black">
        {#each blackStones as stone}
            <circle
                cx={gridInterval * stone.x}
                cy={gridInterval * stone.y}
                r="15.68"
                fill="rgba(0, 0, 0, 3)"
            />
        {/each}
    </g>

    <g class="white">
        {#each whiteStones as stone}
            <circle
                cx={gridInterval * stone.x}
                cy={gridInterval * stone.y}
                r="15.68"
                fill="rgba(255, 255, 255, 3)"
            />
        {/each}
    </g>

    <g class="preview">
        {#if previewNextStone !== null}
            <circle
                cx={previewNextStone.x}
                cy={previewNextStone.y}
                r="15.68"
                fill={isNextWhite ? 'rgba(255, 255, 255, 0.75)' : 'rgba(0, 0, 0, 0.75)'}
            />
        {/if}
    </g>
</g>
