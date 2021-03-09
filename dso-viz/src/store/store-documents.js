// import Vue from 'vue'
import { uid } from 'quasar'
import DocumentService from '../services/document.service'

const state = {
  start: 0, // start of selection
  end: 0, // end of selection
  inputText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  current: '1',
  selected: ['1'],
  documents: []
  // documents: [
  //   {
  //     id: '1',
  //     name: 'sample text',
  //     isMarked: false,
  //     text: 'Batman is a superhero who appears                  in American comic booksssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss published by DC Comics. Batman was created by artist Bob Kane and writer Bill Finger, and debuted in the 27th issue of the comic book Detective Comics on March 30, 1939. In the DC Universe continuity, Batman is the alias of Bruce Wayne, a wealthy American playboy, philanthropist, and owner of Wayne Enterprises based in Gotham City.' +
  //       '\n' + '\n' + 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.' +
  //       '\n' + '\n' + 'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test',
  //     annotations: [
  //       // {
  //       //   id: 1,
  //       //   prob: 0.0,
  //       //   label: '1',
  //       //   start_offset: 0,
  //       //   end_offset: 10,
  //       //   user: 1,
  //       //   document: 8
  //       // }
  //     ]
  //   },
  //   {
  //     id: '2',
  //     name: 'sample text 2',
  //     isMarked: true,
  //     text: 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.' +
  //       '\n' + 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.' +
  //       '\n' + 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.' +
  //       '\n' + 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.' +
  //       '\n' + 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.' +
  //       '\n' + 'Joker is a 2019 American psychological thriller film directed and produced by Todd Phillips, who co-wrote the screenplay with Scott Silver. The film, based on DC Comics characters, stars Joaquin Phoenix as the Joker and provides an alternative origin story for the character. Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.',
  //     annotations: []
  //   },
  //   {
  //     id: '3',
  //     name: 'sample text 3',
  //     isMarked: false,
  //     text: 'GameStop has been swept up in a battle between big-moneyed hedge funds betting against it and small investors trying to prop it up. That has caused GameStops share price to soar despite the shaky financials underneath.' +
  //       '\n' + '\n' + 'Flailing companies like AMC Entertainment and American Airlines have likewise enjoyed a stock surge, but GameStop has been the primary battleground between the Davids and the Goliaths. Shares rocketed 1,600 per cent in the last three weeks, closing at US$325 per share on Friday (Jan 29) and giving GameStop a market cap of nearly US$17 billion. Shares have since been cratering. On Tuesday, they fell 60 per cent to close at US$90.' +
  //       '\n' + '\n' + 'Many investors fully understand the contradiction between GameStops stock price and its business fundamentals.But for those who imagine it to be the next Tesla or Amazon, the truth is: Its likely not. The companys quarterly report issued in September showed another steep quarterly sales decline as it struggles to adapt to the rise of mobile gaming and digital downloads that have rendered its more than 5, 000 stores obsolete, even more so during the pandemic.',
  //     annotations: []
  //   }
  // ]
}

