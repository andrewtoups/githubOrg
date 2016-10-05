var button = $('button'),
    input = $('input');

button.click(function(){
  gitQuery();
});

function handleError(errorObject, textStatus, error) {
  var errorMsg = $('<div>').attr('class', 'org-container');
  errorMsg = errorMsg.text('"' +textStatus+ ": " +error+ '"');
  $(errorMsg).appendTo('.container');
  console.log(errorObject, textStatus, error);
}

function gitQuery(){
  $('.container').empty();
  var username = input.val();
  var key = 'a319189ce3b53d7d45cb008065c75faf9e2fa8a1';
  var settings = {
    async: true,
    crossDomain: true,
    url: "https://api.github.com/users/"+ username +"/orgs?access_token=" + key,
    method: "GET",
    processData: false,
    data: "{}",
    error: handleError
  };
  $.ajax(settings).done(function(response) {
    if (index === undefined) {
      index = 0; //create an org-like object with dummy values
      response[index] = {
        login: "Nothing to display!",
        avatar_url: "",
        description: ""
      };
    }
    for (var index in response){
    new displayOrg(response[index]);
    }
  });
}

function displayOrg(org){

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
