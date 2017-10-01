class AverController {
   constructor(comms) {
      this.comms = comms;

      if (!comms.isAuthorised) {
         console.log('User not authorises');
         return;
      }
      this.errorController = new ErrorController();
      this.uiManager = new UIManager();
      this.dataManager = new DataManager(comms, this.errorController);

      this.dataManager.registerDataListener(this.uiManager);
      this.dataManager.setPaths(this.uiManager.getPaths());
      this.uiManager.setPathsHelper(this.dataManager);

      this.header = new Header();
      this.header.registerEditChangeListener(this.uiManager);
      this.uiManager.setEditAreaChosenListener(new EditBar(this.dataManager));
   }
}
