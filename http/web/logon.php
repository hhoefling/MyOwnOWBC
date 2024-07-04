<?php

/*
mosquitto_passwd  -b /etc/mosquitto/passwd sechseins Root123_61
/etc/init.d/mosquitto stop
/etc/init.d/mosquitto start
mosquitto_pub -u sechseins -P Root123_61 -r -t sechseins/webpara/id -m "2561"
mosquitto_pub -u sechseins -P Root123_61 -r -t sechseins/webpara/thema -m "dark"
*/
require_once("includes/site_conf.inc");
require_once("includes/globs.inc");
require_once("includes/users.inc");


 
 
$usernA = GetPOST('username','');
$passwdA = GetPOST('password','');
$usern  = trim(preg_replace('/[^a-zA-Z0-9_ -]/s','',$usernA));
$passwd  = trim(preg_replace('/[^a-zA-Z0-9_ -]/s','',$passwdA));
if($usernA != $usern)
  out('username cleaned from '.print_r($usernA,true) ." to " . $usern);
if($passwdA != $passwd)
 out('passwd cleaned from '.print_r($passwdA,true) ." to " . $passwd);
 
if( !empty($usern) && !empty($passwd) )
{
   // username und passwor5d gegen mosquito testen
   // dabei ds Thema holen
   // dann das usercookie ablegen
    $cmd="timeout 2 mosquitto_sub -C 2 -v -u " . $usern 
        ." -P " . $passwd 
        ." -t " . $usern . "/webpara/#";
    $output="";
    $retval=0;
    exec($cmd, $output, $retval);
    out( "Rückgabe mit Status $retval und Ausgabe:");
    out(print_r($output,true));
    $mqtt=[];
    $mqtt['id']=0;
    $mqtt['thema']='';
    if($retval==0)
    {
      foreach( $output as $outs)
        { 
         $aa=explode(" ", $outs);
         $val=$aa[1];

         $aa=explode("/", $aa[0]);
         $key=$aa[2];   // letzer teil von 3
         $mqtt[$key]=$val;
        }
      out('mqtt '.print_r($mqtt,true));
     $_CURRENT_USER->username=$usern;
     $_CURRENT_USER->passwd=$passwd;
     $_CURRENT_USER->id=$mqtt['id'];
     $_CURRENT_USER->thema=$mqtt['thema'];
     $_CURRENT_USER->set_user_cookie();
     $_CURRENT_USER->status = $_CURRENT_USER->status . " initd,saved";
     Log2File("logon.php Login [$usern]");
     $state=" angmeldet.";
    }
    else  
	{
     Log2File("logon.php Login failed [$usern] [$passwd]");
	 $state=" Keine Benutzerkonto";
	}
} else
{
  out("No login, usern:[$usern] passwd:[$passwd]");
  $state=" Bitte Benutzername und Passwort eingeben";
}


 simpleheader();
 

 if($dbdeb<2)
   echo "<meta http-equiv=\"refresh\" content=\"10; url=./index.php\">";

 if ( $_CURRENT_USER->id <= 0 )
 {
    echo "<div><h3>$state</h3></div>";
	echo "<div><h5>Hinweis: Es müssen Cookies erlaubt sein.</h5></div>";
 } else { 
	echo "<div><h3>Hallo ". $_CURRENT_USER->username . "</h3></div>";
	echo "<div><h5>Sie sind angemeldet.</h5></div>";
 }
 echo '<br><a href="./index.php">Weiter...</a>';
 echo "$dbdeb";			
 if($dbdeb<2)
  echo '<br><br><hr><small>Weiterleitung in 10 Sekunden.</small>';			

 
 footer();
 
?>
