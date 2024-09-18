<script setup>
import { reactive } from 'vue';
import { PhCheckFat, PhTrashSimple } from '@phosphor-icons/vue';

const props = defineProps({
    type: {
        type: String,
        validator(value) {
            return value == null || ['yesNo', 'submitCancel'].includes(value);
        }
    },
    message: {
        type: String,
        default: ''
    },
    onConfirm: Function,
    onCancel: Function
});

const react = reactive({
    open: false,
});

// open the overlay and make everything real ffs
function openOverlay({ type, message, onConfirm, onCancel }) {
    react.open = true;
    react.type = type;
    react.message = message;
    react.onConfirm = onConfirm;
    react.onCancel = onCancel;
}

function closeOverlay() {
    react.open = false;
}

function handleConfirm() {
    if (react.onConfirm) react.onConfirm();
    closeOverlay();
}

function handleCancel() {
    if (react.onCancel) react.onCancel();
    closeOverlay();
}

defineExpose({
    openOverlay,
    closeOverlay
});
</script>

<template>
    <Transition name="overlay">
        <div v-if="react.open"
            class="z-50 flex fixed justify-center items-center w-screen h-screen top-0 py-24 bg-opacity-25 backdrop-blur overflow-y-scroll">
            <div
                class="z-0 max-w-4xl bg-background-1 bg-opacity-90 backdrop-blur theShadow rounded-xl flex flex-col p-5 gap-1">
                <div class="text-lg mb-3 text-center">
                    {{ react.message }}
                </div>
                <!-- Buttons based on the type -->
                <div v-if="react.type === 'yesNo'" class="flex justify-center gap-2">
                    <button @click="handleConfirm"
                        class="colorButton1 flex gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer">Yes
                        <PhCheckFat :size="18" weight="fill" />
                    </button>
                    <button @click="handleCancel"
                        class="colorButton2 flex gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer">No
                        <PhTrashSimple :size="18" weight="fill" />
                    </button>
                </div>

                <div v-if="react.type === 'submitCancel'" class="flex justify-center gap-2">
                    <button @click="handleConfirm"
                        class="colorButton1 flex gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer">Submit
                        <PhCheckFat :size="18" weight="fill" />
                    </button>
                    <button @click="handleCancel"
                        class="colorButton2 flex gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer">Cancel
                        <PhTrashSimple :size="18" weight="fill" />
                    </button>
                </div>
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

/* we'll remove this once we establish button components and types - john */
.colorButton1 {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    cursor: pointer;
    background-color: rgba(0, 255, 0, 0.4);

    &:hover {
        background-color: rgba(0, 255, 0, 0.6);
    }
}

.colorButton2 {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    cursor: pointer;
    background-color: rgba(221, 0, 0, 0.4);

    &:hover {
        background-color: rgba(221, 0, 0, 0.6);
    }
}
</style>
