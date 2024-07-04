<?php

require_once("includes/site_conf.inc");
require_once("includes/globs.inc");
require_once("includes/users.inc");
require_once("includes/headfoot.inc");

 if ( $_CURRENT_USER->id <= 0 )
 {
   simpleheader();
   echo "<div><h2>Bitte anmelden</h2></div>";
   echo '<br><a href="./index.php">Weiter...</a>';			
   if($dbdeb<2)
      echo '<br><br><hr><small>Weiterleitung in 10 Sekunden.</small>';
   footer();	  
   exit;			
 }
 
if( GetREQUEST('old','0')=='1')
   include "logging/chargelogC/ladelog.php";
 else   
   include "logging/chargelog/ladelog.php";
?> 