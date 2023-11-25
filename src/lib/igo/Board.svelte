<script lang="ts">
    // 盤面グリッド数 最低9, 他(i >= 2) 3 * (2 * i) + 1 => , 13, 19...
	export let gridCount = 13;
    // 盤面グリッドマージン
	export let margin = 50;
    // グリッド間隔
	const gridInterval = 32;
    // グリッド全体の大きさ
	const BoardGridSize = gridInterval * (gridCount - 1);
    // 盤面全体の大きさ
	export let BoardSize = BoardGridSize + margin * 2;
    // 中心点位置
	const centerGridPoint = BoardGridSize / 2;
    // 中心以外の点の位置
	const edgeGridPointStart = gridInterval * 3;
	const edgeGridPointLoop = (BoardGridSize - edgeGridPointStart) / (gridInterval * 5);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={BoardSize}
	height={BoardSize}
	viewBox="0 0 {BoardSize} {BoardSize}"
>
	<rect x="0" y="0" width={BoardSize} height={BoardSize} fill="#e3aa4e" />
	<g transform="translate({margin}, {margin})">
		<g class="grid">
			<g class="grid-vertical">
				{#each { length: gridCount } as _, i}
					<line
						x1={i * gridInterval}
						y1="0"
						x2={i * gridInterval}
						y2={BoardSize - margin * 2}
						stroke="black"
						stroke-width="1"
					></line>
				{/each}
			</g>
			<g class="grid-horizontal">
				{#each { length: gridCount } as _, i}
					<line
						x1="0"
						y1={i * gridInterval}
						x2={BoardSize - margin * 2}
						y2={i * gridInterval}
						stroke="black"
						stroke-width="1"
					></line>
				{/each}
			</g>
			<g class="grid-point">
				<g class="grid-point-center">
					<circle cx={centerGridPoint} cy={centerGridPoint} r="2.5" />
				</g>
				<g class="grid-point-edge">
					{#each { length: edgeGridPointLoop } as _, x}
						{#each { length: edgeGridPointLoop } as _, y}
							<circle
								cx={gridInterval * 3 + gridInterval * 6 * x}
								cy={gridInterval * 3 + gridInterval * 6 * y}
								r="2.5"
							/>
						{/each}
					{/each}
				</g>
			</g>
		</g>
	</g>
</svg>
