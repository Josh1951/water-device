//require modules
var bodyParser = require("body-parser"),
    express    = require("express"),
    app        = express();
    
//config bodyparser, share public directory across app, set view engine    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


//Routes    
app.get("/", function(req, res){
    res.render("landing");
});


//tell express to listen for requests
app.listen(process.env.PORT || 3000, function(){
    console.log("rain server has started");
});
    