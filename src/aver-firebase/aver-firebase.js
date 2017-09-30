class AverFirebase {

   constructor(firebaseConfig) {
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
      return this.auth.signInWithUserNameAndPassword(email, password);
   }
}