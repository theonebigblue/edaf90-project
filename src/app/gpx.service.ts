import {Injectable} from '@angular/core';
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {doc, collection, getDoc, getDocs} from "firebase/firestore";
import GpxParser from "gpxparser";

// If done properly this should not be in git but as e.g. env.secret
const serviceAccount = {
    "type": "service_account",
    "project_id": "edaf90-33706",
    "private_key_id": "da020cd568a2053f84f1cce3847d78e97ea0982f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCR6KRcnWocMZmy\nqWYE545mzdhJRRwqurZuwqYOpbde3s7saXViclgB0LFfqAvfF5Cy3uCWmNSDU7Qo\ntIaKFLkpkvgx4hYtP8C/7fLfrMxZ/K20NgZq3qb9phpaaDuvdykl1TipmBB4MyvY\nxq6TWHPvnycIhgpHMigaMUWfTpJD3Dzn3TsYq0/x9vc5T21Jvss+yIsm7pBZasTj\n0RsMuAvYGYDFPMe/nhi3a5GZvmR3xE1OmuT2ReDrQbvww7Ng1lUqxD1XHejK6UWZ\nUtlgZoP7AN71uFjPItiA3SNadLWtAhESR+reAUfkjISCAsfhAoJW6s96UerB+dut\njvkzyXXlAgMBAAECgf8KVoUffPvz/3/sOHrOynXWVNcCMpx1pal2pbZxBHgk6gMC\nNzuQGLFO8ZX+OPHB1Oma9ghOPORjfV9xweZ7mzNrurseGIROaYydKELOFFiViZx+\nOAMBUG6cJ7prclmkziM7ukI9si3utNToc2J47qQVD2Trv4e38fFje2zxck0CWmF3\nlpUvRZ8WYusV42p6D65h44IzU40xe6LJM0AwzZQqZNb49MX5r8TkTi4hbL2lY3YP\n1OcU1wGSWATKC4Vf5UJXX/zEK757AcTs6HRWsoxh9r7In5yKU3KIk2PmQOzuogDc\nfkO+tNULEvH95AO8j9nVBf7lB90uTNIbKXoTeMUCgYEAwbUJ6cmSaRZJmxXSz2Yo\nsWg0YiceXG/fOZzoVmtd3cbG+Ux+hYPybzP/vrACjLhJ7d9eewDrCqhlG4SmItX6\nyfXP6fC3fpEeXWKCQm+ZYbbJxcvsj1lkQvgsjySXONjf0aNFigxKOB7y4EGpOJhl\nZ6S6Hh2xJspUdCkaxpbZlysCgYEAwNSX/Mr1o+cTHT2qhTGIlI3Uc0182Wp4Pd+y\nLyemZCRhpzaTYSoa940589gTbQEuYfsP9+NGfmByXg5IhWjAXDhhro6B9AgcEHhi\nWlpa/wuyXJBKOgLlMJil7iDV+FxuEZfFGztvFCyK0jlUCqo4h/+GuCnhZ04jUbeB\nru1Zny8CgYEAlR4b8oiFGDbbFPM45QYc3217ne/FVJ2ed0iOJzDiAr9qHzI+1+Oa\ndvbNsurmG5Qm/WKN5hzv07WMmCGGj5ywQlbj5pCzgVCP0o3p/uDQb8N6ErWId1X2\ndAN+sfcWHuH9cvHAr6QEYq2YhQCnF3Vh4uaRjGuJG3Z4iy+1eBlaih8CgYBSr1Z0\n2Xq3S3CQy06BSposSRzeTE3K1LK2pWM8gR4CNu+AyhAsS+fAWtiMzQyXYzhGX2eb\nfeNOcYDY//rs6dwCL1MDjKwAvjF6hoR2BeSbFKLouh55/Z/VVL9h+saFduzjslac\ntMGOvwLP3jFBWXhgKJvWAG9c4s6WTb/YCIKzlQKBgCb0KgQwpE2JTTdy8uCSaqDd\nj7Ip/tLarWWIbovkq/MSfPs8J7oXmdTEyEuFJjJyffwzEU4yr8QlTr7lZ5bh1KEW\nYIyp1KM25mE6ewss2kdJvCY2pC/J6zelo/b5rWq4iM7zveYaGNYu/PypFv3BuJJU\nVhXbt+Aof1xCTlONVrJx\n-----END PRIVATE KEY-----\n",
    "client_email": "read-only-edaf90@edaf90-33706.iam.gserviceaccount.com",
    "client_id": "113425017272514886070",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/read-only-edaf90%40edaf90-33706.iam.gserviceaccount.com"
}


const firebaseConfig = {
    projectId: "edaf90-33706",
    credential: serviceAccount
};


@Injectable({
    providedIn: 'root'
})
export class GpxService {
    public app = initializeApp(firebaseConfig);
    public db = getFirestore(this.app);

    constructor() {
    }

    /**
     * Method for fetching all id's from firestore and return them as an array
     */
    async getIds() {
        const querySnapshot = await getDocs(collection(this.db, "items"));
        const ids: string[] = []
        querySnapshot.forEach((doc) => {
            ids.push(doc.id)
        });
        return ids;

    }

    /**
     * Mathod for getting gpx document with a specific id.
     * @param id - The id of the desired gpx document.
     */
    async getDocFromId(id: String) {
        const docRef = doc(this.db, "items", String(id))
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const docData = docSnapshot.data()
            const gpx = new GpxParser();
            gpx.parse(docData['xml'])
            return gpx
        } else {
            console.error("No such document!");
            return undefined
        }

    }
}
