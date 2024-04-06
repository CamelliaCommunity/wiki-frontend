export default class Utils {
    static setTitle(title) {
        if (title === "")
            document.title = "Camellia Wiki";
        else
            document.title = title + " | Camellia Wiki";
    }
}