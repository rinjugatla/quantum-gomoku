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
</g>
