//项目的菜单配置
const menu = [
  {
    title: '首頁', // 菜单标题名称
    key: 'home', // 对应的path
    icon: 'home', // 图标名称
    path: '/admin/home'//对应路径
  },
  {
    title: '商品',
    key: 'prod_about',
    children: [ 
      {
        title: '手機',
        key: 'phone',
        path: '/admin/prod_about/phone'
      },
        {
        title: '筆電',
        key: 'laptop',
        path: '/admin/prod_about/laptop'
      },
    ]
  },
  {
    title: '用戶管理',
    key: 'user',
    path: '/admin/user'
  },
  {
    title: '圖形圖表',
    key: 'charts',
    children: [
      {
        title: '柱狀圖',
        key: 'bar',
        path: '/admin/charts/bar'
      },
      {
        title: '折線圖',
        key: 'line',
        icon: 'line-chart',
        path: '/admin/charts/line'
      },
      {
        title: '餅圖',
        key:  'pie',
        path: '/admin/charts/pie'
      },
    ]
  },
]

export default menu