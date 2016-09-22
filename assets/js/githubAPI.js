$(function(){

  $( window ).load(function(e){
    e.preventDefault();
    $('#ghapidata').html();

    var requri   = 'https://api.github.com/users/jenkintr';
    var repouri  = 'https://api.github.com/users/jenkintr/repos';
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html("<h2>No User Info Found</h2>");
      }
      
      else {
        console.log("LOOKS LIKE WE MADE IT!");
        // else we have a user and we display their info
        var fullname   = json.name;
        var username   = json.login;
        var profileurl = json.html_url;
        var location   = json.location;
        var followersnum = json.followers;
        var followingnum = json.following;
        var reposnum     = json.public_repos;
        
        if(fullname == undefined) { fullname = username; }
        
        var outhtml = '<h3>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h3>';
        outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"></a></div>';
        outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
        outhtml = outhtml + '<div class="repolist clearfix">';
        
        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
          else {
            outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
            });
            outhtml = outhtml + '</ul></div>'; 
          }
          $('#ghapidata').html(outhtml);
        } // end outputPageContent()
      } // end else statement
    }); // end requestJSON Ajax call
  }); // end click event handler
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});