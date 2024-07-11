<script setup>
const props = defineProps({
    overshoot: {
        type: Boolean,
        default: false
    }
});
</script>

<template>
    <div :class="'gray-line ' + (overshoot ? 'overshoot' : '')"></div>
</template>

<style>
.gray-line {
    width: 100%;
    height: 1px;
    background: #808080;

    &.overshoot {
        width: calc(100% + 10px);
        margin: 0 -5px;
    }

    &.overshoot-extra {
        width: calc(100% + 20px);
        margin: 0 -10px;
    }
}
</style>