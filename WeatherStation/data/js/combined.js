var wifi_scan_results = null;
var wifi_clean_ssid_list = null;

function basic_js_loaded(){
    return true;
}

function respondToVisibility (element, callback) {
    var options = {
      root: document.documentElement
    }
  
    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry.intersectionRatio > 0);
      });
    }, options);
  
    observer.observe(element);
  }
  
 


function showView(view) {
    Array.from(document.getElementsByClassName("views")).forEach(function(v) {v.style.display = "none";});
    var Element = document.getElementById(view);
    if(Element === null){
        console.log("Error view not found");
    } else {
        Element.style.display = "";
    }
   
    Array.from(document.getElementsByClassName("menuBtn")).forEach(function(b) {b.classList.remove("active")});
    var ElBtn =  document.getElementById(view + "Btn");
    if(ElBtn === null ){
        console.log("Error Btn not found");
    } else {
        ElBtn.classList.add("active");
    }
}

function sendRequest(addr, func = null) {
    console.log("requesting: " + addr);
    requestPending = true;
    var xhr = new XMLHttpRequest();
    //xhr.timeout = 5000; //ms
    xhr.open("GET", addr, true);
    xhr.onload = function() {
        console.log("Request finished");
        requestPending = false;
        if (func != null)
            func(this.responseText);
    }
    xhr.onerror = function() {
        console.log("Request finished");
        requestPending = false;
        console.log("error");
    }
    xhr.ontimeout = function() {
        console.log("Request finished");
        requestPending = false;
        console.log("timeout");
    }
    xhr.send();
}

//open and close the main menu
function openMenu() {
    document.getElementById("menu").classList.add("open");
}
function closeMenu() {
    document.getElementById("menu").classList.remove("open");
}

//show and hide the notification bar
function openNotification(msg, timeout=2500) {
    document.getElementById("notification").innerHTML = msg;
    document.getElementById("notification").classList.add("open");
    if (timeout != 0)
        setTimeout(closeNotification, timeout);
}
function closeNotification() {
    document.getElementById("notification").classList.remove("open");
}

function restart() {
    sendRequest("restart", openNotification);
}




function httpGetAsync(theUrl, callback, param, workspace)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            if(callback != null){
                callback(xmlHttp.responseText, param, workspace);
            }
        }
        if (xmlHttp.readyState == 4 && xmlHttp.status == 404){
            if(callback != null){
                callback("", param, workspace);
            }
        }
        if (xmlHttp.readyState == 4 && xmlHttp.status == 500){
            if(callback != null){
                callback("", param, workspace);
            }
        }

    }

    xmlHttp.onerror = function() {
        if(callback != null){
            callback("", param, workspace);
        }
    }

    xmlHttp.ontimeout = function() {
        if(callback != null){
            callback("", param, workspace);
        }
    }

    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function sendData(url,data,callbackDone=null,callBackError=null) {       
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(data[name].key) + '=' + encodeURIComponent(data[name].value));
  }

  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  XHR.addEventListener('load', function(event) {
    if(callbackDone!=null){
        callbackDone;
    }

  });

  XHR.addEventListener('error', function(event) {
    alert('Oops! Something goes wrong.');
    if(callBackError!=null){
        callBackError();
    }
  });

  XHR.open('POST', url);
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  XHR.send(urlEncodedData);
  
}
        


function loadMultipleData( URL_To_Load , CallBackOnDone){
    var URL_To_Load;
    var CallBackOnDone;
    var DoneArray;
    
    var workspace = {URL_To_Load, DoneArray, CallBackOnDone};

    workspace.DoneArray = new Array( workspace.URL_To_Load.length);
    for(var z=0;z<workspace.DoneArray.length;z++){
        workspace.DoneArray[z]=false;
    }
    StartRequest( workspace );
}

function StartRequest( workspace ){
    var done = true;
    for( var x=0;x<workspace.URL_To_Load.length;x++){
        if(workspace.URL_To_Load[x][0]==""){ //No URL inside....
            workspace.DoneArray[x] = true;
            workspace.URL_To_Load[x][1]="";
        }

        if(workspace.URL_To_Load[x][0]==null){ //No URL inside....
            workspace.DoneArray[x] = true;
            workspace.URL_To_Load[x][1]="";
        }
        
        if(workspace.DoneArray[x] == false){
            httpGetAsync(workspace.URL_To_Load[x][0],ProcessResponse,x, workspace);
            workspace.DoneArray[x] = true;
            done = false;
            break;
        }
    }
    if(true==done){
        if(workspace.CallBackOnDone != null){
            
            workspace.CallBackOnDone(workspace.URL_To_Load);
        }
    }
}


function ProcessResponse( data, param ,workspace){
    //param holds the index for the result array
    workspace.URL_To_Load[param][1]=data;
    StartRequest(workspace);
}


function GenerateHostUrl( part ){
    var protocol = location.protocol;
    var slashes = protocol.concat("//");
    var host = slashes.concat(window.location.hostname);
    var url = host +  part;
    return url;
}
var wifi_scan_results = null;
var wifi_clean_ssid_list = null;

function basic_js_loaded(){
    return true;
}

function respondToVisibility (element, callback) {
    var options = {
      root: document.documentElement
    }
  
    var observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        callback(entry.intersectionRatio > 0);
      });
    }, options);
  
    observer.observe(element);
  }
  
 


function showView(view) {
    Array.from(document.getElementsByClassName("views")).forEach(function(v) {v.style.display = "none";});
    var Element = document.getElementById(view);
    if(Element === null){
        console.log("Error view not found");
    } else {
        Element.style.display = "";
    }
   
    Array.from(document.getElementsByClassName("menuBtn")).forEach(function(b) {b.classList.remove("active")});
    var ElBtn =  document.getElementById(view + "Btn");
    if(ElBtn === null ){
        console.log("Error Btn not found");
    } else {
        ElBtn.classList.add("active");
    }
}

function sendRequest(addr, func = null) {
    console.log("requesting: " + addr);
    requestPending = true;
    var xhr = new XMLHttpRequest();
    //xhr.timeout = 5000; //ms
    xhr.open("GET", addr, true);
    xhr.onload = function() {
        console.log("Request finished");
        requestPending = false;
        if (func != null)
            func(this.responseText);
    }
    xhr.onerror = function() {
        console.log("Request finished");
        requestPending = false;
        console.log("error");
    }
    xhr.ontimeout = function() {
        console.log("Request finished");
        requestPending = false;
        console.log("timeout");
    }
    xhr.send();
}

//open and close the main menu
function openMenu() {
    document.getElementById("menu").classList.add("open");
}
function closeMenu() {
    document.getElementById("menu").classList.remove("open");
}

//show and hide the notification bar
function openNotification(msg, timeout=2500) {
    document.getElementById("notification").innerHTML = msg;
    document.getElementById("notification").classList.add("open");
    if (timeout != 0)
        setTimeout(closeNotification, timeout);
}
function closeNotification() {
    document.getElementById("notification").classList.remove("open");
}

function restart() {
    sendRequest("restart", openNotification);
}




function httpGetAsync(theUrl, callback, param, workspace)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            if(callback != null){
                callback(xmlHttp.responseText, param, workspace);
            }
        }
        if (xmlHttp.readyState == 4 && xmlHttp.status == 404){
            if(callback != null){
                callback("", param, workspace);
            }
        }
        if (xmlHttp.readyState == 4 && xmlHttp.status == 500){
            if(callback != null){
                callback("", param, workspace);
            }
        }

    }

    xmlHttp.onerror = function() {
        if(callback != null){
            callback("", param, workspace);
        }
    }

    xmlHttp.ontimeout = function() {
        if(callback != null){
            callback("", param, workspace);
        }
    }

    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function sendData(url,data,callbackDone=null,callBackError=null) {       
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(data[name].key) + '=' + encodeURIComponent(data[name].value));
  }

  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  XHR.addEventListener('load', function(event) {
    if(callbackDone!=null){
        callbackDone;
    }

  });

  XHR.addEventListener('error', function(event) {
    alert('Oops! Something goes wrong.');
    if(callBackError!=null){
        callBackError();
    }
  });

  XHR.open('POST', url);
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  XHR.send(urlEncodedData);
  
}
        


function loadMultipleData( URL_To_Load , CallBackOnDone){
    var URL_To_Load;
    var CallBackOnDone;
    var DoneArray;
    
    var workspace = {URL_To_Load, DoneArray, CallBackOnDone};

    workspace.DoneArray = new Array( workspace.URL_To_Load.length);
    for(var z=0;z<workspace.DoneArray.length;z++){
        workspace.DoneArray[z]=false;
    }
    StartRequest( workspace );
}

function StartRequest( workspace ){
    var done = true;
    for( var x=0;x<workspace.URL_To_Load.length;x++){
        if(workspace.URL_To_Load[x][0]==""){ //No URL inside....
            workspace.DoneArray[x] = true;
            workspace.URL_To_Load[x][1]="";
        }

        if(workspace.URL_To_Load[x][0]==null){ //No URL inside....
            workspace.DoneArray[x] = true;
            workspace.URL_To_Load[x][1]="";
        }
        
        if(workspace.DoneArray[x] == false){
            httpGetAsync(workspace.URL_To_Load[x][0],ProcessResponse,x, workspace);
            workspace.DoneArray[x] = true;
            done = false;
            break;
        }
    }
    if(true==done){
        if(workspace.CallBackOnDone != null){
            
            workspace.CallBackOnDone(workspace.URL_To_Load);
        }
    }
}


function ProcessResponse( data, param ,workspace){
    //param holds the index for the result array
    workspace.URL_To_Load[param][1]=data;
    StartRequest(workspace);
}


function GenerateHostUrl( part ){
    var protocol = location.protocol;
    var slashes = protocol.concat("//");
    var host = slashes.concat(window.location.hostname);
    var url = host +  part;
    return url;
}
var wifi_scan_results = null;
var wifi_clean_ssid_list = null;var AutoUpdate = null;

function showDashboard(){
    showView("MainPage");
    Dashbaord_update_values();
    AutoUpdate = setInterval(AutomaticUpdate, 30000); //every 30 seconds
}

function AutomaticUpdate(){
    if(AutoUpdate==null){
        return;
    }
    var el = document.getElementById("MainPage");
    if(el.visible === false){
        clearInterval(AutoUpdate);
        AutoUpdate=null;
    }
    Dashbaord_update_values();
}

//We will update the values every 60 seconds....
function Dashbaord_update_values(){
    load_mapping_data(collect_sensors_to_read);
}

function collect_sensors_to_read(callback_on_done){
 //Mapping is up to date now we go for the sensors
 var WindSpeedSensor = SearchForWindSpeed();
 var WindDirection = SearchForWindDirection();
 var Temperature =  SearchForTemperatur();
 var Pressure = SearchForPressure();
 var Humidity = SearchForHumidity();
    var MappingDataToLoad=[ [ WindSpeedSensor,null ], [ WindDirection,null ], [ Temperature,null ], [ Pressure,null ],  [ Humidity,null ]  ];

 //We need to build our path list for the request
    loadMultipleData(MappingDataToLoad,function() { 
        var parsed_data=Dashboard_parse_loaded_data_to_json( MappingDataToLoad ); 
        //We now have json objects if all went well
        //if data is null there was an error inside the JSON
        //The internal ones we try to keep displayed
        UpdateGauge("cvs_windspeed",25);
        UpdateGauge("cvs_winddirection",125);

        if(parsed_data[2][1]==null){
            UpdateGauge("cvs_humidity",-1);
        } else {
            UpdateGauge("cvs_humidity",55);
        }

        if(parsed_data[3][1]==null){
            UpdateGauge("cvs_temperature",-273);
        } else {
            UpdateGauge("cvs_temperature",-12);
        }

        if(parsed_data[3][1]==null){
            UpdateGauge("cvs_pressure",0);
        } else {
            UpdateGauge("cvs_pressure",1000);
        }

        

    });
}

function UpdateGauge(name , val ){
    document.gauges.forEach(function (gauge) {
        if( gauge.canvas.element.id == name){
          gauge.value = val;
        }
      });

}

function Dashboard_parse_loaded_data_to_json(MappingDataToLoad){
    for(var z=0;z<MappingDataToLoad.length;z++){
        try{
            MappingDataToLoad[z][1]=JSON.parse(MappingDataToLoad[z][1]);
        } catch {
            MappingDataToLoad[z][1]=null;
        }
    }
    return MappingDataToLoad;
}

function SearchForWindSpeed(){
    //Check if the sensor itself is mapped !?
    //5 is windspeed
    var Result = SearchForFirstSensor(5);
    //we need to grab the current data....
    if(Result.found===false){
        return "";
    } else {
        //We build the path for the request
        return "/mapping/"+Result.mMappedChannel+"/value";
    }
}

function SearchForWindDirection(){
    var Result = SearchForFirstSensor(7); 
    //we need to grab the current data....
    if(Result.found===false){
        return "";
    } else {
        //We build the path for the request
        return "/mapping/"+Result.mMappedChannel+"/value";
    }
}

