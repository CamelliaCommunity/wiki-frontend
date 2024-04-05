<template>
    <div class="featured-post">
        <img src="/src/assets/images/testing-image.png" alt="">
        <div class="radial-dim"></div>
        <div class="card-content">
            <div class="card-top">
                <div class="card-header">
                    <h3 class="post-type">Featured Post</h3>
                    <h3 class="date">April 4th, 2024</h3>
                </div>
                <h2 class="post-title">Post Title Goes Here</h2>
            </div>

            <div class="card-bottom">
                <p class="post-description">Short snippet of the post goes here, this should be relatively long but cut off after a while to not surpass a few lines, just like th...</p>
                <p class="read-more">Read More</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.featured-post {
    width: 100%;
    height: 200px;
    display: grid;
    border-radius: 8px;
    overflow: hidden;

    > * {
        width: 100%;
        height: 100%;
        grid-area: 1 / 1;
    }

    img {
        object-fit: cover;
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

        .card-header {
            display: flex;
            justify-content: space-between;

            .post-type {
                font-size: 18px;
                font-weight: var(--font-weight-semibold);
            }

            .date {
                font-size: 16px;
                font-weight: var(--font-weight-medium);
            }
        }

        .post-title {
            font-size: 24px;
            font-weight: var(--font-weight-medium);
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

        .read-more {
            font-size: 16px;
            font-weight: var(--font-weight-medium);
            color: var(--accent-color);
            cursor: pointer;
        }
    }
}
</style>