// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'AIzaSyBc59nNh8brKJWiEdwjIXF4JlSyjDGhWiQ',
    authDomain: 'vodafone-7484b.firebaseapp.com',
    databaseURL: 'https://vodafone-7484b.firebaseio.com',
    projectId: 'vodafone-7484b',
    storageBucket: 'vodafone-7484b.appspot.com',
    messagingSenderId: '980215102875'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
