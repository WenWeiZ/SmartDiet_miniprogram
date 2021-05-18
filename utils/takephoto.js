export { takePhoto };

function takePhoto(params) {
  return new Promise((resolve, reject) => {
    let ctx = wx.createCameraContext();
    ctx.takePhoto({
      success: (path) => {
        resolve(path);
      },
      fail: (err) => {
        reject(err);
      },
      ...params,
    });
  })
}