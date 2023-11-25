<script lang="ts">
    import type { IMousePosition } from '$lib/types';
    import Grids from './Grids.svelte';
    import Stones from './Stones.svelte';

    // 盤面グリッド数 最低9, 他(i >= 2) 3 * (2 * i) + 1 => , 13, 19...
    export let gridCount = 13;
    // 盤面グリッドマージン
    export let margin = 50;
    // グリッド間隔
    const gridInterval = 32;
    // グリッド全体の大きさ
    const BoardGridSize = gridInterval * (gridCount - 1);
    // 盤面全体の大きさ
    const BoardSize = BoardGridSize + margin * 2;
    
    // マウス位置(グリッド座標)
    let mousePositionOnGrid: IMousePosition | null = null;
    let isInGrid: boolean;
    $: isInGrid =
        mousePositionOnGrid === null
            ? false
            : mousePositionOnGrid.x > 0 - margin / 2 &&
              mousePositionOnGrid.y > 0 - margin / 2 &&
              mousePositionOnGrid.x < BoardGridSize + margin / 2 &&
              mousePositionOnGrid.y < BoardGridSize + margin / 2;

    // SVG内マウス位置の変換
    const ConvertMousePosition = (e: MouseEvent) => {
        const rect: DOMRect = e.currentTarget?.getBoundingClientRect();
        mousePositionOnGrid = {
            x: e.clientX - rect.x - margin,
            y: e.clientY - rect.y - margin
        };
    }

    // 石を配置
    let stoneComponent: Stones;
    const AddStone = () => {
        stoneComponent.AddStone(mousePositionOnGrid);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svg
    xmlns="http://www.w3.org/2000/svg"
    width={BoardSize}
    height={BoardSize}
    viewBox="0 0 {BoardSize} {BoardSize}"
    on:mousemove={ConvertMousePosition}
    on:mouseup={AddStone}
>
    <rect x="0" y="0" width={BoardSize} height={BoardSize} fill="#e3aa4e" />
    <g transform="translate({margin}, {margin})">
        <Grids {gridCount} {margin} {gridInterval} />
        <Stones
            {gridInterval}
            previewNextStone={isInGrid ? mousePositionOnGrid : null}
            bind:this={stoneComponent}
        />
    </g>
</svg>
