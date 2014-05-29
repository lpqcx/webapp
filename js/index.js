$(document).ready(function() {
	$( "form" ).submit(function( event ) {	
		$.ajax({
			url: '/wedding',
			type: 'POST',
			dataType: "json",
			data: {vCode: $('#vCode').val()},
			
		})
			.done(function(response){
				if (response.isValid === true){
					window.location.href = "/wedding";
				}else{
					$('#notification').text("Wrong code! Try again!").show();
				}       
		 	});
		 event.preventDefault();	
	});
});