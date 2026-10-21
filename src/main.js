import { createDialog } from "./dialog";

(() => {
    const hosts = ["bloxd.io", "staging.bloxd.io"];
    if (!hosts.includes(location.host)) {
        alert("Use this with opening bloxd.io");
    }
    const nameElements = document.querySelectorAll("#root > div.WholeAppWrapper > div > div.EverythingMenuContainer > div > div > div.EverythingMenuBody > div.SettingsMenu.Menu > div.MenuBody.SettingsMenuRight > div > div.SettingBox.SetAccountNameDiv.SmallTextLight > div.EnterAccNameDivWrapper > input");

    if (nameElements.length !== 1) {
        alert("Couldn't get your name");
        return;
    }
    const currentName = nameElements[0].value;


    function getCookie(name) {
        const cookie = document.cookie
            .split("; ")
            .find(row => row.startsWith(name + "="));

        return cookie
            ? decodeURIComponent(cookie.substring(name.length + 1))
            : null;
    }
    const currentAccount = getCookie("___Secure-3PSIDMC");

    const storageJSON = localStorage.getItem("account_manager__accounts") ?? "{}";
    let storage;
    try {
        storage = JSON.parse(storageJSON);
    } catch (e) {
        alert("アカウント情報の読み取りに失敗しました：" + e.toString());
    }
    storage[currentAccount] = {
        name: currentName,
        session: currentAccount,
    };

    localStorage.setItem("account_manager__accounts", JSON.stringify(storage));



    createDialog(
        "アカウントを変更：",
        {
            ...storage,
            add: {
                name: "+ Add",
            },
        },
        currentAccount,
        (id, label) => {
            if (id === "add") {
                // Clear it
                document.cookie = "___Secure-3PSIDMC=; max-age=0; path=/; secure"
                return;
            }
            document.cookie = "___Secure-3PSIDMC="
                + encodeURIComponent(id)
                + "; max-age="
                + (400 * 24 * 60 * 60)
                + "; path=/; secure";

            // Disable the browser's confirm dialog and reload
            window.onbeforeunload = null;
            location.reload();
        }
    )
})();