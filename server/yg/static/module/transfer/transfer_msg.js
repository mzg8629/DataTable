define("transfer/transfer_msg", ["ui/modal/modal", 'common/config', 'ui/select/select', "ui/validation/validation",], function (require, exports, module) {

        //产品详情依赖的模块'
        var modal = require('ui/modal/modal');
        var config = require('common/config');
        require('ui/select/select');
        require('ui/validation/validation');

        var couponSelectCreated = false;

        //出借服务与管理协议
        $("#viewTemplate").on("click", function () {
            modal.show({
                title: $("#viewProtocol").attr("title"),
                content: $("#viewProtocol").html(),
                size: {width: 750, height: 600},
                showFoot: false,
                showClose: true,
                buttons: [
                    {
                        name: "关闭"
                    }
                ]

            });
        });
        //借款协议
        $("#viewTemplate2").on("click", function () {
            modal.show({
                title: $("#viewProtocol2").attr("title"),
                content: $("#viewProtocol2").html(),
                size: {width: 750, height: 600},
                showFoot: false,
                showClose: true,
                buttons: [
                    {
                        name: "关闭"
                    }
                ]

            });
        });
        //风险提示书
        $("#viewTemplate3").on("click", function () {
            modal.show({
                title: $("#viewProtocol3").attr("title"),
                content: $("#viewProtocol3").html(),
                size: {width: 750, height: 600},
                showFoot: false,
                showClose: true,
                buttons: [
                    {
                        name: "关闭"
                    }
                ]

            });
        });
        //数字证书服务协议
        $("#viewTemplate4").on("click", function () {
            modal.show({
                title: $("#viewProtocol4").attr("title"),
                content: $("#viewProtocol4").html(),
                size: {width: 750, height: 600},
                showFoot: false,
                showClose: true,
                buttons: [
                    {
                        name: "关闭"
                    }
                ]

            });
        });

        //增值劵下拉提示框
        var _tip = $("#hoverTip .tips");
        _tip.hide();
        $("#hoverTip .icon-warn").hover(function () {
            _tip.show();
        }, function () {
            _tip.hide();

        });


        function createCouponSelect() {

            if (couponSelectCreated) return;
            couponSelectCreated = true;

            //选择优惠卷
            $("#transferMsgForm #chooseMyCoupon").ygSelect({
                width: 300,
                height: 30


            }).on('change', function () {

                $("#couponResult").text($("#chooseMyCoupon option:selected").text());
            });
        }


        var userCoupon = $("#userCoupon");

        userCoupon.on("click", function () {
            var choose = $(this).attr("checked");
            if (choose) {
                createCouponSelect();
                $(".chooseCoupon").show();
                $("#couponResult").show();

            } else {
                $(".chooseCoupon").hide();
                $("#couponResult").hide();
            }

        });


        var btnValid = $("#btnOk");
        var btnDisabled = btnValid.hasClass("btn_disable");
        exports.run = function () {

            //确认出借

            $("#btnOk").on("click", function () {
                if (btnDisabled) {
                    return;
                } else {
                    $("#transferMsgForm").submit();
                    return false;
                }

            });

        };

        function isOk() {
            var checked = userCoupon.attr('checked');
            $("#chooseMyCoupon").prop('disabled',false);
            if (checked && !$("#chooseMyCoupon").val()) {
                $("#couponResult").html("请选择优惠券");
                return false;
            }else if(!checked){
                $("#chooseMyCoupon").prop('disabled',true);
                return true;
            }
            return true;
        }

        $("#transferMsgForm").validate({

            submitHandler: function () {

                if (!isOk()) {
                    return false;
                }

            },
            errorHandler: function (errs) {
                btnValid["addClass"]("btn_disable");

            },
            passedHandler: function () {
                btnValid["removeClass"]("btn_disable");
            },
            fields: {
                agree: {
                    required: true,
                    //minChecked: 1,
                    //output: "#agreeTip"
                }

            },
            errorMessage: {

                //agree: {
                //    minChecked: "<i class='icon_tips' ></i>请点击同意确认协议",
                //    required: "<i class='icon_tips' ></i>请点击同意确认协议"
                //}
            }
        }, function (validator) {
            var isValid = validator.isValid;
            btnValid[isValid ? "removeClass" : "addClass"]("btn_disable");
        });

        exports.run();
    }
)
;

