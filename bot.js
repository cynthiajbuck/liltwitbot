//console.log("I'm alive!")
var canIstats =[];
var Twit = require("twit")

var T = new Twit({
	consumer_key : 'argdcUyDGbLGHv7GGSp6g4TiG',
	consumer_secret: 'QjE79mkpdAVaKjXryQsLY8jubTnCbu1aftGnGMlladBPMUcOdG',
	access_token:'895793216389251076-7RnT2PnA9VON6d26Xotq81LF6oy63x1',
	access_token_secret:'qAOLhRj27povXtVSVJwVY9S2slfRmgEo1eRdMhe8o1Euv',
})
//console.log(T)
/*T.get('search/tweets', { q: '"can i"', count: 100 }, function(err, data, response) {
  for(var i = 0; i < data.statuses.length; i++){
  	if(data.statuses[i].text.substring(0,5) == "can i"){
  		canIstats.push(data.statuses[i].text)
  	}
  }
  console.log(canIstats)
})*/

//var command = {
//	command:[],commander:"",id:"", counter:0
//}

T.post('statuses/update', { status: "I have boon deployed!"}, function(err, data, response) {
	console.log(data)
})

var que = []
var terms = [" when you hear "]
var actions = [" reply with "]
var stream = T.stream('statuses/filter', { track: '@liltwitbot' })
 
stream.on('tweet', function (tweet) {
	tweet.text = tweet.text.toLowerCase()
	command = new Object();
	command.command=tweet.text.split('"')
	command.commander = "@" + tweet.user.screen_name
	command.id=tweet.id
	command.command[0] = command.command[0].substring(11)
	command.command.pop(command.command.length-1)
	command.counter=0
	que.push(command)
	console.log("I got a tweet");
	console.log(tweet)
	console.log(que)
})

setInterval(function(){
	if(que.length >= 3){
		if(terms.indexOf(que[0].command[0]) == -1 || actions.indexOf(que[0].command[2]) == -1){
			console.log("noooooo!")
			que.shift();
		}
		else{
			console.log("okay")
			switch (terms.indexOf(que[0].command[0])){
				case 0:
					q="'"+que[0].command[1]+"'";
					T.get('search/tweets', { q: '"'+q+'"'+' -@ -filter:retweets', count: 10 },function(err, data, response) {
  						console.log(data)
  						console.log("--------------------------------------------------------------------------------------------------------------------------------------")
  						
  							switch (actions.indexOf(que[0].command[2])){
								case 0:
									T.post('statuses/update', { status: "@"+ data.statuses[0].user.screen_name + " " + que[0].command[3], in_reply_to_status_id: data.statuses[0].id_str}, function(err, data, response) {
  										console.log(data)
  										que[0].counter++
  										if(que[0].counter > 10){
  											que.shift();
  										}
  										else{
  											move = que[0]
  											que.shift()
  											que.push(move)
  										}
									})
								break;
							}
					})
					console.log("case 0 in terms")
				break;
			}
			console.log("*************************************************************************")
		console.log(que)
		}
	}
},60000)

