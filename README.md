# Firebase authentication, database, and push notification demo app
This is a React Native proof-of-concept app created to demonstrate some advanced features with minimal code using firebase:
- user authentication / login
- database microservice
- real-time data updates across users and devices
- push notifications

After a user logs in, the app displays a table of fictional sales records. New sales can be added from the app and will appear on any device that has the app open. If the new sale exceeds a threshold of $100, a push notification is sent to all users of the app.

Known Issues / Todo Items:
- Push notifications on iOS only work if the app is open.
- App generates some RN errors on startup
- Fix unsubscribe code (currently commented out due to throwing errors)
- Clean up code. Lots of testing log messages are still in place.
- UI improvements: 
    - styling needs improved
    - how the application works isn't clear to user (i.e. register link on home screen and Add Sale button on sales screen both require filling in text boxes before tapping the link/button, but the UI doesn't make that clear)

## Note
This repo does not contain the Firebase config files (android/app/google-services.json and ios/GoogleService-Info.plist). Running the app requires setting up a Firebase account and creating those files.


> Written with [StackEdit](https://stackedit.io/).