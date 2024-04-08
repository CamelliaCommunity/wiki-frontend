<script setup>
import { ref } from 'vue';
import WikiLogo from '@/components/WikiLogo.vue';
import navBarButton from './NavBarButton.vue';
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

const isOpen = ref(false);

const togNav = () => {
	isOpen.value = !isOpen.value;
};

</script>


<template>
    <nav>
		<div class="navbar">
			<div id="daLeft">
				<navBarButton @click="togNav" id="menu"></navBarButton>
				<WikiLogo size="small" />
			</div>
			<div id="daRight">
				<div id="searchBarWrapper">
					<PhMagnifyingGlass :size="24" id="searchIcon" />
					<input id="searchBar" placeholder="Search the Wiki...">
				</div>
				<div id="socialButtons">
					<navBarButton id="github"></navBarButton>
					<navBarButton id="discord"></navBarButton>
				</div>
			</div>
		</div>
    </nav>
	<Transition name="slidedown">
    <nav v-if="isOpen" class="content">
		<div class="navbar">
			<div id="daLeft">
				<navBarButton id="accountData"></navBarButton>
				<router-link to="#" exact>Main Page</router-link>
				<router-link to="#" exact>Staff Guidelines</router-link>
				<router-link to="#" exact>How to Contribute</router-link>
				<router-link to="#" exact>About Page</router-link>
			</div>
			<div id="daRight">
				<router-link to="#" exact>Wiki Editor</router-link>
				<router-link to="#" exact>Donate</router-link>
			</div>
		</div>
		<Transition name="fade" appear>
			<div v-if="isOpen" id="pageBlocker"></div>
		</Transition>
    </nav>
	</Transition>
</template>

<style lang="scss">
nav {
    width: 100%;
    position: fixed;
    z-index: 800;
    top: 0;
    left: 0;
	background-color: var(--background-3);

    .navbar {
		width: var(--content-width);
		height: var(--nav-height);
		margin: 0 auto;
		display: flex;
		justify-content: space-evenly;
		#daLeft,
		#daRight {
			align-items: center;
			text-align: center;
			gap: 14px;
			margin: 0 auto;
			display: flex;
			width: 100%;
		}
		#daRight {
			justify-content: right;
			#searchBarWrapper {
				display: flex;
				background: var(--background-2);
				width: 300px;
				height: 50px;
				border-radius: 8px;
				text-align: center;
				align-items: center;
				padding: 0 8px;
				#searchBar {
					background: none;
					outline: none;
					padding: 0 0 0 8px;
					width: 100%;
					font-style: italic;
					&:focus-visible {
						font-style: normal;
					}
				}
			}
			#socialButtons {
				display: flex;
				gap: 4px;
			}
		}
	}

	&.content {
		top: var(--nav-height);
		background-color: var(--background-1);

		#pageBlocker {
			z-index: -1;
			position: fixed;
			top: var(--nav-height);
			left: 0;
			width: 100%;
			height: 100%;
			background-color: var(--background-1);
			opacity: .5;
		}

		.navbar {
			#daLeft {
				width: 100%;
				gap: 16px;
			}
			#daRight {
				width: 25%;
			}
			.router-link-active {
				transition: color 0.2s ease-in-out;
			}
			.navbar .router-link-active:hover {
				color: #F876D3;
			}
		}
	}
}

.slidedown-enter-active,
.slidedown-leave-active {
  transition: max-height 0.2s ease-in-out;
}

.slidedown-enter-to,
.slidedown-leave-from {
  overflow: hidden;
  max-height: var(--nav-height);
}

.slidedown-enter-from,
.slidedown-leave-to {
  overflow: hidden;
  max-height: 0;
}

.fade-enter-active {
	animation: fade-thing .25s;
}
.fade-leave-active {
	animation: fade-thing .25s reverse;
}

@keyframes fade-thing {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: .5;
	}
}

</style>