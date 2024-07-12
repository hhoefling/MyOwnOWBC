<?php

require_once("includes/site_conf.inc");
require_once("includes/globs.inc");
require_once("includes/users.inc");
require_once("includes/headfoot.inc");

$debug=$dbdeb;
out('debug form site-conf:'.$debug);

// load normal UI
// check if theme cookie exists and theme is installed
// else set standard theme


 if( isset($_CURRENT_USER->thema) )
 	$theme = $_CURRENT_USER->thema;
 if (  $_CURRENT_USER->id>0) 
  {
			// load normal UI
			// check if theme cookie exists and theme is installed
			// else set standard theme
	if( $dbdeb > 1 )
	{
		if ( !(isset($_COOKIE['openWBTheme'] ) === true) || 
		     !(is_dir('themes/'.$_COOKIE['openWBTheme']) === true) ) 
		{
			$_COOKIE['openWBTheme'] = 'standard';
		}
		if (isset($_GET['theme'])) 
		{
			$th=trim($_GET['theme']);
			if (is_dir('themes/'.$th) === true)
			   $_COOKIE['openWBTheme'] =$th; 
	 	}
		$theme = $_COOKIE['openWBTheme'];
		$_CURRENT_USER->thema = $theme;
	}
    // $iscloud=true;
	$file='themes/' . $theme;
	if (file_exists(stream_resolve_include_path($file.'/theme.php') ) )
		include($file.'/theme.php');
	else
		include $file.'/theme.html';
	exit;
 }

 $dbdeb=0;
 header2(); // $theme);
?>
					<form id="form_id" method="post" name="authform" action="./logon.php" >
					<div class="row justify-content-center">
						<div class="col-sm-5 py-1 text-grey">
                         Benutzername :<br>
							<input type="text" name="username" id="username"/>
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-sm-5 py-1 text-grey">
							Passsword: <br>
                            <input type="password" name="password" id="password"/>
						</div>
					</div>
					<div class="row justify-content-center">
						<div class="col-sm-5 py-1">
							<input type="submit" data-dismiss="modal" class="btn btn-lg btn-block btn-secondary" value="Login" id="submit" Xonclick="logincook()"/>
						</div>
					</div>
					</form>
<?php
 footer2();
?>
