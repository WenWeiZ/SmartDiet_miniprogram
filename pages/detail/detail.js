import { request } from '../../utils/all';

function uuid() {
  return 123;
}

Page({
  data: {},

  getDishes: async function() {
    return (await wx.getStorage({
      key: "dishes",
    })).data;
  },

  onLoad: function (options) {
    console.log("Detail: onLoad");

    this.setData({
      id: options.id ?? uuid(),
      img: options.img ?? "",
      name: options.name ?? "dog",
      calories: options.calories ?? "",
      weight1: options.weight1 ?? "",
      weight2: options.weight2 ?? "",
      recognize: options.recognize ?? false,
    });

    if (this.data.recognize) {
      console.log('Uploading image to backend');
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
    };
    console.log(this.data);
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