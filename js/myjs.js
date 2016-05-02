var submitData= function(){
  var urlBase = "http://gateway-a.watsonplatform.net/calls/url/URLGetEmotion?";
  var apiKey= "12185cdb4698b0f203b59d58f0b11d0ff2b6e546";
  urlBase = urlBase + "apikey="+apiKey;
  var inputYear= $("#sel1").val();
  var inputMonth= $("#sel2").val();
  var inputLink = $("#comment").text();
  console.log(inputLink);

  urlBase = urlBase+"&url=" + encodeURIComponent("http://web.archive.org/web/"+inputYear+inputMonth+"12012102id_/" + inputLink);
  urlBase = urlBase + "&outputMode=json";
  urlBase = urlBase + "&showSourceText=1"
  console.log(urlBase);

var emotions=[];
  $.ajax({
    url: urlBase,
    type: 'POST',
    success: function(data) {
      console.log(data);
      console.log(data.text);
    $( ".output" ).append( "<li>"+"<br/>" +inputMonth+"."+ inputYear +"</br>"+ data.text + "<br/>"+"</li>"  );
    var preanger=parseFloat(data.docEmotions.anger);
    var predisgust=parseFloat(data.docEmotions.disgust);
    var prefear=parseFloat(data.docEmotions.fear);
    var prejoy=parseFloat(data.docEmotions.joy);
    var presadness=parseFloat(data.docEmotions.sadness);

    var emotion=preanger+predisgust+prefear+prejoy+presadness;
    var anger=(data.docEmotions.anger/emotion) * 100;
    var disgust=(data.docEmotions.disgust/emotion) * 100;
    var fear=(data.docEmotions.fear/emotion) * 100;
    var joy=(data.docEmotions.joy/emotion) * 100;
    var sadness=(data.docEmotions.sadness/emotion) * 100;
    console.log(emotion);
    $( ".output" ).append(
    "<li class='chart'><div style='width:"+anger+"%;height:60px;background-color:red'></div><div style='width:"+disgust+"%;height:60px;background-color:purple'></div><div style='width:"+fear+"%;height:60px;background-color:green'></div><div style='width:"+joy+"%;height:60px;background-color:yellow'></div><div style='width:"+sadness+"%;height:60px;background-color:blue'></div></li>")
    }






  });
}
