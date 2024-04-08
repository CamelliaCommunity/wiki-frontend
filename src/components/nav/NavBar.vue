<script setup>
import WikiLogo from '@/components/WikiLogo.vue';
import navBarButton from './NavBarButton.vue';
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

</script>


<template>
    <nav>
        <div class="navbar">
			<div id="daLeft">
				<navBarButton id="menu"></navBarButton>
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
}
</style>