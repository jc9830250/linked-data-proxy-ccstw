
app.get("/directory_ming", function (_req, _res) {
    var _link = 'http://linkdata.ccstw.nccu.edu.tw:3255/directory_ming';
    _res.setHeader('content-type', 'text/html');
    _res.send('<html><script type="text/javascript"> location.href="' + _link + '"; </script></html>');
});

app.get("/phppgadmin", function (_req, _res) {
    var _link = "http://linkdata.ccstw.nccu.edu.tw:3254/phppgadmin";
    _res.setHeader('content-type', 'text/html');
    _res.send('<html><script type="text/javascript"> location.href="' + _link + '"; </script></html>');
});

//app.get('/directory_ming', function (_req, _res) {
//    _res.redirect('http://exp-linked-data-proxy-2017.dlll.nccu.edu.tw:3253/directory_ming');
//});

