function pubsub()
{
	const subscribers={}
	
	

	var publish=function(eventname,data){
		
		
		if(!Array.isArray(subscribers[eventname])){
			return
		}
		subscribers[eventname].forEach((callback)=>{
			
				callback(data);
			
		});
		
	}
	
	var subscribe=function(eventname,callback){
			 
			 if(!Array.isArray(subscribers[eventname])){
				 
				 subscribers[eventname]=[]
			 }
			 subscribers[eventname].push(callback)
		 }
		 return{
			 
			 publish,
			 subscribe,
		 }
				
		
		
}
	
function addbook()
{
	
	var init =function()
	{
		

		$("#bookform").hide();

		$("#addbook").click(function() {

			add();
			$("#bookform").hide();
			$("#addbookform").show();

		})

		$("#addbookform").click(function() {

			$("#bookform").show();
			$("#addbookform").hide();
		})

	}
	var add=function()
	{
		var bname=document.getElementById("bname").value;
		var author=document.getElementById("author").value;
		var pages=document.getElementById("pages").value;
		var publisher=document.getElementById("publisher").value;
		var isbn=document.getElementById("isbn").value;
		if(document.getElementById("yes").checked)
			{
				
				isavail=document.getElementById("yes").value;
			}
		else if(document.getElementById("no").checked)
			{
			
				isavail=document.getElementById("no").value;
			
			}
		
		var g=document.getElementById("genre").value;
		var genre=g.split(',')
		var data={}
		data.bname=bname;
		data.author=author;
		data.pages=pages;
		data.publisher=publisher;
		data.isbn=isbn;
		data.genre=genre;
		data.isavail=isavail;
		pdata=document.getElementById("tablebody").innerHTML;
		var xmlrequest =new XMLHttpRequest();
		xmlrequest.open("POST","/add",true);
		xmlrequest.onreadystatechange=function(){
				
			if(xmlrequest.readyState==4 && xmlrequest.status==200)
				{

		    	  document.getElementById("bname").value="";
		    	  document.getElementById("author").value="";
		    	  document.getElementById("pages").value="";
		    	  document.getElementById("publisher").value="";
		    	  document.getElementById("isbn").value="";
		    	  document.getElementById("genre").value="";
		    	  
		    	  result=JSON.parse(xmlrequest.responseText);
					
		    		if(result.success)
		    			{
			    			ps.publish("add",result);
		    			}
		    		else
		    			{
		    				alert(result.reason);
		    			}
			}
			
			
			
		}
		xmlrequest.setRequestHeader("Content-type","application/json");
		xmlrequest.send(JSON.stringify(data));
	}
	return init();
	

}


function displaybook()
	{
		var init=function()
		{
			display();
		}
		
		var display=function()
		{
		var xmlrequest =new XMLHttpRequest();
		var book;
		xmlrequest.open("GET","/view",true);
		
		xmlrequest.onreadystatechange=function(){
				
			if(xmlrequest.readyState==4 && xmlrequest.status==200)
			{
		    	result=JSON.parse(xmlrequest.responseText);
				ps.publish("display",result);
				
			}
				
		}
		xmlrequest.send();
		}
		return init();
}
	
function searchbook()
	{
	
		var init=function()
		{

			$("#search").click(function() {

				search();

			});

		}
	
		var search=function()
		{
		
		var searchby = document.getElementById("searchby").value;
		var searchtext = document.getElementById("searchtext").value;
		var xmlrequest = new XMLHttpRequest();
		var data={};
		data.searchby=searchby;
		data.searchtext=searchtext;
		
		
		xmlrequest.open("POST","/search",true);
		xmlrequest.onreadystatechange=function(){
			
			
			if(xmlrequest.readyState==4 && xmlrequest.status==200)
			{
			
				
			    result=JSON.parse(xmlrequest.responseText);
				console.log(result)

				if(result.length==0)
					{
						alert("No Data found!!");
					}
				else
					{
					ps.publish("display",result);
					}
			}
			
		}
		xmlrequest.setRequestHeader("Content-type","application/json");
		xmlrequest.send(JSON.stringify(data));
		
	}
		return init();

}
  	
function tablevalues()
{
	var init=function()
	{
		ps.subscribe("display",displaytable);
		ps.subscribe("add",addtable);

	}
	
	var displaytable=function(data)
	{
	pdata=document.getElementById("tablebody").innerHTML;
	pdata="";	
	for(i=0, l=data.length;i<l;i++)
	{
		book = data[i];
		if(book.isavail)
			{
				avail="Yes"
			}
		else
			{
			avail="No"
			}
		pdata=pdata+"<tr><td>"+book.bname+"</td>"
			  +"<td>"+book.author+"</td>"
			  +"<td>"+book.pages+"</td>"
			  +"<td>"+book.publisher+"</td>"
			  +"<td>"+book.isbn+"</td>"
			  +"<td>"+book.genre+"</td>"
			  +"<td id='isavailability'>"+avail+"</td>"
			  +"<td>" +"<input type='hidden'  id="+book.isbn+" value="+book.isbn+">"
			  +"<Button id="+book.isbn+" class='borrowbutton'>Borrow</Button></td></tr>";
	}
	document.getElementById("tablebody").innerHTML=pdata;

	$(".borrowbutton").click(function(){
	
		var data={};
		data.isbn=this.id;
		xmlrequest=new XMLHttpRequest();
		xmlrequest.open("POST","/borrowed",true);
		xmlrequest.onreadystatechange=function(){
			
			
			if(xmlrequest.readyState==4 && xmlrequest.status==200)
			{
					result=JSON.parse(xmlrequest.responseText)
					alert(result.message);			
					document.getElementById("isavailability").innerHTML=result.isavail;
			}
			
		}
		xmlrequest.setRequestHeader("Content-type","application/json");
		xmlrequest.send(JSON.stringify(data));
		

		
		
	})
	
	}
	
	var addtable=function(data)
	{
		pdata=document.getElementById("tablebody").innerHTML;
		pdata=pdata+"<tr><td>"+data.book.bname+"</td>"
	 	  +"<td>"+data.book.author+"</td>"
	      +"<td>"+data.book.pages+"</td>"
	      +"<td>"+data.book.publisher+"</td>"
	      +"<td>"+data.book.isbn+"</td>"
		  +"<td>"+data.book.genre+"</td></tr>";
		  +"<td>"+data.book.isavail+"</td>"
		document.getElementById("tablebody").innerHTML=pdata;
		
		
	}
	return init();
	
}


function user()
{
	
		var init=function()
		{
				getUser();
		}
	
		var getUser=function()
		{
		var xmlrequest =new XMLHttpRequest();
		
		
		xmlrequest.open("POST","/getUser",true);
		
		xmlrequest.onreadystatechange=function(){
				
			if(xmlrequest.readyState==4 && xmlrequest.status==200)
			{
		    	result=JSON.parse(xmlrequest.responseText);
		    	document.getElementById("name").innerHTML=result[0];
		    	document.getElementById("img1").src="data:image/jpg;base64,"+result[1];
			}
				
				
		}
		xmlrequest.send();	
		}
		
		return init();
		
}


$(document).ready(function() {

	
	ps=new pubsub();
	addbook();
	searchbook();
	displaybook();
	user();
	tablevalues();
	
});
