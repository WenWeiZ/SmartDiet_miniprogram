Page({
  data:{
    id: '123456',
    id_cache: '2',
    modalHidden: true
  },
  modify: function(e){
    this.setData({
      modalHidden: false
    })
  },
    modalConfirm: function(e){
      this.setData({
        modalHidden: true,
        id: this.data.id_cache
      })    
      console.log(e);
    },
    modalCancel: function(e){
      this.setData({
        modalHidden: true
      })    
      console.log(e);
    },
    newid: function(e){
      this.setData({
        id_cache: e.detail.value
      })
    },
    info_jump(){
      wx.navigateTo({
        url: '../mine_info/mine_info'
      })
    },
    report_jump(){
      wx.navigateTo({
        url: '../mine_report/mine_report'
      })
    },
    record_jump(){
      wx.navigateTo({
        url: '../mine_record/mine_record'
      })
    },
    clear(){
      try {
        wx.showModal({
          title: '提示',
          content: '确定要清除数据吗?',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.clearStorageSync();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } catch(e) {
        // Do something when catch error
      }
    }

})