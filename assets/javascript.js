// Initialize Firebase
var config = {
  apiKey: "AIzaSyA6ZZ04zoIZP3cPwUIeb2YqCHxl76-P2tQ",
    authDomain: "classdemo-5e8b0.firebaseapp.com",
    databaseURL: "https://classdemo-5e8b0.firebaseio.com",
    projectId: "classdemo-5e8b0",
    storageBucket: "classdemo-5e8b0.appspot.com",
    messagingSenderId: "568530595563"
};

  firebase.initializeApp(config);

// Reference to Firebase
var database = firebase.database();

// On-click submit train button
$("#submit-train").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var trainName = $("#train-name").val().trim();
    console.log(trainName);

  var trainDestination = $("#train-destination").val().trim();
    console.log(trainDestination);

  var trainTime = $("#train-time").val().trim();
    console.log(trainTime);

  var trainFrequency = $("#train-frequency").val().trim();
    console.log(trainFrequency);

// Pushes input info to firebase
  database.ref().push({
    trainName: trainName,
    trainDestination: trainDestination,
    trainTime: trainTime,
    trainFrequency: trainFrequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
});

// Adds information from Firebase to the Train Schedule Table
// Moment.js part is definitely not correct - couldn't quite figure it out :(
database.ref().on("child_added", function(childSnapshot){
  var trainTr = $("<tr>");
  var nextArrival = moment(childSnapshot.trainTime).toNow(moment.duration(childSnapshot.timeFrequency, "minutes"));
  var minutesAway = moment(nextArrival).toNow();

  trainTr.html("<td>" + childSnapshot.val().trainName + "</td>" + "<td>" + childSnapshot.val().trainDestination 
    + "</td>" + "<td>" + childSnapshot.val().trainFrequency + "</td>" + "<td>" + nextArrival + "</td>" + "<td>" 
    + moment(minutesAway).format("HH:mm") + "</td>");
  
  $("#train-info").append(trainTr);
});	