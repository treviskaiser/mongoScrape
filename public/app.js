// $(document).on("ready", function() {
$.getJSON("/articles", function(data) {
  // For each one

  for (var i = 0; i < data.length; i++) {
    var newDiv = $("<div>");
    var newCard = $("<div>");
    newDiv.attr("class", "card");
    newCard.attr("class", "card-body");
    // Display the apropos information on the page
    newDiv.append(
      "<div class='card-header  text-white bg-primary'> <h5 class='card-title' >" +
        "<a class='text-white' href = https://www.nytimes.com/" +
        data[i].link +
        ">" +
        data[i].title +
        " </h5>"
    );
    newCard.append(
      "<p class='card-text' >" + data[i].description + "</p>",
      "<a href='#' class='btn btn-primary ml-auto save' data-id='" +
        data[i]._id +
        "'> Save </a>"
    );
    newDiv.append(newCard);
    $("#articles").append(newDiv);
  }
});
// });

$("#scrape").on("click", function() {
  $("#uhOh").remove();
  $(".card").remove();
  $.ajax({
    method: "GET",
    url: "/scrape"
  }).then(function() {
    $.getJSON("/articles", function(data) {
      // For each one

      for (var i = 0; i < data.length; i++) {
        var newDiv = $("<div>");
        var newCard = $("<div>");
        newDiv.attr("class", "card");
        newCard.attr("class", "card-body");
        // Display the apropos information on the page
        newDiv.append(
          "<div class='card-header  text-white bg-primary'> <h5 class='card-title' >" +
            "<a class='text-white' href = https://www.nytimes.com/" +
            data[i].link +
            ">" +
            data[i].title +
            " </h5>"
        );
        newCard.append(
          "<p class='card-text' >" + data[i].description + "</p>",
          "<a href='#' class='btn btn-primary ml-auto save' data-id='" +
            data[i]._id +
            "'> Save </a>"
        );
        newDiv.append(newCard);
        $("#articles").append(newDiv);
      }
    });
  });
});

$("#saved").on("click", function() {
  $(".card").remove();
  $.getJSON("/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      var newDiv = $("<div>");
      var newCard = $("<div>");
      newDiv.attr("class", "card");
      newCard.attr("class", "card-body");
      // Display the apropos information on the page
      newDiv.append(
        "<div class='card-header  text-white bg-primary'> <h5 class='card-title' >" +
          "<a class='text-white' href = https://www.nytimes.com/" +
          data[i].link +
          ">" +
          data[i].title +
          " </h5>"
      );
      newCard.append(
        "<p class='card-text' >" + data[i].description + "</p>",
        "<a href='#' class='btn btn-primary ml-auto save' data-id='" +
          data[i]._id +
          "'> Save </a>"
      );
      newDiv.append(newCard);
      $("#articles").append(newDiv);
    }
  });
});
// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append(
        "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
      );

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", ".save", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
});

$("#clear").on("click", function() {
  $.ajax({
    method: "DELETE",
    url: "/drop"
  }) // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    });
});