function SearchForTemperatur(){
    var Result = SearchForFirstSensor(0); 
    //we need to grab the current data....
    if(Result.found===false){
        return "";
    } else {
        //We build the path for the request
        return "/mapping/"+Result.mMappedChannel+"/value";
    }
}

function SearchForPressure(){
    var Result = SearchForFirstSensor(1); 
    //we need to grab the current data....
    if(Result.found===false){
        return "";
    } else {
        //We build the path for the request
        return "/mapping/"+Result.mMappedChannel+"/value";
    }

}

function SearchForHumidity(){
    //If we have a BME280 or WSEN_PADS we will use these
    var Result = SearchForFirstSensor(2); 
    //we need to grab the current data....
    if(Result.found===false){
        return "";
    } else {
        //We build the path for the request
        return "/mapping/"+Result.mMappedChannel+"/value";
    }
}/*!
 * The MIT License (MIT)
 * 
 * Copyright (c) 2016 Mykhailo Stadnyk <mikhus@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @version 2.1.5
 */
!function(e){"use strict";function t(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(t||(t="undefined"==typeof window?global:window),void 0!==t[e])return t[e];for(var i=["webkit","moz","ms","o"],r=0,o=i.length,n=e.charAt(0).toUpperCase()+e.substr(1);r<o;r++){var a=t[i[r]+n];if(void 0!==a)return a}return null}function a(e,t,i,r,o,n,l){if("function"!=typeof r)throw new TypeError("Invalid animation rule:",r);var s=e-i,d=s/o,c=0;d>1&&(d=1),1!==d&&(c=r(d),isFinite(c)&&!isNaN(c)&&(d=c)),t&&t(d),s<o?l.frame=ue(function(e){return a(e,t,i,r,o,n,l)}):(n&&n(),l.inProgress=!1)}function l(){Array.prototype.constructor.apply(this,arguments)}function s(e){if(!(e instanceof DOMException&&2152923147===e.result))throw e}function d(e){return e.majorTicks instanceof Array||(e.majorTicks=e.majorTicks?[e.majorTicks]:[]),e.majorTicks.length||(e.majorTicks.push(Te.formatMajorTickNumber(e.minValue,e)),e.majorTicks.push(Te.formatMajorTickNumber(e.maxValue,e))),["right"!==e.tickSide,"left"!==e.tickSide]}function c(e,t,i,r,o,n){e.beginPath(),e.moveTo(t+n,i),e.lineTo(t+r-n,i),e.quadraticCurveTo(t+r,i,t+r,i+n),e.lineTo(t+r,i+o-n),e.quadraticCurveTo(t+r,i+o,t+r-n,i+o),e.lineTo(t+n,i+o),e.quadraticCurveTo(t,i+o,t,i+o-n),e.lineTo(t,i+n),e.quadraticCurveTo(t,i,t+n,i),e.closePath()}function h(e,t){var i=t.valueDec,r=t.valueInt,o=0,n=void 0,a=void 0,l=void 0;if(e=parseFloat(e),l=e<0,e=Math.abs(e),i>0){for(a=e.toFixed(i).toString().split("."),n=r-a[0].length;o<n;++o)a[0]="0"+a[0];a=(l?"-":"")+a[0]+"."+a[1]}else{for(a=Math.round(e).toString(),n=r-a.length;o<n;++o)a="0"+a;a=(l?"-":"")+a}return a}function u(e,t){var i=void 0,r=!1;return i=0===t.majorTicksDec?Math.round(e).toString():e.toFixed(t.majorTicksDec),t.majorTicksInt>1?(r=~i.indexOf("."),~i.indexOf("-")?"-"+[t.majorTicksInt+t.majorTicksDec+2+(r?1:0)-i.length].join("0")+i.replace("-",""):[t.majorTicksInt+t.majorTicksDec+1+(r?1:0)-i.length].join("0")+i):i}function f(e){return e*Math.PI/180}function m(e,t){return{x:-e*Math.sin(t),y:e*Math.cos(t)}}function v(e,t,i,r){var o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],n=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,a=e.createLinearGradient(o?0:n,o?n:0,o?0:r,o?r:0);return a.addColorStop(0,t),a.addColorStop(1,i),a}function b(e,t){if(arguments.length>2&&void 0!==arguments[2]&&arguments[2])return e.restore(),!0;e.save();var i=t.borderShadowWidth;return i&&(e.shadowBlur=i,e.shadowColor=t.colorBorderShadow),!0}function g(e,t){t.needleShadow&&(e.shadowOffsetX=2,e.shadowOffsetY=2,e.shadowBlur=10,e.shadowColor=t.colorNeedleShadowDown)}function p(e,t,i){return e["font"+t+"Style"]+" "+e["font"+t+"Weight"]+" "+e["font"+t+"Size"]*i+"px "+e["font"+t]}function w(e){e.shadowOffsetX=null,e.shadowOffsetY=null,e.shadowBlur=null,e.shadowColor="",e.strokeStyle=null,e.lineWidth=0,e.save()}function y(e,t,i,r){t.valueTextShadow&&(e.shadowOffsetX=i,e.shadowOffsetY=i,e.shadowBlur=r,e.shadowColor=t.colorValueTextShadow)}function k(e,t,i,r,o,n){if(t.valueBox){w(e);var a=t.valueDec?1+t.valueDec:0,l="9".repeat(Math.max.apply(null,[String(parseInt(i)).length+a].concat(t.majorTicks.map(function(e){return String(parseInt(e,10)).length+a})))),s=t.valueText||h(i,t),d=n/200,u=n/100,f=.4*u,m=1.2*u;e.font=p(t,"Value",d),y(e,t,f,m);var v=e.measureText(t.valueText?s:"-"+h(Number(l),t)).width;w(e);var b=parseFloat(t.fontValueSize)*d+f+m,g=u*parseFloat(t.valueBoxStroke),k=2*n-2*g,x=v+10*u,T=1.1*b+f+m,S=u*t.valueBoxBorderRadius,W=(parseFloat(t.valueBoxWidth)||0)/100*k;W>x&&(x=W),x>k&&(x=k);var O=r-x/2,V=o-T/2,P=o-5.75*u;if(e.beginPath(),S?c(e,O,V,x,T,S):e.rect(O,V,x,T),g){var M=e.createRadialGradient(r,P,10*u,r,P,20*u);M.addColorStop(0,t.colorValueBoxRect),M.addColorStop(1,t.colorValueBoxRectEnd),e.strokeStyle=M,e.lineWidth=g,e.stroke()}t.colorValueBoxShadow&&(e.shadowBlur=1.2*u,e.shadowColor=t.colorValueBoxShadow),t.colorValueBoxBackground&&(e.fillStyle=t.colorValueBoxBackground,e.fill()),e.closePath(),e.restore(),y(e,t,f,m),e.fillStyle=t.colorValueText,e.textAlign="center",e.textBaseline="alphabetic",e.fillText(s,O+x/2,o+T/2-b/3),e.restore()}}function x(e){var t=e.value,i=e.minValue,r=e.maxValue,o=.01*(r-i);return{normal:t<i?i:t>r?r:t,indented:t<i?i-o:t>r?r+o:t}}function T(e,t,i,r,o){i.beginPath(),i.arc(0,0,ye(e),0,2*Se,!0),i.lineWidth=t,i.strokeStyle=o?Te.linearGradient(i,r,o,e):r,i.stroke(),i.closePath()}function S(e,t){var i=be.pixelRatio;return e.maxRadius||(e.maxRadius=e.max-t.borderShadowWidth-t.borderOuterWidth*i-t.borderMiddleWidth*i-t.borderInnerWidth*i+(t.borderOuterWidth?.5:0)+(t.borderMiddleWidth?.5:0)+(t.borderInnerWidth?.5:0)),e.maxRadius}function W(e,t){var i=be.pixelRatio,r=t.borderShadowWidth*i,o=e.max-r-t.borderOuterWidth*i/2,n=o-t.borderOuterWidth*i/2-t.borderMiddleWidth*i/2+.5,a=n-t.borderMiddleWidth*i/2-t.borderInnerWidth*i/2+.5,l=S(e,t),s=void 0,d=!1;e.save(),t.borderOuterWidth&&(d=Te.drawShadow(e,t,d),T(o,t.borderOuterWidth*i,e,t.colorBorderOuter,t.colorBorderOuterEnd)),t.borderMiddleWidth&&(d=Te.drawShadow(e,t,d),T(n,t.borderMiddleWidth*i,e,t.colorBorderMiddle,t.colorBorderMiddleEnd)),t.borderInnerWidth&&(d=Te.drawShadow(e,t,d),T(a,t.borderInnerWidth*i,e,t.colorBorderInner,t.colorBorderInnerEnd)),Te.drawShadow(e,t,d),e.beginPath(),e.arc(0,0,ye(l),0,2*Se,!0),t.colorPlateEnd?(s=e.createRadialGradient(0,0,l/2,0,0,l),s.addColorStop(0,t.colorPlate),s.addColorStop(1,t.colorPlateEnd)):s=t.colorPlate,e.fillStyle=s,e.fill(),e.closePath(),e.restore()}function O(e,t){var i=e.max*(parseFloat(t.highlightsWidth)||0)/100;if(i){var r=ye(P(e,t)-i/2),o=0,n=t.highlights.length,a=(t.maxValue-t.minValue)/t.ticksAngle;for(e.save();o<n;o++){var l=t.highlights[o];e.beginPath(),e.rotate(We),e.arc(0,0,r,Te.radians(t.startAngle+(l.from-t.minValue)/a),Te.radians(t.startAngle+(l.to-t.minValue)/a),!1),e.strokeStyle=l.color,e.lineWidth=i,e.stroke(),e.closePath(),e.restore(),e.save()}}}function V(e,t){var i=P(e,t),r=void 0,o=void 0,n=void 0,a=0,l=0,s=Math.abs(t.minorTicks)||0,d=t.ticksAngle/(t.maxValue-t.minValue);for(e.lineWidth=be.pixelRatio,e.strokeStyle=t.colorMinorTicks||t.colorStrokeTicks,e.save(),t.exactTicks?(o=t.maxValue-t.minValue,r=s?o/s:0,l=(xe.mod(t.majorTicks[0],s)||0)*d):r=s*(t.majorTicks.length-1);a<r;++a)(n=t.startAngle+l+a*(t.ticksAngle/r))<=t.ticksAngle+t.startAngle&&(e.rotate(Te.radians(n)),e.beginPath(),e.moveTo(0,i),e.lineTo(0,i-.075*e.max),B(e))}function P(e,t){var i=e.max/100;return S(e,t)-5*i-(t.barWidth?2*(parseFloat(t.barStrokeWidth)||0)+((parseFloat(t.barWidth)||0)+5)*i:0)}function M(e,t){Te.prepareTicks(t);var i=ye(P(e,t)),r=void 0,o=void 0,n=t.majorTicks.length,a=be.pixelRatio;for(e.lineWidth=2*a,e.save(),o=t.colorMajorTicks instanceof Array?t.colorMajorTicks:new Array(n).fill(t.colorStrokeTicks||t.colorMajorTicks),r=0;r<n;++r)e.strokeStyle=o[r],e.rotate(Te.radians(A(t,t.exactTicks?t.majorTicks[r]:r,n))),e.beginPath(),e.moveTo(0,i),e.lineTo(0,i-.15*e.max),B(e);t.strokeTicks&&(e.strokeStyle=t.colorStrokeTicks||o[0],e.rotate(We),e.beginPath(),e.arc(0,0,i,Te.radians(t.startAngle),Te.radians(t.startAngle+t.ticksAngle),!1),B(e))}function A(e,t,i){if(e.exactTicks){var r=e.ticksAngle/(e.maxValue-e.minValue);return e.startAngle+r*(t-e.minValue)}return e.startAngle+t*(e.ticksAngle/(i-1))}function B(e){e.stroke(),e.restore(),e.closePath(),e.save()}function j(e,t){var i=P(e,t)-.15*e.max,r={},o=0,n=t.majorTicks.length,a="needle"!==t.animationTarget,l=t.colorNumbers instanceof Array?t.colorNumbers:new Array(n).fill(t.colorNumbers),s=a?-(t.value-t.minValue)/(t.maxValue-t.minValue)*t.ticksAngle:0;for(a&&(e.save(),e.rotate(-Te.radians(s))),e.font=Te.font(t,"Numbers",e.max/200),e.lineWidth=0,e.textAlign="center",e.textBaseline="middle";o<n;++o){var d=s+A(t,t.exactTicks?t.majorTicks[o]:o,n),c=e.measureText(t.majorTicks[o]).width,h=t.fontNumbersSize,u=Math.sqrt(c*c+h*h)/2,f=Te.radialPoint(i-u-t.numbersMargin/100*e.max,Te.radians(d));360===d&&(d=0),r[d]||(r[d]=!0,e.fillStyle=l[o],e.fillText(t.majorTicks[o],f.x,f.y))}a&&e.restore()}function C(e,t){t.title&&(e.save(),e.font=Te.font(t,"Title",e.max/200),e.fillStyle=t.colorTitle,e.textAlign="center",e.fillText(t.title,0,-e.max/4.25,.8*e.max),e.restore())}function N(e,t){t.units&&(e.save(),e.font=Te.font(t,"Units",e.max/200),e.fillStyle=t.colorUnits,e.textAlign="center",e.fillText(t.units,0,e.max/3.25,.8*e.max),e.restore())}function E(e,t){if(t.needle){var i=t.ticksAngle<360?Te.normalizedValue(t).indented:t.value,r=S(e,t),o=ye(r/100*t.needleCircleSize),n=ye(r/100*t.needleCircleSize*.75),a=ye(r/100*t.needleEnd),l=ye(t.needleStart?r/100*t.needleStart:0),s=r/100*t.needleWidth,d=r/100*t.needleWidth/2,c=be.pixelRatio,h="needle"!==t.animationTarget;e.save(),Te.drawNeedleShadow(e,t),e.rotate(Te.radians(h?t.startAngle:t.startAngle+(i-t.minValue)/(t.maxValue-t.minValue)*t.ticksAngle)),e.fillStyle=Te.linearGradient(e,t.colorNeedle,t.colorNeedleEnd,a-l),"arrow"===t.needleType?(e.beginPath(),e.moveTo(-d,-l),e.lineTo(-s,0),e.lineTo(-1*c,a),e.lineTo(c,a),e.lineTo(s,0),e.lineTo(d,-l),e.closePath(),e.fill(),e.beginPath(),e.lineTo(-.5*c,a),e.lineTo(-1*c,a),e.lineTo(-s,0),e.lineTo(-d,-l),e.lineTo(d/2*c-2*c,-l),e.closePath(),e.fillStyle=t.colorNeedleShadowUp,e.fill()):(e.beginPath(),e.moveTo(-d,a),e.lineTo(-d,l),e.lineTo(d,l),e.lineTo(d,a),e.closePath(),e.fill()),t.needleCircleSize&&(e.restore(),Te.drawNeedleShadow(e,t),t.needleCircleOuter&&(e.beginPath(),e.arc(0,0,o,0,2*Se,!0),e.fillStyle=Te.linearGradient(e,t.colorNeedleCircleOuter,t.colorNeedleCircleOuterEnd,o),e.fill(),e.closePath()),t.needleCircleInner&&(e.beginPath(),e.arc(0,0,n,0,2*Se,!0),e.fillStyle=Te.linearGradient(e,t.colorNeedleCircleInner,t.colorNeedleCircleInnerEnd,n),e.fill(),e.closePath()),e.restore())}}function _(e,t,i){Te.drawValueBox(e,t,i,0,e.max-.33*e.max,e.max)}function R(e,t){var i=e.max/100,r=S(e,t)-5*i,o=parseFloat(t.barStrokeWidth)||0,n=(parseFloat(t.barWidth)||0)*i,a=r-2*o-n,l=(r-a)/2,s=a+l,d=o/s,c=t.startAngle,h=t.startAngle+t.ticksAngle;e.save(),e.rotate(We),o&&(e.beginPath(),e.arc(0,0,s,Te.radians(c)-d,Te.radians(h)+d,!1),e.strokeStyle=t.colorBarStroke,e.lineWidth=2*l,e.stroke(),e.closePath()),n&&(e.beginPath(),e.arc(0,0,s,Te.radians(c),Te.radians(h),!1),e.strokeStyle=t.colorBar,e.lineWidth=n,e.stroke(),e.closePath(),t.barShadow&&(e.beginPath(),e.arc(0,0,r,Te.radians(c),Te.radians(h),!1),e.clip(),e.beginPath(),e.strokeStyle=t.colorBar,e.lineWidth=1,e.shadowBlur=t.barShadow,e.shadowColor=t.colorBarShadow,e.shadowOffsetX=0,e.shadowOffsetY=0,e.arc(0,0,r,Te.radians(t.startAngle),Te.radians(t.startAngle+t.ticksAngle),!1),e.stroke(),e.closePath(),e.restore(),e.rotate(We)),t.barProgress&&(e.beginPath(),e.arc(0,0,s,Te.radians(c),Te.radians(c+(Te.normalizedValue(t).normal-t.minValue)/(t.maxValue-t.minValue)*t.ticksAngle),!1),e.strokeStyle=t.colorBarProgress,e.lineWidth=n,e.stroke(),e.closePath())),e.restore()}function I(e){return e.options.animatedValue?e.options.value:e.value}function D(e,t,i,r,o,n,a,l){e.beginPath(),e.fillStyle=l?Te.linearGradient(e,a,l,o>n?o:n,n>o,o>n?i:r):a,t>0?Te.roundRect(e,i,r,o,n,t):e.rect(i,r,o,n),e.fill(),e.closePath()}function z(e,t,i,r,o,n,a,l,s){e.beginPath(),e.lineWidth=t,e.strokeStyle=s?Te.linearGradient(e,l,s,a,!0,o):l,i>0?Te.roundRect(e,r,o,n,a,i):e.rect(r,o,n,a),e.stroke(),e.closePath()}function L(e,t,i,r,o,n){var a=be.pixelRatio;e.save();var l=t.borderRadius*a,s=o-t.borderShadowWidth-t.borderOuterWidth*a,d=s-t.borderOuterWidth*a-t.borderMiddleWidth*a,c=d-t.borderMiddleWidth*a-t.borderInnerWidth*a,h=c-t.borderInnerWidth*a,u=n-t.borderShadowWidth-t.borderOuterWidth*a,f=u-t.borderOuterWidth*a-t.borderMiddleWidth*a,m=f-t.borderMiddleWidth*a-t.borderInnerWidth*a,v=m-t.borderInnerWidth*a,b=i-(d-s)/2,g=b-(c-d)/2,p=g-(h-c)/2,w=r-(f-u)/2,y=w-(m-f)/2,k=y-(v-m)/2,x=0,T=!1;return t.borderOuterWidth&&(T=Te.drawShadow(e,t,T),z(e,t.borderOuterWidth*a,l,i+t.borderOuterWidth*a/2-x,r+t.borderOuterWidth*a/2-x,s,u,t.colorBorderOuter,t.colorBorderOuterEnd),x+=.5*a),t.borderMiddleWidth&&(T=Te.drawShadow(e,t,T),z(e,t.borderMiddleWidth*a,l-=1+2*x,b+t.borderMiddleWidth*a/2-x,w+t.borderMiddleWidth*a/2-x,d+2*x,f+2*x,t.colorBorderMiddle,t.colorBorderMiddleEnd),x+=.5*a),t.borderInnerWidth&&(T=Te.drawShadow(e,t,T),z(e,t.borderInnerWidth*a,l-=1+2*x,g+t.borderInnerWidth*a/2-x,y+t.borderInnerWidth*a/2-x,c+2*x,m+2*x,t.colorBorderInner,t.colorBorderInnerEnd),x+=.5*a),Te.drawShadow(e,t,T),D(e,l,p,k,h+2*x,v+2*x,t.colorPlate,t.colorPlateEnd),e.restore(),[p,k,h,v]}function G(e,t,i,r,o,n){var a=be.pixelRatio,l=n>=o,s=l?.85*o:n,d=l?n:o;i=l?we(i+(o-s)/2):i;var c=!!t.title,h=!!t.units,u=!!t.valueBox,f=void 0,m=void 0,v=void 0;l?(m=we(.05*d),f=we(.075*d),v=we(.11*d),c&&(d-=f,r+=f),h&&(d-=m),u&&(d-=v)):(m=f=we(.15*s),c&&(s-=f,r+=f),h&&(s-=m));var b=2*t.barStrokeWidth,g=t.barBeginCircle?we(s*t.barBeginCircle/200-b/2):0,p=we(s*t.barWidth/100-b),w=we(d*t.barLength/100-b),y=we((d-w)/2),k=we(i+(l?s/2:y+g)),x=we(r+(l?d-y-g+b/2:s/2)),T=!l||t.hasLeft&&t.hasRight?0:(t.hasRight?-1:1)*t.ticksWidth/100*s,S=l||t.hasLeft&&t.hasRight?0:(t.hasRight?-1:1)*t.ticksWidth/100*s;return e.barDimensions={isVertical:l,width:s,length:d,barWidth:p,barLength:w,strokeWidth:b,barMargin:y,radius:g,pixelRatio:a,barOffset:null,titleMargin:c?f:0,unitsMargin:h?m:0,get ticksLength(){return this.barLength-this.barOffset-this.strokeWidth},X:i+T,Y:r+S,x0:k+T,y0:x+S,baseX:i,baseY:r,ticksPadding:t.ticksPadding/100},e.barDimensions}function F(e,t,i,r,o,n,a){var l=G(e,t,r,o,n,a),s=l.isVertical,d=l.width,c=l.barWidth,h=l.barLength,u=l.strokeWidth,f=l.barMargin,m=l.radius,v=l.x0,b=l.y0,g=l.X,p=l.Y,w=h;if(e.save(),e.beginPath(),t.barBeginCircle){var y=Te.radians(s?270:0),k=Math.asin(c/2/m),x=Math.cos(k),T=Math.sin(k),S=v+(s?m*T:m*x-u/2),W=s?b-m*x:b+m*T,O=ye(s?W-b:S-v);e.barDimensions.barOffset=we(O+m);var V=s?we(v-m*T):S,P=s?W:we(b-m*T);"progress"===i&&(h=e.barDimensions.barOffset+(h-e.barDimensions.barOffset)*(Te.normalizedValue(t).normal-t.minValue)/(t.maxValue-t.minValue));var M=we(S+h-e.barDimensions.barOffset+u/2),A=we(W-h+e.barDimensions.barOffset-u/2);e.arc(v,b,m,y+k,y-k),s?(e.moveTo(S,P),e.lineTo(S,A),e.lineTo(V,A),e.lineTo(V,P)):(e.moveTo(S,P),e.lineTo(M,P),e.lineTo(M,W),e.lineTo(S,W))}else{var B=we(s?g+(d-c)/2:g+f),j=we(s?p+h+f:p+(d-c)/2);"progress"===i&&(h*=(t.value-t.minValue)/(t.maxValue-t.minValue)),s?e.rect(B,j,c,-h):e.rect(B,j,h,c)}"progress"!==i&&t.barStrokeWidth&&(e.lineWidth=u,e.strokeStyle=t.colorBarStroke,e.stroke()),"progress"!==i&&t.colorBar?(e.fillStyle=t.colorBarEnd?Te.linearGradient(e,t.colorBar,t.colorBarEnd,h,s,s?p:g):t.colorBar,e.fill()):"progress"===i&&t.colorBarProgress&&(e.fillStyle=t.colorBarProgressEnd?Te.linearGradient(e,t.colorBarProgress,t.colorBarProgressEnd,w,s,s?p:g):t.colorBarProgress,e.fill()),e.closePath(),t.barBeginCircle&&(e.barDimensions.radius+=u),e.barDimensions.barWidth+=u,e.barDimensions.barLength+=u}function X(e,t,i,r,o,n){F(e,t,"",i,r,o,n)}function Y(e,t){return t.needleSide!==e||t.tickSide!==e||t.numberSide!==e}function U(e,t,i,r,o,n){t.barProgress&&F(e,t,"progress",i,r,o,n)}function q(e,t){var i=e.barDimensions,r=i.isVertical,o=i.width,n=i.length,a=i.barWidth,l=i.barOffset,s=i.barMargin,d=i.X,c=i.Y,h=i.ticksLength,u=i.ticksPadding,f=o*(parseFloat(t.highlightsWidth)||0)/100;if(t.highlights&&f){var m="right"!==t.tickSide,v="left"!==t.tickSide,b=0,g=t.highlights.length,p=(o-a)/2,w=t.maxValue-t.minValue,y=we(r?d+p:d+s+l),k=f,x=r?c+n-s-l:c+p,T=we((t.ticksWidth/100+u)*o)+(f-t.ticksWidth/100*o),S=we(a+u*o);for(e.save();b<g;b++){var W=t.highlights[b],O=h*ye(t.minValue-W.from)/w,V=h*ye((W.to-W.from)/w);e.beginPath(),e.fillStyle=W.color,r?(m&&e.rect(y-T,x-O,k,-V),v&&e.rect(y+S,x-O,k,-V)):(m&&e.rect(y+O,x-T,V,k),v&&e.rect(y+O,x+S,V,k)),e.fill(),e.closePath()}}}function H(e,t,i,r,o){e.beginPath(),e.moveTo(t,i),e.lineTo(r,o),e.stroke(),e.closePath(),e.save()}function J(e,t,i,r,o,n,a,l,s){var d=e.barDimensions,c=d.isVertical,h=d.length,u=d.barWidth,f=d.barOffset,m=d.barMargin,v=d.pixelRatio,b=d.width,g=d.X,p=d.Y,w=d.ticksLength,y=d.ticksPadding,k=(b-u)/2,x=void 0,T=void 0,S=0,W=i.length,O=void 0,V=s*b,P=k-y*b,M=k+u+V+y*b,A=t instanceof Array?t:new Array(i.length).fill(t);e.lineWidth=l*v,e.save();for(var B=w/(o-r);S<W;S++)O=i[S],e.strokeStyle=A[S],c?(T=p+h-m-f+(r-O)*B,n&&(x=g+P,H(e,x,T,we(x-V),T)),a&&(x=g+M,H(e,x,T,we(x-V),T))):(x=g+m+f-(r-O)*B,n&&(T=p+P,H(e,x,T,x,we(T-V))),a&&(T=p+M,H(e,x,we(T),x,T-V)))}function $(e,t){var i=Te.prepareTicks(t),r=le(i,2),o=r[0],n=r[1],a=2,l=(t.maxValue-t.minValue)/(t.majorTicks.length-1),s=t.colorMajorTicks instanceof Array?t.colorMajorTicks:new Array(t.majorTicks.length).fill(t.colorStrokeTicks||t.colorMajorTicks);if(J(e,s,t.exactTicks?t.majorTicks:t.majorTicks.map(function(e,i){return t.minValue+l*i}),t.minValue,t.maxValue,o,n,a,t.ticksWidth/100),t.strokeTicks){var d=e.barDimensions,c=d.isVertical,h=d.length,u=d.width,f=d.barWidth,m=d.barMargin,v=d.barOffset,b=d.X,g=d.Y,p=d.ticksLength,w=d.pixelRatio,y=d.ticksPadding,k=(u-f)/2+f+y*u,x=(u-f)/2-y*u,T=void 0,S=void 0,W=void 0,O=void 0;e.strokeStyle=t.colorStrokeTicks||s[0],a*=w,c?(S=g+h-m-v+a/2,O=S-p-a,o&&(W=T=we(b+x),Z(e,T,S,W,O)),n&&(W=T=we(b+k),Z(e,T,S,W,O))):(T=b+m+v-a/2,W=T+p+a,o&&(O=S=we(g+x),Z(e,T,S,W,O)),n&&(O=S=we(g+k),Z(e,T,S,W,O)))}}function Z(e,t,i,r,o){e.beginPath(),e.moveTo(t,i),e.lineTo(r,o),e.stroke(),e.closePath()}function K(e,t){var i=Te.prepareTicks(t),r=le(i,2),o=r[0],n=r[1],a=[],l=t.minValue,s=Math.abs(t.minorTicks)||0,d=s?(t.maxValue-t.minValue)/(s*(t.majorTicks.length-1)):0;if(s)if(t.exactTicks)for(var c=xe.mod(t.majorTicks[0],s)||0;l<t.maxValue;l+=s)c+l<t.maxValue&&a.push(c+l);else for(;l<t.maxValue;l+=d)a.push(l);J(e,t.colorMinorTicks||t.colorStrokeTicks,a,t.minValue,t.maxValue,o,n,1,t.ticksWidthMinor/100)}function Q(e,t){var i=e.barDimensions,r=i.isVertical,o=i.length,n=i.width,a=i.barWidth,l=i.barMargin,s=i.barOffset,d=i.X,c=i.Y,h=i.ticksLength,u=i.ticksPadding,f=t.maxValue-t.minValue,m=f/(t.majorTicks.length-1),v=t.exactTicks?t.majorTicks:t.majorTicks.map(function(e,i){return t.minValue+m*i}),b=v.length,g="right"!==t.numberSide,p="left"!==t.numberSide,w=t.fontNumbersSize*n/200,y=0,k=(t.ticksWidth/100+2*u)*n,x=(n-a)/2-k,T=(n-a)/2+a+k,S=void 0,W=void 0,O=void 0,V=void 0,P=t.colorNumbers instanceof Array?t.colorNumbers:new Array(b).fill(t.colorNumbers),M=t.numbersMargin/100*n;for(e.font=Te.font(t,"Numbers",n/200),e.lineWidth=0,e.textAlign="center";y<b;y++)e.fillStyle=P[y],V=t.majorTicks[y],O=t.exactTicks?h*((v[y]-t.minValue)/f):y*h/(b-1),r?(W=c+o-l-s-O+w/3,g&&(e.textAlign="right",e.fillText(V,d+x-M,W)),p&&(e.textAlign="left",e.fillText(V,d+T+M,W))):(e.measureText(V).width,S=d+l+s+O,g&&e.fillText(V,S,c+x-M),p&&e.fillText(V,S,c+T+w+M))}function ee(e,t){if(t.title){var i=e.barDimensions,r=i.isVertical,o=i.width,n=i.length,a=i.baseX,l=i.baseY,s=i.titleMargin,d=t.fontTitleSize*o/200,c=we(a+(r?o:n)/2),h=we(l+s/2-(r?d:d/2)-.025*(r?n:o));e.save(),e.textAlign="center",e.fillStyle=t.colorTitle,e.font=Te.font(t,"Title",o/200),e.lineWidth=0,e.fillText(t.title,c,h,r?o:n)}}function te(e,t){if(t.units){var i=e.barDimensions,r=i.isVertical,o=i.width,n=i.length,a=i.baseX,l=i.baseY,s=i.unitsMargin,d=t.fontUnitsSize*o/200,c=we(a+(r?o:n)/2),h=we(l+(r?n:o)+s/2-d/2);e.save(),e.textAlign="center",e.fillStyle=t.colorUnits,e.font=Te.font(t,"Units",o/200),e.lineWidth=0,e.fillText(t.units,c,h,r?o:n)}}function ie(e,t){if(t.needle){var i=e.barDimensions,r=i.isVertical,o=i.width,n=i.length,a=i.barWidth,l=i.barOffset,s=i.barMargin,d=i.ticksLength,c=i.X,h=i.Y,u=i.ticksPadding,f="right"!==t.needleSide,m="left"!==t.needleSide,v=d*(Te.normalizedValue(t).indented-t.minValue)/(t.maxValue-t.minValue),b=(t.ticksWidth/100+u)*o,g=a/2+b,p=g*(t.needleEnd/100),w=void 0,y=void 0,k=void 0,x=void 0,T="arrow"===t.needleType.toLowerCase()?ne:oe,S=(o-a)/2,W=g*(t.needleStart/100),O=S-b-W,V=S+a+b+W;e.save(),Te.drawNeedleShadow(e,t),r?(k=we(h+n-s-l-v),f&&(w=we(c+O),y=w+p,T(e,t,w,k,y,k,p)),m&&(w=we(c+V),y=w-p,T(e,t,w,k,y,k,p,!0))):(w=we(c+s+l+v),f&&(k=we(h+O),x=k+p,T(e,t,w,k,w,x,p)),m&&(k=we(h+V),x=k-p,T(e,t,w,k,w,x,p,!0))),e.restore()}}function re(e,t,i,r){return t.colorNeedleEnd?Te.linearGradient(e,r?t.colorNeedleEnd:t.colorNeedle,r?t.colorNeedle:t.colorNeedleEnd,i,!e.barDimensions.isVertical):t.colorNeedle}function oe(e,t,i,r,o,n,a,l){e.lineWidth=t.needleWidth,e.strokeStyle=re(e,t,a,l),e.beginPath(),e.moveTo(i,r),e.lineTo(o,n),e.stroke(),e.closePath()}function ne(e,t,i,r,o,n,a,l){var s=we(.4*a),d=a-s,c=i===o,h=t.needleWidth/2;e.fillStyle=re(e,t,a,l),e.beginPath(),c?(r>n&&(d*=-1),e.moveTo(i-h,r),e.lineTo(i+h,r),e.lineTo(i+h,r+d),e.lineTo(i,n),e.lineTo(i-h,r+d),e.lineTo(i-h,r)):(i>o&&(d*=-1),e.moveTo(i,r-h),e.lineTo(i,r+h),e.lineTo(i+d,r+h),e.lineTo(o,r),e.lineTo(i+d,r-h),e.lineTo(i,r-h)),e.fill(),e.closePath()}function ae(e,t,i,r,o,n,a){var l=(parseFloat(t.fontValueSize)||0)*n/200,s=(.11*a-l)/2;e.barDimensions.isVertical&&Te.drawValueBox(e,t,i,r+n/2,o+a-l-s,n)}var le=function(){function e(e,t){var i=[],r=!0,o=!1,n=void 0;try{for(var a,l=e[Symbol.iterator]();!(r=(a=l.next()).done)&&(i.push(a.value),!t||i.length!==t);r=!0);}catch(e){o=!0,n=e}finally{try{!r&&l.return&&l.return()}finally{if(o)throw n}}return i}return function(t,i){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),se=function e(t,i,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,i);if(void 0===o){var n=Object.getPrototypeOf(t);return null===n?void 0:e(n,i,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)},de=function e(t,i,r,o){var n=Object.getOwnPropertyDescriptor(t,i);if(void 0===n){var a=Object.getPrototypeOf(t);null!==a&&e(a,i,r,o)}else if("value"in n&&n.writable)n.value=r;else{var l=n.set;void 0!==l&&l.call(o,r)}return r},ce=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}();Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e,t){if(void 0===e||null===e)throw new TypeError("Cannot convert first argument to object");for(var i=Object(e),r=1;r<arguments.length;r++){var o=arguments[r];if(void 0!==o&&null!==o)for(var n=Object.keys(Object(o)),a=0,l=n.length;a<l;a++){var s=n[a],d=Object.getOwnPropertyDescriptor(o,s);void 0!==d&&d.enumerable&&(i[s]=o[s])}}return i}}),Array.prototype.indexOf||Object.defineProperty(Array.prototype,"indexOf",{value:function(e,t){var i;if(null===this)throw new TypeError('"this" is null or not defined');var r=Object(this),o=r.length>>>0;if(0===o)return-1;var n=+t||0;if(Math.abs(n)===1/0&&(n=0),n>=o)return-1;for(i=Math.max(n>=0?n:o-Math.abs(n),0);i<o;){if(i in r&&r[i]===e)return i;i++}return-1}}),Array.prototype.fill||Object.defineProperty(Array.prototype,"fill",{value:function(e){if(null===this)throw new TypeError("this is null or not defined");for(var t=Object(this),i=t.length>>>0,r=arguments[1],o=r>>0,n=o<0?Math.max(i+o,0):Math.min(o,i),a=arguments[2],l=void 0===a?i:a>>0,s=l<0?Math.max(i+l,0):Math.min(l,i);n<s;)t[n]=e,n++;return t}}),"undefined"==typeof window&&(window="undefined"==typeof global?{}:global);var he=function(){function e(){o(this,e),this._events={},this.addListener=this.on,this.removeListener=this.off}return ce(e,[{key:"emit",value:function(e){if(this._events[e]){for(var t=0,i=this._events[e].length,r=arguments.length,o=Array(r>1?r-1:0),n=1;n<r;n++)o[n-1]=arguments[n];for(;t<i;t++)this._events[e][t]&&this._events[e][t].apply(this,o)}}},{key:"once",value:function(e){for(var t=arguments.length,i=Array(t>1?t-1:0),r=1;r<t;r++)i[r-1]=arguments[r];for(var o=0,n=i.length,a=this;o<n;o++)!function(){var t=i[o],r=function i(){a.off(e,i),t.apply(a,arguments)};i[o]=r}();this.on.apply(this,[e].concat(i))}},{key:"on",value:function(e){this._events[e]||(this._events[e]=[]);for(var t=0,i=arguments.length<=1?0:arguments.length-1;t<i;t++)this._events[e].push(arguments.length<=t+1?void 0:arguments[t+1])}},{key:"off",value:function(e){if(this._events[e])for(var t=0,i=arguments.length<=1?0:arguments.length-1;t<i;t++)for(var r=arguments.length<=t+1?void 0:arguments[t+1],o=void 0;~(o=this._events[e].indexOf(r));)this._events[e].splice(o,1)}},{key:"removeAllListeners",value:function(e){delete this._events[e]}},{key:"listeners",get:function(){return this._events}}]),e}(),ue=n("requestAnimationFrame")||function(e){return setTimeout(function(){return e((new Date).getTime())},1e3/60)},fe={linear:function(e){return e},quad:function(e){return Math.pow(e,2)},dequad:function(e){return 1-fe.quad(1-e)},quint:function(e){return Math.pow(e,5)},dequint:function(e){return 1-Math.pow(1-e,5)},cycle:function(e){return 1-Math.sin(Math.acos(e))},decycle:function(e){return Math.sin(Math.acos(1-e))},bounce:function(e){return 1-fe.debounce(1-e)},debounce:function(e){for(var t=0,i=1;1;t+=i,i/=2)if(e>=(7-4*t)/11)return-Math.pow((11-6*t-11*e)/4,2)+Math.pow(i,2)},elastic:function(e){return 1-fe.delastic(1-e)},delastic:function(e){return Math.pow(2,10*(e-1))*Math.cos(20*Math.PI*1.5/3*e)}},me=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"linear",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:250,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){};if(o(this,e),this.duration=i,this.rule=t,this.draw=r,this.end=n,"function"!=typeof this.draw)throw new TypeError("Invalid animation draw callback:",r);if("function"!=typeof this.end)throw new TypeError("Invalid animation end callback:",n)}return ce(e,[{key:"animate",value:function(e,t){var i=this;this.frame&&this.cancel();var r=window.performance&&window.performance.now?window.performance.now():n("animationStartTime")||Date.now();e=e||this.draw,t=t||this.end,this.draw=e,this.end=t,this.frame=ue(function(o){return a(o,e,r,fe[i.rule]||i.rule,i.duration,t,i)})}},{key:"cancel",value:function(){if(this.frame){(n("cancelAnimationFrame")||function(e){})(this.frame),this.frame=null}}},{key:"destroy",value:function(){this.cancel(),this.draw=null,this.end=null}}]),e}();me.rules=fe;var ve=function(){function t(i,r,n){o(this,t),this.options=i,this.element=r.toLowerCase(),this.type=t.toDashed(n),this.Type=e[n],this.mutationsObserved=!1,this.isObservable=!!window.MutationObserver,window.GAUGES_NO_AUTO_INIT||t.domReady(this.traverse.bind(this))}return ce(t,[{key:"isValidNode",value:function(e){return!(!e.tagName||e.tagName.toLowerCase()!==this.element||e.getAttribute("data-type")!==this.type)}},{key:"traverse",value:function(){for(var e=document.getElementsByTagName(this.element),t=0,i=e.length;t<i;t++)this.process(e[t]);this.isObservable&&!this.mutationsObserved&&(new MutationObserver(this.observe.bind(this)).observe(document.body,{childList:!0,subtree:!0,attributes:!0,characterData:!0,attributeOldValue:!0,characterDataOldValue:!0}),this.mutationsObserved=!0)}},{key:"observe",value:function(e){for(var t=0,i=e.length;t<i;t++){var r=e[t];if("attributes"===r.type&&"data-type"===r.attributeName&&this.isValidNode(r.target)&&r.oldValue!==this.type)setTimeout(this.process.bind(this,r.target));else if(r.addedNodes&&r.addedNodes.length)for(var o=0,n=r.addedNodes.length;o<n;o++)setTimeout(this.process.bind(this,r.addedNodes[o]))}}},{key:"process",value:function(e){var i=this;if(!this.isValidNode(e))return null;var r=void 0,o=JSON.parse(JSON.stringify(this.options)),n=null;for(r in o)if(o.hasOwnProperty(r)){var a=t.toAttributeName(r),l=t.parse(e.getAttribute(a));null!==l&&void 0!==l&&(o[r]=l)}return o.renderTo=e,n=new this.Type(o),n.draw&&n.draw(),this.isObservable?(n.observer=new MutationObserver(function(r){r.forEach(function(r){if("attributes"===r.type){var o=r.attributeName.toLowerCase(),a=e.getAttribute(o).toLowerCase();if("data-type"===o&&a&&a!==i.type)n.observer.disconnect(),delete n.observer,n.destroy&&n.destroy();else if("data-"===o.substr(0,5)){var l=o.substr(5).split("-").map(function(e,t){return t?e.charAt(0).toUpperCase()+e.substr(1):e}).join(""),s={};s[l]=t.parse(e.getAttribute(r.attributeName)),"value"===l?n&&(n.value=s[l]):n.update&&n.update(s)}}})}),n.observer.observe(e,{attributes:!0}),n):n}}],[{key:"parse",value:function(e){if("true"===e)return!0;if("false"===e)return!1;if("undefined"!==e){if("null"===e)return null;if(/^[-+#.\w\d\s]+(?:,[-+#.\w\d\s]*)+$/.test(e))return e.split(",");try{return JSON.parse(e)}catch(e){}return e}}},{key:"toDashed",value:function(e){for(var t=e.split(/(?=[A-Z])/),i=1,r=t.length,o=t[0].toLowerCase();i<r;i++)o+="-"+t[i].toLowerCase();return o}},{key:"toCamelCase",value:function(e){for(var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],i=e.split(/-/),r=0,o=i.length,n="";r<o;r++)n+=r||t?i[r][0].toUpperCase()+i[r].substr(1).toLowerCase():i[r].toLowerCase();return n}},{key:"toAttributeName",value:function(e){return"data-"+t.toDashed(e)}},{key:"domReady",value:function(e){if(/comp|inter|loaded/.test((window.document||{}).readyState+""))return e();window.addEventListener?window.addEventListener("DOMContentLoaded",e,!1):window.attachEvent&&window.attachEvent("onload",e)}}]),t}(),be=function(){function e(t,i,r){o(this,e),e.collection.push(this),this.width=i||0,this.height=r||0,this.element=t,this.init()}return ce(e,[{key:"init",value:function(){var t=e.pixelRatio;this.element.width=this.width*t,this.element.height=this.height*t,this.element.style.width=this.width+"px",this.element.style.height=this.height+"px",this.elementClone=this.element.cloneNode(!0),this.context=this.element.getContext("2d"),this.contextClone=this.elementClone.getContext("2d"),this.drawWidth=this.element.width,this.drawHeight=this.element.height,this.drawX=this.drawWidth/2,this.drawY=this.drawHeight/2,this.minSide=this.drawX<this.drawY?this.drawX:this.drawY,this.elementClone.initialized=!1,this.contextClone.translate(this.drawX,this.drawY),this.contextClone.save(),this.context.translate(this.drawX,this.drawY),this.context.save(),this.context.max=this.contextClone.max=this.minSide,this.context.maxRadius=this.contextClone.maxRadius=null}},{key:"destroy",value:function(){var t=e.collection.indexOf(this);~t&&e.collection.splice(t,1),this.context.clearRect(-this.drawX,-this.drawY,this.drawWidth,this.drawHeight),this.context.max=null,delete this.context.max,this.context.maxRadius=null,delete this.context.maxRadius,this.context=null,this.contextClone=null,this.elementClone=null,this.element=null,this.onRedraw=null}},{key:"commit",value:function(){var t=e.pixelRatio;return 1!==t&&(this.contextClone.scale(t,t),this.contextClone.save()),this}},{key:"redraw",value:function(){return this.init(),this.onRedraw&&this.onRedraw(),this}}],[{key:"redraw",value:function(){for(var t=0,i=e.collection.length;t<i;t++)e.collection[t].redraw()}},{key:"pixelRatio",get:function(){return window.devicePixelRatio||1}}]),e}();be.collection=[],window.matchMedia&&window.matchMedia("screen and (min-resolution: 2dppx)").addListener(be.redraw);var ge={renderTo:null,width:0,height:0,minValue:0,maxValue:100,value:0,units:!1,exactTicks:!1,majorTicks:[0,20,40,60,80,100],minorTicks:10,strokeTicks:!0,animatedValue:!1,animateOnInit:!1,title:!1,borders:!0,numbersMargin:1,listeners:null,valueInt:3,valueDec:2,majorTicksInt:1,majorTicksDec:0,animation:!0,animationDuration:500,animationRule:"cycle",colorPlate:"#fff",colorPlateEnd:"",colorMajorTicks:"#444",
colorMinorTicks:"#666",colorStrokeTicks:"",colorTitle:"#888",colorUnits:"#888",colorNumbers:"#444",colorNeedle:"rgba(240,128,128,1)",colorNeedleEnd:"rgba(255,160,122,.9)",colorValueText:"#444",colorValueTextShadow:"rgba(0,0,0,0.3)",colorBorderShadow:"rgba(0,0,0,0.5)",colorBorderOuter:"#ddd",colorBorderOuterEnd:"#aaa",colorBorderMiddle:"#eee",colorBorderMiddleEnd:"#f0f0f0",colorBorderInner:"#fafafa",colorBorderInnerEnd:"#ccc",colorValueBoxRect:"#888",colorValueBoxRectEnd:"#666",colorValueBoxBackground:"#babab2",colorValueBoxShadow:"rgba(0,0,0,1)",colorNeedleShadowUp:"rgba(2,255,255,0.2)",colorNeedleShadowDown:"rgba(188,143,143,0.45)",colorBarStroke:"#222",colorBar:"#ccc",colorBarProgress:"#888",colorBarShadow:"#000",fontNumbers:"Arial",fontTitle:"Arial",fontUnits:"Arial",fontValue:"Arial",fontNumbersSize:20,fontTitleSize:24,fontUnitsSize:22,fontValueSize:26,fontNumbersStyle:"normal",fontTitleStyle:"normal",fontUnitsStyle:"normal",fontValueStyle:"normal",fontNumbersWeight:"normal",fontTitleWeight:"normal",fontUnitsWeight:"normal",fontValueWeight:"normal",needle:!0,needleShadow:!0,needleType:"arrow",needleStart:5,needleEnd:85,needleWidth:4,borderOuterWidth:3,borderMiddleWidth:3,borderInnerWidth:3,borderShadowWidth:3,valueBox:!0,valueBoxStroke:5,valueBoxWidth:0,valueText:"",valueTextShadow:!0,valueBoxBorderRadius:2.5,highlights:[{from:20,to:60,color:"#eee"},{from:60,to:80,color:"#ccc"},{from:80,to:100,color:"#999"}],highlightsWidth:15,barWidth:20,barStrokeWidth:0,barProgress:!0,barShadow:0};l.prototype=Object.create(Array.prototype),l.prototype.constructor=l,l.prototype.get=function(e){if("string"==typeof e)for(var t=0,i=this.length;t<i;t++){var r=this[t].options.renderTo.tagName?this[t].options.renderTo:document.getElementById(this[t].options.renderTo||"");if(r.getAttribute("id")===e)return this[t]}else if("number"==typeof e)return this[e];return null};var pe="2.1.5",we=Math.round,ye=Math.abs,ke=new l;ke.version=pe;var xe=function(t){function n(t){o(this,n);var r=i(this,(n.__proto__||Object.getPrototypeOf(n)).call(this)),a=r.constructor.name;if("BaseGauge"===a)throw new TypeError("Attempt to instantiate abstract class!");if(ke.push(r),t.listeners&&Object.keys(t.listeners).forEach(function(e){(t.listeners[e]instanceof Array?t.listeners[e]:[t.listeners[e]]).forEach(function(t){r.on(e,t)})}),r.version=pe,r.type=e[a]||n,r.initialized=!1,t.minValue=parseFloat(t.minValue),t.maxValue=parseFloat(t.maxValue),t.value=parseFloat(t.value)||0,t.borders||(t.borderInnerWidth=t.borderMiddleWidth=t.borderOuterWidth=0),!t.renderTo)throw TypeError("Canvas element was not specified when creating the Gauge object!");var l=t.renderTo.tagName?t.renderTo:document.getElementById(t.renderTo);if(!(l instanceof HTMLCanvasElement))throw TypeError("Given gauge canvas element is invalid!");return t.width=parseFloat(t.width)||0,t.height=parseFloat(t.height)||0,t.width&&t.height||(t.width||(t.width=l.parentNode?l.parentNode.offsetWidth:l.offsetWidth),t.height||(t.height=l.parentNode?l.parentNode.offsetHeight:l.offsetHeight)),r.options=t||{},r.options.animateOnInit&&(r._value=r.options.value,r.options.value=r.options.minValue),r.canvas=new be(l,t.width,t.height),r.canvas.onRedraw=r.draw.bind(r),r.animation=new me(t.animationRule,t.animationDuration),r}return r(n,t),ce(n,[{key:"update",value:function(e){return Object.assign(this.options,this.type.configure(e||{})),this.canvas.width=this.options.width,this.canvas.height=this.options.height,this.animation.rule=this.options.animationRule,this.animation.duration=this.options.animationDuration,this.canvas.redraw(),this}},{key:"destroy",value:function(){var e=ke.indexOf(this);~e&&ke.splice(e,1),this.canvas.destroy(),this.canvas=null,this.animation.destroy(),this.animation=null,this.emit("destroy")}},{key:"draw",value:function(){return this.options.animateOnInit&&!this.initialized&&(this.value=this._value,this.initialized=!0,this.emit("init")),this.emit("render"),this}},{key:"value",set:function(e){var t=this;e=n.ensureValue(e,this.options.minValue);var i=this.options.value;if(e!==i)if(this.options.animation){if(this.animation.frame&&(this.options.value=this._value,this._value===e))return this.animation.cancel(),void delete this._value;void 0===this._value&&(this._value=e),this.emit("animationStart"),this.animation.animate(function(r){var o=i+(e-i)*r;t.options.animatedValue&&t.emit("value",o,t.value),t.options.value=o,t.draw(),t.emit("animate",r,t.options.value)},function(){void 0!==t._value&&(t.emit("value",t._value,t.value),t.options.value=t._value,delete t._value),t.draw(),t.emit("animationEnd")})}else this.emit("value",e,this.value),this.options.value=e,this.draw()},get:function(){return void 0===this._value?this.options.value:this._value}}],[{key:"configure",value:function(e){return e}},{key:"initialize",value:function(e,t){return new ve(t,"canvas",e)}},{key:"fromElement",value:function(e){var t=ve.toCamelCase(e.getAttribute("data-type")),i=e.attributes,r=0,o=i.length,n={};if(t){for(/Gauge$/.test(t)||(t+="Gauge");r<o;r++)n[ve.toCamelCase(i[r].name.replace(/^data-/,""),!1)]=ve.parse(i[r].value);new ve(n,e.tagName,t).process(e)}}},{key:"ensureValue",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e=parseFloat(e),!isNaN(e)&&isFinite(e)||(e=parseFloat(t)||0),e}},{key:"mod",value:function(e,t){return(e%t+t)%t}},{key:"version",get:function(){return pe}}]),n}(he);void 0!==e&&(e.BaseGauge=xe,e.gauges=(window.document||{}).gauges=ke);var Te={roundRect:c,padValue:h,formatMajorTickNumber:u,radians:f,radialPoint:m,linearGradient:v,drawNeedleShadow:g,drawValueBox:k,verifyError:s,prepareTicks:d,drawShadow:b,font:p,normalizedValue:x},Se=Math.PI,We=Se/2,Oe=Object.assign({},ge,{ticksAngle:270,startAngle:45,colorNeedleCircleOuter:"#f0f0f0",colorNeedleCircleOuterEnd:"#ccc",colorNeedleCircleInner:"#e8e8e8",colorNeedleCircleInnerEnd:"#f5f5f5",needleCircleSize:10,needleCircleInner:!0,needleCircleOuter:!0,needleStart:20,animationTarget:"needle",useMinPath:!1,barWidth:0}),Ve=function(e){function t(e){return o(this,t),e=Object.assign({},Oe,e||{}),i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,t.configure(e)))}return r(t,e),ce(t,[{key:"draw",value:function(){try{var e=this.canvas,i=[-e.drawX,-e.drawY,e.drawWidth,e.drawHeight],r=i[0],o=i[1],n=i[2],a=i[3],l=this.options;if("needle"===l.animationTarget){if(!e.elementClone.initialized){var s=e.contextClone;s.clearRect(r,o,n,a),s.save(),this.emit("beforePlate"),W(s,l),this.emit("beforeHighlights"),O(s,l),this.emit("beforeMinorTicks"),V(s,l),this.emit("beforeMajorTicks"),M(s,l),this.emit("beforeNumbers"),j(s,l),this.emit("beforeTitle"),C(s,l),this.emit("beforeUnits"),N(s,l),e.elementClone.initialized=!0}this.canvas.commit(),e.context.clearRect(r,o,n,a),e.context.save(),e.context.drawImage(e.elementClone,r,o,n,a),e.context.save(),this.emit("beforeProgressBar"),R(e.context,l),this.emit("beforeValueBox"),_(e.context,l,I(this)),this.emit("beforeNeedle"),E(e.context,l)}else{var d=-Te.radians((l.value-l.minValue)/(l.maxValue-l.minValue)*l.ticksAngle);if(e.context.clearRect(r,o,n,a),e.context.save(),this.emit("beforePlate"),W(e.context,l),e.context.rotate(d),this.emit("beforeHighlights"),O(e.context,l),this.emit("beforeMinorTicks"),V(e.context,l),this.emit("beforeMajorTicks"),M(e.context,l),this.emit("beforeNumbers"),j(e.context,l),this.emit("beforeProgressBar"),R(e.context,l),e.context.rotate(-d),e.context.save(),!e.elementClone.initialized){var c=e.contextClone;c.clearRect(r,o,n,a),c.save(),this.emit("beforeTitle"),C(c,l),this.emit("beforeUnits"),N(c,l),this.emit("beforeNeedle"),E(c,l),e.elementClone.initialized=!0}e.context.drawImage(e.elementClone,r,o,n,a)}this.emit("beforeValueBox"),_(e.context,l,I(this)),se(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"draw",this).call(this)}catch(e){Te.verifyError(e)}return this}},{key:"value",set:function(e){e=xe.ensureValue(e,this.options.minValue),this.options.animation&&360===this.options.ticksAngle&&this.options.useMinPath&&(this._value=e,e=this.options.value+((e-this.options.value)%360+540)%360-180),de(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"value",e,this)},get:function(){return se(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"value",this)}}],[{key:"configure",value:function(e){return e.barWidth>50&&(e.barWidth=50),isNaN(e.startAngle)&&(e.startAngle=45),isNaN(e.ticksAngle)&&(e.ticksAngle=270),e.ticksAngle>360&&(e.ticksAngle=360),e.ticksAngle<0&&(e.ticksAngle=0),e.startAngle<0&&(e.startAngle=0),e.startAngle>360&&(e.startAngle=360),e}}]),t}(xe);void 0!==e&&(e.RadialGauge=Ve),xe.initialize("RadialGauge",Oe);var Pe=Object.assign({},ge,{borderRadius:0,barBeginCircle:30,colorBarEnd:"",colorBarProgressEnd:"",needleWidth:6,tickSide:"both",needleSide:"both",numberSide:"both",ticksWidth:10,ticksWidthMinor:5,ticksPadding:5,barLength:85,fontTitleSize:26,highlightsWidth:10}),Me=function(e){function n(e){return o(this,n),e=Object.assign({},Pe,e||{}),i(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,n.configure(e)))}return r(n,e),ce(n,[{key:"draw",value:function(){try{var e=this.canvas,i=[-e.drawX,-e.drawY,e.drawWidth,e.drawHeight],r=i[0],o=i[1],a=i[2],l=i[3],s=this.options;if(!e.elementClone.initialized){var d=e.contextClone;d.clearRect(r,o,a,l),d.save(),this.emit("beforePlate"),this.drawBox=L(d,s,r,o,a,l),this.emit("beforeBar"),X.apply(void 0,[d,s].concat(t(this.drawBox))),e.context.barDimensions=d.barDimensions,this.emit("beforeHighlights"),q(d,s),this.emit("beforeMinorTicks"),K(d,s),this.emit("beforeMajorTicks"),$(d,s),this.emit("beforeNumbers"),Q(d,s),this.emit("beforeTitle"),ee(d,s),this.emit("beforeUnits"),te(d,s),e.elementClone.initialized=!0}this.canvas.commit(),e.context.clearRect(r,o,a,l),e.context.save(),e.context.drawImage(e.elementClone,r,o,a,l),e.context.save(),this.emit("beforeProgressBar"),U.apply(void 0,[e.context,s].concat(t(this.drawBox))),this.emit("beforeNeedle"),ie(e.context,s),this.emit("beforeValueBox"),ae.apply(void 0,[e.context,s,s.animatedValue?this.options.value:this.value].concat(t(this.drawBox))),se(n.prototype.__proto__||Object.getPrototypeOf(n.prototype),"draw",this).call(this)}catch(e){Te.verifyError(e)}return this}}],[{key:"configure",value:function(e){return e.barStrokeWidth>=e.barWidth&&(e.barStrokeWidth=we(e.barWidth/2)),e.hasLeft=Y("right",e),e.hasRight=Y("left",e),e.value>e.maxValue&&(e.value=e.maxValue),e.value<e.minValue&&(e.value=e.minValue),xe.configure(e)}}]),n}(xe);void 0!==e&&(e.LinearGauge=Me),xe.initialize("LinearGauge",Pe),"undefined"!=typeof module&&Object.assign(e,{Collection:l,GenericOptions:ge,Animation:me,BaseGauge:xe,drawings:Te,SmartCanvas:be,DomObserver:ve,vendorize:n})}("undefined"!=typeof module?module.exports:window);
//# sourceMappingURL=gauge.min.js.map

//show the wifi settings data
var connectedsensors=null;
var supportedsensors=null;
var mapping=null;

var connectedsensors_json = ["testdata/connectedsensors.json", null];
var supportedsensors_json = ["testdata/supportedsensors.json",null];
var mapping_json = [ "testdata/mappingdata.json", null];
var MappingDataToLoad = [connectedsensors_json, supportedsensors_json, mapping_json ];

function load_mapping_data( callback_on_done){
    
    loadMultipleData(MappingDataToLoad,function() { mapping_parse_loaded_data_to_json(); 
        if(callback_on_done != null){
            callback_on_done();
        } });
}

function mapping_parse_loaded_data_to_json(){
    connectedsensors=JSON.parse( connectedsensors_json[1] );
    supportedsensors=JSON.parse( supportedsensors_json[1] );
    mapping =JSON.parse( mapping_json[1] );
}

//This will search for the first mapped sensor that will fit
function SearchForFirstSensor( ValueType ){

    var mBus = 0
    var mChannel = 0
    var mValueType = 0;
    var found = false;

    var mMappedChannel = 0;

    for (var i = 0; i <  mapping.Mapping.length ; i++) {
        if( mapping.Mapping[i].ValueType===ValueType ){
                //We have a connected sensor all good......
                mBus = mapping.Mapping[i].Bus;
                mChannel = mapping.Mapping[i].Channel;
                mValueType = mapping.Mapping[i].ValueType;
                mMappedChannel = i;
                found = true;
                break;

            }
    }

    return { found, mMappedChannel ,mBus, mChannel, mValueType };
}

function channel_valid_mapped( ch_idx ){
    var name = "unmapped";
    var valid = false;
    if(ch_idx>=mapping.Mapping.lenght){
        return {valid, name};
    }
   
    var location ;
     //We now get the mapped channel and select the propper entry 
     var mBus = mapping.Mapping[ch_idx].Bus;
     var mChannel = mapping.Mapping[ch_idx].Channel;
     var mValueType = mapping.Mapping[ch_idx].ValueType;
     var foundconnected = false
     //Lets try to find an entry in the connected sensors
     for (var i = 0; i < connectedsensors.SensorList.length ; i++) {
         if( (  connectedsensors.SensorList[i].Bus === mBus )        && 
             (connectedsensors.SensorList[i].Channel === mChannel )  &&
             (connectedsensors.SensorList[i].ValueType === mValueType ) ){
                 //We have a connected sensor all good......
                 name  = connectedsensors.SensorList[i].Name;
                 foundconnected = true;
                 break;
 
             }
     }
     
     if(foundconnected === false){
         //Lookup in the supported ones.....
         for (var i = 0; i < supportedsensors.SensorList.length ; i++) {
             if( (  supportedsensors.SensorList[i].Bus === mBus )        && 
                 (supportedsensors.SensorList[i].Channel === mChannel )  &&
                 (supportedsensors.SensorList[i].ValueType === mValueType ) ){
                     //We need to add a new entry to the list....
                     name = "(unconnected) "+supportedsensors.SensorList[i].Name;
                     foundconnected = true;
                     break;
     
                 }
         }
 
     }
     
     if(foundconnected===false){
        name = ("unmapped");
     }
     valid = foundconnected;
     return { valid , name};


}


function showSensorMapping() {
    showView("SensorMapping");
    //Next is to grab the data and generate the lists
    ClearMappingDiv();
    load_mapping_data(MappingGeneratePage);

}

function ClearMappingDiv(){
    const myNode = document.getElementById("ChannelMappingTableBtn");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    //We need to perform a request for /devices/connectedsensors.json
    //and also load devices/supportedsensors.json
 
}

function LoadMappigData(){
    connectedsensors=null;
    supportedsensors=null;
    mapping=null;
    sendRequest("testdata/connectedsensors.json",ConnectedSensorsLoaded);
    
   

}

function MappingGeneratePage(){
//We remove parts from the tabel an generate new ones
const myNode = document.getElementById("ChannelMappingTableBtn");
//Next is to rebuild the table....

for(var x =0; x< 64;x++){
    var row = myNode.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = "Channel "+x;
    //We need to add the selection element....

   

    //Create array of options to be added
   
    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "mySelect");
    selectList.setAttribute('onchange','MappingSelectionChanged('+x+');');
    cell2.appendChild(selectList);

    //Create and append the options
    var o = document.createElement("option");
    o.setAttribute("value", "unmapped");
    o.text = "unmapped";
    selectList.appendChild(o);
    
    for (var i = 0; i < connectedsensors.SensorList.length ; i++) {
        
        var option = document.createElement("option");
        var val = connectedsensors.SensorList[i].Bus + "," + connectedsensors.SensorList[i].ValueType + "," + connectedsensors.SensorList[i].Channel ;
        option.setAttribute("value",val);
        option.text = connectedsensors.SensorList[i].Name;
        selectList.appendChild(option);
    }

    //We now get the mapped channel and select the propper entry 
    var mBus = mapping.Mapping[x].Bus;
    var mChannel = mapping.Mapping[x].Channel;
    var mValueType = mapping.Mapping[x].ValueType;
    var foundconnected = false
    //Lets try to find an entry in the connected sensors
    for (var i = 0; i < connectedsensors.SensorList.length ; i++) {
        if( (  connectedsensors.SensorList[i].Bus === mBus )        && 
            (connectedsensors.SensorList[i].Channel === mChannel )  &&
            (connectedsensors.SensorList[i].ValueType === mValueType ) ){
                //We have a connected sensor all good......
                selectList.value= mBus+","+mValueType+","+mChannel;
                foundconnected = true;
                break;

            }
    }
    
    if(foundconnected === false){
        //Lookup in the supported ones.....
        for (var i = 0; i < supportedsensors.SensorList.length ; i++) {
            if( (  supportedsensors.SensorList[i].Bus === mBus )        && 
                (supportedsensors.SensorList[i].Channel === mChannel )  &&
                (supportedsensors.SensorList[i].ValueType === mValueType ) ){
                    //We need to add a new entry to the list....
                    var option = document.createElement("option");
                    var val = supportedsensors.SensorList[i].Bus + "," + supportedsensors.SensorList[i].ValueType + "," + supportedsensors.SensorList[i].Channel ;
                    option.setAttribute("value",val);
                    option.text = "(unconnected) "+supportedsensors.SensorList[i].Name;
                    selectList.appendChild(option);

                    selectList.value= val;
                    foundconnected = true;
                    break;
    
                }
        }

    }
    
    if(foundconnected===false){
        selectList.value=  "unmapped";
    }


  }
}

function MappingSelectionChanged( id ){
   //We need here to submitt the new settings !
}function showMQTT(){
    sendRequest("mqtt/settings", read_mqttsettings);
    showView("MQTTView");
}


function mqtt_pass_onclick(){
    document.getElementById("MQTT_PASS").value = "";
    document.getElementById("MQTT_PASS").type == "text";
}

function read_mqttsettings( msg ){
    try{
        var jsonObj = JSON.parse(msg);
        document.getElementById("MQTT_USER").value = jsonObj.mqttuser;
        document.getElementById("MQTT_HOST").value = jsonObj.mqtthost;
        document.getElementById("MQTT_SERVER").value = jsonObj.mqttserver;
        document.getElementById("MQTT_PORT").value = jsonObj.mqttport;
        document.getElementById("MQTT_PASS").value = jsonObj.mqttpass;
        document.getElementById("MQTT_TOPIC").value = jsonObj.mqtttopic;
        document.getElementById("MQTT_PASS").type = "password";
        document.getElementById("MQTT_ENA").value = jsonObj.mqttena;
        document.getElementById("MQTT_UPDATE_INT").value = jsonObj.mqtttxintervall;    
    } catch{
        document.getElementById("MQTT_USER").value = "";
        document.getElementById("MQTT_HOST").value = "Unknown";
        document.getElementById("MQTT_SERVER").value = "0.0.0.0";
        document.getElementById("MQTT_PORT").value = 1883;
        document.getElementById("MQTT_PASS").value = "";
        document.getElementById("MQTT_TOPIC").value = "Unknown";
        document.getElementById("MQTT_PASS").type = "password";
        document.getElementById("MQTT_ENA").value = false;
        document.getElementById("MQTT_UPDATE_INT").value = 60;
    }
    
}


function SubmitMQTT( ){
    var protocol = location.protocol;
    var slashes = protocol.concat("//");
    var host = slashes.concat(window.location.hostname);
    var url = host + "/mqtt/settings";
    var mqtt_user = document.getElementById("MQTT_USER").value;
    var mqtt_host = document.getElementById("MQTT_HOST").value;
    var mqtt_server = document.getElementById("MQTT_SERVER").value;
    var mqtt_port = document.getElementById("MQTT_PORT").value;
    var mqtt_topic =  document.getElementById("MQTT_TOPIC").value;
    var mqtt_ena = document.getElementById("MQTT_ENA").value;
    var mqtt_txintervall =  document.getElementById("MQTT_UPDATE_INT").value;
    var data = [];
    data.push({key:"MQTT_ENA",
                   value: mqtt_ena}); 
    
    data.push({key:"MQTT_PORT",
                   value: mqtt_port});
   
    
    data.push({key:"MQTT_USER",
               value: mqtt_user});
               
    data.push({key:"MQTT_HOST",
               value: mqtt_host});
    
    
    data.push({key:"MQTT_SERVER",
               value: mqtt_server});
               
    data.push({key:"MQTT_TOPIC",
               value: mqtt_topic});
             
             
    data.push({key:"MQTT_TXINTERVALL",
               value: mqtt_txintervall});
    
    if( "password" != document.getElementById("MQTT_PASS").type){
        var mqtt_pass = document.getElementById("MQTT_PASS").value;
        data.push({key:"MQTT_PASS",
               value: mqtt_pass});
        
        document.getElementById("MQTT_PASS").value = "********";
        document.getElementById("MQTT_PASS").type = "password";
        
    }            
               
    sendData(url,data); 
     
     
    

}

function sdcard_js_loaded(){
    return true;
}

function showSDCARD(){
    showView("SDCARDView");
    RequestStettings();
}


function RequestStettings(){
    sendRequest("/sdlog/settings.json", SDSettingsLoaded);
}

function RequestSdStatus(){
    sendRequest("/sdlog/sd/status", UpadteSDStatus);
}

function SDSettingsLoaded(data){
    try{
        SettingsJSON = JSON.parse(data);
        var elen = document.getElementById("SDCardLoggingEnable");
        var eliv = document.getElementById("SDcardLoggingInterval");

        elen.value = SettingsJSON.Enable;
        eliv.value = SettingsJSON.LogInterval;
    } catch{
        var elen = document.getElementById("SDCardLoggingEnable");
        var eliv = document.getElementById("SDcardLoggingInterval");
        elen.value = false;
        eliv.value = 60;

    }
    RequestSdStatus();
}


function SDCardEnaChanged(){
   var url = GenerateHostUrl("/sdlog/settings.dat");
   var el = document.getElementById("SDCardLoggingEnable");
    
    var data = [];
    data.push({key:"SDLOG_ENA",
               value: el.value});
    sendData(url,data); 
}

function SDCardLogIntChanged(){
    var url = GenerateHostUrl("/sdlog/settings.dat");
    var el = document.getElementById("SDcardLoggingInterval");

    var data = [];
    data.push({key:"SDLOG_INT",
               value: el.value});
       
}

function UpadteSDStatus(data){
    try{
        StatusJSON = JSON.parse(data);
        var sdmounted = StatusJSON.SDCardMounted;
        var freesize = StatusJSON.SDCardFree;
        var sdcapaciyt = StatusJSON.SDCardSize;

        document.getElementById("SDCapacity").innerHTML=sdcapaciyt+"MB Total";
        document.getElementById("SDCapacityUsed").innerHTML=freesize+"MB Free";
        if(sdmounted===true){
            document.getElementById("SDMountStatus").innerHTML="SD-Card mounted";
        } else {
            document.getElementById("SDMountStatus").innerHTML="SD-Card unmounted";
        }


      

    } catch {
        //File Broken!
        document.getElementById("SDCapacity").innerHTML="0 MB Total";
        document.getElementById("SDCapacityUsed").innerHTML="0 MB Free";
        document.getElementById("SDMountStatus").innerHTML="API Error";
        
    }
}

function SDCardMount(){
    // /sdlog/sd/mount
    sendRequest("/sdlog/sd/mount",RequestSdStatus);

}

function SDCardUMount(){
    // /sdlog/sd/umount
    sendRequest("/sdlog/sd/umount",RequestSdStatus);

}var sensebox_settings ;
var sensebox_mapping ;
var station_mapping ;


var sensebox_settings_json = ["testdata/sensebox/settings.json", null];
var sensebox_mapping_json = ["testdata/sensebox/mapping.json",null];
var sensebox_station_mapping_json = [ "testdata/mappingdata.json", null];
var DataToLoad = [sensebox_settings_json, sensebox_mapping_json, sensebox_station_mapping_json ];

function sensebox_js_loaded(){
    return true;
}

function showSenseBox(){
    showView("SenseBox");
    ClearMappingSB();
    load_mapping_data(function(){
        loadMultipleData(DataToLoad,SenseBoxDisplaySettings);
    });
    
}

function ClearMappingSB(){
    const myNode = document.getElementById("SenseboxMappingTableBtn");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    } 
}


