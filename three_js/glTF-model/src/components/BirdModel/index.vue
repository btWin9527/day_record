<template>
	<div>
		<div id="scene-container">123</div>
	</div>
</template>

<script setup>

import {onMounted} from "vue";
import {World} from "./World/World";

onMounted(() => {
	init()
})

const init = () => {
	// Get a reference to the container element
	const container = document.querySelector('#scene-container')
	// 1. Create an instance of the World app
	const world = new World(container)

	// start the animation loop
	world.start()
}

</script>

<style lang="scss" scoped>

</style>