const auth = new Auth();  

(document.querySelector('.logout') as HTMLElement).addEventListener('click', (event:Event) => {
    auth.logOut();
})