function SenseBoxDisplaySettings(URL_to_Load){

    //We remove parts from the tabel an generate new ones
const myNode = document.getElementById("SenseboxMappingTableBtn");
//Next is to rebuild the table....
sensebox_settings = JSON.parse(sensebox_settings_json[1]);
sensebox_mapping = JSON.parse(sensebox_mapping_json[1]);
station_mapping = JSON.parse(sensebox_station_mapping_json[1]);

document.getElementById("SenseboxUploadInterval").onchange = null;
document.getElementById("SenseboxUploadInterval").value = sensebox_settings.SENSEBOX_TXINTERVALL;
document.getElementById("SenseboxUploadInterval").onchange = SenseBoxUploadIntervalChanged;

document.getElementById("SenseboxUploadEnable").onchange = null;
document.getElementById("SenseboxUploadEnable").value = sensebox_settings.SENSEBOX_ENA;
document.getElementById("SenseboxUploadEnable").onchange = SenseboxUploadEnableChanged;


for(var x =0; x< sensebox_mapping.Mapping.length;x++){
    var row = myNode.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = 'ID Key <input type="text" onchange="KeyID_Changed('+ x +')"  onblur="KeyID_MayChanged('+ x +')" id="SenseBoxID_' + x + '" value = "'+ sensebox_mapping.Mapping[x].SensorID+'">';
    //We need to add the selection element....
    var Text = document.createElement("a");
    Text.innerHTML="Channel  "
    cell2.appendChild(Text);
   

    //Create array of options to be added
   //All mapped channels will be in the list.....
    //And the selected one if not mapped
    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "SenseboxChSelect"+x);
    selectList.setAttribute('onchange','SenseboxChSelectChanged('+x+');');
    var sensbox_mapped_ch  = sensebox_mapping.Mapping[x].STA_Channel;
    var option = document.createElement("option");
    var mapping_exists= false;
    for(var t=0;t<station_mapping.Mapping.length;t++){
        var vmpg = channel_valid_mapped( t );
        if(station_mapping.Mapping[t].Bus!=0){
            if(sensbox_mapped_ch === t ){
                mapping_exists = true;
            }
            if(vmpg.valid === true ){
                option = document.createElement("option");
                option.setAttribute("value",t);
                option.text = t+" ( " +vmpg.name+" )";
                selectList.appendChild(option);
            }
        }
       

    }
    if(mapping_exists === false){

        option = document.createElement("option");
        option.setAttribute("value",sensbox_mapped_ch);
        option.text = sensbox_mapped_ch + "(unmapped)";
        selectList.appendChild(option);
    }
    cell2.appendChild(selectList);
    //select the value we need....
    selectList.value = sensbox_mapped_ch;
    


    
    var Text = document.createElement("a");
    Text.innerHTML=" Enabled   "
    cell3.appendChild(Text);
    EnaListHtml = document.createElement("select");
    var option = document.createElement("option");
    var val = "true";
    option.setAttribute("value",val);
    option.text = "True";
    EnaListHtml.appendChild(option);
    option = document.createElement("option");
    var val = "false";
    option.setAttribute("value",val);
    option.text = "False";
    EnaListHtml.appendChild(option);
    

    //Create and append select list
    EnaListHtml.setAttribute("id", "SenseboxEnaList"+x);
    EnaListHtml.setAttribute('onchange','SenseboxEnaListSelectionChanged('+x+');');
    cell3.appendChild(EnaListHtml);
    if(true === sensebox_mapping.Mapping[x].Enabled){
        EnaListHtml.value = "true";
    } else {
        EnaListHtml.value = "false";
    }  
   }

}

