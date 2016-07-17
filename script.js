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

var vowels = [["a", "あ"], ["i", "い"], ["u", "う"], ["e", "え"], ["o", "お"]];
var cons_k = [["ka", "か"], ["ki", "き"], ["ku", "く"], ["ke", "け"], ["ko", "こ"]];
var cons_g = [["ga", "が"], ["gi", "ぎ"], ["gu", "ぐ"], ["ge", "げ"], ["go", "ご"]];
var cons_s = [["sa", "さ"], ["si", "し"], ["su", "す"], ["se", "せ"], ["so", "そ"]];
var cons_z = [["za", "ざ"], ["zi", "じ"], ["zu", "ず"], ["ze", "ぜ"], ["zo", "ぞ"]];
var cons_t = [["ta", "た"], ["ti", "ち"], ["tu", "つ"], ["te", "て"], ["to", "と"]];
var cons_d = [["da", "だ"], ["di", "ぢ"], ["du", "づ"], ["de", "で"], ["do", "ど"]];
var cons_n = [["na", "な"], ["ni", "に"], ["nu", "ぬ"], ["ne", "ね"], ["no", "の"]];
var cons_h = [["ha", "は"], ["hi", "ひ"], ["hu", "ふ"], ["he", "へ"], ["ho", "ほ"]];
var cons_b = [["ba", "ば"], ["bi", "び"], ["bu", "ぶ"], ["be", "べ"], ["bo", "ぼ"]];
var cons_p = [["pa", "ぱ"], ["pi", "ぴ"], ["pu", "ぷ"], ["pe", "ぺ"], ["po", "ぽ"]];
var cons_m = [["ma", "ま"], ["mi", "み"], ["mu", "む"], ["me", "め"], ["mo", "も"]];
var cons_y = [["ya", "や"], ["yu", "ゆ"], ["yo", "よ"]];
var cons_r = [["ra", "ら"], ["ri", "り"], ["ru", "る"], ["re", "れ"], ["ro", "ろ"]];
var cons_w = [["wa", "わ"], ["wi", "ゐ"], ["we", "ゑ"], ["wo", "を"]];
var cons_v = [["vu", "ゔ"]];
var semivowel_n = [["n", "ん"]];

var rules = [].concat(
  vowels,
  cons_k,
  cons_g,
  cons_s,
  cons_z,
  cons_t,
  cons_d,
  cons_n,
  cons_h,
  cons_b,
  cons_p,
  cons_m,
  cons_y,
  cons_r,
  cons_w,
  cons_v,
  semivowel_n
);
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
