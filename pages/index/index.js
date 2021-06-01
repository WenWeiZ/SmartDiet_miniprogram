import { request, takePhoto, uploadFile } from '../../utils/all';

const app = getApp()

Page({
  data: {
    dishes: [
      {name: "酸菜肉丝", weight: 40},
      {name: "水煮肉", weight: undefined},
      {name: "酸菜肉丝", weight: 40},
      {name: "水煮肉", weight: undefined},
      {name: "酸菜肉丝", weight: 40},
      {name: "水煮肉", weight: undefined},
      {name: "酸菜肉丝", weight: 40},
      {name: "水煮肉", weight: undefined},
      {name: "酸菜肉丝", weight: 40},
      {name: "水煮肉", weight: undefined},
      {name: "酸菜肉丝", weight: 40},
      {name: "水煮肉", weight: undefined},
    ],
  },

  bindTapDishDetail: (e) => {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    let img = '../../images/face.jpeg';
    let name = '酸菜肉丝';
    let calories = 120;
    let weight1 = 80;
    let weight2 = "";
    wx.navigateTo({
      url: `../detail/detail?img=${img}&name=${name}&calories=${calories}&weight1=${weight1}&weight2=${weight2}`,
    })
  },

  ph: async () => {
    let photoPath = await takePhoto();
    console.log(photoPath);

    let {data, statusCode} = await uploadFile({
      filePath: photoPath,
      name: 'name',
      url: 'https://xxyizhe.xmcp.ltd',
    });

    console.log(data, statusCode);
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
