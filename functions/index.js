const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.resetPoints = functions.https.onRequest((request, response) => {

	['users', 'points'].forEach(key => {
		admin.database().ref(key).once('value', snapshot => {
			let users = snapshot.val()
		
			Object.keys(users).forEach(id => {
				if (key === 'points') delete users[id].breakdown
				users[id].points = 0
			})
		
			admin.database().ref(key).update(users)
			
		  })
	})

  response.send("Ok")
});
