export { uploadFile };

function uploadFile(params) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      success: (data, statusCode) => {
        resolve({
          data: data,
          statusCode: statusCode,
        });
      },
      fail: (err) => {
        reject(err);
      },
      ...params
    });
  });
}