class Auth {
    constructor() {
        (document.querySelector('body') as HTMLBodyElement).style.display = "none";
        const auth = localStorage.getItem('auth');
        this.validateAuth(auth);
    }

    validateAuth(auth: string | null) {
        if (auth != '1') {
            window.location.replace('/');
        } else {
            (document.querySelector('body') as HTMLBodyElement).style.display = "block";
        }
    }

    logOut() {
        localStorage.removeItem('auth');
        window.location.replace('/');
    }
}