$(function() {
    // 点击去注册，隐藏登录盒子
    $('#link_reg').on('click', function() {
        $('.reg-box').show();
        $('.login-box').hide();
    })

    // 点击去登录， 隐藏注册盒子
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;

    // 自定义检测内容
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            const pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    // 注册表单提交
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/regu  ser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功');
                $('#link_login').click();
            }
        })
    })

    // 登录表单提交
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })



})