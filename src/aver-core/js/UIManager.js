class UIManager {

   constructor() {
      this.initViews();
      this.initEditableListeners();
   }

   onDataChange(data) {
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

   onDataInitialLoad() {
      this.editables.forEach(($editable, key) => {
         $editable.text(this.ph.getDataForPath(key));
      });
   }

   initViews() {
      this.$body = $('body');
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
      $('body').on('click', '.aver-editable', () => {

      });
   }
}