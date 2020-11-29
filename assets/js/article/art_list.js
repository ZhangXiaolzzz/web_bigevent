$(function () {
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + "-" + m + "-" + d + "-" + "" + hh + ":" + mm + ":" + ss
    }


    function padZero(n) {
        return n > 9 ? n : "0" + n
    }

    // 定义提交参数 
    var q = {
        pagenum: 1, // 页码值
        pagesize: 2, // 每页显示多少条数据
        cate_id: "", // 文章分类的id
        state: "", // 文章的状态，可选值有：已发布、草稿
    }

    initTable()
    var layer = layui.layer

    function initTable() {
        $.ajax({
            method: "get",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败！")
                }
                var htmlStr = template("tpl-table", res)
                $("tbody").html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    var form = layui.form
    initCate()

    function initCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败！")
                }
                var htmlStr = template("tpl-cate", res)
                $("[name=cate_id]").html(htmlStr)
                form.render()
            }
        })
    }

    $("#form-search").on('submit', function (e) {
        e.preventDefault()
        var state = $("[name=state]").val()
        var cate_id = $("[name=cate_id]").val()
        q.state = state
        q.cate_id = cate_id
        initTable()
    })
    var laypage = layui.laypage;

    function renderPage(total) {
        // alert(tatle)
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            curr: q.pagenum,
            limit: q.pagesize,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }
    var index = null
    $("tbody").on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')

        layer.confirm('是否确认删除？', {
            icon: 3,
            title: "提示"
        }, function () {
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initTable()
                    layer.msg('恭喜您，文章删除成功')
                    if ($(".btn-delete").length == 1 && q.pagenum > 1) q.pagenum--
                }
            })
            layer.close(index)
        })
    })

})