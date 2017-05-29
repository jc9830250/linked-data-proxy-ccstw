
// https://sequelize.readthedocs.io/en/v3/docs/models-usage/

var DEBUG = {
    enable_cache: true
};

/*var _modules = ["wiki","moedict","cbdb","tgaz","pixabay"];*/
//var URL = "http://exp-linked-data-proxy-2017.dlll.nccu.edu.tw/check/wiki,moedict,cbdb,tgaz,cdict,pixabay/" ; 
//var URL = "http://pc.pulipuli.info:3000/check_post/wiki,moedict,cbdb,tgaz,cdict,pixabay/";
//var URL = "http://localhost:3000/check/wiki,moedict,cbdb,tgaz,cdict,pixabay/" ;
//var URL = "http://localhost:3000/check_post/wiki,moedict/" ;	// 給NodeJS本機端用
var URL = CONFIG.linked_data_proxy_check_url;	// 給NodeJS本機端用

// -----------------------

//var sub_array = [];     //for loop把temp_array裡的sub_array取出來依序丟到linked data proxy進行check
//var check_result_array = [];  //各個sub_array進行check後回傳的check_result_array
//var sub_result;         //各個check_result_array轉為string

var stopword = CONFIG.stopword;



// ------------------------
var _replace_br = false;

var GENERAL_DICT = require('../scripts/data/dictionary.js');

REQUEST_COUNT = 0;
REQUEST_COUNT_MAX = CONFIG.linked_data_proxy_request_max;
REQUEST_CACHE_ID = [];

// ------------------------

/**
 * @author moon
 * 接收來自client的資料
 */
app.post("/parse_article", function (req, res) {

    var article = req.body.article;
    
    
    var cookies = new Cookies(req, res);

    //console.log(article);
    //_write_log(article);

    tableArticleCache.findOrCreate({
        where: {
            article: article,
            processing: false
        }
    }).spread(function (articlecache, created) {

        // 2. 把暫存檔案的路徑放入COOKIE	
        var cache_id = articlecache.get('id');
        cookies.set("cache_id", cache_id);
        //console.log(created);
        //console.log(articlecache.get("result"));
        //console.log(articlecache.get({plain: true}));
        res.send("");
        if (created === true
                || articlecache.get("result") === null
                || articlecache.get("result") === "") {
            // 這裡...
            
            // 計算result是空值的數量
            _count_processing_null_result(function (_count) {
                console.log(["[" + cache_id + "] 正在查詢的數量: ", _count, CONFIG.linked_data_proxy_request_max]);
                if (_count < CONFIG.linked_data_proxy_request_max) {
                    
                    var _callback = function () {
                        _count_processing_null_result(function (_count) {
                            console.log(["[" + cache_id + "] 下一個 正在查詢的數量: ", _count, CONFIG.linked_data_proxy_request_max, '剩餘數量: ',REQUEST_CACHE_ID.length]);
                            if (_count < CONFIG.linked_data_proxy_request_max) {
                                _find_a_null_result_article(function (article, cache_id) {
                                    console.log(["[" + cache_id + "] 下一個", cache_id, '剩餘數量: ',REQUEST_CACHE_ID.length]);
                                    _article_cache_post_process(article, cache_id, _callback);
                                });
                            }
                        });  
                    };
                    
                    _article_cache_post_process(article, cache_id, _callback);
                }   // if (_count < CONFIG.linked_data_proxy_request_max) {
                else {
                    if (cache_id !== undefined && cache_id !== null) {
                        REQUEST_CACHE_ID.push(cache_id);
                        console.log(["[" + cache_id + "] 太多了，停止查詢", '剩餘數量: ',REQUEST_CACHE_ID.length]);
                    }
                }
            }); //_count_null_result(function (_count) {
        }
    });
    _article_cache_post_process(article);
});


// ----------------

var _article_cache_post_process = function (article, cache_id, _callback) {
    if (cache_id === undefined || cache_id === null) {
        return;
    } 
    
    REQUEST_COUNT++;
    var _a = article;
    if (_a.length > 100) {
        _a = _a.substr(0, 100) + "...";
    }
    console.log(["[" + cache_id + "] 現在進行:", _a]);
    // 先把它變成processing: true
    tableArticleCache.update(
            {processing: true},
            {where: {id: cache_id}}
    ).then(function () {
        // 3. 開始斷詞或其他的處理
        _process(article, cache_id, function (result) {
            // 4. 處理完之後放入暫存檔案 
            //console.log("4. 處理完之後放入暫存檔案 ");
            //console.log(result);
            REQUEST_COUNT--;
            tableArticleCache.update(
                    {
                        result: result,
                        processing: false
                    },
                    {where: {id: cache_id}}
            ).then(_callback);
        });
    });
};  // var _article_cache_post_process = function (article) {

/**
 * 計算沒查詢完的資料
 * @param {function} _callback
 */