function KeyID_MayChanged( Channel ){
    //Key has may changed as we use to onbluc function.....
    myNode = document.getElementById("SenseBoxID_"+Channel);
    var id = myNode.value;
    var org_id = sensebox_mapping.Mapping[Channel].SensorID;
    if(id !=org_id ){
       //We need to write the new value back 
    }
    myNode.style.color="black";



}

function KeyID_Changed( Channel ){
    //We change the color to red.....
    myNode = document.getElementById("SenseBoxID_"+Channel);
    myNode.style.color="red";
}

function SenseboxChSelectChanged( Channel ){
    //Mapping channel has been changed 
    var el = document.getElementById("SenseboxChSelect"+Channel);

}

function SenseboxEnaListSelectionChanged( Channel ){
    //Enabled has been changed 
    var el = document.getElementById("SenseboxEnaList"+Channel);
}

function SenseboxUploadEnableChanged( ){
    var el = document.getElementById("SenseboxUploadEnable");

}

function SenseBoxUploadIntervalChanged( ){
    var el = document.getElementById("SenseboxUploadInterval");
    if(true == el.validity.valid ){
        //We can process the input....
    }

}var thinkspeak_settings ;
var thinkspeak_mapping ;



var thinkspeak_settings_json = ["testdata/thinkspeak/settings.json", null];
var thinkspeak_mapping_json = ["testdata/thinkspeak/mapping.json",null];
var station_mappin_json = [ "testdata/mappingdata.json", null];
var TSDataToLoad = [thinkspeak_settings_json, thinkspeak_mapping_json, station_mappin_json ];

