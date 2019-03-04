//require modules
var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    request     =require("request"),
    app        = express();
    
//config bodyparser, share public directory across app, set view engine    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//Connect to DB
//mongoose.connect('mongodb://localhost:27017/dev-project', { useNewUrlParser: true }); 

//Schema Setup
var telemetrySchema = new mongoose.Schema({
    moisture: Number,
    time: Date
});

var Telemetry = mongoose.model("Telemetry", telemetrySchema);

Telemetry.create({
         
 });

//Routes    
app.get("/", function(req, res){
    res.render("landing");
});

//app.get("/index", function(req, res){
//    res.render("dashboard");
//});

app.get("/index", function(req, res){
    //get all campgrounds from db
    //Telemetry.find({}, function(err, allReadings){
       // if(err){
       //     console.log(err);
       // } else {
            res.render("dashboard");
        //}
    //});
});

app.get("/telemetry/:reading", function(req, res){
    var reading = req.params;
    console.log(reading);
    var d = new Date;
    var n = d.getTime();
    
    console.log(n);
});

//tell express to listen for requests
app.listen(process.env.PORT || 3000, function(){
    console.log("rain server has started");
});
    