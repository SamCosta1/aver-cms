class Auth {

   constructor(firebaseConfig) {
      if (typeof firebaseConfig === 'undefined') throw "You must supply a firebase config!";
      if (typeof firebase === 'undefined') throw "Please include firebase in your project";

      if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig);
      }
   }

   isLoggedIn() {
      const currentUser = firebase.auth().currentUser;
      return  currentUser !== undefined && currentUser !== null;
   }

   signInWithUserNameAndPassword(email, password) {
      this.email = email;
      console.log(firebase.auth(), email, password);
      return firebase.auth().signInWithEmailAndPassword(email, password);
   }

   getUserEmail() {
      return this.email;
   }

}