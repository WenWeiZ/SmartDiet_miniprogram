var Time = require('../../utils/time.js');
//身高范围数组生成
var heightarray = new Array(100);
for(var i=0;i<heightarray.length;i++){
  heightarray[i] = i+120;
}
//体重范围数组生成
var weightarray = new Array(120);
for(var i=0;i<weightarray.length;i++){
  weightarray[i] = i+30;
}

const state_weight = [1.2, 1.375, 1.55, 1.725, 1.9]
//体重变化记录
//var weight_record = {};

Page({
  data:{
    birthday: "",
    sex:"",
    sexrange:["男","女"],
    height: "",
    heightid: "",
    weight: "",
    weightid: "",
    targetweight: "",
    targetid: "",
    heightrange: heightarray,
    weightrange: weightarray,
    modalHidden: true,
    weight_cache: "",
    date: "",
    weight_r: {},
    recommend:"",
    state:"",
    staterange: ['几乎不动','稍微运动','中度运动','积极运动','专业运动']
  },
  onLoad(){
    //获取当前日期
    var DATE = Time.formatDate(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      date: DATE
    });
    console.log(DATE);
    //获取体重变化记录
    var that = this;
    wx.getStorage({
      key: 'Weight_Record',
      success: function(res){
        //weight_record = res.date;
        that.setData({
          weight_r: res.data
        })
        console.log(that.data.weight_r);
      },
      fail: function(){
        that.setData({
          weight_r: {}
        })
      }
    })
    //console.log(weight_record);
    //获取个人信息

    wx.getStorage({
      key: 'Info',
      success:function(res){
        try {
        that.setData({
          birthday: res.data.birthday,
          sex: res.data.sex,
          height: res.data.height,
          weight: res.data.weight,
          targetweight: res.data.targetweight,
          targetid: res.data.targetid,
          weightid: res.data.weightid,
          heightid: res.data.heightid,
          state: res.data.state,
          recommend: res.data.recommend
        })} catch(e){
        }
      },
      fail: function(){
        that.setData({
          birthday: "2000-02-26",
          sex: "0",
          height: 170,
          targetweight: 60,
          weight: 65,
          heightid: "50",
          weightid: "35",
          targetid: "30",
          state: '0',
          recommend: '1800'
        })
      },
      complete: function(){
        
      }
    })
  },
  //计算卡路里
  calorie: function(e){
    var sum = 0;
    var age = Number(this.data.date.substring(0,4)) - Number(this.data.birthday.substring(0,4));
    if(this.data.sex == '1'){
      sum = 655 + 9.6 * Number(this.data.weight) + 1.8 * Number(this.data.height) - 4.7 * age;
    } else {
      sum = 66 + 13.7 * Number(this.data.weight) + 5 * Number(this.data.height) - 6.8 * age;
    }
    sum = sum * state_weight[this.data.state];
    sum = sum - (this.data.targetweight != this.data.weight) * 300 - 400 + 400 * Number(this.data.targetweight) / Number(this.data.weight);
    sum = sum.toFixed(0);
    this.setData({
      recommend: sum
    })
  }
  ,
  changebirthday: function(e) {
    console.log("更改出生日期");
    this.setData({
      birthday: e.detail.value
    })
    this.calorie();
    var that = this;
    wx.setStorage({
      data: that.data,
      key: 'Info',
    })
  },
  changeheight: function(e){
    console.log("更改身高");  
    this.setData({
      heightid: e.detail.value,
      height: Number(e.detail.value) + 120
    })
    this.calorie();
    var that = this;
    wx.setStorage({
      data: that.data,
      key: 'Info',
    })  
  },
  changestate: function(e){
    console.log("更改状态");  
    this.setData({
      state: e.detail.value,
    })
    this.calorie();
    var that = this;
    wx.setStorage({
      data: that.data,
      key: 'Info',
    })  
  },
  changesex: function(e){
    console.log("更改性别");  
    console.log(e);
    this.setData({
      sex: e.detail.value
    })
    this.calorie();
    var that = this;
    wx.setStorage({
      data: that.data,
      key: 'Info',
    })  
  },
  changetarget: function(e){
    console.log("更改目标体重");  
    this.setData({
      targetid: e.detail.value,
      targetweight: Number(e.detail.value) + 30
    })
    this.calorie();
    var that = this;
    wx.setStorage({
      data: that.data,
      key: 'Info',
    })
  },
  modify: function(e){
    this.setData({
      modalHidden: false
    })
  },
  //  最新体重更改
    modalConfirm: function(e){
      this.setData({
        modalHidden: true,
        weight: this.data.weight_cache,
      })    
      /*
      try {
      weight_record[this.data.date] = this.data.weight;
      } catch(e){
        weight_record = {};
        weight_record[this.data.date] = this.data.weight;
      }*/
      this.calorie();
      var weight_record = this.data.weight_r;
      weight_record[this.data.date.substring(5,10)] = this.data.weight;
      var that = this;
      wx.setStorage({
        data: that.data,
        key: 'Info',
      })

      wx.setStorage({
        data: weight_record,
        key: 'Weight_Record',
      })
    },
    modalCancel: function(e){
      this.setData({
        modalHidden: true
      })    
      console.log(e);
    },
    newweight: function(e){
      this.setData({
        weight_cache: e.detail.value
      })
    }
})