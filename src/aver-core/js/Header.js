class Header {
   constructor() {
      this.initViews();
      this.setupListeners();
      this.headerExpanded = true;
      this.listeners = [];
   }

   initViews() {
      this.$body = $('body');
      this.$container = $('.aver-header');
      this.$editToggle = $('#aver-editable-toggle');
      this.$collapseToggle = $('#aver-header-collapse');
   }

   setupListeners() {
      this.$editToggle.click(() => {
         this.$editToggle.toggleClass('aver-toggle-active');
         this.$body.toggleClass('aver-editing');

         const editable = this.$editToggle.hasClass('aver-toggle-active');

         this.$editToggle.text(editable ? 'Editing On' : 'Editing Off');
         this.notifyListeners(editable);
      });

      this.$collapseToggle.click(() => {
         this.headerExpanded = !this.headerExpanded;

         if (this.headerExpanded) {
            this.$container.removeClass('collapsed');
            this.$collapseToggle.addClass('fa-angle-double-left');
            this.$collapseToggle.removeClass('fa-angle-double-right');
         } else {
            this.$container.addClass('collapsed');
            this.$collapseToggle.removeClass('fa-angle-double-left');
            this.$collapseToggle.addClass('fa-angle-double-right');
         }

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