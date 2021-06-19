import { request } from '../../utils/all';

Page({
  data:{
    id: 'x2sswrg423495',
    id_cache: '2',  //id更改缓存，点击确定更新至id
    modalHidden: true,
    voltage: 0,
  },

  //获取设备供电电压
  onShow: async function() {
    let res = await request({
      url: 'https://xxyizhe.xmcp.ltd/device',
    });
    let voltage = res.data.voltage;
    console.log(voltage);
    this.setData({
      ...this.data,
      voltage: voltage
    });
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
    //跳转网页
    info_jump(){
      wx.navigateTo({
        url: '../mine_info/mine_info'
      })
    },
     //跳转网页
    report_jump(){
      wx.navigateTo({
        url: '../mine_report/mine_report'
      })
    },
     //跳转网页
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
              wx.removeStorageSync('dishes');
              wx.removeStorageSync('Weight_Record');
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