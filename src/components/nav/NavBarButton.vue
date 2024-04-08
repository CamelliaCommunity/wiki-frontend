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
	<a v-if="id === 'menu'" class="navBarButton" :id>
		<PhList :size="28" />
	</a>
	<a v-else-if="id === 'github'" href="https://github.com/CamelliaCommunity" target="_blank" class="navBarButton" :id>
		<PhGithubLogo :size="28" />
	</a>
	<a v-else-if="id === 'discord'" href="https://discord.gg/camellia" target="_blank" class="navBarButton" :id>
		<PhDiscordLogo :size="28" />
	</a>
	<a v-else-if="id === 'accountData'" class="navBarButton" :id>
		<img class="navBarButton" id="accountDataPfp" src="@/assets/images/avatar.png" />
		<div id="accountDetails">
			<p id="accountDetails-username">Not logged in!</p>
			<span id="accountDetails-stats">Log in to access more features...</span>
		</div>
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

	&#accountData {
		width: 244px;
		background-color: var(--background-3);
		justify-content: left;
		text-align: left;
		line-height: 1.1;

		#accountDetails {
			flex-direction: column;
			padding-left: 8px;
			display: flex;
			#accountDetails-username {
				font-weight: 600;
				font-size: 16px;
			}
			#accountDetails-stats {
				font-size: 12px;
				font-style: italic;
			}
		}
	}
	&#accountDataPfp {
		border-radius: 8px;
		background-color: transparent;
	}
}
</style>