//https://developer.chrome.com/extensions/samples
var data = require("sdk/self").data;

/*
  Context Menu
*/
var cm = require("sdk/context-menu");
cm.Item({
  label: "MD5SUM",
  context: cm.SelectorContext("a"),
  contentScriptFile: [data.url("js/lib/jquery-2.1.3.js"), data.url("js/lib/md5.js"), data.url("js/cs-content-menu.js")],
  onMessage: function (md5) {
    panel.show();
    panel.port.emit("show", md5);
  }
});


/*
  Panel
*/
var panel = require("sdk/panel").Panel({
    width: 1200,
    height: 850,
    contentURL: data.url("html/src.html"),
    contentScriptFile: [data.url("js/lib/jquery-2.1.3.js"), data.url("js/lib/highlight.pack.js"), data.url("js/cs-panel.js")]
});


/*
  Toolbar button
*/
var button = require('sdk/ui/button/action').ActionButton({
    id: "md5sum-button",
    label: "Open Md5sum window",
    icon: {
        "16": data.url("images/icon_016.png"),
        "32": data.url("images/icon_032.png"),
        "64": data.url("images/icon-064.png")
    },
    onClick: function() {
        require('sdk/tabs').open(data.url("html/popup.html"));
    }
});
