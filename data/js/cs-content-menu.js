self.on("click", function (node, data) {
    var xhr, xhr2, url;
    url = node.getAttribute("href");
    console.log(node);
    console.log(url);
    xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        var b, binaryData, bytes, result, _i, _len;
        bytes = new Uint8Array(this.response);
        binaryData = "";
        for (_i = 0, _len = bytes.length; _i < _len; _i++) {
            b = bytes[_i];
            binaryData += String.fromCharCode(b);
        }
        result = MD5_hexhash(binaryData);

        xhr2 = new XMLHttpRequest();
        xhr2.open('GET', url, true);
        xhr2.responseType = "text";
        xhr2.onload = function() {
            self.postMessage({url: url, md5sum: result, content: escapeHTML(this.response)});
        };
        xhr2.send();
    };
    xhr.send();


});

escapeHTML = function(html) {
  return $('<div>').text(html).html();
};

//self.port.on("show", function() {
//     console.log("cs show")
//     document.getElementById("md5sum").innerHTML = "aaaaaa";
// });
