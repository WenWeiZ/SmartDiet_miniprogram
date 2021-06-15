Page({
  data:{
    record: [
      {date: '06/14',
       diet: ['水煮肉片', '土豆'],
       calorie: 1800,
       hidden: 0},
       {date: '06/15',
        diet: ['豆腐', '鸡肉'],
        calorie: 1000,
        hidden: 0
       },
       {date: '06/16',
        diet: ['牛肉'],
        calorie: 1600,
        hidden: 0
       }      
    ]
  },
  onLoad: function(){
    //载入record
  },
  show_control: function(e){
    var r = this.data.record;
    r[e.currentTarget.dataset.index].hidden = !r[e.currentTarget.dataset.index].hidden;
    this.setData({
      record: r
    })
  }
})