const mutations = {
  // addDocument (state, payload) {
  //   state.documents.push(payload.document)
  //   // Vue.set(state.CustomLabelBtns, payload.id, payload.label)
  //   // Vue.set(object, propertyName, value)
  // },
  updateCurrent (state, payload) {
    state.current = payload
  },
  updateSelected (state, payload) {
    state.selected = payload
  },
  updateInputText (state, payload) {
    state.inputText = payload
  },
  updateDocStatus (state, payload) {
    const document = state.documents.find(doc => doc.id === payload.documentId)
    document.isMarked = payload.newStatus
  },
  updateStartEnd (state, payload) {
    state.start = payload.start
    state.end = payload.end
  },
  deleteAnnotation (state, payload) {
    console.log(payload.annotationId)
    console.log(payload.documentId)
    var index = state.documents.map(item => item.id).indexOf(payload.documentId)
    console.log(index)
    var annotationIndex = state.documents[index].annotations.map(item => item.id).indexOf(payload.annotationId)
    console.log(annotationIndex)
    ~annotationIndex && state.documents[index].annotations.splice(annotationIndex, 1)
  },
  addAnnotation (state, payload) {
    var index = state.documents.map(item => item.id).indexOf(payload.documentId)
    let annotation = {
      id: payload.annotationId,
      prob: 0.0,
      label: payload.label,
      start_offset: payload.start_offset,
      end_offset: payload.end_offset
      // user: 1,
      // document: 8
    }
    state.documents[index].annotations.push(annotation)
  },
  updateAnnotation (state, payload) {
    const document = state.documents.find(doc => doc.id === state.current)
    const annotation = document.annotations.find(item => item.id === payload.annotationId)
    // var index = state.documents.map(item => item.id).indexOf(payload.documentId)
    Object.assign(annotation, payload)
  },
  addDocument (state, payload) {
    state.documents.push(payload)
    console.log(state.documents)
  },
  updateDocumentList (state, payload) {
    state.documents = payload.slice()
    console.log(state.documents)
  },
  deleteDocuments (state, payload) {
    // for filter, whatever is true will be in the new array
    state.documents = state.documents.filter(doc => {
      if (!payload.includes(doc.id)) { // if the doc is not in the list of docs to be deleted, keep it
        return true
      }
    })
    console.log(state.documents)
  }
}

const actions = {
  addDocument ({ commit }, newDocument) {
    // let labelId = uid()
    newDocument.id = uid()
    let payload = {
      // id: labelId,
      document: newDocument
    }
    commit('addDocument', payload)
  },
  updateCurrent ({ commit }, currentDoc) {
    commit('updateCurrent', currentDoc)
  },
  updateSelected ({ commit }, selection) {
    commit('updateSelected', selection)
  },
  updateInputText ({ commit }, userInputText) {
    commit('updateInputText', userInputText)
  },
  updateDocStatus ({ commit }, payload) {
    commit('updateDocStatus', payload)
  },
  updateStartEnd ({ commit }, selectionStartEnd) {
    commit('updateStartEnd', selectionStartEnd)
  },
  deleteAnnotation ({ commit, state }, annotationId) {
    //  const documentId = state.documents[state.current].id
    const documentId = state.documents.find(doc => doc.id === state.current).id
    let payload = {
      // id: labelId,
      annotationId: annotationId,
      documentId: documentId
    }
    commit('deleteAnnotation', payload)
  },
  addAnnotation ({ commit, state }, details) {
    // const documentId = state.documents[state.current].id
    const documentId = state.documents.find(doc => doc.id === state.current).id
    console.log(this.documentId)
    let annotationId = uid()
    let payload = {
      start_offset: details.start_offset,
      end_offset: details.end_offset,
      label: details.label,
      documentId: documentId,
      annotationId: annotationId
    }
    commit('addAnnotation', payload)
  },
  updateAnnotation ({ commit, state }, obj) {
    // const documentId = state.documents[state.current].id
    const documentId = state.documents.find(doc => doc.id === state.current).id
    let payload = {
      documentId: documentId,
      label: obj.newLabelId,
      annotationId: obj.annotationId
    }
    commit('updateAnnotation', payload)
  },
  uploadDocument ({ commit }, files) {
    commit('addDocument', files)
  },
  getDocumentList ({ commit }, token) {
    DocumentService.getDocumentList(token)
      .then((res) => {
        commit('updateDocumentList', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  deleteSelectedDocuments ({ commit }, payload) {
    DocumentService.deleteDocuments(payload.token, payload.selectedDocsId)
      .then((res) => {
        // console.log(res.data)
        commit('deleteDocuments', payload.selectedDocsId)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const getters = {
  documents: (state) => {
    return state.documents
  },
  currentDoc (state) {
    return state.documents.find(doc => doc.id === state.current)
  },
  selectedDocs (state) {
    return state.documents.filter(doc => state.selected.includes(doc.id)) // state.selected.map(i => state.documents[i])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
