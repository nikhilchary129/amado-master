const btnElements = document.querySelectorAll(".btn");
for (const btn of btnElements) {
  btn.addEventListener("click", function() {
    const formSignin = document.querySelector(".form-signin");
    formSignin.classList.toggle("form-signin-left");
    
    const formSignup = document.querySelector(".form-signup");
    formSignup.classList.toggle("form-signup-left");

    const frame = document.querySelector(".frame");
    frame.classList.toggle("frame-long");

    const signupInactive = document.querySelector(".signup-inactive");
    signupInactive.classList.toggle("signup-active");

    const signinActive = document.querySelector(".signin-active");
    signinActive.classList.toggle("signin-inactive");

    const forgot = document.querySelector(".forgot");
    forgot.classList.toggle("forgot-left");

    this.classList.remove("idle");
    this.classList.add("active");
  });
}
const btnSignup = document.querySelector(".btn-signup");
btnSignup.addEventListener("click", function() {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("nav-up");

  const formSignupLeft = document.querySelector(".form-signup-left");
  formSignupLeft.classList.toggle("form-signup-down");

  const success = document.querySelector(".success");
  success.classList.toggle("success-left");

  const frame = document.querySelector(".frame");
  frame.classList.toggle("frame-short");
});
const btnSignin = document.querySelector(".btn-signin");
btnSignin.addEventListener("click", function() {
  const btnAnimate = document.querySelector(".btn-animate");
  btnAnimate.classList.toggle("btn-animate-grow");

  const welcome = document.querySelector(".welcome");
  welcome.classList.toggle("welcome-left");

  const coverPhoto = document.querySelector(".cover-photo");
  coverPhoto.classList.toggle("cover-photo-down");

  const frame = document.querySelector(".frame");
  frame.classList.toggle("frame-short");

  const profilePhoto = document.querySelector(".profile-photo");
  profilePhoto.classList.toggle("profile-photo-down");

  const btnGoback = document.querySelector(".btn-goback");
  btnGoback.classList.toggle("btn-goback-up");

  const forgot = document.querySelector(".forgot");
  forgot.classList.toggle("forgot-fade");
});
