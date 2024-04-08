<script setup>
import { PhList, PhDiscordLogo, PhGithubLogo } from "@phosphor-icons/vue";

const props = defineProps({
    id: {
        type: String,
		default: null
    }
});
</script>

<template>
	<div class="navBarButton" :id>
		<a v-if="id === 'menu'">
			<PhList :size="28" />
		</a>
		<a v-if="id === 'github'">
			<PhGithubLogo :size="28" />
		</a>
		<a v-else-if="id === 'discord'">
			<PhDiscordLogo :size="28" />
		</a>
	</div>
</template>

<style lang="scss">
.navBarButton {
	width: 50px;
	height: 50px;
	border-radius: 8px;
	background: var(--background-header-buttons);
	cursor: pointer;
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;

	&#discord {
		border-radius: 0px 8px 8px 0px;
	}
	&#github {
		border-radius: 8px 0px 0px 8px;
	}
}
</style>