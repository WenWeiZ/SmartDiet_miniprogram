import { request, takePhoto, uploadFile } from 'utils/all';

App({
  onLaunch: async () => {
    let data = {
      id1: {
        id: "id1",
        img: "",
        name: "酸菜肉丝",
        calories: 23,
        weight1: 20,
        weight2: 40,
      },
    };

    await wx.setStorage({
      key: "dishes",
      data: data,
    });
  },
})
