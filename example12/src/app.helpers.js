
/**
 * NOTIZ: hier lagern wir eine Funktionalität, die wir öfter benötigen in eine eigene helper Funktion aus. (DRY = Don't repeat yourself)
 * Holt die aktuell in localstorage gespeicherten bookmarked_products und versichert, dass wir mit einem Javascript Objekt arbeiten
 */
export function getCurrentBookmarks() {
    // hole das aktuelle Array an gebookmarkten Produkten aus localStorage
    const currentBookmarksJsonString = localStorage.getItem(
        "bookmarked_products"
    );

    // wenn wir kein localStorage item finden konnten -> gib ein leeres objekt zurück
    if (!currentBookmarksJsonString) {
        return {};
    }

    // andernfalls (wir haben einen localstorage string gefunden) -> gib den String zurück
    // wir müssen hier allerdings den String in ein Javascript Objekt verwandeln, um damit arbeiten zu können (localStorage erlaubt nur Strings, daher müssen wir es immer in JSON verwandeln)
    return JSON.parse(currentBookmarksJsonString);
}

/*
 * NOTIZ: diese Funktion kümmert sich darum den Status eines Produkts zu ändern
 * Um das zu tun, muss mit localStorage das gesamte aktuelle Bookmark Objekt ausgelesen, um das eine Produkt verändert und dann wieder gespeichert werden.
 * Das ist das, worum sich diese Funktion kümmert.
 */
export function updateBookmarkedProducts(productId, newStatus) {
    // hol die aktuellen bookmarks im localstorage
    const currentBookmarks = getCurrentBookmarks();

    // setze den Status für das aktuelle Produkt auf den neuen Bookmark Status

    // wenn der neue Status "true" ist -> setze das element
    if (newStatus == true) {
        currentBookmarks[productId] = newStatus;
    } else {
        // andernfalls -> entferne das Element aus dem Objekt
        delete currentBookmarks[productId];
    }

    // nun konvertiere das currentBookmarks Array wieder in einen JSON string, den localStorage akzeptiert
    const newBookmarksJsonString = JSON.stringify(currentBookmarks);

    // wir speichern das Result in localStorage, um die Werte über einen "Reload" der Seite hinweg zu speichern
    // localstorage ist einfach ein langfristier Platz, wo wir Daten zwischen Browseraufrufen einfach speichern können.
    // hiermit wird beim nächsten Starten der Applikation der aktuelle Status der "bookmarked_products" gemerkt
    localStorage.setItem("bookmarked_products", newBookmarksJsonString);

    // gib das neue bookmark objekt zurück
    return currentBookmarks;
}