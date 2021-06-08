import { sleep } from "../../utils/all";

Page({
  data: {},

  getDishes: async function() {
    return (await wx.getStorage({
      key: "dishes",
    })).data;
  },

  refresh: async function() {
    let dishes = await this.getDishes();
    this.setData({
      dishes: Object.entries(dishes).map(([id, dish]) => {
        return {
          id: dish.id,
          name: dish.name,
          weight: dish.weight1 > 0 && dish.weight2 > 0 ? 
          dish.weight2 - dish.weight1 : undefined,
        };
      }),
    });
  },

  onShow: async function() {
    console.log("Index: onShow");
    this.refresh();
    await sleep(100);
    this.refresh();
  },

  bindTapDishDetail: async function(e) {
    let idx = e.currentTarget.dataset.index;
    let id = this.data.dishes[idx].id;
    let dish = (await this.getDishes())[id];
    await wx.navigateTo({
      url: `../detail/detail?id=${dish.id}&img=${dish.img}&name=${dish.name}&calories=${dish.calories}&weight1=${dish.weight1}&weight2=${dish.weight2}`,
    });
  },

  manualadd: function() {
    wx.navigateTo({
      url: '../detail/detail',
    });
  },

  bindcapture: function() {
    wx.navigateTo({
      url: '../capture/capture',
    });
  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  }
})
