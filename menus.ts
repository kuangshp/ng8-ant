export default {
  code: 0,
  message: '请求成功',
  result: [
    {
      id: 2,
      url: null,
      sort: 4,
      icon: 'team',
      parentId: -1,
      name: '系统管理'
    },
    {
      id: 3,
      url: '/system/user',
      sort: 3,
      icon: 'user',
      parentId: 2,
      name: '用户中心'
    },
    {
      id: 4,
      url: '/system/role',
      sort: 4,
      icon: 'usergroup-add',
      parentId: 2,
      name: '角色管理'
    },
    {
      id: 5,
      url: '/system/access',
      sort: 5,
      icon: 'apartment',
      parentId: 2,
      name: '资源管理'
    },
    {
      id: 6,
      url: '/setting',
      sort: 15,
      icon: 'setting',
      parentId: -1,
      name: '设置'
    },
    {
      id: 10,
      url: '/file',
      sort: 1,
      icon: 'file',
      parentId: -1,
      name: '文件中心'
    },
  ]
}

