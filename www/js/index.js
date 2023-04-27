document.addEventListener("deviceready", onDeviceReady, false);
function onBatteryLow(status) {
  alert("Battery Level Low " + status.level + "%");
  console.log(navigator.vibrate);
}
function onDeviceReady() {
  window.addEventListener("batterystatus", onBatteryStatus, false);
  document.addEventListener("online", onOnline, false);
  document.addEventListener("offline", onOffline, false);
  NetworkStatus();
  screen.orientation.lock('landscape');
screen.orientation.unlock();

console.log('Orientation is ' + screen.orientation.type);
  screen.orientation.addEventListener('change', function(){
    console.log(screen.orientation.type);
});
screen.orientation.onchange = function(){console.log(screen.orientation.type);
};

ons.platform.select('android');
if (cordova.platformId == 'android') {
  StatusBar.overlaysWebView(true);
  StatusBar.backgroundColorByHexString('#33000000');
}
console.log(StatusBar);
}

function NetworkStatus() {
  var connectionTypeElement = document.getElementById("connection-type");
  var internetStatus = document.getElementById("internet-status");
  var onlineconnection = navigator.onLine;
  var connectionType = navigator.connection.type;
  connectionTypeElement.textContent = "Connection Type: " + connectionType;
  internetStatus.textContent = "Internet Status: " + (onlineconnection ? "Online" : "Offline");
}

function onOnline() {
  var internetStatus = document.getElementById("internet-status");
  internetStatus.textContent = "Internet Status: Online";
}
function onOffline() {
  var internetStatus = document.getElementById("internet-status");
  internetStatus.textContent = "Internet Status: Offline";
}

function vibrate() {
  navigator.vibrate(3000);
}
console.log(vibrate);
function onBatteryStatus(status) {
  var batteryLevel = document.getElementById("batteryLevel");
  var batteryStatus = document.getElementById("batteryStatus");
  var batterySlider = document.getElementById("batterySlider");
  batteryLevel.innerHTML = status.level + "%";
  batterySlider.value = status.level;
  switch(status.status) {
    case BatteryManager.CHARGING:
      batteryStatus.innerHTML = "Charging";
      break;
    case BatteryManager.NOT_CHARGING:
      batteryStatus.innerHTML = "Not Charging";
      break;
  }
  
  if (status.level <= 10) {
    ons.notification.alert("Battery level is critically low! You will need to charge your Device.");
  } else if (status.level <= 20) {
    ons.notification.alert("Battery level is low.");
  }
}
document.addEventListener("init", function (event) {
  ons.ready(function () {
    document.getElementById(
      "devInfo"
    ).innerHTML = `${device.manufacturer} ${device.platform} ${device.version} ${device.cordova} ${device.model}`;
  });
});

function gallery(){
  navigator.camera.getPicture(successCallbackG,FailCallback,{
    quality:50,destinationType:Camera.DestinationType.FILE_URI,
    sourceType:Camera.PictureSourceType.PHOTOLIBRARY
  });
}
function galleryV(){ 
  navigator.camera.getPicture(captureSuccessV,FailCallback,{
    quality:50,destinationType:Camera.DestinationType.FILE_URI,
    sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
    mediaType:Camera.MediaType.VIDEO
  });
}
function snapPicture() {
  navigator.camera.getPicture(successCallback, FailCallback, { destinationType: Camera.DestinationType.DATA_URL });
        var canvas = document.createElement('canvas');
        var dataURL = canvas.toDataURL('image/png');
        var imgElement = document.createElement('img');
        imgElement.src = dataURL;
        document.getElementById('img').appendChild(imgElement);
        localStorage.setItem('imageData', dataURL);
      }

function successCallback(imageData) {
    document.getElementById("img").remove();
    var x = document.createElement("img");
    x.setAttribute("width","300");
    x.setAttribute("height","300");
    x.setAttribute("id","img");
    x.setAttribute("src","data:image/jpeg;base64, " + imageData);
    document.getElementById('pic').appendChild(x);
  }
function successCallbackG(imageURI) {
  var imageData =  imageURI  
    document.getElementById("img").remove();
    var x = document.createElement("img");
    x.setAttribute("width","300");
    x.setAttribute("height","300");
    x.setAttribute("id","img");
    x.setAttribute("src",imageData);
    document.getElementById('pic').appendChild(x);
  }
  function FailCallback(message) {
    alert('Error!!!: ' + message);
  }
  navigator.splashscreen.show();
  window.setTimeout(function () {
      navigator.splashscreen.hide();
  }, splashDuration - fadeDuration);