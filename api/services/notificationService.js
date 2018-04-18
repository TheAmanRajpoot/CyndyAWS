var admin = require('firebase-admin');
module.exports = {
    sendNotification: function (deviceToken, payload) {
        var appRoot = process.env.PWD + '/cyndyporter-2572d-firebase-adminsdk-2gsjc-9c72746f74.json';
        var serviceAccount = require(appRoot);

        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                databaseURL: "https://cyndyporter-2572d.firebaseio.com"
            });
        }
        var options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        admin.messaging().sendToDevice(deviceToken, payload, options)
            .then(function (response) {
                console.log(response);
                console.log('Notification sent')
            })
            .catch(function (error) {
                console.log(error);
                console.log('Notification failed');
            })
    }
}