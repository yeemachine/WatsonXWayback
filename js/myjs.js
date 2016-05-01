var submitData= function(){
  var urlBase = "http://gateway-a.watsonplatform.net/calls/url/URLGetRankedNamedEntities?";
  var apiKey= "12185cdb4698b0f203b59d58f0b11d0ff2b6e546";
  urlBase = urlBase + "apikey="+apiKey;
  var inputYear= $("#sel1").val();
  var inputMonth= $("#sel2").val();
  var inputLink = $("#comment").val();

  urlBase = urlBase+"&url=" + encodeURIComponent("http://web.archive.org/web/"+inputYear+inputMonth+"12012102id_/" + inputLink);
  urlBase = urlBase + "&outputMode=json";
  urlBase = urlBase + "&showSourceText=1"
  console.log(urlBase);


  $.ajax({
    url: urlBase,
    type: 'POST',
    success: function(data) {
      console.log(data);
      console.log(data.text);
      $( "p" ).append( "<br/>" +inputMonth+"."+ inputYear +"</br>"+ data.text + "<br/>"  );
    }

  });
}
