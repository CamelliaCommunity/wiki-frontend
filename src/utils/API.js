import DefaultAvatar from '@/assets/images/avatar.png';
import { reactive } from 'vue';
import Toast from './Toast';


export default class API {
    static url = 'https://backend.camellia.wiki';
    // static url = 'http://localhost:1984';
    
    static async get(endpoint) {
        return fetch(this.url + endpoint, {
            method: 'GET',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
        }).then(response => response.json());
    }

    static async post(endpoint, body) {
        return fetch(this.url + endpoint, {
            method: 'POST',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
            body: JSON.stringify(body),
        }).then(response => response.json());
    }

    static async put(endpoint, body) {
        return fetch(this.url + endpoint, {
            method: 'PUT',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
            body: JSON.stringify(body),
        }).then(response => response.json());
    }

    static async delete(endpoint) {
        return fetch(this.url + endpoint, {
            method: 'DELETE',
            headers: createHeaders($cookies.get(this.cookie_name_token)),
        }).then(response => response.json());
    }

	static user = reactive({
		username: "Not logged in!",
		avatar: DefaultAvatar,
		comments: 0,
		join: null,
		id: 0,
		staff: false,
		color: "#FFFFFF",
		loggedIn: false
	});

	static cookie_name_token = "wiki-auth-token"
	static cookie_name_user = "wiki-auth-user"

	static setData = (user = {}) => {
		this.user.loggedIn = (user.name && user.id);
		this.user.id = user.id || 0;
		this.user.username = user.name || "Not logged in!";
		this.user.nickname = user.nick || null;
		this.user.join = user.join || null;
		this.user.comments = user.comments || 0;
		this.user.avatar = user.avatar || DefaultAvatar;
		this.user.color = user.color || "#FFFFFF";
		this.user.staff = user.staff || false;
	}

	static fetchUser = async() => {
		let user = $cookies.get(this.cookie_name_user);
		let token = $cookies.get(this.cookie_name_token);
		if (!user) user = {};

		if (user && user?.username) this.setData(user);

		if (token) {
			const data = await this.get("/account");
			if (data.status != 200 || data.message != "OK") {
				if (data.message != "OK" ? (data.message.includes("re" + "turned" + " co" + "de 404")) : (data.status != 200)) {
					Toast.showToast("Failed to login as you are not in the server!\nClick this toast to open the Discord server invite (in a new tab)!", { type: "error", onClick: () => { window.open("https://discord.gg/camellia", "_blank") } })
					this.performLogout(true);
				} else {
					Toast.showToast("Failed to login! Please try again.\nIf this keeps happening, please report to the developers.", { type: "error" });
				};
				return;
			};

			if (user == "new_login")
				Toast.showToast("Successfully logged in!", { type: "success" });

			user = data.data;
			$cookies.set(this.cookie_name_user, JSON.stringify(user));
			this.setData(user);
		};
	}

	static performLogout = async(force = false) => {
		if (force || confirm("Are you sure you want to logout?")) {
			$cookies.remove(this.cookie_name_token);
			$cookies.remove(this.cookie_name_user);
			this.setData({});
			if (!force) Toast.showToast("Successfully logged out!", { type: "success" });
		};
	}

	static performLogin = async() => {
		let popupWindow;
		// Create Discord popup
		const DISCORD_CLIENT_ID = "1169155506988929024";
		const popupParams = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=833,height=654";
		popupWindow = window.open(
			`https://discord.com/oauth2/authorize?response_type=token&client_id=${DISCORD_CLIENT_ID}&scope=identify&redirect_uri=${window.location.protocol}//${window.location.host}/oauthComplete`,
			"popup",
			popupParams
		);
		popupWindow.focus();

		const popupMsgAlert = setInterval(() => { popupWindow.postMessage('', `${window.location.protocol}//${window.location.host}/`); }, 500);

		// This stupid thing will wait for the oauth complete page to send back our required data :)
		window.addEventListener("message", async(event) => {
			if (popupWindow && !popupWindow.closed && event.data.token) {
				popupWindow.close();
				clearInterval(popupMsgAlert); // We should have the data by now.

				$cookies.set(API.cookie_name_token, event.data.token);
				$cookies.set(API.cookie_name_user, "new_login");

				// Now that we are logged in, let's GOOOOOOOOOOOOOOOOOOOOOO
				API.fetchUser();
			};
		});

		window.addEventListener("beforeunload", (event) => {
			if (popupWindow && !popupWindow.closed) { popupWindow.close(); };
		});
	}
}

function createHeaders(token = null) {
    var headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (token) {
        headers.Authorization = token;
    }

    return headers;
}