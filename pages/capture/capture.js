import { takePhoto } from "../../utils/all";

Page({
  data: {},
  bindcapture: async () => {
    let imgPath = await takePhoto();
    console.log(imgPath);
    wx.redirectTo({
      url: `../detail/detail?img=${imgPath}&recognize=true`,
    });
  }
});