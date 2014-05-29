$(document).ready(function() {
	$( "form" ).submit(function( event ) {	
		console.log('fuck');
		$.ajax({
			url: '/bless',
			type: 'POST',
			dataType: "json",
			cache: false,
			data: {name: $('#friend-name').val(),
						 text: $('#friend-bless').val()}
			
		})
			.done(function(response){
				if (response.isValid === true){
					$('a[href=#viewbless]').tab('show');
					$("#viewbless ul").empty();
					for(key in response.result){
						$("#viewbless ul").append('<li class="list-group-item">'+key+': '+response.result[key]+'</li>');
					}
				}else{
					$('#notification').text("The name exists, please use another one, thanks!").show();
				}       
		 	});
		 event.preventDefault();	
	});
	
	$('a[href=#viewbless]').on('click',function( event ) {
		console.log('fuck');
		showbless();
		event.preventDefault();
	});
});

var showbless = function(){
	$.ajax({
		url: '/showbless',
		type: 'POST',
		dataType: "json",
		cache: false
	})
		.done(function(response){
			console.dir(response);
			$("#viewbless ul").empty();
			for(key in response){
				$("#viewbless ul").append('<li class="list-group-item">'+key+': '+response[key]+'</li>');
			}
		});
}