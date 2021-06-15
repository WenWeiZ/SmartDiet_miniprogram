import { request, uploadFile } from '../../utils/all';
import { formatDate } from '../../utils/time';

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

Page({
  data: {},

  getDishes: async function() {
    return (await wx.getStorage({
      key: "dishes",
    })).data;
  },

  onLoad: async function (options) {
    console.log("Detail: onLoad");

    this.setData({
      id: options.id ?? uuid(),
      img: options.img ?? "",
      name: options.name ?? (options.recognize ? "正在识别..." : ""),
      calories: options.calories ?? (options.recognize ? "正在识别..." : ""),
      weight1: options.weight1 ?? "",
      weight2: options.weight2 ?? "",
      recognize: options.recognize ?? false,
    });

    if (this.data.recognize) {
      console.log(`Uploading image to backend: ${options.img}`);
      let r = await uploadFile({
        url: 'https://xxyizhe.xmcp.ltd/upload_image',
        filePath: options.img,
        name: 'img',
      });
      let info = JSON.parse(r.data.data);
      console.log(info);

      this.setData({
        ...this.data,
        name: info.name,
        calories: parseInt(info.calories),
      });
    }
  },

  onUnload: async function () {
    console.log("Detail: onUnload");

    let dishes = await this.getDishes();
    dishes[this.data.id] = {
      id: this.data.id,
      img: this.data.img,
      name: this.data.name,
      calories: this.data.calories,
      weight1: this.data.weight1,
      weight2: this.data.weight2,
      timestamp: formatDate(new Date())
    };
    console.log(dishes);
    await wx.setStorage({
      key: "dishes",
      data: dishes,
    });
  },

  input1: function(e) {
    this.data.name = e.detail.value;
  },

  input2: function(e) {
    this.data.calories = e.detail.value;
    console.log(this.data);
  },

  input3: function(e) {
    this.data.weight1 = parseInt(e.detail.value);
  },

  input4: function(e) {
    this.data.weight2 = parseInt(e.detail.value);
  },

  bindReadWeight1: async function() {
    console.log(this.data);
    let res = await request({
      url: 'https://xxyizhe.xmcp.ltd/device',
    });
    let weight = res.data.weight;
    this.setData({
      ...this.data,
      weight1: weight
    });
  },

  bindReadWeight2: async function() {
    let res = await request({
      url: 'https://xxyizhe.xmcp.ltd/device',
    });
    let weight = res.data.weight;
    this.setData({
      ...this.data,
      weight2: weight
    });
  },
})