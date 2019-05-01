//require modules
var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    moment     = require("moment"),
    express    = require("express"),
    app        = express();
    
mongoose.connect('mongodb://webserver:watering123@ds253783.mlab.com:53783/dev_project', { useNewUrlParser: true }); 


var readingSchema = new mongoose.Schema({
    time: String,
    reading: Number,
    status: String,
    waterRequest: String
});

var Reading = mongoose.model("Reading", readingSchema);

//config bodyparser, share public directory across app, set view engine    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//Routes    
app.get("/", function(req, res){
    res.render("landing");
});

app.get("/index", function(req, res){
    Reading.find({}, function(err, allReadings){
        if(err){
            console.log(err);
        } else {
        res.render("dashboard", {readings: allReadings}); 
        }
    }).sort({_id: -1}).limit(1);
});

//RECEIVE DATA IN GET REQUEST, SAVE TO DATABASE.
app.get("/telemetry/:reading", function(req, res){
    var reading = req.params.reading;
    var d = new Date;
    var n = moment(d.getTime()).format("DD/MM/YY hh:mm:ss");
    var status;
    
    if(reading < 1){
        status = 'wet';
    } else {
        status = 'dry';
    }
    
    console.log("reading from pi is " + status);
    
    Reading.create({
        time: n,
        reading: reading,
        status: status,
        waterRequest: 'false'
    });
});

app.get("/water", function(req, res){
    var d = new Date;
    var n = moment(d.getTime()).format("DD/MM/YY hh:mm:ss");
    
    Reading.create({
        time: n,
        reading: 1,
        status: 'dry',
        waterRequest: 'true'
    });
    
    console.log("Watering plant!");
    res.redirect("/index");
});

//tell express to listen for requests
app.listen(process.env.PORT || 3000, function(){
    console.log("rain server has started");
});