<?php


require_once("includes/site_conf.inc");
require_once("includes/globs.inc");
require_once("includes/users.inc");

simpleheader();

if($dbdeb<2)
   echo "<meta http-equiv=\"refresh\" content=\"10; url=./index.php\">";


if( $_CURRENT_USER->id>0 )
 {
    Log2File("logoff.php Logout [$_CURRENT_USER->username]");
    $_CURRENT_USER->unset_user_cookie();
    echo "<h3>Ihr Sitzungscookie wurde gelöscht</h3><br>";
}
  setcookie('dbdeb',"",(time() - 3600),$COOKIE_PATH,$COOKIE_DOMAIN,false,true);
  setcookie('dbdeb',"",(time() - 3600),'/',$COOKIE_DOMAIN);

 echo '<br><a href="./index.php">Weiter...</a>';
 if($dbdeb<2)
   echo '<br><br><hr><small>Weiterleitung in 10 Sekunden.</small>';			
  
 footer();
?>