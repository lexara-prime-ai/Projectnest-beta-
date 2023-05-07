"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class UserRegistration {
    /////////////////////////////////
    // METHOD FOR READING FORM INPUT
    /////////////////////////////////
    static readFormInput() {
        const email = document.querySelector("#email").value;
        const fullName = document.querySelector("#fullname").value;
        const userName = document.querySelector("#username").value;
        const password = document.querySelector("#password").value;
        const confirmPassword = document.querySelector("#confirm-password").value;
        return {
            email,
            fullName,
            userName,
            password,
            confirmPassword
        };
    }
    ///////////////////////////////
    // METHOD FOR REGISTERING USER
    ///////////////////////////////
    static registerUser(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            let userInput = UserRegistration.readFormInput();
            if (userInput.email === '' || userInput.fullName === '' || userInput.userName === '' || userInput.password === '' || userInput.confirmPassword === '') {
                alert('Please fill all fields before submitting.');
            }
            else {
                const response = yield fetch("http://localhost:3000/users");
                const users = yield response.json();
                // LOOP THROUGH RESPONSE
                for (let user of users) {
                    ////////////////////////////////////
                    // CSHECK IF USERNAME ALREADY EXISTS
                    ////////////////////////////////////
                    if (userInput.userName == user.Username) {
                        alert("Username already exists,choose another");
                        return;
                    }
                    else {
                        yield fetch("http://localhost:3000/users", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(userInput)
                        });
                        return user;
                    }
                }
            }
        });
    }
}
// SELECTOR | SIGN UP BUTTON
const signUpBtn = document.getElementById("signupbtn");
// EVENT LISTENER
signUpBtn.addEventListener("click", UserRegistration.registerUser);
///////////////////////////
////////// TODO //////////
/////////////////////////
// if(userInput.password !== userInput.confirmPassword){
//     alert("Passwords dont match")
// }
//# sourceMappingURL=registration.js.map