function thinkspeak_js_loaded(){
    return true;
}

function showThinkspeak(){
    showView("Thinkspeak");
    ClearMappingTB();
    load_mapping_data(function(){
        loadMultipleData(TSDataToLoad,ThinkspeakDisplaySettings);
    });
    
}

function ClearMappingTB(){
    const myNode = document.getElementById("ThinkspeakMappingTableBtn");
    while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    } 
}


function ThinkspeakDisplaySettings(URL_to_Load){

    //We remove parts from the tabel an generate new ones
const myNode = document.getElementById("ThinkspeakMappingTableBtn");
//Next is to rebuild the table....
thinkspeak_settings = JSON.parse(thinkspeak_settings_json[1]);
thinkspeak_mapping = JSON.parse(thinkspeak_mapping_json[1]);
station_mapping = JSON.parse(station_mappin_json[1]);


document.getElementById("ThinkspeakUploadInterval").onchange = null;
document.getElementById("ThinkspeakUploadInterval").value = thinkspeak_settings.THINKSPEAK_TXINTERVALL;
document.getElementById("ThinkspeakUploadInterval").onchange = ThinkspeakUploadIntervalChanged;

document.getElementById("ThinkspeakUploadEnable").onchange = null;
document.getElementById("ThinkspeakUploadEnable").value = thinkspeak_settings.THINKSPEAK_ENA;
document.getElementById("ThinkspeakUploadEnable").onchange = ThinkspeakUploadEnableChanged;

for(var x =0; x< 8;x++){
    var row = myNode.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "<a>Field "+x+"</a>";
    //We need to add the selection element....

    var Text = document.createElement("a");
    Text.innerHTML="Channel  "
    cell2.appendChild(Text);
   
    //Create array of options to be added
   //All mapped channels will be in the list.....
    //And the selected one if not mapped
    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("id", "ThinkspeakChSelect"+x);
    selectList.setAttribute('onchange','ThinkspeakMappingChannelChanged('+x+');');
    var thinkspeak_mapped_ch  = thinkspeak_mapping.Mapping[x].STA_Channel;
    var option = document.createElement("option");
    var mapping_exists= false;

    for(var t=0;t<station_mapping.Mapping.length;t++){
        var vmpg = channel_valid_mapped( t );
        mapping_exists=false;
        if(station_mapping.Mapping[t].Bus!=0){
            if(thinkspeak_mapped_ch === t ){  
                if( vmpg.valid === true ){
                    mapping_exists = true;
                } else {
                    mapping_exists = false;
                }
                option = document.createElement("option");
                option.setAttribute("value",t);
                option.text = t +" ("+   vmpg.name +" )";
                selectList.appendChild(option);
            }       
        }

        if(mapping_exists === false){
            if( vmpg.valid === true ){
            option = document.createElement("option");
            option.setAttribute("value",t);
            option.text = t +" ( "+   vmpg.name +" )";
            selectList.appendChild(option);
            }
        }
       
    }

    cell2.appendChild(selectList);
    //select the value we need....
    selectList.value = thinkspeak_mapped_ch;
    
    var Text = document.createElement("a");
    Text.innerHTML=" Enabled   "
    cell3.appendChild(Text);
    EnaListHtml = document.createElement("select");
    var option = document.createElement("option");
    var val = "true";
    option.setAttribute("value",val);
    option.text = "True";
    EnaListHtml.appendChild(option);
    option = document.createElement("option");
    var val = "false";
    option.setAttribute("value",val);
    option.text = "False";
    EnaListHtml.appendChild(option);
    


    //Create and append select list
    EnaListHtml.setAttribute("id", "TsEnaList"+x);
    EnaListHtml.setAttribute('onchange','ThinkspeakEnableChannelChanged('+x+');');
    cell3.appendChild(EnaListHtml);
    if(true === thinkspeak_mapping.Mapping[x].Enabled){
        EnaListHtml.value = "true";
    } else {
        EnaListHtml.value = "false";
    }  
   }

}

