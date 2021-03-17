
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'), // for multiple views without nesting, use components
    children: [
      // { path: '/', component: () => import('pages/Index.vue') },
      { path: '/', redirect: '/auth' },
      { path: '/datalabelling/annotate', name: 'AnnotatePage', component: () => import('pages/datalabelling/AnnotatePage.vue') }, // lazy loading could have more overhead if the app is small
      { path: '/datalabelling/labelspage', name: 'LabelsPage', component: () => import('pages/datalabelling/LabelsPage.vue') },
      { path: '/datalabelling/documentspage', name: 'DocumentsPage', component: () => import('pages/datalabelling/DocumentsPage.vue') },
      { path: '/datalabelling/projectspage', name: 'ProjectsPage', component: () => import('pages/datalabelling/ProjectsPage.vue') },
      { path: '/auth', name: 'AuthPage', component: () => import('pages/AuthPage.vue') }
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
