var loggedIn = true;


	if(document.getElementsByClassName("rbx-lead")[0] == null){
		loggedIn = false;
	}
	else{
		loggedIn = true;
	}

console.log(loggedIn);

if(loggedIn){


	QNRG();
	//save pass as well inside of QRNG

}else{

	getPass();

}

function savePass(pass) {
        chrome.storage.sync.set({'pass': pass}, null);
}

function getPass(){
chrome.storage.sync.get('pass', function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      document.getElementById('Password').value = items.pass;
    }
  });
}

function chngRobloxPass(oldPass, newPass, xToken){
		//https://www.roblox.com/account/changepassword
/*
$.post( "https://www.roblox.com/account/changepassword", { oldPassword: oldPass, newPassword: newPass, confirmNewPassword: newPass})
  .done(function( data ) {
    console.log(data);
  });
*/



  $.ajax({
      url:"https://www.roblox.com/account/changepassword",
      type:"POST",
      headers: { 
        "X-CSRF-TOKEN" : xToken
      },
      contentType:"application/x-www-form-urlencoded; charset=UTF-8",
      data:{ oldPassword: oldPass, newPassword: newPass, confirmNewPassword: newPass }
    });

}

String.prototype.between = function(prefix, suffix) {
  s = this;
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  }
  else {
    return '';
  }
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    }
    else {
      return '';
    }
  }
  return s;
}


function QNRG(){
	//Retrieve a random 20 char long hex string from the Australian National Univesrity in real time
	//thank you for the API ANU
	var temp = null;
	

	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {



      var markup = document.documentElement.innerHTML;

 var xToken = markup.between("Roblox.XsrfToken.setToken('", "');");

//console.log(xToken);


		
  



      temp = xhttp.responseText;

          chrome.storage.sync.get('pass', function(items) {
    if (!chrome.runtime.error) {

    	chngRobloxPass(items.pass, JSON.parse(temp).data[0], xToken);
      console.log(items.pass + ":" + temp);

      	 console.log(JSON.parse(temp).data[0]);
      savePass(JSON.parse(temp).data[0]);
      
    }
  });

     


      

    }
  };
  xhttp.open("GET", "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=hex16&size=10", true);
  xhttp.send();

  //tried to use a spin-lock untill temp was not nul... crashed the browser.

  return temp;

}