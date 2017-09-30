class AverLogin {

   constructor(authModule, onLoggedInLink = '/admin'){
      this.authModule = authModule;
      this.onLoggedInLink = onLoggedInLink;
   }

   init() {
      this.initViews();
      this.setupListeners();
   }

   initViews() {
      this.$email = $('#aver-email');
      this.$password = $('#aver-password');
      this.$submitButton = $('#submit-button');
      this.$loader = $('.aver-loading-spinner');
      this.$emailErr = $('#email-err');
      this.$passwordErr = $('#password-err');
   }

   setupListeners() {
      this.$submitButton.click($.proxy(this.loginClicked, this));
      $(document).keyup(e => {
         if (e.which === 13 || e.keyCode === 13) {
            this.loginClicked();
         }
      });
   }

   loginClicked() {
      const email = this.$email.val();
      const password = this.$password.val();

      this.clearErrors();

      let errors = false;
      if (this.stringIsEmpty(email)) {
         this.emailErr();
         errors = true;
      }

      if (this.stringIsEmpty(password)) {
         this.passwordErr();
         errors = true;
      }

      if (errors) {
         return;
      }

      this.$loader.show();
      this.authModule.signIn(email, password).then(() => {
         this.$loader.hide();
         window.location.href = this.onLoggedInLink;
      }).catch(err => {
         this.$loader.hide();
         this.passwordErr(err.message);

      });
   }

   clearErrors() {
      this.$emailErr.text('');
      this.$passwordErr.text('');
   }

   static stringIsEmpty(str) { return typeof str === 'undefined' || str === null || str.length === 0; }
   emailErr() { this.$emailErr.text('Email invalid'); }
   passwordErr(msg = 'Password invalid') { this.$passwordErr.text(msg); }
}
