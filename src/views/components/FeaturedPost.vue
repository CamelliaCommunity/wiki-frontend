<template>
    <div class="featured-post h-52">
        <img src="/src/assets/images/testing-image.png" alt="" class="object-cover">
        <div class="radial-dim"></div>
        <div class="card-content">
            <div>
                <div class="flex justify-between">
                    <h3 class="text-lg font-semibold">Featured Post</h3>
                    <h3 class="text-base font-medium">April 4th, 2024</h3>
                </div>
                <h2 class="text-2xl font-medium">Post Title Goes Here</h2>
            </div>

            <div>
                <p class="post-description leading-tight">Short snippet of the post goes here, this should be relatively long but cut off after a while to not surpass a few lines, just like th...</p>
                <p class="text-base font-medium text-accent cursor-pointer">Read More</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.featured-post {
    width: 100%;
    display: grid;
    border-radius: 8px;
    overflow: hidden;

    > * {
        width: 100%;
        height: 100%;
        grid-area: 1 / 1;
    }

    .radial-dim {
        background: radial-gradient(circle at 100% 0%, transparent, var(--background-1) 70%);
    }

    .card-content {
        display: flex;
        flex-direction: column;
        padding: 20px;
        justify-content: space-between;

        > div {
            display: flex;
            flex-direction: column;
        }

        .post-description {
            width: 450px;
            font-size: 18px;
            max-height: 3em;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            margin-bottom: 5px;
        }
    }
}
</style>