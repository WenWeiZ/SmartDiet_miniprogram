Page({
  data: {
    topbar: ["首页", "推荐", "周报"],
    currentbar: '0',
    information: ["Figure1", "Figure2", "Figure3"]
  },

  swichbar: function(e){
    this.setData({
      currentbar: e.currentTarget.dataset.idx
    })
  }
})