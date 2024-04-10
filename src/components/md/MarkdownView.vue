<script setup>
const props = defineProps({
    article: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="md-content" v-html="article"></div>
</template>

<style lang="scss">
.md-content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
        font-size: 44px;
    }

    h2 {
        font-size: 36px;
    }

    h3 {
        font-size: 28px;
    }

    h4 {
        font-size: 24px;
    }

    h5 {
        font-size: 20px;
    }

    p {
        font-size: 18px;
    }

    a {
        color: var(--accent-1);
        text-decoration: underline;
    }

    mark {
        background-color: var(--accent-1-opaque);
        color: var(--background-1);
        padding: 2px 5px;
        border-radius: 5px;
    }

    ul, ol {
        padding-left: 20px;

        li {
            font-size: 18px;
            list-style-type: disc;
        }
    }

    blockquote {
        border-left: 4px solid var(--accent-1);
        padding-left: 20px;
        margin-left: 0;
    }

    pre {
        background-color: var(--background-1);
        padding: 10px;
        border-radius: 10px;
        overflow-x: auto;
    }

    code {
        background-color: var(--background-1);
        padding: 2px 5px;
        border-radius: 5px;
        font-size: 16px;
    }

    table {
        width: 100%;
        border-collapse: collapse;

        th, td {
            border: 1px solid var(--background-3);
            padding: 10px;
        }

        th {
            background-color: var(--background-1);
        }
    }

    img {
        max-width: 100%;
        height: auto;
    }
}
</style>