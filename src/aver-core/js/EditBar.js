class EditBar {
   constructor(dataManager, errorHandler) {
      this.initViews();
      this.setupListeners();
      this.dataManager = dataManager;
      this.errorHandler = errorHandler;

      this.currentEditPath = null;
   }

   setupListeners() {
      this.$mainText.on('input', () => {
         if (this.currentEditPath !== null) {
            this.dataManager.updateDataAtPath(this.$mainText.val(), this.currentEditPath);
         }
      });

      this.$saveButton.click(() => {
         this.$loader.show();

         this.dataManager.saveDataAtPath(this.currentEditPath)
            .then(() => {
               this.$loader.hide();
               this.$container.addClass('collapsed');
            }).catch(this.errorHandler)
      });
   }

   initViews() {
      this.$mainText = $('#aver-editbar-textarea');
      this.$container = $('.aver-editbar');
      this.$loader = this.$container.find('.aver-loading-spinner');
      this.$saveButton = $('#aver-editbar-save-button')
   }

   onEditChosen(path) {
      this.$mainText.val('');
      this.$mainText.val(this.dataManager.getDataForPath(path));
      this.$container.removeClass('collapsed');
      this.currentEditPath = path;
   }
}