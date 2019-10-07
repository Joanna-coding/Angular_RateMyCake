var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Create an Express App
var app = express();
const port = 8800;

//app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/public/dist/public' ));

// =========== LISTEN PORT ===========
app.listen(port, function () {
    console.log("You are listening on port 8800")
})

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cakeDB');

var RatingSchema = new mongoose.Schema({
    rate: Number,
    comment: { type: String, default: '' },
    cakeId: String
    
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

var CakeSchema = new mongoose.Schema({
    name: String,
    imgUrl: { type: String, default: '' },
    Ratings:[RatingSchema],
    
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

var Cake = mongoose.model('Cake', CakeSchema );
var Rate = mongoose.model('Rate', RatingSchema  )


mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/public/dist/public' ));


// this is for post cake
app.get('/getAllCakes', function(req, res){
    Cake.find({}, function(err, cakes){
        
        res.json({message:"retrieve all data", usersInterface: cakes})
        
    })
})

app.post('/cakePost', function(req, res){
    console.log("in server.js", req.body);
    const cake = new Cake({name:req.body.name, imgUrl: req.body.imgUrl})
    cake.save((err, data) => {
        if(err){
            console.log(err);
        }
        res.json({message:"retrieve all data", users: data})
    })
})

// this is for post rate
app.post('/ratePost/:id', function(req, res){
    // console.log("in server.js");
    // console.log(req.body);
    // cake { rate: 3 comment: a;skjdfal;dksfj}
    // console.log(req.params.id);
    const rate = new Rate({rate:req.body.rate, comment: req.body.comment, cakeId: req.body._id})
    rate.save((err, data) => {
        if(err){
            console.log(err);
        }else{
            // console.log(rate)
            console.log(data)
            req.body.Ratings.push(data)
           //req.body.Ratings.push(rate) note: req.body = datas
            // {{$push: Ratings: }}
            
            Cake.findOneAndUpdate({_id:req.params.id}, {Ratings:req.body.Ratings}, function(err, datas){
                //{{_id:req.body._id}}
                if(err){
                    console.log(err);
                }else{
                    //datas.Ratings.push(rate)
                    //req.body.Ratings.push(rate) note: req.body = datas

                    res.json({message: "datas running", datas:datas})
                }
            })
        }
    })
})

app.get('/getAllRates/:id', function(req, res){
    console.log("get all rate id:")
    console.log(req.params.id)
    Cake.findById({_id:req.params.id}, function(err, cake){
        
        //res.json({message:"retrieve all data", usersInterface: cake.Ratings})
        res.json({message:"retrieve all data", users: cake})
        
    })
})

app.delete('/deleteOneCake/:id', function(req, res){
    Cake.findOneAndRemove(req.params.id, function(err, data){
        res.json({data})
    })
})

app.get('/oneCake/:id', function(req, res){
    Cake.findById(req.params.id, function(err, datas){
        res.json({message:"retrieve all data", getCake: datas})
    })
})



app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
})
