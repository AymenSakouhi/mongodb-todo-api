const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = "123abc!";

/*bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password,salt, (err, hash) => {
        console.log(hash);
    });
});*/

let hashedPassword = "$2a$10$M4O5WsQtvQFfa2q6FLXSluhHhqfZlBgqiVASZWC7jm1b69OP0/S8e";
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});



/*let data = {
    id: 10
};


let token = jwt.sign(data,'123abc');
console.log(token);
let decoded = jwt.verify(token, '123abc');
console.log(decoded);*/
/*
let message = "Aymen";
let hash = SHA256(message).toString();

console.log(`Message : ${message}`);
console.log(`Hash: ${hash}`);

let data = {
    id: 4
};

let token = {
    data,
    hash: SHA256(JSON.stringify(data)+"some secret value").toString()
};

/!*token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();*!/

let resultHash = SHA256(JSON.stringify(token.data)+"some secret value").toString();
if(resultHash===token.hash){
    console.log("data was not changed");
}else {
    console.log("Data changed, do not trust");
}*/
