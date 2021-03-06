define("plan/plan_index", ["ui/tabs/tabs", "ui/validation/validation","ui/clock/clock", "ui/modal/modal", "ui/pager/pager", 'common/config'], function (require, exports, module) {

    //产品详情依赖的模块'
    var Pager = require('ui/pager/pager');
    require('ui/validation/validation');
    var Tabs = require("ui/tabs/tabs");
    var modal = require('ui/modal/modal');
    var config = require('common/config');
    var Clock= require('ui/clock/clock');
    require('ui/list/list');

    var btnValid = $("#btnBuy");

    var Index = {

        init: function () {
            this._addEventListener();
            this._initClock();
        },
        _initClock:function(){

            var ydl1=new Clock({
                width:150,
                height:34,
                timesize:16,
                tagsize:16,
                pretag:"剩余时间",
                bordercolor:"#0768ca",
                type:1,
                timecolor:"#0768ca",
                id:"ydl1"
            });
            var ydl3=new Clock({
                width:150,
                height:34,
                timesize:16,
                tagsize:16,
                pretag:"剩余时间",
                bordercolor:"#0768ca",
                type:1,
                timecolor:"#0768ca",
                id:"ydl3"
            });
            var ydl6=new Clock({
                width:150,
                height:34,
                timesize:16,
                tagsize:16,
                pretag:"剩余时间",
                bordercolor:"#0768ca",
                type:1,
                timecolor:"#0768ca",
                id:"ydl6"
            });
            var ydl12=new Clock({
                width:150,
                height:34,
                timesize:16,
                tagsize:16,
                pretag:"剩余时间",
                bordercolor:"#0768ca",
                type:1,
                timecolor:"#0768ca",
                id:"ydl12"
            });
            var ydl24=new Clock({
                width:150,
                height:34,
                timesize:16,
                tagsize:16,
                pretag:"剩余时间",
                bordercolor:"#0768ca",
                type:1,
                timecolor:"#0768ca",
                id:"ydl24"
            });

        },
        _addEventListener: function () {

            var that = this;

            this.productTabs = new Tabs({
                tabsContainerId: "product_tabs",
                tabClass: "product_tab",
                selectedClass: "hover",
                contentContainerId: "product_content_container",
                contentClass: "product_content",
                eventType: 'click',
                onChange : function(index){

                    if(index == 1){
                        that._initPager();
                    }
                    else if(index == 2){
                        that._initPager2();
                    }
                    else if(index == 3){
                        that._initPager3();
                    }
                    else if(index == 4){
                        that._initPager4();
                    }
                    else if(index == 5){
                        that._initPager5();
                    }
                }
            });

            //输入框非负数
            $("#money").on('keypress', function (evt) {
                var code = evt.which || evt.charCode || evt.keyCode;
                if (code == 8 || (code >= 48 && code <= 57)) {
                    return true;
                }
                return false;
            }).disablePaste();


            btnValid.on("click",function(){
                if(! $("#money").val()){
                    return
                }else{
                    $("#moneyForm").submit();

                }
            });

            $("#moneyForm").validate({

                submitHandler: function () {
                    that._calculate();
                    return false;
                },
                errorHandler: function (errs) {
                    btnValid["addClass"]("btn_disable");

                },
                passedHandler: function () {
                    btnValid["removeClass"]("btn_disable");
                },
                fields: {
                    money: {
                        required: true,
                        maxValue: 20000000,
                        //pattern: /^[1-9]\d*$/,
                        output: "#moneyTip",
                         validator : function(){
                             var text = this.val();
                             var maxRechargeAmount = 20000000;
                             var _money = parseInt(text) || 0;
                             if(_money > maxRechargeAmount){
                                 _money = maxRechargeAmount;
                                 //var _tempMoney=_money.toString();
                                // _money=_tempMoney.substr(0,_tempMoney.length-1);
                                 $(this).val(_money);
                                 return "<i class='icon_tips' ></i>请输入有效金额不能大于"+ $.numberFormat(20000000);

                             }
                             // debugger;
                             if(!/^\d+000$/.test(text) || !/^[1-9]\d*$/.test(text) || !text){
                                 return "<i class='icon_tips' ></i>投资金额为1000的整数倍且不能为空";
                             }


                         }
                    }

                },
                errorMessage: {
                    money: {
                        required: "<i class='icon_tips' ></i>投资金额为1000的整数倍且不能为空",
                        maxValue: "<i class='icon_tips' ></i>请输入有效金额不能大于"+  $.numberFormat(20000000)
                        //pattern: "<i class='icon_tips' ></i>请输入有效金额"
                    }
                }
            }, function (validator) {
                var isValid = validator.isValid;
            });

        },

        _getListItemTemp : function(data){
            var temp = "";
            var currentTabIndex = this.productTabs.getCurrentNum();
            var prefix = "";
            switch(currentTabIndex){
                case 1 :
                    prefix = "银多利Y-1期-";
                    break;
                case 2 :
                    prefix = "银多利Y-3期-";
                    break;
                case 3 :
                    prefix = "银多利Y-6期-";
                    break;
                case 4 :
                    prefix = "银多利Y-12期-";
                    break;
                case 5 :
                    prefix = "银多利Y-24期-";
                    break;
            }
            for (var i = 0; i < data.length; i++) {
                //tr
                var tr = "<tr>";
                if((i + 1) % 2 == 0){
                    tr = '<tr class="bg">';
                }
                temp += tr;
                //中间部分
                var mid =  '<td><a href="u-plan-detail?planId='+ data[i].planId +'">'+ prefix + data[i].planId +'</a></td>' +
                        '<td>'+ data[i].joinNum +'</td>' +
                        '<td>'+ $.numberFormat(data[i].amount / 100,2) +'</td>' +
                        '<td>'+ $.numberFormat(data[i].apr / 100,2) +'%</td>' +
                        '<td>'+ data[i].revenue +'</td>';
                temp += mid;
                //尾部
                var last = "";
                if(data[i].status == 1){
                    last = '<td><a href="u-plan-detail?planId='+ data[i].planId +'" class="bt_small_red ie-css3">立即加入</a></td>';
                }
                else{
                    switch(data[i].status){
                        case 2:
                            data[i].status = "募集结束";
                            break;
                        case 3:
                            data[i].status = "已满额";
                            break;
                        case 4:
                            data[i].status = "回款中";
                            break;
                        case 5:
                            data[i].status = "已结算";
                            break;
                    }

                    last = '<td>'+ data[i].status +'</td>'
                }
                temp += last+"</tr>";
            }

            return temp;

        },

        _reloadList : function(pageNum){

            var that = this;
            var currentTabIndex = this.productTabs.getCurrentNum();
            var period = 0;
            switch(currentTabIndex){
                case 1 :
                    period = 1;
                    break;
                case 2 :
                    period = 3;
                    break;
                case 3 :
                    period = 6;
                    break;
                case 4 :
                    period = 12;
                    break;
                case 5 :
                    period = 24;
                    break;
            }
            $.POST("/planList",{"term" : period , "currentPage" : pageNum},function(r){
                if(r.code == 0){
                   var temp = that._getListItemTemp(r.data);
                   $("#product_tabs-content-" + currentTabIndex).find("tbody").html(temp);
                }

            },"json");


        },

        _initPager : function(){
            var that = this;
            var pg = $("#pager");
            var cp = parseInt(pg.attr('current-page'));
            var p = new Pager({
                containerId : "pager",
                showPage : parseInt(pg.attr('show-page')) || 5,
                totalNum : parseInt(pg.attr('total-num')) || 10,
                currentPage:  1,
                onChange : function(pageNum){
                    that._reloadList(pageNum);
                }
            });

            p.goTo(cp);
        },

        _initPager2 : function(){
            var that = this;
            var pg = $("#pager2");
            var cp = parseInt(pg.attr('current-page'));
            var p = new Pager({
                containerId : "pager2",
                showPage : parseInt(pg.attr('show-page')) || 5,
                totalNum : parseInt(pg.attr('total-num')) || 10,
                currentPage:  1,
                onChange : function(pageNum){
                    that._reloadList(pageNum);
                }
            });

            p.goTo(cp);
        },

        _initPager3 : function(){
            var that = this;
            var pg = $("#pager3");
            var cp = parseInt(pg.attr('current-page'));
            var p = new Pager({
                containerId : "pager3",
                showPage : parseInt(pg.attr('show-page')) || 5,
                totalNum : parseInt(pg.attr('total-num')) || 10,
                currentPage:  1,
                onChange : function(pageNum){
                    that._reloadList(pageNum);
                }
            });

            p.goTo(cp);
        },

        _initPager4 : function(){
            var that = this;
            var pg = $("#pager4");
            var cp = parseInt(pg.attr('current-page'));
            var p = new Pager({
                containerId : "pager4",
                showPage : parseInt(pg.attr('show-page')) || 5,
                totalNum : parseInt(pg.attr('total-num')) || 10,
                currentPage:  1,
                onChange : function(pageNum){
                    that._reloadList(pageNum);
                }
            });

            p.goTo(cp);
        },
        _initPager5 : function(){
            var that = this;
            var pg = $("#pager5");
            var cp = parseInt(pg.attr('current-page'));
            var p = new Pager({
                containerId : "pager5",
                showPage : parseInt(pg.attr('show-page')) || 5,
                totalNum : parseInt(pg.attr('total-num')) || 10,
                currentPage:  1,
                onChange : function(pageNum){
                    that._reloadList(pageNum);
                }
            });

            p.goTo(cp);
        },
        //计算收益
        _calculate : function(){
            var that = this;
            $.POST("/calu-planincome",{money : $("#money").val()},function(r){
                if(r.code == 0){
                    var maxEarn = that._getTheMaxEarn(r.data);
                    var earnArray = [];
                    var temp = "";
                    for (var i = 0; i < r.data.length; i++) {
                        var term = r.data[i].term;
                        var earn = r.data[i].earn / maxEarn * 100;
                        earnArray.push(earn);
                        temp += '<li class="clearfix">' +
                                    '<span class="item">银多利Y-<i class="black">'+ term +'</i>期</span> ' +
                                    '<div class="product_progress ie-css3">' +
                                        '<span id="progress_'+ i +'" style="width: '+ 0 +'%" class="ie-css3"></span>' +
                                    '</div>' +
                                    '<span class="value">'+ $.numberFormat(r.data[i].earn / 100,2) +'元</span>' +
                                '</li>';
                    }

                    $("#calculateResult").html(temp);
                    for (var i = 0; i < earnArray.length; i++) {
                        $("#progress_" + i).animate({
                            width : earnArray[i] + "%"
                        },1000);
                    }
                }

            },"json");

        },

        _getTheMaxEarn : function(data){
            var allEarn = [];
            for (var i = 0; i < data.length; i++) {
                allEarn.push(data[i].earn);
            }
            allEarn.sort(function(a,b){
                return b-a;
            });
            if(allEarn.length > 0){
                return allEarn[0];
            }
            else{
                return 0;
            }
        }

    };

    $(function () {
        Index.init();
    });

});

