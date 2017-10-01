class EditBar {
   constructor(dataManager) {
      this.initViews();
      this.setupListeners();
      this.dataManager = dataManager;

      this.currentEditPath = null;
   }

   setupListeners() {
      this.$mainText.on('input', () => {
         if (this.currentEditPath !== null) {
            this.dataManager.updateDataAtPath(this.$mainText.val(), this.currentEditPath);
         }
      })
   }

   initViews() {
      this.$mainText = $('#aver-editbar-textarea');
   }

   onEditChosen(path) {
      this.$mainText.val('');
      this.$mainText.val(this.dataManager.getDataForPath(path));
      this.currentEditPath = path;
   }
}