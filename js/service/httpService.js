const httpName = "http://leason.club:8082";
export default {
    login(obj){
        wx.request({
            url: httpName + "/api/remote/login",
            data:obj.data,
            method:'GET',
            success : obj.successFun,
            fail : obj.failFun,
        })
    },
    getAll(){

    }
}
