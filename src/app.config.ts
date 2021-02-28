export default {
  pages: [
    'pages/home/index',
    'pages/list/index',
    'pages/detail/index',
    'pages/my/index',
  ],
  tabBar: {
    list: [
      {
        'iconPath': './assets/images/nav/home.png',
        'selectedIconPath': './assets/images/nav/home_on.png',
        pagePath: 'pages/home/index',
        text: '首页',
      },
      {
        'iconPath': './assets/images/nav/my.png',
        'selectedIconPath': './assets/images/nav/my_on.png',
        pagePath: 'pages/my/index',
        text: '我的'
      }
    ],
    'color': '#333',
    'selectedColor': '#76569a',
    'backgroundColor':'#fff',
    'borderStyle': 'white'
  },

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}
