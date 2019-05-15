// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyArkWXi8WGXsggFAam6-CVS1EcnzNXfLqY',
    authDomain: 'localhost:4200',
    databaseURL: 'https://hacking-style.firebaseio.com',
    projectId: 'hacking-style',
    storageBucket: 'STORAGE-BUCKET-HERE',
    messagingSenderId: '717078031481'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
