class AverFirebase {

   constructor(firebaseConfig) {
      this.auth = new Auth(firebaseConfig);
   }

   onDataPathChanged(dataPath, newData) {

   }

   getAuthorisationState() { return this.auth.getAuthorisationState() }

   getBackupsList() {

   }

   getFullData() {
      return firebase.database().ref('site-data/').once('value').then((snapshot) => {
         return snapshot.val();
      });
   }

   _pathTransform(path) {
      return path.replace(/\./g, '/');
   }
   saveDataAtPath(data, path) {
      const firebasePath = this._pathTransform(path);
      return firebase.database().ref(`site-data/${firebasePath}`).set(data)
   }

   getBackupFileAtIndex(index) {

   }

   signIn(email, password) {
      return this.auth.signInWithUserNameAndPassword(email, password);
   }
}