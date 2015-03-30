var net = require('net');
var server = net.createServer();
var fs = require('fs');
var json = fs.readFileSync("./data.json", "utf8");
var bigArrayOfObjects = JSON.parse(json);

server.on('connection', function(client) { 
  console.log('client connected');
  client.setEncoding('utf8');

  client.on('data', function(stringFromClient) {
    var input = stringFromClient.trim();
    var splitInput = input.split(" ");
    console.log(splitInput);
    var command = splitInput[0];
    if(command === "write"){
        var nameFromInput = splitInput[1];
        var ageFromInput = splitInput[2];
        var newObject = {
            name: nameFromInput,
            age: ageFromInput,
        }
        bigArrayOfObjects.push(newObject);
        var backToJson = JSON.stringify(bigArrayOfObjects);
        fs.writeFileSync("./data.json", backToJson);
        client.write("file written! Thanks! \n");
    }else if(command ==="read"){
        bigArrayOfObjects.forEach(function(person){
            client.write(person.name +" is " + person.age + " years old" + "\n");
        })
    }

  });
});

server.listen(8124, function() { 
  console.log('connected');
});