<script setup>
const props = defineProps({
    overshoot: {
        type: Boolean,
        default: true
    }
});
</script>

<template>
    <div :class="'gradient-line ' + (overshoot ? 'overshoot' : '')"></div>
</template>

<style lang="scss">
.gradient-line {
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #E442B7, #EF656E);

    &.overshoot {
        width: calc(100% + 10px);
        margin: 0 -5px;
    }
}
</style>