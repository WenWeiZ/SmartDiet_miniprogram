export { takePhoto };

function takePhoto(params) {
  return new Promise((resolve, reject) => {
    let ctx = wx.createCameraContext();
    ctx.takePhoto({
      success: ({tempImagePath}) => {
        resolve(tempImagePath);
      },
      fail: (err) => {
        reject(err);
      },
      ...params,
    });
  })
}