<script setup>
import { reactive, ref } from 'vue';
import Events from '@/utils/Events';
import { PhCheckFat } from '@phosphor-icons/vue';

const props = defineProps({
    event: {
        type: String,
        required: true
    }
});

const popupContent = ref();

const popupReact = reactive({
    open: false,
});

Events.Register(props.event, () => {
    console.log(`event received for ${props.event}`);
    popupReact.open = true;
});

// need to rethink this cos it also closes profile-view and maybe other things
// this needs to be given priority - john
document.addEventListener("keydown", e => {
    if (e.repeat) return;
    if (e.key == "Escape") ClosePopup(null);
});

function ClosePopup() {
    popupReact.open = false;
}
</script>

<!-- we need to disable scrolling -->
<template>
    <Transition name="overlay">
        <div class="z-50 flex fixed inset-0 justify-center items-center w-screen h-screen top-0 py-24 bg-opacity-25 backdrop-blur overflow-y-scroll"
            v-if="popupReact.open">
            <div class="z-0 max-w-4xl bg-background-1 bg-opacity-90 backdrop-blur theShadow rounded-xl flex flex-col p-5 gap-1"
                ref="popupContent">
                <div class="flex grow">
                    <div class="justify-center text-lg w-full flex mb-3">
                        <p>
                            <slot name="content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum.</p>
                            </slot>
                        </p>
                    </div>
                </div>
                <!-- default values -->
                <slot name="footer" :ClosePopup="ClosePopup">
                    <div class="flex justify-center gap-2">
                        <button
                            class="colorButtonDefault flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer"
                            @click="ClosePopup">Ok
                            <PhCheckFat :size="18" weight="fill" />
                        </button>
                    </div>
                </slot>
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

.theShadow {
    box-shadow: 0 32px 40px 0 rgba(0, 0, 0, 0.24), inset 0 1px 1px 0 rgba(255, 255, 255, 0.25), inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1);
}

/* todo: make buttons into componenets and not do this -john */
.colorButtonDefault {
    background-color: var(--background-4);

    &:hover {
        background-color: var(--background-3);
    }
}

.colorButtonSuccess {
    background-color: rgba(0, 255, 0, 0.4);

    &:hover {
        background-color: rgba(0, 255, 0, 0.6);
    }
}

.colorButtonError {
    background-color: rgba(221, 0, 0, 0.4);

    &:hover {
        background-color: rgba(221, 0, 0, 0.6);
    }
}
</style>
