proxy = function (_res, _query) {
    
var _options = {
    //url: "http://localhost/linked-data-proxy/proxy_module/zh.wikipedia.org/assert_true.html?q=" + _query,
    url: "http://localhost/linked-data-proxy/proxy_module/zh.wikipedia.org/assert_false.html?q=" + _query,
    // url: "https://zh.wikipedia.org/w/index.php?title=" + _query + "&oldformat=true&printable=yes",
    encoding: "utf8",
    /*
    process: function (_content) {
        _content = $(_content).find("#mw-content-text > p:first").html();
        return _content;
    }
    */
    select_html: "#mw-content-text > p:first",
    //select_text: "#mw-content-text > p:first",
};

web_crawler(_res, _options);

//_res.send(_query);
// ----------------------------------------    
    
};  // proxy = function (_res, _query) {