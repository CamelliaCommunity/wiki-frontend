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