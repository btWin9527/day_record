<template>
	<div class="container">
		<!-- 左侧菜单栏和内容区域 -->
		<div class="layout layout--docs">
			<aside class="sidebar">
				<!-- 默认侧边栏内容 -->
			</aside>
			<main class="main">
				<!-- 默认内容区域 -->
				<slot></slot>
			</main>
		</div>
		<!-- 右侧自定义区域 -->
		<aside class="sidebar-custom">
			<!-- 在这里放置您的自定义内容 -->
			123
		</aside>
	</div>
</template>

<script>
export default {
	name: 'Layout'
};
</script>

<style scoped>
.sidebar-custom {
	/* 在这里添加您的自定义样式 */
}
</style>
