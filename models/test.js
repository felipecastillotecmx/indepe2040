let env = require("dotenv").config()
let Test = function(test) {
    this.test = test;
}

Test.prototype.toString = function() {
    return 'test:' + this.test;
}

Test.get = function (req) {
    return req
}

module.exports = Test;
