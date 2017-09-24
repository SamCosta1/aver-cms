class AverFirebase {

   constructor(firbaseConfig) {
      this.auth = new Auth(firebaseConfig);
   }

   onDataPathChanged(dataPath, newData) {

   }

   isLoggedIn() { return this.auth.isLoggedIn() }

   getBackupsList() {

   }

   getFullData() {

   }

   getDataAtPath(path) {

   }

   getBackupFileAtIndex(index) {

   }

   signIn(email, password) {
      this.auth.signInWithUserNameAndPassword(email, password);
   }
}