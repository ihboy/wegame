const httpName = "http://leason.club:8082";
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
            success: obj.successFun,
            fail: obj.failFun,
        })
    },
    getRandom(obj) {
        wx.request({
            url: httpName + "/api/remote/obstacle/random",
            data: null,
            method: 'GET',
            success: obj.successFun,
            fail: obj.failFun,
        })
    },
    setScore(obj) {
        wx.request({
            url: httpName + "/api/remote/obstacle/score",
            data: obj.data,
            method: 'POST',
            success: obj.successFun,
            fail: obj.failFun,
        })
    },
    myCenter() {
        wx.request({
            url: httpName + "/api/remote/me/center",
            data: obj.data,
            method: 'GET',
            success: obj.successFun,
            fail: obj.failFun,
        })
    }
}
