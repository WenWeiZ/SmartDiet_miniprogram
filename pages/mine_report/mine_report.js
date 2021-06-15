var wxCharts = require('../../utils/wxcharts.js');
var weightChart = null;
var calorieChart = null;
//体重变化记录
//var weight_record = {};
//var date_array = [];
//var weight_array = [];
Page({
  data:{
    weight_array: [],
    date_array: [],
    targetweight: "",
    recommend: "",
    targetweight_array: [],
    calorie_array: [],
    recommend_array: []
  },
  //触摸显示
  touchHandler1: function (e) {
    console.log(weightChart.getCurrentDataIndex(e));
    weightChart.showToolTip(e, {
        //background: '#7cb5ec',
        format: function (item, category) {
            return category + ' ' + item.name + ':' + item.data 
        }
    });
},   
  //触摸显示
  touchHandler2: function (e) {
    console.log(weightChart.getCurrentDataIndex(e));
    calorieChart.showToolTip(e, {
        //background: '#7cb5ec',
        format: function (item, category) {
            return category + ' ' + item.name + ':' + item.data 
        }
    });
},  
  //体重曲线
  plotweight: function(){
    var windowWidth = 320;
    try {
        var res = wx.getSystemInfoSync(); 
        windowWidth = res.windowWidth;
      } catch (e) { 
        console.error('getSystemInfoSync failed!');
      }
    var ax = this.data.date_array;
    console.log(ax);
    var ay = this.data.weight_array;
    console.log(ay);
    weightChart = new wxCharts({
      canvasId: 'weight',
      type: 'line',
      //categories: ['06-01'],
      categories: ax,
      animation: true,
      series: [
        {name: '体重',
         //data: [65],
         data: ay,
         format: function(val, name){
           return val.toFixed(1) + 'kg';
         }},
         {name: '目标体重',
         //data: [65],
         data: this.data.targetweight_array,
         format: function(val, name){
           return val.toFixed(1) + 'kg';
         }}        
      ],
      xAxis:{
        disableGrid: true
      },
      yAxis:{
        title: '每日体重/千克',
        format: function(val){
          return val.toFixed(1);
        },
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra:{
        lineStyle: 'curve'
      }
    });
  },
  //卡路里曲线
  plotcalorie: function(){
    var windowWidth = 320;
    try {
        var res = wx.getSystemInfoSync(); 
        windowWidth = res.windowWidth;
      } catch (e) { 
        console.error('getSystemInfoSync failed!');
      }
    var ax = this.data.date_array;
    console.log(ax);
    var ay = this.data.weight_array;
    console.log(ay);
    calorieChart = new wxCharts({
      canvasId: 'calorie',
      type: 'line',
      //categories: ['06-01'],
      categories: ax,
      animation: true,
      series: [
        {name: '摄入热量',
         //data: [65],
         data: ay,
         format: function(val, name){
           return val.toFixed(1) + '大卡';
         }},
         {name: '推荐热量',
         data: this.data.recommend_array,
         format: function(val, name){
           return val.toFixed(1) + '大卡';
         }}         
      ],
      xAxis:{
        disableGrid: true
      },
      yAxis:{
        title: '每日摄入热量/大卡',
        format: function(val){
          return val.toFixed(1);
        },
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      min : 1000,
      extra:{
        lineStyle: 'curve'
      }
    });
  },
  onLoad: function(e){
    //获取体重变化记录
    var that = this;
    //获得目标体重和推荐摄入量
    wx.getStorage({
      key: 'Info',
      success: function(res){
        try {
        that.setData({
          targetweight: res.data.targetweight,
          recommend: res.data.recommend
        })} catch(e){
        that.setData({
          targetweight: '50',
          recommend: '1800'
        })
        }
      }
    })
    wx.getStorage({
      key: 'Weight_Record',
      success: function(res){
        var weight_record = res.data; 
        //console.log(weight_record);
        var Date_array = Object.keys(weight_record).sort();
        //console.log(Date_array);
        var Weight_array = [];
        var Targetweight_array = [];
        var Recommend_array = [];
        for(var key in Date_array){
          Weight_array.push(Number(weight_record[Date_array[key]]));
          Targetweight_array.push(Number(that.data.targetweight));  
          Recommend_array.push(Number(that.data.recommend))        
        } 
        //截取最新的七个数据
        if (Date_array.length > 7){
          Date_array = Date_array.slice(-7);
          Weight_array = Weight_array.slice(-7);
          Targetweight_array = Targetweight_array.slice(-7);
          Recommend_array = Recommend_array.slice(-7);
        }
        that.setData({
          targetweight_array: Targetweight_array,
          weight_array:  Weight_array,
          date_array: Date_array,
          recommend_array: Recommend_array
        })
        console.log(that.data.date_array);
        console.log(that.data.weight_array);
        //画图
        that.plotweight();
        that.plotcalorie();
      },
      fail: function(){
        weight_record = {};
      }
    })
    //console.log(this.data.weight_array);
    //体重数据处理
    /*
    date_array = Object.keys(weight_record).sort();
    for(var key in date_array){
      weight_array.push(weight_record[key]);
    }
    console.log(date_array);
    console.log(weight_array);*/
    //画图
  }
})