var _count_processing_null_result = function (_callback) {
    _callback(REQUEST_COUNT);
    /*
    tableArticleCache.findAndCountAll({
        where: {
            result: null,
            processing: true
        }
    }).then(function (_count) {
        
        _callback(_count.count);
    });
    */
};

var _find_a_null_result_article = function (_callback) {
    var _cache_id = REQUEST_CACHE_ID.shift();
    tableArticleCache.findOne({
        where: {
            id: _cache_id,
            result: null,
            processing: false
        }
    }).then(function (_cache) {
        if (_cache !== null) {
            _callback(_cache.get("article"), _cache_id);
        }
    });
};

// ---------------------------------

/**
 * 處理斷詞
 * callback(result)
 */
var _process = function (article, cache_id, callback) {

    //callback("aaaaaaa12121212a" + article);
    //return;

    // ----------------------------------------

    

    // end of var _node_jieba_parsing_callback = function (_result) {
    // --------------------------


    //article = article.substr(0, 50);

    //article=article.replace(/\"/g, "");
    //article=article.replace(/(?:\\[rnt]|[\r\n\t]+)+/g, "");

    //console.log(article);
    //return;

    //console.log(_custom_dict);
    if (article.indexOf("<br>") > -1) {
        article = article.replace(/<br>/g, "\n");
        _replace_br = true;
    }

    node_jieba_parsing([GENERAL_DICT, _custom_dict], article, function (_result) {
        _node_jieba_parsing_callback(_result, cache_id, callback);
    });	// end of node_jieba_parsing([dict1, dict2], article, function (_result) {
}; // end of proces: var _process = function (article, callback) {

// --------------------------------------------

var _node_jieba_parsing_callback = function (_result, cache_id, callback) {
    //console.log(_result);
    //return;

    var temp_array = [];    //把斷完詞的array以每50個詞進行切分  切分為數個array ex:[[a,b,....],[c,d,....]]
    var joined_result = "";    //把每個sub_result結合起來 準備回傳給client

    //console.log(article);
    var BATCH_CHECK = CONFIG.batch_check;

    for (var t = 0, len = _result.length; t < len; t += BATCH_CHECK) {
        temp_array.push(_result.slice(t, t + BATCH_CHECK));
    }

    // array: temp_array
    // limit: temp_array.length
    // callback: callback(joined_result);
    
    var _loop = function (_i) {
        if (_i < temp_array.length) {
            _do_loop(_i);
        }
        else {
            // 結束了
            //console.log(joined_result);
            callback(joined_result);
        }
    };	// var _loop = function (_i) {

    var _send_array = [];
    var _do_loop = function (_i) {
        /*
        if (REQUEST_COUNT > REQUEST_COUNT_MAX) {
            setTimeout(function () {
                //console.log(["等待中...", _i, temp_array.length, temp_array[_i][0], REQUEST_COUNT]);
                _do_loop(_i);
            }, 1000 * getRandomArbitrary(1,10));
            return;
        }
        */
        //console.log(["執行...", _i, temp_array.length, temp_array[_i][0], REQUEST_COUNT]);
        
        //console.log("送出第" + _i + "次");
        // 執行迴圈
        var sub_array = [];
        _send_array = [];
        for (var _t = 0; _t < temp_array[_i].length; _t++) {
            //var _term = temp_array[_i][_t].replace(/(?:\\[rnt]|[\r\n\t]+)+/g, "").trim();
            var _term = temp_array[_i][_t];
            //if (_term !== " " 
            //&& _term !== "" 
            //&& _term !== "　"
            //&& _term !== "\t"
            //&& _term !== "\r"
            //&& _term !== "\r\n"
            //&& _term !== "\n") {
            if (_term !== "") {
                sub_array.push(_term);
                if (_match_stopword(_term) === false) {
                    _send_array.push(_term);
                }
            }

        }

        
        var sub_result = _send_array.join(" ").trim();
        _write_log([cache_id, "送出...", _i, temp_array.length, sub_result, REQUEST_COUNT]);

        if (sub_array.length === 0
                || sub_result === ""
                || sub_result === undefined) {
            joined_result = joined_result + _parse_check_result_array(sub_array);
            _i++;
            _loop(_i);
            return;
        }

        //console.log(sub_result);

        //REQUEST_COUNT++;
        //console.log(["check url", URL]);
        request({
            url: URL,
            method: 'POST',
            json: {query: sub_result}
        }, function (error, response, body) {
            _post_request_callback(error, response, body, _i, sub_array);
        });
        /*
         console.log(URL);
         _write_log(["before protocol", URL]);
         protocol_query({
         url: URL,
         method:'POST',
         post_query: {query:sub_result},
         formData: {query:sub_result},
         payload: false	//
         }, function (body) {
         console.log(["body", body, typeof(body)]);
         _write_log(["request", body, typeof(body)]);

         if (body === "nodata" || body === null) {
         body = [];
         }

         if (typeof(body) !== "undefined" ) {
         joined_result = joined_result + _parse_check_result_array(sub_array, body);
         _i++;
         _defalut_timeout=0;
         }
         else{
         _defalut_timeout=10000;
         _write_log(["request no data", body]);
         //console.log("[" + sub_result + "]");
         }

         setTimeout(function() {
         //console.log(_defalut_timeout);
         _loop(_i);
         }, _defalut_timeout);
         });
         */
    };  //var _do_loop = function (_i) {
    
    var _post_request_callback = function (error, response, body, _i, sub_array) {
        if (body !== undefined && body !== null) {
            _write_log([cache_id, "收到check的回覆: (" + _i + "/" + temp_array.length + ")", body]);
        }

        //if (body === "nodata" || body === null || body === undefined) {
        if (body !== undefined && body !== null) {
            if (body === "nodata" || (body.length === 1 && body[0] === "nodata")) {
                body = [];
            }
        }

        
        if (!error
                && response.statusCode === 200
                && typeof (body) !== "undefined"
                && body !== "undefined") {
            //console.log(body.join(","));
            if (typeof (body) === "undefined"
                    && typeof (response.body) !== "undefined") {
                body = response.body;
            }
            joined_result = joined_result + _parse_check_result_array(sub_array, body);
            _i++;
            _loop(_i);
            //REQUEST_COUNT--;
        }
        else {
            setTimeout(function () {
                //REQUEST_COUNT--;
                _do_loop(_i);
            }, _send_array.length * 100);
        }
    };  //var _post_request_callback = function (error, response, body, _i) {

    _loop(0);

};	//var _node_jieba_parsing_callback = function (_result) {



