var button = $('button'),
    input = $('input');

button.click(function(){
  gitQuery();
});

function gitQuery(){
  $('.container').empty();
  var username = input.val();
  var key = 'de8d63686f9c21f55aa05b1c8365791379eb51b7';
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://api.github.com/users/"+ username +"/orgs?access_token=" + key,
    method: "GET",
    processData: false,
    data: "{}"
  };
  $.ajax(settings).done(function(response) {
    for (var index in response){
      console.log(response[index]);
      new displayOrg(response[index]);
    }
  });
}

function displayOrg(org){
  // console.log("here we are");
  this.info = {
    name: org.login,
    img: org.avatar_url,
    description: org.description,
  };

  this.createElements = function() {
    var orgContainer = $('<div>').attr('class', 'org-container');
    var img = $('<img>').attr('src', this.info.img).appendTo(orgContainer);
    var span = $('<span>').text(this.info.name).appendTo(orgContainer);

    $(orgContainer).appendTo('.container');
  };

  this.createElements();
}
