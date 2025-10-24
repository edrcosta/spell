export class SpellConnection {
    static checkConnectionUrl = 'http://www.google.com';

    static hasInternet () {
        // navigator.online is not reliable
        return fetch(SpellConnection.checkConnectionUrl, { mode: 'no-cors' }).then(() => true).catch(() => false);
    }
}
