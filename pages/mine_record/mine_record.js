Page({
  data:{
    //record:食物记录
    record: { '2020/06/14':
      {date: '06/14',
       diet: ['水煮肉片', '土豆'],
       calorie: 1800,
       hidden: 1},
       '2020/06/15':
       {date: '06/15',
        diet: ['豆腐', '鸡肉'],
        calorie: 1000,
        hidden: 1
       },
       '2020/06/16':
       {date: '06/16',
        diet: ['牛肉'],
        calorie: 1600,
        hidden: 1
       }      
      }
  },
  onLoad: function(){
    //从本地存储载入record
    var record_dish = {};
    var that = this;
    wx.getStorage({
      key: 'dishes',
      success: function(res){
        var dishes = res.data;
        var dish = {}; //临时变量
        console.log(dishes);
        //搜索所有菜谱用于分类
        for(var item in dishes){
          //console.log(dishes[item].name);
          if(record_dish.hasOwnProperty(dishes[item].date)){
            dish = record_dish[dishes[item].date];
            dish.diet.push(dishes[item].name);
            console.log(dish.calorie);
            dish.calorie = Number(dish.calorie) + Number(dishes[item].calories) * (Number(dishes[item].weight_before) - Number(dishes[item].weight_after)) / 100;
          } else {
            dish = {date: dishes[item].date,
                    diet: [dishes[item].name],
                    calorie: Number(dishes[item].calories) * (Number(dishes[item].weight_before) - Number(dishes[item].weight_after)) / 100,
                    hidden: 1}
          }
          record_dish[dishes[item].date] = dish;
        }
        console.log(record_dish);
        //更改
        that.setData({
          record: record_dish
        })
      },
      fail: function(){
        that.setData({
          record: {}
        })
      }
    }) 
  },
  //点击显示函数，更改hidden变量
  show_control: function(e){
    var r = this.data.record;
    r[e.currentTarget.dataset.index].hidden = !r[e.currentTarget.dataset.index].hidden;
    this.setData({
      record: r
    })
  }
})