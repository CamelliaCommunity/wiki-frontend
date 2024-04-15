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
        route: "#",
        name: "Staff Guidelines",
    },
    {
        route: "#",
        name: "How to Contribute",
    },
    {
        route: "#",
        name: "About Page",
    },
];

const rightLinkList = [
    {
        route: "#",
        name: "Wiki Editor",
    },
    {
        route: "#",
        name: "Donate",
    },
];
</script>

<template>
	<div class="w-full fixed bg-background-3 py-2 z-40">
		<nav class="w-full z-10">
			<div class="flex justify-between max-w-screen-lg mx-auto">
				<div class="flex items-center text-center gap-4">
					<NavBarButton @click="togNav" :class="(isOpen ? 'is-open' : '') + ' relative overflow-hidden'">
						<Transition name="fade">
							<Component :is="(isOpen ? PhX : PhList)" :size="28" class="absolute"></Component>
						</Transition>
					</NavBarButton>
					<WikiLogo size="small" @click="router.push('/')" class="cursor-pointer"/>
				</div>
				<div class="flex items-center text-center gap-4">
					<NavSearch />
					<div class="flex gap-1">
						<NavBarButton
							url="https://github.com/CamelliaCommunity/wiki-frontend"
							first
						>
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
			<div
				v-if="isOpen"
				class="fixed -z-10 top-16 bg-background-1/50 h-full backdrop-blur-sm mx-4 w-layout-width rounded-t-2xl"
				@click="togNav"
			></div>
		</Transition>
		<Transition name="slidedown-fade">
			<nav v-if="isOpen" class="fixed z-10 top-16 bg-background-1 mx-4 w-layout-width rounded-t-2xl">
				<div class="flex justify-between max-w-screen-lg mx-auto py-2">
					<div class="flex items-center text-center gap-4">
						<NavBarAccount />
						<RouterLink
							class="hover:text-accent text-lg font-light"
							v-for="link in leftLinkList"
							:to="link.route"
							exact
							>{{ link.name }}</RouterLink
						>
					</div>
					<div class="flex items-center text-center gap-4">
						<RouterLink
							class="hover:text-accent text-lg font-light"
							v-for="link in rightLinkList"
							:to="link.route"
							exact
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
    max-height: var(--nav-height);
    opacity: 1;
}

.slidedown-fade-enter-from,
.slidedown-fade-leave-to {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
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
