//define functions here
var createGist = function(fileName, content, description, token){

  var myData = {}
    myData.description = description
    myData.public = true
    myData.files = {}
    myData.files[fileName] = {}
    myData.files[fileName].content = content

    $.ajax({
      url: 'https://api.github.com/gists',
      type: 'POST',
      dataType: 'json',
      headers: {
        Authorization: 'token ' + token
      },
      data: JSON.stringify(myData)
    }).done(function(data) {
      var username = data.owner.login;
      myGists(username, token);
    })
};

var myGists = function (username, token){
  var userGists = document.getElementById('user-gists')

    $.ajax({
      url: 'https://api.github.com/users/' + username + '/gists',
      type: 'GET',
      dataType: 'json',
      headers: {
        Authorization: 'token ' + token
      },
      success: function(data) {
        var gists = data.map(el => '<li><a href="' + el.html_url + '">' + el.description + '</a></li>').join("")
        userGists.innerHTML = '<ul>' + gists + '</ul>'
      }
    })
};

var bindCreateButton = function() {
  // call functions here

  var form = document.getElementById('gist-form')
  console.log(form)
  form.addEventListener('submit', function(event) {
    event.preventDefault()

      var token = document.getElementById('gist-personal-token').value
      var filename = document.getElementById('gist-file-name').value
      var desc = document.getElementById('gist-description').value
      var content = document.getElementById('gist-content').value

      createGist(filename, content, desc, token)

  })

};

$(document).ready(function(){

    bindCreateButton()

});
