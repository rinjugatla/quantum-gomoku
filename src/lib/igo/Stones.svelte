<script lang="ts">
    import type { IMousePosition } from '$lib/types';
    import isEqual from 'lodash/isEqual';
    import type Setting from './Setting.svelte';

    let isShowTrunNumber = false;
    export let settingComponent: Setting;
    $: settingComponent?.$on('onClickedNeedInit', () => {
        stones = [];
    });
    $: settingComponent?.$on('onChangedShowTurnNumber', (event: CustomEvent) => {
        let { needShowTurnNumber } = event.detail;
        isShowTrunNumber = needShowTurnNumber;
    });

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
        const exists = existsStoneSamePosition(nextStone);
        if (exists) {
            return;
        }

        stones = [...stones, nextStone];
        const isChained5 = exists5ChainStone();
        if(isChained5) { alert(`${isNextWhite ? "白" : "黒"}の勝ち`) }
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
    const existsStoneSamePosition = (position: IStonePosition): boolean => {
        const exists = stones.filter((stone) => isEqual(stone, position)).length > 0;
        return exists;
    };

    interface IVector {
        x: number;
        y: number;
    }
    /**
     * 左上から
     * +X 左から右
     * +Y 上から下
     */
    const chainVectors: IVector[] = [
        // 上段
        { x: -1, y: -1 },
        { x: 0, y: -1 },
        { x: 1, y: -1 },
        // 中段
        { x: -1, y: 0 },
        { x: 1, y: 0 },
        // 下段
        { x: -1, y: 1 },
        { x: 0, y: 1 },
        { x: 1, y: 1 }
    ];
    /**
     * 同じ色で5個並んだ石があるか
     */
    const exists5ChainStone = () => {
        const stoneNumber = isNextWhite ? 1 : 0;
        const currentStones = stones.filter((_, index) => index % 2 === stoneNumber);
        for (const baseStone of currentStones) {
            for (const baseVector of chainVectors) {
                for (let i = 0; i < 5; i++) {
                    const vector = { x: baseVector.x * i, y: baseVector.y * i };
                    const nextPosition = { x: baseStone.x + vector.x, y: baseStone.y + vector.y };
                    const chainedStone = currentStones.find((s) => isEqual(s, nextPosition));
                    if (chainedStone === undefined) {
                        break;
                    }

                    const isChained5 = i === 4;
                    if (isChained5) {
                        return true;
                    }
                }
            }
        }

        return false;
    };
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
        {#if isShowTrunNumber}
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
