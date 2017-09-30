$(document).ready(() => {
   $('body').append(markup);

   // TODO: Move the passing in of aver firebase somewhere else
   new AverController(new AverFirebase(null));
});