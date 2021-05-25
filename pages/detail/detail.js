Page({
  data: {},

  onLoad: function (options) {
    this.setData({
      img: options.img,
      name: options.name,
      calories: options.calories,
      weight1: options.weight1,
      weight2: options.weight2
    });

    console.log(this.data);
  }
})