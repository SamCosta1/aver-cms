class Auth {

   constructor(firbaseConfig) {
      if (firbaseConfig === null || firbaseConfig === undefined) throw "You must supply a firebase config!";
      if (firebase === null || firebase === undefined) throw "Please include firebase in your project";

      firebase.initializeApp(firbaseConfig);
   }

   isLoggedIn() {
      const currentUser = firebase.auth().currentUser;
      return  currentUser !== undefined && currentUser !== null;
   }

   signInWithUserNameAndPassword(email, password) {
      this.email = email;
      return firebase.auth().signInWithUserNameAndPassword(email, password);
   }

   getUserEmail() {
      return this.email;
   }

}