$(function () {
    getUserinof()
    $('#logout').on('click', function () {
            layer.confirm('是否确认退出', {
                    icon: 3,
                    title: '提示'
                },
                function (index) {
                    localStorage.removeItem('token');
                    location.href = "/login.html";
                    layer.close(index);
                })

    })
           
   

})

function getUserinof() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""

        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            renferAvatar(res.data)
        }
    })
}

function renferAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }

}