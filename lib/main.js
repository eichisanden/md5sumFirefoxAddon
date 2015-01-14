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

var buttons = require('sdk/ui/button/action');
var tabs = require('sdk/tabs');

var button = buttons.ActionButton({
	id: "mozilla-link",
	label: "Open Md5sum window",
	icon: {
		"16": "./icon_016.png",
		"32": "./icon_032.png",
		"64": "./icon-064.png"
	},
	onClick: handleClick
});

function handleClick(state) {
	tabs.open("./popup.html");
}
