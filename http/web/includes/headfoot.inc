<?php


$fottim2="";


function simplehead($theme='',$bootstrapdate='')
{
 global $fottim2,$basedir,$iscloud,$PROJECT;
 global $_CURRENT_USER, $dbdeb;
 global $MOSQSERVER, $MOSQPORT, $MOSQPORTSSL;
 
 header("X-Content-Type-Options: nosniff");
 header("X-Frame-Options: SAMEORIGIN");
 header("X-XSS-Protection: 1; mode=block");
 header("Referrer-Policy: same-origin");
 header("Strict-Transport-Security: max-age=63072000");

 $base=dirname(dirname(__FILE__)); // ..../html also document root same as <base href="/">
 out('basedir is' . $base);
 
echo <<<ENDHEAD
<!DOCTYPE html>
<html lang="de">
<head>
	<!-- 2024 Heinz Hoefling -->
    <base href="$basedir">
	<title>openWB-Lite</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="openWB">
	<meta name="apple-mobile-web-app-status-bar-style" content="default">
	<link rel="apple-touch-startup-image" href="img/favicons/splash1125x2436w.png"  />
	<link rel="apple-touch-startup-image" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" href="img/favicons/splash1125x2436w.png">
	<meta name="apple-mobile-web-app-title" content="openWB">
	<meta name="description" content="openWB">
	<meta name="keywords" content="openWB">
	<meta name="author" content="Heinz Hoefling">
	<link rel="apple-touch-icon" sizes="72x72" href="img/favicons/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="img/favicons/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="img/favicons/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="img/favicons/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="img/favicons/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="img/favicons/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="img/favicons/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="img/favicons/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="img/favicons/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="img/favicons/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="img/favicons/favicon-16x16.png">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="57x57" href="img/favicons/apple-touch-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="img/favicons/apple-touch-icon-60x60.png">
	<link rel="manifest" href="manifest.json">
	<link rel="shortcut icon" href="img/favicons/favicon.ico">
	<!-- <link rel="apple-touch-startup-image" href="img/loader.gif"> -->
	<meta name="msapplication-config" content="img/favicons/browserconfig.xml">
	<meta name="theme-color" content="#ff00ff">

	<!-- Bootstrap -->
	<link rel="stylesheet" type="text/css" href="css/bootstrap-4.4.1/bootstrap.min.css">
	<!-- Normalize -->
	<link rel="stylesheet" type="text/css" href="css/normalize-8.0.1.css">
	<!-- Font Awesome, all styles -->
  	<link href="fonts/font-awesome-5.8.2/css/all.css" rel="stylesheet">
    <!-- include special Theme style $theme-->
    
ENDHEAD;

if( !empty($bootstrapdate) )
{
echo <<<END
    <link rel="stylesheet" type="text/css" href="css/bootstrap-datepicker/bootstrap-datepicker3.min.css">
    
END;    
}

if( !empty($theme) )
{
  $fn="themes/{$theme}/style.css";
  $ftime=filemtime($base.'/'.$fn);
  if($ftime!=0)
  	printf("<link href=\"%s?v=%d\" rel=\"stylesheet\">\n", $fn,$ftime);  
}
echo <<<END
</head>
END;	

$iscl=($iscloud) ? 'true' : 'false';
out('iscl:' . $iscl);
echo <<<END
    <script>
    function validate()
     {
        console.log('validate..');
        usern='$_CURRENT_USER->username';
        passwd='$_CURRENT_USER->passwd';
        dbdeb=$dbdeb;
        iscloud=$iscl;
		MOSQSERVER='$MOSQSERVER';
		MOSQPORT=$MOSQPORT;
		MOSQPORTSSL=$MOSQPORTSSL;
		PROJECT='$PROJECT';
        theme='$theme';
    }
    validate();
    </script>

END;
}


function simplebody($theme='')
{
global $fottim2;

echo <<<END
<body>
  	<div style="margin-top: 30px; text-align: center;">
		<div class="row\" style=\"color:black;">
			<div class="mx-auto d-block justify-content-center">
				<img src="img/favicons/preloader-image.png" style="max-width: 300px" alt="openWB">
			</div>
		</div>
END;	

 $fottim2="     </div>\n";
}



function header2($theme='')
{
 simplehead($theme);
 simplebody($theme);
}

function footer2()
{
  global $dbdebs,$dbdeb,$dbdat,$fottim2;
  
 if( $dbdeb>0 && count($dbdebs)>0 ) // allerdings die vor dem Aussachalten vorhandenen werden angezeigt
 {
  $dbdebc = count($dbdebs);
  echo <<<END
    <div style="text-align: left;"> 
      <br><hr><br>
      <div id="dbdeb" class="OCpanel">
        <span id="dbdebArrow" class="OCarrow">&nbsp;$dbdebc Lines DbDeb=$dbdeb</span>
          <div>
            <pre>
END;  
  foreach( $dbdebs as $s)
     echo "$s\n";
  echo <<<END
           </pre>
        </div>
      </div>
    </div>

END;
     
 }
 
 echo $fottim2;
 echo <<<END
</body>
</html>
END;   
}


