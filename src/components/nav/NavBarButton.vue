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
	<a v-if="id === 'menu'" href="#" class="navBarButton" :id>
		<PhList :size="28" />
	</a>
	<a v-else-if="id === 'github'" href="https://github.com/CamelliaCommunity" target="_blank" class="navBarButton" :id>
		<PhGithubLogo :size="28" />
	</a>
	<a v-else-if="id === 'discord'" href="https://discord.gg/camellia" target="_blank" class="navBarButton" :id>
		<PhDiscordLogo :size="28" />
	</a>
</template>

<style lang="scss">
.navBarButton {
	width: 50px;
	height: 50px;
	border-radius: 8px;
	background-color: var(--background-header-buttons);
	cursor: pointer;
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;
	transition: background-color 0.2s ease;

	&#discord {
		border-radius: 0px 8px 8px 0px;
	}
	&#github {
		border-radius: 8px 0px 0px 8px;
	}

	&:hover {
		background-color: var(--background-2);
	}
}
</style>