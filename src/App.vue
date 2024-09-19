<script setup>
import { RouterView } from 'vue-router';
import { useOverlayScrollbars } from 'overlayscrollbars-vue';
import { onMounted } from 'vue';

import NavBar from './components/nav/NavBar.vue';
import FooterBar from './components/footer/FooterBar.vue';
import ScrollToTop from './components/ScrollToTop.vue';

import ProfileOverlay from './overlays/profile/ProfileOverlay.vue';

import API from '@/utils/API';

import Events from './utils/Events'; // test code
window.Events = Events; // test code

import PopupOverlay from './overlays/popup/PopupOverlay.vue';

onMounted(() => {
    API.fetchUser();

    const [initBodyOverlayScrollBars] = useOverlayScrollbars({
        defer: true,
        options: {
            scrollbars: {
                theme: 'os-theme-light',
                clickScroll: true,
            },
        },
    });

    initBodyOverlayScrollBars(document.body);
});

kofiWidgetOverlay.draw('camelliacommunity', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Support us!',
    'floating-chat.donateButton.background-color': '#323842',
    'floating-chat.donateButton.text-color': '#fff'
});
</script>

<template>
    <NavBar />
    <div class="content-background-wrapper md:px-4">
        <div class="content-background"></div>
    </div>

    <div class="page-content-wrapper md:px-4">
        <div class="page-content">
            <RouterView v-slot="{ Component, route }">
                <Transition name="page-fade">
                    <component :is="Component" :key="route.path" />
                </Transition>
            </RouterView>
        </div>
        <FooterBar />
    </div>

    <ScrollToTop />
    <ProfileOverlay />

    <!-- todo: make the popup a button or something idk -->
    <PopupOverlay type="yesNo">
        Please confirm the article path and the article type. If all seems good, click
        continue.
        Please confirm the article path and the article type. If all seems good, click
        continue.
    </PopupOverlay>
    <!-- was thinking of custom text, custom buttons, custom functions, etc. -john -->
</template>

<style lang="scss">
div[class^="floatingchat-container-wrap"] {
    left: 2em;
    bottom: 25px;
    z-index: 10 !important;
}

div[id^="kofi-widget-overlay"] {
    margin: 0 1em;
}

.content-background-wrapper {
    position: fixed;
    width: 100vw;
    height: 100vh;
    padding-top: var(--nav-height);
    z-index: -1;

    .content-background {
        width: 100%;
        height: 100%;

        border-radius: 16px 16px 0 0;
        background-color: var(--background-2);
    }
}

.page-content-wrapper {
    height: 100%;
    padding-top: var(--nav-height);
    z-index: 1;

    .page-content {
        min-height: 100%;
        height: fit-content;
        display: grid;
        padding: 12px;
        max-width: inherit;

        >* {
            height: fit-content;
            grid-area: 1 / 1;
        }
    }
}

.page-fade-enter-active,
.page-fade-leave-active {
    transition: all 400ms ease;
}

.page-fade-enter-to,
.page-fade-leave-from {
    opacity: 1;
    transition-delay: 200ms;
}

.page-fade-leave-to,
.page-fade-enter-from {
    opacity: 0;
}
</style>