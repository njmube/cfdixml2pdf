var express = require('express');
var path = require('path');
var xpath = require('xpath');
var DOMParser = require('xmldom').DOMParser;
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var done = false;
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/*Configure the multer.*/

function nocache(req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}

app.use(multer({
    dest: './uploads/',
    
    rename: function (fieldname, filename) {
        return filename + Date.now();
    },
    
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        done = true;
    }
}));




//app.use('/api/post', users);
app.use('/', routes);

app.post('/api/post', nocache, function (req, res) {
    if (done == true) {
        var xml = fs.readFileSync(__dirname + '/uploads/' + req.files.userPhoto.name, "utf8");
        var doc = new DOMParser().parseFromString(xml, 'text/xml');
        var a = doc.getElementsByTagName("cfdi:Comprobante")[0].firstChild.attributes[1].value;
        
        res.render('index', { title: 'Express' });
        //res.write('<html><head><style type="text/css">body{margin:0; padding:0} #c{ position: absolute; width: 100%; height: 100%; overflow: hidden}</style></head><body><canvas id="c" width="600" height="600" style="border:1px solid black;"></canvas></body>\n');
        //res.write('<script type="text/javascript" src="fabric.all.min.js"></script>');
        //res.write('<script type="text/javascript" src="f.js"></script>\n');
        //res.end("end");
    }
  
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;