// ------------------------------

var _match_stopword = function (_query) {
    _query = _query.trim();
    var _count = _query.length;
    var _match_count = 0;
    
    for (var _i = 0; _i < _count; _i++) {
        var _char = _query.substr(_i, 1).trim();
        if (_char === "") {
            _match_count++;
        }
        else if (stopword.indexOf(_char) > -1) {
            _match_count++;
        }
    }
    
    return (_count === _match_count);
};

var _parse_check_result_array = function (sub_array, check_result_array) {
    var _result = [];
    //console.log(sub_array);
    if (check_result_array === undefined) {
        check_result_array = [];
    }
    //if (check_result_array !== undefined) {
        for (var i = 0; i < sub_array.length; i++) {
            if (sub_array[i] === "\n" && _replace_br === true) {
                _result.push('<br />');
                continue;
            }

            var found = false;
            var _word = sub_array[i].replace(/(?:\\[rnt]|[\r\n\t]+)+/g, "").trim();
            if (_word === ""
                    || _word === " "
                    || _word === "\n"
                    || _word === "\r"
                    || _word === "\t") {
                _result.push(sub_array[i]);
                continue;

            }


            for (var j = 0; j < check_result_array.length; j++) {
                if (sub_array[i] === check_result_array[j]) {
                    found = true;
                    break;
                }
            }


            if (found === true) {
                if (sub_array[i].length > 1) {
                    _result.push('<span class="autoanno_vocabulary autoanno_tooltip autoanno_highlight" data-tooltip-content="#autoanno_tooltip_content">'
                            + sub_array[i]
                            + '</span>');
                }
                else {
                    _result.push('<span class="autoanno_vocabulary autoanno_tooltip" data-tooltip-content="#autoanno_tooltip_content">'
                            + sub_array[i]
                            + '</span>');
                }
            }
            else {
                _result.push('<span class="autoanno_vocabulary">'
                        + sub_array[i]
                        + '</span>');
            }
        }
    //}

    //console.log(sub_result);
    var sub_result = _result.join("");
    //console.log(sub_result);
    return sub_result;

};  //end of var _parse_check_result_array = function (sub_array, check_result_array)

getRandomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
};


// -------------------------------------------

app.get("/parse_article", function (req, res) {

    // 1. 取得COOKIE
    var cache_id;
    if (typeof (req.query.cache_id) === "undefined") {
        var cookies = new Cookies(req, res);
        cache_id = cookies.get("cache_id");

    }
    else {
        cache_id = req.query.cache_id;
    }
    cache_id = parseInt(cache_id, 10);

    //console.log(cache_id);

    // 2. 取得暫存檔案
    tableArticleCache
            .findById(cache_id)
            .then(function (articlecache) {
                //console.log("ok");
                if (articlecache === null || articlecache.get("result") === null || articlecache.get("result") === "") {
                    // 3-1. IF 暫存檔案沒有資料: 回傳undefined
                    console.log(["client端請求， 沒資料 ID: ", cache_id]);
                    res.jsonp(cache_id);
                }
                else {
                    // 3-2. if 暫存檔案有資料
                    // 回傳資料
                    var _result = articlecache.get("result");
                    
                    var _r = _result;
                    if (_r.length > 100) {
                        _r = _r.substr(0, 100) + "...";
                    }
                    console.log(["完成" + _r]);

                    if (DEBUG.enable_cache === false) {
                        articlecache.destroy({force: true});
                    }

                    res.jsonp({
                        result: _result,
                        cache_id: cache_id
                    });
                }
            });
});