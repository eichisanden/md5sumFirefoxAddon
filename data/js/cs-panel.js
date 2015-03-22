self.port.on("show", function(param) {
  $("#md5sum").html(param.md5sum);
  $("#encoding").html(param.encoding);
  $("#content").html(param.content);
  $('pre code').each(function(i, block) {
    return hljs.highlightBlock(block);
  });
});
