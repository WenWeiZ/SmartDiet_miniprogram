import { request, takePhoto, uploadFile } from 'utils/all';
import { formatDate } from 'utils/time';

App({
  onLaunch: async function() {
    let init_data = {
      "9e03e9fe-1c52-4ab7-8433-7fbbe58707a5": {
        id: "9e03e9fe-1c52-4ab7-8433-7fbbe58707a5",
        img: "",
        name: "示例菜品",
        calories: 123,
        weight_before: 43,
        weight_after: 26,
        date: formatDate(new Date())
      },
    };

    try {
      let data = await wx.getStorage({
        key: "dishes",
      });
    } catch (err) {
      await wx.setStorage({
        key: "dishes",
        data: init_data,
      });
    }
  },
})
