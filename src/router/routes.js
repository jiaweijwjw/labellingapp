
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'), // for multiple views without nesting, use components
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/charts/', redirect: '/charts/radar' },
      { path: '/charts/radar', name: 'Radar', component: () => import('pages/charts/Radar.vue') },
      { path: '/charts/polar', name: 'Polar', component: () => import('pages/charts/Polar.vue') },
      { path: '/annotate', name: 'Annotate', component: () => import('pages/Annotate.vue') }, // lazy loading could have more overhead if the app is small
      { path: '/labelspage', name: 'LabelsPage', component: () => import('pages/LabelsPage.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
