import Layout from '@/layout'

export default {
  path: '/charge',
  component: Layout,
  hidden: false,
  meta: { title: '计费管理', icon: 'money' },
  children: [
    {
      path: 'instrument',
      component: () => import('@/views/charge/instrument/index'),
      name: 'Instrument',
      meta: { title: '仪表管理', icon: '' }
    },
    {
      path: 'org',
      component: () => import('@/views/charge/org/index'),
      name: 'Org',
      meta: { title: '组织管理', icon: '' }
    },
    {
      path: 'plan',
      component: () => import('@/views/charge/plan/index'),
      name: 'Plan',
      meta: { title: '方案管理', icon: '' }
    },
    {
      path: 'type',
      component: () => import('@/views/charge/type/index'),
      name: 'Type',
      meta: { title: '类型管理', icon: '' }
    },
    {
      path: 'user',
      component: () => import('@/views/charge/user/index'),
      name: 'ChargeUser',
      meta: { title: '用户管理', icon: '' }
    },
  ]
}