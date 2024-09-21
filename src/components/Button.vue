<script setup>
import { PhCheckFat, PhTrashSimple } from '@phosphor-icons/vue';

const props = defineProps({
    type: {
        type: String,
        validator(value) {
            return value == null || ['btnSuccess', 'btnError', 'btnDefault'].includes(value);
        }
    }
});

</script>

<template>
    <!-- Buttons based on the type -->

    <button v-if="type === 'btnDefault'"
        class="colorButtonDefault flex row gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer">
        <slot></slot>
    </button>

    <button v-if="type === 'btnSuccess'"
        class="colorButton1 flex gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer">
        <slot></slot>
        <PhCheckFat :size="18" weight="fill" />
    </button>

    <button v-if="type === 'btnError'"
        class="colorButton2 flex gap-2 items-center justify-center p-2 rounded-xl text-lg cursor-pointer">
        <slot></slot>
        <PhTrashSimple :size="18" weight="fill" />
    </button>

</template>

<style>
.colorButtonDefault {
    background-color: var(--background-4);

    &:hover {
        background-color: var(--background-3);
    }
}
</style>