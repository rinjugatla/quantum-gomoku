<script lang="ts">
    import Grids from './Grids.svelte';

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
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    width={BoardSize}
    height={BoardSize}
    viewBox="0 0 {BoardSize} {BoardSize}"
>
    <rect x="0" y="0" width={BoardSize} height={BoardSize} fill="#e3aa4e" />
    <g transform="translate({margin}, {margin})">
        <Grids {gridCount} {margin} {gridInterval} />
    </g>
</svg>
