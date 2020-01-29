<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Login</title>
<style>
#newuser,#olduser {
	cursor: pointer;
}
#content{
	
	position:absolute;
	left:200px;
}
</style>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script type="text/javascript" src="register.js"></script>
</head>
<body style="background-color: #ffff66">
	
	<%
		response.setHeader("Cache-Control", "no-store");
	%>
	<%
		boolean sess = false;
		if (session.getAttribute("User") != null) {
			sess = true;
		}
		if (sess == true) {
	%>
	<jsp:forward page="index.jsp"></jsp:forward>
	<%
		}
	%>
	
	<center><h1 style="color: blue">Balaji's Library</h1></center>
	
	<div id="content">
		<div id="loginform">
		<h3 style="color: blue">Please Log in if you are a current user</h3>
		
		<form  method="Post" style="color: #cc00ff">
			<table>
				<tr>
					<td>Username :</td>
					<td><input type="text" id="logusername"></td>
				</tr>
				<tr>
					<td>Password :</td>
					<td><input type="password" id="logpassword"></td>
				</tr>	
				<tr>
				<td><input type="button" value="Login" onclick="login().loginverify()"></td>
			</table>
		</form>
			
		<p id="newuser" style="color: #3333ff">Click here if you are a new
			user</p>
		</div>

		<div id="registerform">
			<h2 style="color: blue">Register</h2>

			<form id="form1" method="Post" enctype="multipart/form-data">
				<table style="color:#cc00ff">
					<tr>
						<td>UserName :</td>
						<td><input type="text" id="username" name="username"></td>
					</tr>
					<tr>
						<td>Password :</td>
						<td><input type="password" id="password" name="password"></td>
					</tr>
					<tr>
						<td>Upload Profile Picture :</td>
						<td><input type="file" id="img1" accept="images/*" name="dp"></td>

					</tr>
					<tr>
						<td><input type="button" value="Register" id="register" onclick="reg().regverify()"></td>
					</tr>
					
				</table>
			<p id="olduser" style="color: #3333ff">Click to login</p>
			
			</form>
		</div>
	</div>
</body>
</html>