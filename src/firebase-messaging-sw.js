importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.6.0/firebase-messaging-compat.js");
firebase.initializeApp({
  apiKey: "AIzaSyC-8LTvmiNctOWRKx5fpD2TPjWM8Pn4G-g",
  authDomain: "pitagon-calendar.firebaseapp.com",
  projectId: "pitagon-calendar",
  storageBucket: "pitagon-calendar.appspot.com",
  messagingSenderId: "93277033660",
  appId: "1:93277033660:web:31ed7042bd913053d3acb9",
  measurementId: "G-PPVCRKEKX6",
  vapidKey: "BEWni-KhPw9M1d4Mou5sBEJrbTLeisepL5WPxCg6uUUvaJolp_zb-xk61wUoi8y-ECTme8KzlC1gLsw6xDb08jI"
});
const messaging = firebase.messaging();
