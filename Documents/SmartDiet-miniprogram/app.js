// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        /*
        //测试
        wx.uploadFile({
            url: 'https://yzpku.xyz', //仅为示例，非真实的接口地址
            filePath: "/image/face.jpeg",
            name: 'image',
            formData: {
              'user': 'test'
            },
            success (res){
              const data = res.data
              //do something
            }
        })
        */
        //发送请求
        wx.request({
          url: 'https://yzpku.xyz',
          data: {code:res.code},
          header: {
            'content-type': 'application/json'
          },
        success: function(res){
          console.log(res.data)
          wx.setStorageSync('openid', res.data.openid)
        },
        fail: function(res){
          console.log('登陆失败')
        }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
