var TrainData = new Firebase("https://bhtrains.firebaseio.com/");


$("#submit").on("click", function(){
	
   // Grabs user input
    var TRname = $("#trainNameInput").val().trim();
    var TRdestination = $("#destinationInput").val().trim();
    var TRfirstTrainTime = moment($("#startInput").val().trim(), "hh:mm").format("X");
    var TRfrequency= $("#frequencyInput").val().trim();

   // Creates local "temporary" object for holding  data
    var newTrain = {
        name:  TRname,
        place: TRdestination,
       	time: TRfirstTrainTime,
        frequency: TRfrequency
    }

  // Uploads train data to the database
    TrainData.push(newTrain);

   // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.place); 
    console.log(newTrain.time); 
    console.log(newTrain.frequency);

    alert("Train successfully added");

//clears text boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val(""); 
    $("#startInput").val("");
    $("#frequencyInput").val("");

    // Prevents moving to new page
    return false;
});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
TrainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var CurrentTime = (moment().format("hh:mm:ss a"));


    var TRName = childSnapshot.val().name;
    var TRdestination = childSnapshot.val().place; 
    var TRNextArrival = (moment().format("hh:mm a"));  
    var TRfrequency = childSnapshot.val().frequency;

    var minutesAway = "X"
    

    // Add each train's data into the table 
    $("#table > tbody").append("<tr><td>" + TRName + "</td><td>" + TRdestination + "</td><td>" + TRNextArrival + "</td><td>" + TRfrequency + "</td><td>" + minutesAway + "</td></tr>");

});


// 60 -current minutes= minutes away

// use moment.js, next train- minutes we are at right now
// 

//

// var FirstHour = "06:00";
// var convertedHour = moment(new Date(FirstHour));
// console.log(convertedHour);

  
// var NextArrival= moment().add(1, 'hours').calendar();
// console.log(NextArrival);