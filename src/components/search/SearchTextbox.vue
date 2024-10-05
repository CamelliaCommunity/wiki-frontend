<script setup>
import { toRefs } from 'vue';

import { PhMagnifyingGlass } from '@phosphor-icons/vue';

const props = defineProps({
	beDisabled: {
		type: Boolean,
		default: false
	},
	handleInput: {
		type: Function,
		default: () => { }
	},
	handleKeydown: {
		type: Function,
		default: () => { }
	},
	handleSubmit: {
		type: Function,
		default: () => { }
	},
	handleCancel: {
		type: Function,
		default: () => { }
	}
});

const { handleInput, handleKeydown, handleSubmit } = toRefs(props);

</script>

<template>
	<div class="h-auto w-full flex rounded-xl bg-background-2 theShadow py-2 px-4 gap-2 items-center">
		<PhMagnifyingGlass :size="28" />
		<textarea
			class="h-10 w-full resize-none overflow-hidden rounded-lg bg-background-2 px-3 py-1 text-lg outline-none ring-background-1 focus:ring-2"
			placeholder="Search the Wiki..." @input="handleInput" @keydown="handleKeydown" :disabled="beDisabled"
			id="searchoverlay-textbox" />
	</div>
</template>