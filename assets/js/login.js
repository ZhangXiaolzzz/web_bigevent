$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({

        pwd: [ //  可以放函数和数组
            /^[\S]{6,12}$/,
            "密码必须6-12，不能出现空格"
        ],

        repwd: function (value) {
            //  选择器选择注册页面里面的密码
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次输入不一致"
            }
        }
    })

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录！')
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    }) 
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，登录成功！')
                localStorage.setItem("token",res.token)
                location.href = "/index.html"
            }
        })
    })

})