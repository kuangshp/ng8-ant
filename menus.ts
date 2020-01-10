export default {
  code: 200,
  message: '请求成功',
  result: [
    {
      id: 1,
      name: '文件中心',
      parentId: -1,
      url: 'file',
    },
    {
      id: 2,
      name: '系统管理',
      parentId: -1,
      url: 'system',
    },
    {
      id: 3,
      name: '用户中心',
      parentId: 2,
      url: 'user',
    },
    {
      id: 4,
      name: '角色管理',
      parentId: 2,
      url: 'role',
    },
    {
      id: 5,
      name: '资源管理',
      parentId: 2,
      url: 'resources',
    },
    {
      id: 6,
      name: '设置',
      parentId: -1,
      url: 'setting',
    },
  ],
};
