$(function () {
    var form = layui.form
    form.verify({

        pwd: [
            /^[\S]{6,12}$/,
            "密码必须6-12，不能出现空格"
        ],

        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "新密码和旧密码不能相同"
            }
        },


        repwd: function (value) {
            //  选择器选择注册页面里面的密码

            if (value !== $("[name=newPwd]").val()) {
                return "两次新密码输入不一致"
            }
        }
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:"POST",
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success: function(res){
                if(res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功！')
                $('.layui-form')[0].reset()
            }
        })
    })
})