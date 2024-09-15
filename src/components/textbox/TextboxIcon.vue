<script setup>
const props = defineProps({
	icon: {
		type: Object,
		default: null
	},
	disabled: {
		type: Boolean,
		default: true
	},
	size: {
		type: Number,
		default: 24
	}
});
</script>

<template>
	<Component :is="icon" :size="size" :disabled="disabled"
		:class='"hover:bg-background-4 rounded cursor-" + `${disabled ? "deny" : "pointer"}`' />
</template>