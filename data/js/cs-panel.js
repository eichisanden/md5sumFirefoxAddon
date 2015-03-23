self.port.on("show", function(param) {
  $("#md5sum").html(param.md5sum);
  $("#md5sumLf").html(param.md5sumLf);
  $("#encoding").html(param.encoding);
  $("#newline").html(param.newline);
  $("#content").html(param.content);
  $('pre code').each(function(i, block) {
    return hljs.highlightBlock(block);
  });
});
