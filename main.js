let firstnameCheck = /^[a-zA-z]{1,20}$/;
let secondnameCheck = /^[a-zA-z]{1,20}$/;
let emailCheck = /\S+@\S+\.\S/;
let passwordCheck = /^\w{4,15}$/

const SIGNUP = document.forms.signUp;
const SIGNUPBTN = SIGNUP.SignUpBtn;
const SIGNIN = document.forms.signIn;
const SIGNINBTN = SIGNIN.SignInBtn;
const EXITBTN = document.querySelector('.btnExit');
const SIGNINLINK = document.querySelector('.showSignIn');
const SIGNUPLINK = document.querySelector('.showSignUp');
const PROFILE = document.querySelector('.profile');

let personName = document.querySelector('.personName');
let personEmail = document.querySelector('.personEmail');
let eror = document.querySelectorAll('.error');

SIGNINLINK.addEventListener('click', function () {
    SIGNIN.style.display = "block";
    SIGNUP.style.display = "none";
})

SIGNUPLINK.addEventListener('click', function () {
    SIGNUP.style.display = "block";
    SIGNIN.style.display = "none";
    eror[2].style.display = "none";
    eror[1].style.display = "none";
})

let USERS = [];
let array = JSON.parse(localStorage.getItem(localStorage.key(0)));
let checkmail = true;

SIGNUPBTN.addEventListener('click', function () {
    if (firstnameCheck.test(SIGNUP.FirstName.value)) {
        SIGNUP.FirstName.className = 'form-control is-valid';
    } else {
        SIGNUP.FirstName.className = 'form-control is-invalid';
    }
    if (secondnameCheck.test(SIGNUP.LastName.value)) {
        SIGNUP.LastName.className = 'form-control is-valid';
    } else {
        SIGNUP.LastName.className = 'form-control is-invalid';
    }
    if (emailCheck.test(SIGNUP.Email.value)) {
        SIGNUP.Email.className = 'form-control is-valid';
        array = JSON.parse(localStorage.getItem(localStorage.key(0)));
        if (localStorage.length > 0 && localStorage.getItem('users')) {
            USERS = JSON.parse(localStorage.getItem('users'));
            for (let i = 0; i < array.length; i++) {
                if (array[i].email == SIGNUP.Email.value) {
                    eror[0].style.display = "block";
                    eror[0].style.top = "393px";
                    checkmail = false;
                    SIGNUP.Email.className = 'form-control is-invalid';
                    break;
                } else {
                    checkmail = true;
                    eror[0].style.display = "none";
                    SIGNUP.Email.className = 'form-control is-valid';
                }
            }
        }
    } else {
        SIGNUP.Email.className = 'form-control is-invalid';
        eror[0].style.display = "none";
    }
    if (passwordCheck.test(SIGNUP.Password.value)) {
        SIGNUP.Password.className = 'form-control is-valid';
    } else {
        SIGNUP.Password.className = 'form-control is-invalid';
    }
    if (firstnameCheck.test(SIGNUP.FirstName.value) &&
        secondnameCheck.test(SIGNUP.LastName.value) &&
        emailCheck.test(SIGNUP.Email.value) &&
        passwordCheck.test(SIGNUP.Password.value)) {
        if (checkmail) {
            let user = {
                fName: SIGNUP.FirstName.value,
                sName: SIGNUP.LastName.value,
                email: SIGNUP.Email.value,
                password: SIGNUP.Password.value
            }
            USERS.push(user);
            localStorage.setItem('users', JSON.stringify(USERS));
            SIGNUP.FirstName.value = '';
            SIGNUP.LastName.value = '';
            SIGNUP.Email.value = '';
            SIGNUP.Password.value = '';
            SIGNUP.FirstName.className = 'form-control';
            SIGNUP.LastName.className = 'form-control';
            SIGNUP.Email.className = 'form-control';
            SIGNUP.Password.className = 'form-control';
            eror[1].style.display = "none";
        }
    }

});

SIGNINBTN.addEventListener('click', function () {
    if (localStorage.length == 0) {
        eror[1].style.display = "block";
    } else {
        array = JSON.parse(localStorage.getItem(localStorage.key(0)));
        for (let i = 0; i < array.length; i++) {
            if (array[i].email == SIGNIN.EmailSignIn.value && array[i].password == SIGNIN.PasswordSignIn.value) {
                SIGNIN.style.display = "none";
                PROFILE.style.display = "block";
                personName.textContent = array[i].fName + ' ' + array[i].sName;
                personEmail.textContent = array[i].email;
                eror[2].style.display = "none";
            } else {
                eror[2].style.display = "block";
            }
        }
    }

})

EXITBTN.addEventListener('click', function () {
    PROFILE.style.display = "none";
    SIGNIN.style.display = "block";
    eror[2].style.display = "none";
    SIGNIN.EmailSignIn.value = '';
    SIGNIN.PasswordSignIn.value = '';
})