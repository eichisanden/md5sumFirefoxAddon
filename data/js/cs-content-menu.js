self.on("click", function (node, data) {
    var xhr = new XMLHttpRequest(),
        url = node.getAttribute("href"),
        encoding,
        bytes,
        codeString,
        newline,
        md5sum,
        content;

    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        bytes = new Uint8Array(this.response);
        encoding = Encoding.detect(bytes);
        codeString = Encoding.codeToString(bytes);
        md5sum = MD5_hexhash(codeString);
        md5sumLf = MD5_hexhash(codeString.replace(/\r\n?/g, "\n"));
        if (codeString.indexOf("\r\n", 0) > 0) {
          newline = "CRLF";
        } else if (codeString.indexOf("\n", 0) > 0) {
          newline = "LF";
        } else {
          newline = "CR";
        }
        content = Encoding.codeToString(Encoding.convert(bytes, "UNICODE", encoding));
        self.postMessage({url: url, encoding: encoding, md5sum: md5sum, md5sumLf: md5sumLf, newline: newline, content: escapeHTML(content)});
    };
    xhr.send();
});

escapeHTML = function(html) {
  return $('<div>').text(html).html();
};
