class Auth {

   constructor(firebaseConfig) {
      if (typeof firebaseConfig === 'undefined') throw "You must supply a firebase config!";
      if (typeof firebase === 'undefined') throw "Please include firebase in your project";

      if (!firebase.apps.length) {
         firebase.initializeApp(firebaseConfig);
      }
   }

   getAuthorisationState() {
      return new Promise((resolve, reject) => {
         firebase.auth().onAuthStateChanged((user) => {
            if (user) {
               resolve(true);
            } else {
               resolve(false);
            }
         });
      });
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