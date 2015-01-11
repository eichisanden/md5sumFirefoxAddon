var data = require("sdk/self").data;
var cm = require("sdk/context-menu");

var contentScriptString = 'self.on("click", function (node, data) {' +
'    var xhr;' +
'    xhr = new XMLHttpRequest();' +
'    xhr.open("GET", node.getAttribute("href"), true);' +
'    xhr.responseType = "arraybuffer";' +
'    xhr.onload = function() {' +
'      var b, binaryData, bytes, result, _i, _len;' +
'      bytes = new Uint8Array(this.response);' +
'      binaryData = "";' +
'      for (_i = 0, _len = bytes.length; _i < _len; _i++) {' +
'        b = bytes[_i];' +
'        binaryData += String.fromCharCode(b);' +
'      }' +
'      result = MD5_hexhash(binaryData);' +
'      return alert(result);' +
'    };' +
'    return xhr.send();' +
'});';

cm.Item({
  label: "MD5SUM",
  context: cm.SelectorContext("a"),
  contentScriptFile: [data.url("md5.js")],
  contentScript: contentScriptString
});

