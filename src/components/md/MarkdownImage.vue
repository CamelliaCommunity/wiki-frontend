<script setup>
import LoadingImage from '../LoadingImage.vue';

const props = defineProps({
    url: String,
    alt: String
});

let altTrimmed = props.alt;
let extraClasses = "";

var left = altTrimmed.endsWith("<");
var right = altTrimmed.endsWith(">");

if (left || right) {
    altTrimmed = altTrimmed.substring(0, altTrimmed.length - 1).trimEnd();
    
    extraClasses = "lg:ml-2 ";

    if (left)
        extraClasses += "lg:float-left";
    else
        extraClasses += "lg:float-right"
}
</script>

<template>
    <div :class="'flex flex-col gap-2 ' + extraClasses">
        <LoadingImage :src="url" class="rounded-xl" />
        <p class="text-light-gray text-center">{{ altTrimmed }}</p>
    </div>
</template>