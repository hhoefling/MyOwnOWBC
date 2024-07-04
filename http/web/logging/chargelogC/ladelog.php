<?php
// Check gegen directaufruf, statt inlcude von index.php
if( !isset($_CURRENT_USER) || $_CURRENT_USER->id<=0 )
{
 echo <<<END
<!DOCTYPE HTML>
<html lang="de">
	<head>
		<title>Weiterleitung</title>
		<meta charset="UTF-8">
		<meta http-equiv="refresh" content="1; url=/web">
		<script>
			window.location.href = "/web"
		</script>
	</head>
	<body>
		<p>Falls keine automatische Weiterleitung erfolgt, <a href='/web'>bitte dem Link folgen</a></p>
	</body>
</html>
END;
 exit;	
}


simplehead('ladelog','1');

?>
	<!--  ladelog old -->

	<script src="js/jquery-3.6.0.min.js"></script>
	<script src="js/bootstrap-4.4.1/bootstrap.bundle.min.js"></script>
    <script src="js/bootstrap-datepicker/bootstrap-datepicker.min.js"></script>
    <script src="js/bootstrap-datepicker/bootstrap-datepicker.de.min.js"></script>
	<script src="js/mqttws31.js"></script>
	<script src="js/owl.carousel.min.js"></script>
	<script src="js/bootstrap.min.js"></script>
	<script src="js/wow.min.js"></script>
	<script src="js/typewriter.js"></script>
	<script src="js/jquery.onepagenav.js"></script>
	
<body>
<header>
	<div id="nav-placeholder"></div>
	<br>
</header>
 		<div role="main" class="container" style="margin-top:20px">
                        <div class="row">
                                <div class="col" style="text-align: center;">
                                        <h4>Ladelog Monatsansicht</h4>
                                </div>
                        </div>
			<div class="row justify-content-center">
				<div class="col-8 col-sm-6 col-md-5 col-lg-4">
					<div class="input-group mb-3">
					<!--	<i class="far fa-caret-square-left fa-lg vaRow mr-4" title="vorheriger Monat" id="prevmonth"></i> -->
						<input class="form-control datepicker" id="theDate" type="text" readonly>
						<div class="input-group-append">
							<span class="input-group-text far fa-calendar-alt fa-lg vaRow"></span>
						</div>
					<!--	<i class="far fa-caret-square-right fa-lg vaRow ml-4" title="nächster Monat" id="nextmonth"></i> -->
					</div>
				</div>
			</div>
			<div class="row justify-content-center">
				<label id="chargep1" style="display: none;" class="checkbox-inline"><input type="checkbox" id="showlp1" value="" checked>Ladepunkt 1</label>
				<label id="chargep2" style="display: none;" class="checkbox-inline"><input type="checkbox" id="showlp2" value="" checked>Ladepunkt 2</label>
				<label id="chargep3" style="display: none;" class="checkbox-inline"><input type="checkbox" id="showlp3" value="" checked>Ladepunkt 3</label>
				<label id="chargep4" style="display: none;" class="checkbox-inline"><input type="checkbox" id="showlp4" value="" checked>Ladepunkt 4</label>
				<label id="chargep5" style="display: none;" class="checkbox-inline"><input type="checkbox" id="showlp5" value="" checked>Ladepunkt 5</label>
				<label id="chargep6" style="display: none;" class="checkbox-inline"><input type="checkbox" id="showlp6" value="" checked>Ladepunkt 6</label>
				<label id="chargep7" style="display: none;" class="checkbox-inline"><input type="checkbox" id="showlp7" value="" checked>Ladepunkt 7</label>
				<label id="chargep8" style="display: none;" class="checkbox-inline"><input type="checkbox" id="showlp8" value="" checked>Ladepunkt 8</label>
			</div>
			<div class="row justify-content-center">
				<label class="checkbox-inline"><input type="checkbox" id="showsofort" value="" checked>Sofort Laden</label>
				<label class="checkbox-inline"><input type="checkbox" id="showminpv" value="" checked>Min und PV</label>
				<label class="checkbox-inline"><input type="checkbox" id="shownurpv" value="" checked>Nur PV</label>
				<label class="checkbox-inline"><input type="checkbox" id="showstandby" value="" checked>Standby</label>
				<label class="checkbox-inline"><input type="checkbox" id="shownacht" value="" checked>Nachtladen</label>

			</div>
			<div class="row justify-content-center">
				<label class="checkbox-inline"><input type="checkbox" id="showrfid" value="">RFID</label><input type="text" id="rfidtag" value="">
			</div>
		<div id="ladelogtablediv"></div>
		</div>





