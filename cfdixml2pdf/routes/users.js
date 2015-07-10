var express = require('express');
var router = express.Router();

/* GET users listing. 
router.get('/', function (req, res) {
    res.send('respond with a resource');
});
*/

router.get('/api/post', function (req, res) {
    res.render('index', { title: 'Express' });
});

router.post('/api/post', function (req, res) {
    //if (done == true) {
       // var xml = fs.readFileSync(__dirname + '/uploads/' + req.files.userPhoto.name, "utf8");
        //var doc = new DOMParser().parseFromString(xml, 'text/xml');
        //var a = doc.getElementsByTagName("cfdi:Comprobante")[0].firstChild.attributes[1].value;
        
        
        //res.write('<html><head><style type="text/css">body{margin:0; padding:0} #c{ position: absolute; width: 100%; height: 100%; overflow: hidden}</style></head><body><canvas id="c" width="600" height="600" style="border:1px solid black;"></canvas></body>\n');
        //res.write('<script type="text/javascript" src="../fabric.all.min.js"></script>');
        //res.write('<script type="text/javascript" src="../f.js"></script>\n');
         res.render('index', { title: 'Express' });
    //}
  
});


module.exports  = router;