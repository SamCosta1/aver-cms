class ErrorController {
   constructor() {}

   onError(err) {
      console.log(typeof err.message === 'undefined' ? err : err.message);
   }
}