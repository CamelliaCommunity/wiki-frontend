<script setup>
import { reactive, ref } from 'vue';

import Events from '@/utils/Events';

const content = ref();

const react = reactive({
    open: false
});

Events.Register('profile-overlay', () => {
    react.open = true;
})

document.addEventListener("keydown", e => {
    if (e.key == "Escape")
        Close(null);
})

function Close(e) {
    if (e && content.value.contains(e.target))
        return;

    react.open = false;
}
</script>

<template>
    <Transition name="overlay">
        <div class="z-50 flex fixed justify-center items-center w-screen h-screen top-0 py-24 bg-black bg-opacity-50 overflow-y-scroll"
            @click="Close" v-if="react.open">
            <div class="w-content-width min-h-full bg-background-2 rounded-xl flex flex-col items-center justify-center" ref="content">
                <p class="text-3xl mb-2">welcome to the profile overlay!</p>
                <p class="text-lg leading-none opacity-80">unfortunately nothing is here yet...</p>
                <p class="text-lg leading-none opacity-80">maybe come back another time?</p>
            </div>
        </div>
    </Transition>
</template>

<style>
.overlay-enter-active,
.overlay-leave-active {
    transition: opacity 150ms, transform 300ms;

    >div {
        transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
    }
}

.overlay-leave-to,
.overlay-enter-from {
    opacity: 0;

    >div {
        transform: scale(.95);
    }
}
</style>