function ThinkspeakMappingChannelChanged( Channel ){
//Mapping channel has been changed 
var el = document.getElementById("ThinkspeakChSelect"+Channel);
}

function ThinkspeakEnableChannelChanged( Channel ){
//Enabled has been changed 
var el = document.getElementById("TsEnaList"+Channel);
}

function ThinkspeakUploadEnableChanged( ){
    var el = document.getElementById("ThinkspeakUploadEnable");
}

function ThinkspeakUploadIntervalChanged(){
    var el = document.getElementById("ThinkspeakUploadInterval");
    if(true == el.validity.valid ){
        //We can process the input....
    }
}function timesettings_js_loaded(){
    return true;
}
function showTimeSettings(){
    sendRequest("timesettings", read_timesettings);
    showView("TimeSettings");
}

function read_timesettings(msg){
    try{ 
        var jsonObj = JSON.parse(msg);
        document.getElementById("NTP_ON").checked = jsonObj.ntpena;
        document.getElementById("ZONE_OVERRRIDE").checked = jsonObj.zoneoverride;
        document.getElementById("DLSOverrid").checked = jsonObj.dlsdis;
        document.getElementById("ManualDLS").checked = jsonObj.dlsmanena;
  
        var element = document.getElementById("GMT_OFFSET");
        element.value = jsonObj.gmtoffset;
        
        var element = document.getElementById("timezoneid");
        element.value = jsonObj.tzidx;
    
        var element = document.getElementById("dls_offset");
        element.value = jsonObj.dlsmanidx;
    
        var element = document.getElementById("date");
        element.value = jsonObj.date;
   
        var element = document.getElementById("time");
        element.value=jsonObj.time;
    
        var element = document.getElementById("NTPServerName");
        element.value = jsonObj.ntpname;

        var element = document.getElementById("NTP_UPDTAE_SPAN");
        element.value = jsonObj.ntp_update_span;

    } catch {
        //Data is not in good shape....
        document.getElementById("NTP_ON").checked = false;
        document.getElementById("ZONE_OVERRRIDE").checked = false;
        document.getElementById("DLSOverrid").checked = false;
        document.getElementById("ManualDLS").checked = false;
  
        var element = document.getElementById("GMT_OFFSET");
        element.value = 0;
        
        var element = document.getElementById("timezoneid");
        element.value = 0;
    
        var element = document.getElementById("dls_offset");
        element.value = 0;
    
        var element = document.getElementById("date");
        element.value = "1970-01-01";
   
        var element = document.getElementById("time");
        element.value="00:00:00";
    
        var element = document.getElementById("NTPServerName");
        element.value = "";

        var element = document.getElementById("NTP_UPDTAE_SPAN");
        element.value = 60;

        
    }
    
  

}

