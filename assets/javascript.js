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

//reference to firebase
var database = firebase.database();

//on-click submit train button
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

//pushes input info to firebase
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
  //var monthsBilled;
  trainTr.html("<td>" + childSnapshot.val().trainName + "</td>" +
      "<td>" + childSnapshot.val().trainDestination + "</td>" +
      "<td>" + childSnapshot.val().trainFrequency + "</td>" + "<td>");
  $("#train-info").append(trainTr);
//+ "Next Time" + "</td>" + "<td>" + "Minutes Away" + "</td>"
});	