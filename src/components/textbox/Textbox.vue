<script setup>
import { PhPaperPlaneTilt, PhTextBolder, PhTextItalic, PhTextH, PhTextUnderline, PhTextStrikethrough, PhListBullets, PhListNumbers, PhListChecks } from '@phosphor-icons/vue';

</script>

<template>
	<div class="h-fit w-full flex flex-col rounded-xl bg-background-3 p-1 gap-1">
		<div class="w-full flex gap-1">
			<textarea
				class="h-10 w-full resize-none overflow-hidden rounded-lg bg-background-2 px-3 py-1.5 text-base outline-none"
				placeholder="Soon(TM)  Press enter to post. Use shift+enter to make a new line." disabled />
			<div class="m-auto flex size-10 items-center justify-center rounded-lg bg-background-4 p-1">
				<PhPaperPlaneTilt :size="20" />
			</div>
		</div>
		<div class="w-auto mt-1 flex px-1 gap-1">
			<div id="formatting" class="w-auto flex gap-1">
				<PhTextBolder :size="24" />
				<PhTextItalic :size="24" />
				<PhTextH :size="24" />
				<PhTextUnderline :size="24" />
				<PhTextStrikethrough :size="24" />
			</div>
			<div id="list" class="w-auto flex gap-1">
				<PhListBullets :size="24" />
				<PhListNumbers :size="24" />
				<PhListChecks :size="24" />
			</div>
		</div>
	</div>
</template>