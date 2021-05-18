Page({
  data: {
    sources: [],
    name: [],
    weight: [],
    calorie: []
  },

  take_photo: function(){
    var self=this;
    var address;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res){
        console.log(res);  
        address = res.tempFilePaths[0];
        //self.data.sources.push(res.tempFilePaths[0]);
        self.setData({
          'sources': [res.tempFilePaths, ...self.data.sources]
          //'sources': self.data.sources
        })
        wx.uploadFile({
          url: 'https://yzpku.xyz/upload_image', 
          filePath: address,
          name: 'image',
          formData: {
            'user': 'test'
          },
          success (res){
            var information = JSON.parse(res.data);
            console.log(information);
            self.setData({
              name: [information.name, ...self.data.name],
              weight: [information.weight, ...self.data.weight],
              calorie: [information.calorie, ...self.data.calorie]
            })
            //do something
          },
          fail: function(res){
            console.log('发送失败')
          }
          //g  ka/100g
      })

      }
    })
  }

})