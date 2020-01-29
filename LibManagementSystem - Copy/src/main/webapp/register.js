function logreg()
{
	const subscribers={}
	
	
	function regstatus(data,name)
	{
		console.log(data)
	}

	function publish(eventname,data,name){
		
		
		if(!Array.isArray(subscribers[eventname])){
			return
		}
		subscribers[eventname].forEach((regstatus)=>{
			
				regstatus(data,name);
			
		});
		
	}
	 function subscribe(eventname){
			 
			 if(!Array.isArray(subscribers[eventname])){
				 
				 subscribers[eventname]=[]
			 }
			 subscribers[eventname].push(regstatus)
		 }
		 return{
			 
			 publish,
			 subscribe,
		 }
				
		
		
}




function login()
{
	function loginevent()
	{
		$("#newuser").click(function() {

			$("#registerform").show();
			$("#newuser").hide();
			$("#loginform").hide();	
		})
			$("#olduser").click(function(){
			
			$("#loginform").show();
			$("#registerform").hide();
			$("#newuser").show();

		})
	}

	function loginverify()
	{
	var username=document.getElementById("logusername").value;
	var password=document.getElementById("logpassword").value;
	data={};
	data.username=username;
	data.password=password;
	var xmlrequest = new XMLHttpRequest();
	xmlrequest.open("POST", "/Verify", true);
	xmlrequest.onreadystatechange = function() {

		document.getElementById("logusername").value = "";
		document.getElementById("logpassword").value = "";
		if (xmlrequest.readyState == 4 && xmlrequest.status == 200) {
			
			
			window.location = "index.jsp";

		}

	}
	xmlrequest.setRequestHeader("Content-type","application/json");
	
	xmlrequest.send(JSON.stringify(data));
	}
	return{
		
		loginverify,
		loginevent,
	}
	
}	
	
	



function reg() {
	
	function regevent()
	{
				
				$("#registerform").hide();
				
	
	}
	
	function regverify()
	{
		
	
	 image = document.getElementById("img1").files[0];
	 username = document.getElementById("username").value;
	 password = document.getElementById("password").value;

	formdata = new FormData();
	formdata.append("username", username);
	formdata.append("password", password);

	formdata.append("image",image);

	var xmlrequest = new XMLHttpRequest();
	xmlrequest.open("POST", "/register", true);
	xmlrequest.onreadystatechange = function() {

		document.getElementById("username").value = "";
		document.getElementById("password").value = "";
		document.getElementById("img1").value = "";
		if (xmlrequest.readyState == 4 && xmlrequest.status == 200) {
			
			result = JSON.parse(xmlrequest.responseText);
			alert(result.message);
			lr.publish("registration",result.message)
		}
	}
	xmlrequest.send(formdata);
	}
	return {
		regverify,
		regevent,
	}
	
}

$(document).ready(function(){
	
	reg().regevent();
	login().loginevent();
	lr=new logreg();
	lr.subscribe("registration");
})
