import { takePhoto } from "../../utils/all";

Page({
  data: {},

  openalbum: async function() {
    let r = await wx.chooseImage({
      count: 1,
    });
    let imgPath = r.tempFilePaths[0];
    console.log(imgPath);
    wx.redirectTo({
      url: `../detail/detail?img=${imgPath}&recognize=true`,
    });
  },

  bindcapture: async function() {
    let imgPath = await takePhoto();
    console.log(imgPath);
    wx.redirectTo({
      url: `../detail/detail?img=${imgPath}&recognize=true`,
    });
  },
});