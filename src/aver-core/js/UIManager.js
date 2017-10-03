class UIManager {

   constructor() {
      this.initViews();
      this.initEditableListeners();

      this.editChosenListeners = [];
   }

   onDataChange(path, data) {
      this._updateEditables(this.editables.get(path), data);
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
      this.editables.forEach((editableList, key) => {
         const data = this.ph.getDataForPath(key)
         this._updateEditables(editableList, data);
      });
   }

   _updateEditables(editableList, data) {
      for (const $editable of editableList) {
         $editable.text(data);
      }

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

         const editableList = this.editables.get(path);
         if (editableList === undefined) {
            this.editables.set(path, [$(editable)]);
         } else {
            editableList.push($(editable));
         }

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