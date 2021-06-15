import { request, takePhoto, uploadFile } from 'utils/all';

App({
  onLaunch: async function() {
    let data = {
      id1: {
        id: "id1",
        img: "",
        name: "示例菜品",
        calories: 123,
        weight1: 20,
        weight2: 40,
      },
    };

    await wx.setStorage({
      key: "dishes",
      data: data,
    });

    try {
      await wx.getStorage({
        key: "archive",
      });
    } catch (err) {
      await wx.setStorage({
        key: "archive",
        data: [],
      });
    }
  },
})
