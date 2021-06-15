import { request, takePhoto, uploadFile } from 'utils/all';
import { formatDate } from 'utils/time';

App({
  onLaunch: async function() {
    let data = {
      "9e03e9fe-1c52-4ab7-8433-7fbbe58707a5": {
        id: "9e03e9fe-1c52-4ab7-8433-7fbbe58707a5",
        img: "",
        name: "示例菜品",
        calories: 123,
        weight1: 20,
        weight2: 40,
        date: formatDate(new Date())
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
