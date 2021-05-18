import { request, takePhoto, uploadFile } from 'utils/all';

App({
  onLaunch: async () => {
    console.log(await wx.login());
  },
})
