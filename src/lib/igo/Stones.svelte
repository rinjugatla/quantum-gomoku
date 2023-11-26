<script lang="ts">
    import { isShowTurnNumber } from '$lib/store';
    import type { IMousePosition } from '$lib/types';
    import isEqual from 'lodash/isEqual';
    import { onDestroy } from 'svelte';

    export let gridInterval: number;
    const shadowOffsetX = -2;
    const shadowOffsetY = 2;

    interface IStonePosition {
        x: number;
        y: number;
    }

    export let stones: IStonePosition[] = [];
    export let previewNextStone: IStonePosition | null;
    $: isNextWhite = stones.length % 2 == 1;

    export const ArrangementStone = (position: IMousePosition | null) => {
        if (position === null) {
            return;
        }

        const nextStone = convertMousePositionToStonePosition(position);
        const exists = existsStone(nextStone);
        if (exists) {
            return;
        }

        stones = [...stones, nextStone];
    };

    const convertMousePositionToStonePosition = (position: IMousePosition): IStonePosition => {
        const stonePos = {
            x: Math.round(position.x / gridInterval),
            y: Math.round(position.y / gridInterval)
        };
        return stonePos;
    };

    /**
     * 引数の座標にすでに石があるか
     * @param position 石の配置位置
     */
    const existsStone = (position: IStonePosition): boolean => {
        const exists = stones.filter((stone) => isEqual(stone, position)).length > 0;
        return exists;
    };

    let _isShowTurnNumber: boolean;
    const unsubscriber = isShowTurnNumber.subscribe((value) => {
        _isShowTurnNumber = value;
    });

    onDestroy(() => {
        unsubscriber();
    })
</script>

<g class="shadow">
    <g class="arranged">
        {#each stones as stone, i}
            <circle
                cx={gridInterval * stone.x + shadowOffsetX}
                cy={gridInterval * stone.y + shadowOffsetY}
                r="15.68"
                fill={i % 2 == 0 ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.2)'}
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
    <g class="arranged">
        {#each stones as stone, i}
            <circle
                cx={gridInterval * stone.x}
                cy={gridInterval * stone.y}
                r="15.68"
                fill={i % 2 == 0 ? 'rgba(0, 0, 0, 3)' : 'rgba(255, 255, 255, 3)'}
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
<g class="stone-turn">
    <g class="arranged">
        {#if _isShowTurnNumber}
            {#each stones as stone, i}
                <text
                    x={gridInterval * stone.x}
                    y={gridInterval * stone.y}
                    fill={i % 2 == 0 ? 'rgba(255, 255, 255, 3)' : 'rgba(0, 0, 0, 3)'}
                    style="font-weight:bold;font-family:arial;font-size:18px;user-select:none;"
                    text-anchor="middle"
                    alignment-baseline="central">{i + 1}</text
                >
            {/each}
        {/if}
    </g>
</g>
