var express = require('express')
    , engine = require('ejs-locals')
    , app = express()
    ,router = express.Router();
var path = require('path');
app.express=express;
app.path=path;
app.route=router;
// 设置引擎
app.engine('ejs', engine);
app.set('views',__dirname + '\\views\\ejs');
app.set('view engine', 'ejs'); // so you can render('index')

//添加中间件
require('./assist/initmiddleware')(app);
//初始化页面
require('./assist/initroutes')(app);
app.listen(3000);

//启动多核cpu
//错误处理
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});