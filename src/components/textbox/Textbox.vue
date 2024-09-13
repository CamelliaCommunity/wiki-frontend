<script setup>
import { PhPaperPlaneTilt, PhTextBolder, PhTextItalic, PhTextH, PhTextUnderline, PhTextStrikethrough, PhListBullets, PhListNumbers, PhListChecks, PhQuotes, PhCodeSimple, PhHighlighter, PhSelection, PhGridFour, PhLinkSimple, PhImage } from '@phosphor-icons/vue';

const props = defineProps({
	isEditor: {
		type: Boolean,
		default: false
	}
});
</script>

<template>
	<div class="h-auto w-full flex flex-col rounded-xl bg-background-3 p-1.5 gap-1">
		<div class="w-full flex gap-1">
			<textarea
				class="h-10 w-full resize-none overflow-hidden rounded-lg bg-background-2 px-3 py-1.5 text-lg outline-none"
				placeholder="Soon(TM)  Press enter to post. Use shift+enter to make a new line." disabled />
			<div class="m-auto flex size-10 items-center justify-center rounded-lg bg-background-4 p-1">
				<PhPaperPlaneTilt :size="20" />
			</div>
		</div>
		<div class="max-w-fit h-10 flex px-2 gap-2 bg-background-2 rounded-lg py-2">
			<div id="formatting" class="w-auto flex gap-3">
				<PhTextBolder :size="24" />
				<PhTextItalic :size="24" />
				<PhTextH :size="24" v-if="isEditor" />
				<PhTextUnderline :size="24" />
				<PhTextStrikethrough :size="24" />
			</div>
			<div class="h-auto w-0.5" style="background: rgba(255, 255, 255, 15%);"></div>
			<div id="list" class="w-auto flex gap-3">
				<PhListBullets :size="24" />
				<PhListNumbers :size="24" />
				<PhListChecks v-if="isEditor" :size="24" />
			</div>
			<div class="h-auto w-0.5" style="background: rgba(255, 255, 255, 15%);"></div>
			<div id="list" class="w-auto flex gap-3">
				<PhQuotes :size="24" />
				<PhCodeSimple :size="24" v-if="isEditor" />
				<PhHighlighter :size="24" />
				<PhSelection :size="24" v-if="isEditor" />
				<PhGridFour :size="24" v-if="isEditor" />
				<PhLinkSimple :size="24" />
				<PhImage :size="24" />
			</div>
		</div>
	</div>
</template>