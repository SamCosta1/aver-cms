class AverFirebase {

   constructor(firebaseConfig) {
      this.auth = new Auth(firebaseConfig);
   }

   onDataPathChanged(dataPath, newData) {

   }

   isAuthorised() { return this.auth.isAuthorised() }

   getBackupsList() {

   }

   getFullData() {
      return firebase.database().ref('site-data/').once('value').then((snapshot) => {
         return snapshot.val();
      });
   }

   getDataAtPath(path) {

   }

   getBackupFileAtIndex(index) {

   }

   signIn(email, password) {
      return this.auth.signInWithUserNameAndPassword(email, password);
   }
}