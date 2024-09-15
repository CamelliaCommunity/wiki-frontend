export default class Utils {
	static setTitle(title) {
		if (title === "")
			document.title = "Camellia Wiki";
		else
			document.title = title + " | Camellia Wiki";
	}
	
	static makeSlug = (s) => {
		if (s.endsWith("/")) s = s.slice(0, -1);
		s = s.replace("/", "").replaceAll("/", "-");
		s = s.replaceAll(" ", "-");
		s = s.replaceAll(".html", "");
		return s;
	}
}