function LoadParameter(){
    sendRequest("timesettings", read_timesettings);
    
}

function SubmitTimeZone(){
   var protocol = location.protocol;
   var slashes = protocol.concat("//");
   var host = slashes.concat(window.location.hostname);
   var url = host + "/timezone.dat";
   
   var element = document.getElementById("timezoneid");
   var data = [];
   data.push({key:"timezoneid",
              value:  element.value});
   
   sendData(url,data); 
}                 

function SubmitDateTime(){
   var protocol = location.protocol;
   var slashes = protocol.concat("//");
   var host = slashes.concat(window.location.hostname);
   var url = host + "/settime.dat";
   
   var element = document.getElementById("date");
   var d = element.value;
  
   
   var element = document.getElementById("time");
   var t=element.value;

   var parts = t.split(':');
   //This will result in ideal conditions in three parts
   if(parts.lenght < 3){
       //We assume only hours and minutes here ( iphone style )
       t=parts[0]+":"+parts[1]+":00";
   }

   var data = [];
   data.push({key:"date",
              value: d});
   data.push({key:"time",
              value: t});
   
   sendData(url,data); 


}

function SubmitNTP(){
   var protocol = location.protocol;
   var slashes = protocol.concat("//");
   var host = slashes.concat(window.location.hostname);
   var url = host + "/ntp.dat";
   
   var ntp_ena=document.getElementById("NTP_ON").checked;
             
   var element = document.getElementById("NTPServerName");
   var servername = element.value;

   var element = document.getElementById("NTP_UPDTAE_SPAN");
   var timespan = element.value;
   
   
   
   var data = [];
   if(true===ntp_ena){
   data.push({key:"NTP_ON",
              value: ntp_ena});
   }
              
   data.push({key:"ntp_update_delta",
              value: timespan});
              
   data.push({key:"NTPServerName",
              value: servername});
   
   sendData(url,data); 


}