<!--	</section> -->

	<div class="mobile-nav">
		<a href="#" class="close-link"><i class="arrow_up"></i></a>
	</div>

	<!-- get parsed date, setup datepicker and load respective Chart.js definition -->
		<script>
			validate();
			// load navbar, be careful: it loads asynchronous
			$.get(
				{ url: "themes/navbar.html", cache: false },
				function(data){
					$("#nav-placeholder").replaceWith(data);
					$('#project').text(PROJECT);
				    $('#navLadelogold').addClass('disabled');					
				}
			);
		</script>			
		<script src="<?php echo geturl('js/mqtt.js');?>"></script>
		<script src="<?php echo geturl('logging/chargelogC/ladelog.js');?>"></script>
		<script>			

			$(document).ready(function(){
				// GET expects date format Y-m like 2020-10
				// get parsed date and format nicely for input field
				var earliestDate = new Date('2018/01/01 00:00:00');
				var url_string = window.location.href;
				var url = new URL(url_string);
				var parsedDateString = url.searchParams.get('date');
				var pattern = /^[0-9]{4}\-(0[1-9]|1[012])$/;
				var reloadNeeded = false;
				if ( parsedDateString == null || parsedDateString.match(pattern) == null ) {
					// nothing parsed or format not valid, so set date to today
					var parsedDate = new Date();
					parsedDate.setHours(0,0,0,0);  // make sure time is all 0 for later comparisons
					parsedDate.setDate(1);  // // make sure day is 1 for later comparisons
				} else {
					var parsedDate = new Date(parsedDateString);
					parsedDate.setHours(0,0,0,0);  // make sure time is all 0 for later comparisons
					parsedDate.setDate(1);  // // make sure day is 1 for later comparisons
					if ( parsedDate < earliestDate ) {
						// date parsed was too early so set to today
						parsedDate = new Date();
						reloadNeeded = true;
					}
				}
				var mm = String(parsedDate.getMonth() + 1).padStart(2, '0'); // January is 0!, string with leading zeros
				if ( reloadNeeded ) {
					// date parsed was too early so reload with today
					//window.location.href = "monthly.php?date=" + parsedDate.getFullYear() + '-' + mm;
					selectladelogclick(parsedDate.getFullYear()+mm);
				}
				var month = parsedDate.toLocaleDateString('de-DE', { month: 'long'});
				var theDate = month + ' ' + parsedDate.getFullYear();
				setTimeout(
					function() {
						selectladelogclick(parsedDate.getFullYear() + mm);
					}, 1000);
				
				$('#theDate').val(theDate);  // set value of input field
				// config the datepicker
				$('.datepicker').datepicker({
					format: 'MM yyyy',
					language: 'de-DE',
					startDate: '01.2018',
					endDate: '0d',
					startView: 'months',
    				minViewMode: 'months',
					todayBtn: true,
					todayHighlight: true,
					autoclose: true
				})
				.on('changeDate', function(e) {
					// `e` here contains the extra attributes
					var mm = String(e.date.getMonth() + 1).padStart(2, '0'); //January is 0!, string with leading zeros
					var dateToParseStr = e.date.getFullYear() + '-' + mm;
					//window.location.href = "monthly.php?date=" + dateToParseStr;
					parsedDate = e.date;
					console.log(parsedDate);
					selectladelogclick(dateToParseStr);
				});


				$('#prevmonth').click(function(e) {
					// on click of prev month button
					let dateToParse = new Date(parsedDate.getTime());  // copy currently selected date
					dateToParse.setMonth(parsedDate.getMonth() - 1);  // and substract month
					if ( dateToParse >= earliestDate ) {
						let mm = String(dateToParse.getMonth() + 1).padStart(2, '0'); //January is 0!
						let dateToParseStr = dateToParse.getFullYear() + '-' + mm;
						var month = dateToParse.toLocaleDateString('de-DE', { month: 'long'});
						$('#theDate').val(month + ' ' + dateToParse.getFullYear());
						selectladelogclick(dateToParseStr);
					}
				});

				$('#nextmonth').click(function(e) {
					// on click of next month button
					let dateToParse = new Date(parsedDate.getTime());  // copy currently selected date
					dateToParse.setMonth(parsedDate.getMonth() + 1);  // and add month
					let today = new Date();
					today.setHours(0,0,0,0);  // make sure time is all 0 for later comparisons
					if ( dateToParse <= today ) {
						let mm = String(dateToParse.getMonth() + 1).padStart(2, '0'); //January is 0!
						let dateToParseStr = dateToParse.getFullYear() + '-' + mm;
						selectladelogclick(dateToParseStr);
					}
				});
				setTimeout(
					function() {
						if ( gotconfiguredchargepoints == 0 ) {
							document.getElementById("chargep1").style.display = 'block';
							document.getElementById("chargep2").style.display = 'block';
							document.getElementById("chargep3").style.display = 'block';
						}
					}, 5000);
			})
		</script>

<?php
 $fottim2="     </div>\n";
 footer2();
?>
