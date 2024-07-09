import { toast } from 'vue3-toastify';

const toastSettings = {
	theme: "dark",
	type: "default",
	transition: "slide",
	newestOnTop: true,
	clearOnUrlChange: false,
	dangerouslyHTMLString: false
};

import { PhCheckCircle, PhTriangle, PhX } from '@phosphor-icons/vue';

const icons = {
	check: PhCheckCircle
};


export default class Toast {
	static showToast = (data, moreSettings) => {
		let icon = "";
		if (moreSettings.type == "success") icon = icons.check;
		else if (moreSettings.type = "error") icon = PhX;
		else if (moreSettings.type = "warning") icon = PhTriangle;

		if (icon) toastSettings.icon = icon;
		toast(data, { ...toastSettings, ...moreSettings });
	};
}