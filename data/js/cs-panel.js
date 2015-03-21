self.port.on("show", function(param) {
  console.log("src-content.show");
  $("#md5sum").html(param.md5sum);
  $("#content").html(param.content);
  $('pre code').each(function(i, block) {
    return hljs.highlightBlock(block);
  });
});
