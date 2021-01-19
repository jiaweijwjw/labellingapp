const state = {
  LabelBtns: [
    {
      id: 1,
      name: 'Person',
      btncolor: 'pink'
    },
    {
      id: 2,
      name: 'Location',
      btncolor: 'pink-2'
    },
    {
      id: 3,
      name: 'Date',
      btncolor: 'pink-3'
    },
    {
      id: 4,
      name: 'Organisation',
      btncolor: 'pink-4'
    },
    {
      id: 5,
      name: 'Filler1',
      btncolor: 'pink-5'
    },
    {
      id: 6,
      name: 'Filler2',
      btncolor: 'pink-6'
    }
  ],
  NewLabelBtn: {
    name: '',
    btncolor: ''
  }
}

const mutations = {

}

const actions = {
  newLabel () {
    console.log('test')
  }
}

const getters = {
  labels: (state) => {
    return state.LabelBtns
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
