$(document).ready(function() {
	var long;
	var latd;
	var url1;
	var country;
	var city;
	var temp;
	var wet;
	var far=true;
	var id;
	url1='https://fcc-weather-api.glitch.me/api/current?lat='
	// Store the longitude and latitude in variables
	function loc()
	{
		if (navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position) 
				{
				long=position.coords.longitude;
				latd=position.coords.latitude;	
				url1+= latd+'&lon='+long;
				hello();
				//console.log(url1);
				});
			}

	}
	function hello(){
	 $.ajax({
	 		
            type: "GET", 
            dataType: 'jsonp', 
            url: url1,
            success: function (response) {
            	console.log(response);
            	country=response.sys.country;
            	place=response.name;
            	temp=Math.round(response.main.temp);
            	id=response.weather[0].id;
            	wet=response.weather[0].main;
            	console.log(id);
            	
                $('#pla').text(place); 
                $('#cont').text(country);
                $('#temp').text(temp+" C");
                $('#weat').text(wet);
                if(id<299)
                {
                	$(".bg").css("background-image", "url('https://s.hswstatic.com/gif/thunderstorm-orig.jpg')"); // Thunderstorm
                }
                else if(id<500)
                {
                	$(".bg").css("background-image", "url('http://ak7.picdn.net/shutterstock/videos/7233127/thumb/1.jpg')"); // Drizzle
                }
                else if(id<600)
                {
                	$(".bg").css("background-image", "url('https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg')"); //Rain
                }
                else if(id<700)
                {
                	$(".bg").css("background-image", "url('http://wallpaper-gallery.net/images/snow-hd-wallpaper/snow-hd-wallpaper-1.jpg')"); //Snow
                }
                else if(id<800)
                {
                	$(".bg").css("background-image", "url('https://d1upf2v1quehpe.cloudfront.net/attachments/de45a70cc87150a6fa75ee6b65d595eb06018328/store/b0f6cb7c86d382afd42fef4061f9e1ed927e739796ea1d50832133e1b6d3/fog-traffic.jpg')"); //Fog
                }
                else if(id==800)
                {
                	$(".bg").css("background-image", "url('https://d2m3klzcmjgreb.cloudfront.net/wp-content/uploads/2015/08/1439453189_sunny-skyyy.jpg')"); // Clear
                }
                else
                {
                	$(".bg").css("background-image", "url('http://ak8.picdn.net/shutterstock/videos/4186448/thumb/1.jpg')"); //Cloudy

                }         

            }
 });
	}

	function convert()
	{
		if(far)
		{
			var tf=Math.round((temp*1.8)+32);
			var x=tf+" F";
			temp=tf;
			$('#temp').text(x);
			far=false;
		}
		else
		{
			var tf=Math.round(((temp-32)*5)/9);
			var x=tf+" C";
			temp=tf;
			$('#temp').text(x);
			far=true;
		}
	}

	$('#ti').on('click', function()
	{
		convert();
	});


	loc();
	
});