class AverController {
   constructor(comms) {
      this.comms = comms;

      if (!comms.isAuthorised) {
         console.log('User not authorises');
         return;
      }
      this.uiManager = new UIManager();
      this.errorController = new ErrorController();

      this.getData();

   }

   getData() {
      this.comms.getFullData().then((data) => {
         this.data = data;
      }).catch(this.errorController.onError);
   }



}
