const httpName = "https://leason.club:443";
export default {
    login(obj) {
        wx.request({
            url: httpName + "/api/remote/login",
            data: obj.data,
            method: 'GET',
            success: function (res) {
                obj.successFun(res)
            },
            fail: function (err) {
                obj.failFun(err)
            },
        })
    },
    getAll(obj) {
        wx.request({
            url: httpName + "/api/remote/obstacle/all",
            data: null,
            method: 'GET',
            success: function (res) {
                obj.successFun(res)
            },
            fail: function (err) {
                obj.failFun(err)
            },
        })
    },
    getRandom(obj) {
        wx.request({
            url: httpName + "/api/remote/obstacle/random",
            data: null,
            method: 'GET',
            success: function (res) {
                obj.successFun(res)
            },
            fail: function (err) {
                obj.failFun(err)
            },
        })
    },
    setScore(obj) {
        wx.request({
            url: httpName + "/api/remote/obstacle/score",
            data: obj.data,
            method: 'POST',
            success: function (res) {
                obj.successFun(res)
            },
            fail: function (err) {
                obj.failFun(err)
            },
        })
    },
    myCenter() {
        wx.request({
            url: httpName + "/api/remote/me/center",
            data: obj.data,
            method: 'GET',
            success: function (res) {
                obj.successFun(res)
            },
            fail: function (err) {
                obj.failFun(err)
            },
        })
    }
}
