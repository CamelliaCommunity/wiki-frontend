<script setup>
import { reactive } from 'vue';

import DefaultAvatar from '@/assets/images/avatar.png';

// note for whoever is implementing account stuff in the future:
// you can change the stuff here and it automatically updates the component
// removes the need to use id's and stuff
const react = reactive({
    avatar: "",
    username: "Not logged in!",
    stats: "Log in to access more features..."
});

function onClick() {
    console.log("Account button clicked!");
}
</script>

<template>
    <div class="w-64 h-12 rounded-lg flex bg-background-3 cursor-pointer" @click="onClick">
        <img class="rounded-lg" :src="react.avatar || DefaultAvatar" alt="avatar" />
        <div class="flex flex-col pl-2 text-left justify-center">
            <p class="text-lg leading-none font-medium">{{ react.username }}</p>
            <span class="text-sm leading-none italic opacity-75">{{ react.stats }}</span>
        </div>
    </div>
</template>