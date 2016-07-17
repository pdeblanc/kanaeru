function to_prefix_tree(rules) {
  var tree = {};
  for (var i = 0; i < rules.length; i++) {
    var key = rules[i][0];
    var value = rules[i][1];
    var node = tree;
    for (var j = 0; j < key.length; j++) {
      var c = key[j];
      if (!(c in node)) {
        node[c] = {};
      }
      node = node[c];
    }
    node[true] = value;
  }
  return tree;
}

var rules = [["a", "あ"], ["i", "い"], ["ra", "ら"], ["ri", "り"], ["chi", "ち"], ["te", "て"]];
var prefix_tree = to_prefix_tree(rules);

function deromanize(string) {
  var tokens = [];
  var start = 0;
  while (start < string.length) {
    var node = prefix_tree;
    var key_length = 0;
    var value = undefined;
    for (var i = start; i < string.length && string[i] in node; i++) {
      node = node[string[i]];
      if (true in node) {
        key_length = i + 1 - start;
        value = node[true];
      }
    }
    if (value) {
      tokens.push(value);
      start += key_length;
    }
    else {
      tokens.push(string[start]);
      start++;
    }
  }
  return tokens.join("");
}

function replace_text(node) {
  if (node.nodeType == Node.TEXT_NODE) {
    node.nodeValue = deromanize(node.nodeValue);
  }
  else {
    for (var child = node.firstChild; child; child = child.nextSibling) {
      replace_text(child);
    }
  }
}

replace_text(document.body);
