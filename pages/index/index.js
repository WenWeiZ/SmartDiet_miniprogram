import { request, sleep } from "../../utils/all";
import { formatDate } from '../../utils/time';

Page({
  data: {},

  getDishes: async function() {
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
      return data.data;
    } catch (err) {
      await wx.setStorage({
        key: "dishes",
        data: init_data,
      });
      return {};
    }
  },

  refresh: async function() {
    let dishes = await this.getDishes();
    this.setData({
      dishes: Object.entries(dishes).map(([id, dish]) => {
        return {
          id: dish.id,
          name: dish.name,
          weight: dish.weight_before > 0 && dish.weight_after > 0 ? 
          dish.weight_before - dish.weight_after : undefined,
        };
      }),
    });
  },

  update_tip: async function() {
    let tip = (await request({
      url: 'https://xxyizhe.xmcp.ltd/tip'
    })).data;
    this.setData({
      ...this.data,
      tip: tip
    });
  },

  onShow: async function() {
    console.log("Index: onShow");
    this.update_tip();
    this.refresh();
    await sleep(100);
    this.refresh();
  },

  bindTapDishDetail: async function(e) {
    let idx = e.currentTarget.dataset.index;
    let id = this.data.dishes[idx].id;
    let dish = (await this.getDishes())[id];
    await wx.navigateTo({
      url: `../detail/detail?id=${dish.id}&img=${dish.img}&name=${dish.name}&calories=${dish.calories}&weight_before=${dish.weight_before}&weight_after=${dish.weight_after}`,
    });
  },

  manualadd: function() {
    wx.navigateTo({
      url: '../detail/detail',
    });
  },

  submit: function() {

  },

  bindcapture: function() {
    wx.navigateTo({
      url: '../capture/capture',
    });
  },
})
