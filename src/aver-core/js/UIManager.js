class UIManager {

   constructor() {
      this.initViews();
      this.initEditableListeners();
   }

   initViews() {
      const $body = $('body');

      $body.append(markup);

      this.pagePath = $body.data('aver-basepath');
      this.partialsPath = $body.data('aver-partials');


      console.log('root: ', this.partialsPath, this.pagePath);

   }

   initEditableListeners() {
      $('body').on('click', '.aver-editable', () => {

      });
   }
}