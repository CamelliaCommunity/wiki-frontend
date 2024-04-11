<script setup>
import { ref } from "vue";
import { PhList, PhDiscordLogo, PhGithubLogo } from "@phosphor-icons/vue";

import WikiLogo from "@/components/WikiLogo.vue";
import NavBarButton from "./NavBarButton.vue";
import NavBarAccount from "./NavBarAccount.vue";
import NavSearch from "./NavBarSearch.vue";

const isOpen = ref(false);

const togNav = () => {
    isOpen.value = !isOpen.value;
};

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
    <nav class="w-full fixed z-20 bg-background-3 py-2">
        <div class="flex justify-between max-w-screen-lg mx-auto">
            <div class="flex items-center text-center gap-4">
                <NavBarButton @click="togNav">
                    <PhList :size="28" />
                </NavBarButton>
                <WikiLogo size="small" />
            </div>
            <div class="flex items-center text-center gap-4">
                <NavSearch />
                <div class="flex gap-1">
                    <NavBarButton
                        url="https://github.com/CamelliaCommunity"
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
    <Transition name="slidedown-fade">
        <nav
            v-if="isOpen"
            class="fixed top-16 bg-background-1 mx-4 w-layout-width rounded-t-2xl"
        >
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
            <Transition name="fade" appear>
                <div
                    v-if="isOpen"
                    class="-z-10 fixed h-full bg-background-1/50 backdrop-blur-sm w-layout-width"
                    @click="togNav"
                ></div>
            </Transition>
        </nav>
    </Transition>
</template>

<style lang="scss">
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
    animation: fade-thing 0.25s ease-out;
}

/* this doesn't even work */
.fade-leave-active {
    animation: fade-thing 0.25s reverse ease-out;
}

@keyframes fade-thing {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 0.5;
    }
}
</style>