function SubmitOverrides(){
   var protocol = location.protocol;
   var slashes = protocol.concat("//");
   var host = slashes.concat(window.location.hostname);
   var url = host + "/overrides.dat";
   
   var zoneoverride = document.getElementById("ZONE_OVERRRIDE").checked;
   var dls_override = document.getElementById("DLSOverrid").checked;
   var dlsmanena = document.getElementById("ManualDLS").checked;
   
  
   var element = document.getElementById("GMT_OFFSET");
   var gmtoffset = element.value;
   
   var element = document.getElementById("dls_offset");
   var dlsoffsetidx=element.value;
   
   
   
   
   var data = [];
   if(true===zoneoverride){
   data.push({key:"ZONE_OVERRRIDE",
              value: zoneoverride});
   }
   
   if(true===dls_override){
   data.push({key:"dlsdis",
              value: dls_override});
   }
   
    if(true===dlsmanena){
   data.push({key:"dlsmanena",
              value: dlsmanena});
   }
              
   data.push({key:"dlsmanidx",
              value: dlsoffsetidx});
              
   data.push({key:"gmtoffset",
              value: gmtoffset});
   
   sendData(url,data); 


}//show the wifi settings data
function showWiFiSettings() {
    showView("WiFiSettings");
    getWiFiSettings();
    getSSIDList();
}

var wifi_scan_results = null;
var wifi_clean_ssid_list = null;

function clearWiFiSettings(){
    var ssid ="";
    var pass = "";
    console.log("Clear WiFi Settings");
    var request = "setWiFiSettings?ssid=" + ssid + "&pass=" + pass;
    sendRequest(request, openNotification);
}

//get and set wifi settings
function setWiFiSettings() {
    var ssid = document.getElementById("ssid").value;
    var pass = document.getElementById("pass").value;
    console.log("ssid: " + ssid + ", pass: " + pass);
    var request = "setWiFiSettings?ssid=" + ssid + "&pass=" + pass;
    sendRequest(request, openNotification);
}
function getWiFiSettings() {
    openNotification("Getting data...", 0);
    sendRequest("getWiFiSettings", getWiFiSettingsHandler);
}
function getWiFiSettingsHandler(data) {
    try{
        obj = JSON.parse(data);
        if(obj.SSID != ""){
        document.getElementById("currentSSID").innerHTML = "SSID: " + obj.SSID +"<br> Channel: "+obj.CHANNEL+"<br>RSSI: "+obj.RSSI+"dBm";
        }else{
            document.getElementById("currentSSID").innerHTML = "No network configured";
        }
    } catch {
        //No valid JSON received!
        document.getElementById("currentSSID").innerHTML = "SSID: Unknown<br> Channel: Unknown <br>RSSI: Unknown";
    }
    
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

//get a list of available SSIDs
function getSSIDList() {
    openNotification("Getting network names...", 0);
    sendRequest("getSSIDList", getSSIDListHandler);
}
function getSSIDListHandler(data) {
    openNotification("Done");
    setTimeout(closeNotification, 1000);
    if (data == null)
        return;
    try{
    wifi_scan_results = JSON.parse(data);
    /* We cleanup the list and remove double entrys here */
    wifi_clean_ssid_list=[];
    for(var x=0;x<wifi_scan_results.Networks.length;x++){
     wifi_clean_ssid_list.push( wifi_scan_results.Networks[x].SSID );  
    }
    wifi_clean_ssid_list = wifi_clean_ssid_list.filter(onlyUnique);
    
    
    var list = document.getElementById("ssid");
    list.innerHTML = "";
    if (wifi_scan_results.ScanCount == 0) {
        list.innerHTML = "<option value='0'>-</option>";
        return;
    }
    for (var i = 0; i < wifi_clean_ssid_list.length; i++) {
        list.innerHTML += "<option value='" + wifi_clean_ssid_list[i] + "'>" + wifi_clean_ssid_list[i] + "</option>";
    }
    } catch {
         
        var list = document.getElementById("ssid");
        list.innerHTML = "";
    }
    
    
    
}

