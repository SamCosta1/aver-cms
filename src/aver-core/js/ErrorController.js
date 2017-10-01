class ErrorController {
   constructor() {}

   onError(err) {
      console.error(typeof err.message === 'undefined' ? err : err.message);
   }
}