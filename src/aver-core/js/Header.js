class Header {
   constructor() {
      this.initViews();
      this.setupListeners();

      this.listeners = [];
   }

   initViews() {
      this.$body = $('body');
      this.$editToggle = $('#aver-editable-toggle');
   }

   setupListeners() {
      this.$editToggle.click(() => {
         this.$editToggle.toggleClass('aver-toggle-active');
         this.$body.toggleClass('aver-editing');

         const editable = this.$editToggle.hasClass('aver-toggle-active');

         this.$editToggle.text(editable ? 'Editing On' : 'Editing Off');
         this.notifyListeners(editable);
      });
   }

   notifyListeners(editable) {
      for (const listener of this.listeners) {
         listener.onEditStateChanged(editable);
      }
   }

   registerEditChangeListener(listener) {
      if (typeof listener.onEditStateChanged !== 'function') {
         throw 'Listener must have an onEditStateChanged method';
      }

      this.listeners.push(listener);
   }
}