function replace_text(node) {
  if (node.nodeType == Node.TEXT_NODE) {
    node.nodeValue = node.nodeValue.replace("a", "あ");
  }
  else {
    for (var child = node.firstChild; child; child = child.nextSibling) {
      replace_text(child);
    }
  }
}

replace_text(document.body);
