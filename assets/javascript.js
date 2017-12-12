// Initialize Firebase
var config = {
	apiKey: "AIzaSyCZvH1iZ2EVB-HiRwJ53IwppdlAQaDFes8",
	authDomain: "train-time-6e777.firebaseapp.com",
	databaseURL: "https://train-time-6e777.firebaseio.com",
	projectId: "train-time-6e777",
	storageBucket: "",
	messagingSenderId: "129541739020"
	};
	firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'
//var database = ...
var database = firebase.database();

// Whenever a user clicks the submit-bid button
$("#submit-train").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();

  // Get the input values
  var trainName = $("#train-name").val().trim();//get the new price
  console.log(trainName);

  var trainDestination = $("#train-destination").val().trim();//get the new price
  console.log(trainDestination);

  var trainTime = $("#train-time").val().trim();//get the new price
  console.log(trainTime);

  var trainFrequency = $("#train-frequency").val().trim();//get the new price
  console.log(trainFrequency);

  database.ref().push({
      trainName: trainName,
      trainDestination: trainDestination,
      trainTime: trainTime,
      trainFrequency: trainFrequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

  });

});

database.ref().on("child_added", function(childSnapshot){
  var trainTr =$("<tr>");
  //var monthsWorked = monthDiff(childSnapshot.val().trainTime);
  var monthsBilled;
  trainTr.html("<td>" + childSnapshot.val().trainName + "</td>" +
      "<td>" + childSnapshot.val().trainDestination + "</td>" +
      "<td>" + childSnapshot.val().trainTime + "</td>" +
      "<td>" + mome + "</td>" +
      "<td>" + childSnapshot.val().trainFrequency + "</td>" +
      "<td>" + "months billed" + "</td>" 
    );
  $("#train-entry").append(trainTr);

});	