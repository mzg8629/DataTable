var ReactDOM = require('react-dom');
var Roller=require("../block/roller/roller.js");

var rollerItem=[
    {
        imgUrl:"http://cdn.yingu.com/upload/image/20160928/2b94e8d8f4d702d5331fccbd387169dc.jpg"
        ,width:600
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161125/2548b11109bbe48a442c3b8a0f023bc.jpg"
        ,width:600
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20161029/ed9cd9aa1a6895560932461d8de834fa.jpg"
        ,width:600
        ,href:"http://www.baidu.com"
    }
    , {
        imgUrl:"http://cdn.yingu.com/upload/image/20160928/2b94e8d8f4d702d5331fccbd387169dc.jpg"
        ,width:600
        ,href:"http://www.baidu.com"
    }
]


ReactDOM.render(<Roller items={rollerItem} rollerType={1} currentIndex={0} borderWidth={4}></Roller>, document.getElementById('rollerCon'));







