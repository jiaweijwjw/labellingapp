import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import labels from './store-labels'
import documents from './store-documents'
import general from './store-general'
import projects from './store-projects'
import classify from './store-classification'
import settings from './store-settings'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

// THIS IS FOR SINGLE MODULE
// const generalState = createPersistedState({
//   paths: ['general']
// })
export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      labels,
      documents,
      general,
      projects,
      classify,
      settings
    },
    plugins: [createPersistedState()],
    // plugins: [generalState],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
