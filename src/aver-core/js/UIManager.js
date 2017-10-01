class UIManager {

   constructor() {
      this.initViews();
      this.initEditableListeners();

      this.editChosenListeners = [];
   }

   onDataChange(path, data) {
      this.editables.get(path).text(data);
   }

   setPathsHelper(pathsHelper) {
      this.ph = pathsHelper;
   }

   getPaths() {
      return {
         'pagePath': this.pagePath = this.$body.data('aver-basepath'),
         'partialsPath': this.partialsPath = this.$body.data('aver-partials')
      }
   }

   onEditStateChanged(editable) {
      this.isEditable = editable;
   }

   onDataInitialLoad() {
      console.log('Loaded');
      this.editables.forEach(($editable, key) => {
         $editable.text(this.ph.getDataForPath(key));
      });
   }

   initViews() {
      this.$body = $('body');
      this.$body.removeClass('aver-hidden');
      const $editables = $('.aver-editable');

      this.$body.append(markup);

      this.editables = new Map();

      $editables.each((key, editable) => {
         const path = $(editable).data('aver-path');

         if (typeof path === 'undefined' || path === null) { throw 'Error each editable must have a data-aver-path specified'; }
         this.editables.set(path, $(editable));

      });
   }

   initEditableListeners() {
      $('body').on('click', '.aver-editable', (e) => {
         if (!this.isEditable) {
            return;
         }

         for (const listener of this.editChosenListeners) {
            listener.onEditChosen($(e.target).data('aver-path'));
         }

      });
   }

   setEditAreaChosenListener(listener) {
      if (typeof listener.onEditChosen !== 'function') {
         throw 'Listener must have an onEditChosen method';
      }

      this.editChosenListeners.push(listener);
   }
}