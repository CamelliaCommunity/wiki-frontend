<script setup>
import { ref } from 'vue';
import { PhList, PhDiscordLogo, PhGithubLogo } from "@phosphor-icons/vue";

import WikiLogo from '@/components/WikiLogo.vue';
import NavBarButton from './NavBarButton.vue';
import NavBarAccount from './NavBarAccount.vue';
import NavSearch from './NavBarSearch.vue';

const isOpen = ref(false);

const togNav = () => {
	isOpen.value = !isOpen.value;
};
</script>

<template>
    <nav>
		<div class="navbar">
			<div>
				<NavBarButton @click="togNav">
					<PhList :size="28" />
				</NavBarButton>
				<WikiLogo size="small" />
			</div>
			<div>
				<NavSearch />
				<div class="flex gap-1">
					<NavBarButton url="https://github.com/CamelliaCommunity" first>
						<PhGithubLogo :size="28" />
					</NavBarButton>
					<!--if there ever gets anything added here, give it the 'middle' attribute-->
					<NavBarButton url="https://discord.gg/camellia" last>
						<PhDiscordLogo :size="28" />
					</NavBarButton>
				</div>
			</div>
		</div>
    </nav>
	<Transition name="slidedown-fade">
		<nav v-if="isOpen" class="content">
			<div class="navbar">
				<div>
					<NavBarAccount />
					<RouterLink to="/" exact>Main Page</RouterLink>
					<RouterLink to="#" exact>Staff Guidelines</RouterLink>
					<RouterLink to="#" exact>How to Contribute</RouterLink>
					<RouterLink to="#" exact>About Page</RouterLink>
				</div>
				<div>
					<RouterLink to="#" exact>Wiki Editor</RouterLink>
					<RouterLink to="#" exact>Donate</RouterLink>
				</div>
			</div>
			<Transition name="fade" appear>
				<div v-if="isOpen" id="pageBlocker" @click="togNav"></div>
			</Transition>
		</nav>
	</Transition>
</template>

<style lang="scss">
nav {
    width: 100%;
    position: fixed;
    z-index: 800;
    top: 0;
    left: 0;
	background-color: var(--background-3);

    .navbar {
		width: var(--content-width);
		height: var(--nav-height);
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		
		> div {
			display: flex;
			align-items: center;
			text-align: center;
			gap: 14px;
		}
	}

	&.content {
		top: var(--nav-height);
		background-color: var(--background-1);
		left: 17px;
		width: calc(100vw - 34px);
		border-radius: 16px 16px 0 0;
		

		#pageBlocker {
			z-index: -1;
			position: fixed;
			top: var(--nav-height);
			left: 17px;
			width: 100%;
			height: 100%;
			background-color: var(--background-1);
			opacity: .5;
			width: calc(100vw - 34px);
			border-radius: 16px 16px 0 0;
		}

		.navbar {
			.router-link-active {
				transition: color 0.2s ease-in-out;
			}
			.router-link-active:hover {
				color: #F876D3;
			}
		}
	}
}

.slidedown-fade-enter-active,
.slidedown-fade-leave-active {
  transition: opacity 0.15s ease-in-out, max-height 0.2s ease-in-out;
}

.slidedown-fade-enter-to,
.slidedown-fade-leave-from {
  overflow: hidden;
  max-height: var(--nav-height);
  opacity: 1;
}

.slidedown-fade-enter-from,
.slidedown-fade-leave-to {
  overflow: hidden;
  max-height: 0;
  opacity: 0;
}

.fade-enter-active {
	animation: fade-thing .25s ease-out;
}

/* this doesn't even work */
.fade-leave-active {
	animation: fade-thing .25s reverse ease-out;
}

@keyframes fade-thing {
	0% {
		opacity: 0;
	}
	100% {
		opacity: .5;
	}
}
</style>
