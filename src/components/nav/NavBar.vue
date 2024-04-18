<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { PhList, PhX, PhDiscordLogo, PhGithubLogo } from "@phosphor-icons/vue";

import WikiLogo from "@/components/WikiLogo.vue";
import NavBarButton from "./NavBarButton.vue";
import NavBarAccount from "./NavBarAccount.vue";
import NavSearch from "./NavBarSearch.vue";

const isOpen = ref(false);

const togNav = () => {
    isOpen.value = !isOpen.value;
};

const router = useRouter();

const leftLinkList = [
    {
        route: "/",
        name: "Main Page",
    },
    {
        route: "/staff-guidelines",
        name: "Staff Guidelines",
    },
    {
        route: "/contributing",
        name: "How to Contribute",
    },
    {
        route: "/about",
        name: "About Page",
    },
];

const rightLinkList = [
    {
        route: "https://admin.camellia.wiki",
        name: "Wiki Editor",
    },
    {
        route: "/donate",
        name: "Donate",
    },
];
</script>

<template>
	<div class="w-screen h-16 fixed bg-background-3 py-2 z-40">
		<nav class="w-full z-10 px-2 xl:px-0">
			<div class="flex justify-between max-w-screen-lg mx-auto">
				<div class="flex items-center text-center gap-4">
					<NavBarButton @click="togNav" :class="(isOpen ? 'is-open' : '') + ' relative overflow-hidden'">
						<Transition name="fade">
							<Component :is="(isOpen ? PhX : PhList)" :size="28" class="absolute"></Component>
						</Transition>
					</NavBarButton>
					<WikiLogo size="small" @click="router.push('/')" class="cursor-pointer"/>
				</div>
				<div class="hidden md:flex items-center text-center gap-4">
					<NavSearch />
					<div class="flex gap-1">
						<NavBarButton url="https://github.com/CamelliaCommunity/wiki-frontend" first>
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
		<Transition name="fade">
			<div v-if="isOpen" @click="togNav"
				class="fixed -z-10 top-16 bg-background-1/50 h-full backdrop-blur-sm md:mx-4 w-screen md:w-layout-width rounded-t-2xl"></div>
		</Transition>
		<Transition name="slidedown-fade">
			<nav v-if="isOpen" class="fixed z-10 top-16 bg-background-1 md:mx-4 w-screen md:w-layout-width rounded-t-2xl">
				<div class="flex flex-col lg:flex-row gap-4 lg:gap-0 md:justify-between max-w-screen-lg mx-auto px-2 xl:px-0 py-4 lg:py-2">
					<div class="flex flex-col lg:flex-row items-center text-center gap-4">
						<NavBarAccount />
						<RouterLink
							class="hover:text-accent text-lg font-light"
							v-for="link in leftLinkList"
							:to="link.route"
							exact
							>{{ link.name }}</RouterLink
						>
					</div>
					<div class="flex flex-col lg:flex-row items-center text-center gap-4">
						<RouterLink
							class="hover:text-accent text-lg font-light"
							v-for="link in rightLinkList"
							:to="link.route"
							>{{ link.name }}</RouterLink
						>
					</div>
				</div>
			</nav>
		</Transition>
	</div>
</template>

<style lang="scss">
.is-open { background: var(--background-nav-open); }
.slidedown-fade-enter-active,
.slidedown-fade-leave-active {
    transition: opacity 0.15s ease-in-out, max-height 0.2s ease-in-out;
}

.slidedown-fade-enter-to,
.slidedown-fade-leave-from {
    overflow: hidden;
	max-height: 100vh;
    opacity: 1;

	@media screen and (min-width: 768px) {
    	max-height: var(--nav-height);
	}
}

.slidedown-fade-enter-from,
.slidedown-fade-leave-to {
    overflow: hidden;
	max-height: 100vh;
    opacity: 0;

	@media screen and (min-width: 768px) {
    	max-height: 0;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
