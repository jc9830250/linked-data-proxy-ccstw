app.get("/favicon.ico", function (_req, _res) {
    fs.readFile("./favicon.ico", function (err, data) {
        _res.setHeader('content-type', 'image/x-icon');
        _res.send(data);
    });
});//linked-data-proxy-lib js

app.get("/client/js/linked-data-proxy-lib.js", function (_req, _res) {
    fs.readFile("./client_js/linked-data-proxy-lib.js", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
});//linked-data-proxy-lib js

app.get("/client/css/style.css", function (_req, _res) {
    fs.readFile("./client_css/style.css", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});// css

app.get("/client/css/tooltipster.bundle.min.css", function (_req, _res) {
    fs.readFile("./client_css/tooltipster.bundle.min.css", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});//tooltip css

app.get("/client/css/tooltipster-sideTip-noir.min.css", function (_req, _res) {
    fs.readFile("./client_css/tooltipster-sideTip-noir.min.css", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});// tooltip theme css

app.get("/client/js/ga_inject_lib.js", function (_req, _res) {
    fs.readFile("./client_js/ga_inject_lib.js", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});//GA js

app.get("/client/css/exp-linked-data-proxy-2017.dlll.nccu.edu.tw.css", function (_req, _res) {
    fs.readFile("./client_css/exp-linked-data-proxy-2017.dlll.nccu.edu.tw.css", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});//GA script css

app.get("/client/js/exp-linked-data-proxy-2017.dlll.nccu.edu.tw.js", function (_req, _res) {
    fs.readFile("./client_js/exp-linked-data-proxy-2017.dlll.nccu.edu.tw.js", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});//GA script js

app.get("/client/js/jquery.js", function (_req, _res) {
    fs.readFile("./client_js/jquery.js", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
});// jquery

app.get("/client/js/rangy-core.js", function (_req, _res) {
    fs.readFile("./client_js/rangy-core.js", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
});//rangy js

app.get("/client/js/utils.js", function (_req, _res) {
    fs.readFile("./client_js/utils.js", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
});//util js

app.get("/client/js/tooltipster.bundle.min.js", function (_req, _res) {
    fs.readFile("./client_js/tooltipster.bundle.min.js", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
});//tooltip js

app.get("/client/js/loading.gif", function (_req, _res) {
    fs.readFile("./client_js/loading.gif", function (err, data) {
        _res.setHeader('content-type', 'image/gif');
        _res.send(data);
    });
});

app.get("/client/js/loadingbar.gif", function (_req, _res) {
    fs.readFile("./client_js/loadingbar.gif", function (err, data) {
        _res.setHeader('content-type', 'image/gif');
        _res.send(data);
    });
});

app.get("/client/js/list.jpg", function (_req, _res) {
    fs.readFile("./client_js/list.jpg", function (err, data) {
        _res.setHeader('content-type', 'image/gif');
        _res.send(data);
    });
});
app.get("/client/js/pos-annotation-lib.js", function (_req, _res) {
    fs.readFile("./client_js/pos-annotation-lib.js", function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
}); //pos-annotation-lib.js

app.get("/client/js/rangy-classapplier.js", function (_req, _res) {
    fs.readFile("./client_js/rangy/rangy-classapplier.js", function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
}); //rangy-classapplier.js

app.get("/client/js/rangy-highlighter.js", function (_req, _res) {
    fs.readFile("./client_js/rangy/rangy-highlighter.js", function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
}); //rangy-highlighter.js

app.get("/client/js/rangy-serializer.js", function (_req, _res) {
    fs.readFile("./client_js/rangy/rangy-serializer.js", function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
}); //rangy-highlighter.js
app.get("/client/css/markus.css", function (_req, _res) {
    fs.readFile("./client_css/markus-css/markus.css", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});// css

app.get("/client/css/bootstrap.min.css", function (_req, _res) {
    fs.readFile("./client_css/markus-css/bootstrap.min.css", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});// css
app.get("/client/css/offcanvas.css", function (_req, _res) {
    fs.readFile("./client_css/markus-css/offcanvas.css", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});// css

app.get("/client/css/semantic.min.css", function (_req, _res) {
    fs.readFile("./client_js/semantic-ui/semantic.min.css", 'utf8', function (err, data) {
        _res.setHeader('content-type', 'text/css');
        _res.send(data);
    });
});// css

app.get("/client/js/semantic.min.js", function (_req, _res) {
    fs.readFile("./client_js/semantic-ui/semantic.min.js", function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
}); //semantic.min.js

app.get("/client/js/js-cookie.js", function (_req, _res) {
    fs.readFile("./client_js/js-cookie.js", function (err, data) {
        _res.setHeader('content-type', 'text/javascript');
        _res.send(data);
    });
}); //js-cookie.js.min.js