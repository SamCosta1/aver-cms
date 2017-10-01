class DataManager {
   constructor (comms, errorController) {
      this.comms = comms;
      this.errorController = errorController;
      this.listeners = [];

      this.getData();
   }

   getDataForPath(basepath) {
      return this._getDataFromPath(this.data, basepath);
   }

   setPaths(paths) {
      this.pagePath = paths['pagePath'];
      this.partialsPath = paths['partialsPath'];
   }

   registerDataListener(listener) {
      if (typeof listener.onDataChange !== 'function') {
         throw 'Listener must have an onDataChange method';
      } if (typeof listener.onDataInitialLoad !== 'function') {
         throw 'Listener must have an onDataInitialLoad method';
      }

      this.listeners.push(listener);
   }

   updateListeners() {
      for (const listener of this.listeners) {
         listener.onDataChange(this.data)
      }
   }

   notifyListenersLoaded() {
      for (const listener of this.listeners) {
         listener.onDataInitialLoad(this.data)
      }
   }

   _getDataFromPath(data, path) {
      let newData = data;
      for (const prop of path.split('.')) {
         if (prop.trim() !== '') {
            newData = newData[prop];
         }
      }

      return newData;
   }

   getData() {
      this.comms.getFullData().then((data) => {
         const pagedata = this._getDataFromPath(data, this.pagePath);
         const partialsData = this._getDataFromPath(data, this.partialsPath);

         Object.assign(pagedata, partialsData);
         this.data = pagedata;

         this.notifyListenersLoaded();
      }).catch(this.errorController.onError);
   }
}