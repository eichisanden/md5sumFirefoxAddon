self.on("click", function (node, data) {
    var xhr = new XMLHttpRequest(),
        url = node.getAttribute("href"),
        encoding,
        bytes,
        md5sum,
        content;

    xhr.open("GET", url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        bytes = new Uint8Array(this.response);
        encoding = Encoding.detect(bytes);
        md5sum = MD5_hexhash(Encoding.codeToString(bytes));
        content = Encoding.codeToString(Encoding.convert(bytes, "UNICODE", encoding));
        self.postMessage({url: url, encoding: encoding, md5sum: md5sum, content: escapeHTML(content)});
    };
    xhr.send();
});

escapeHTML = function(html) {
  return $('<div>').text(html).html();
};
