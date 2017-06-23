import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Nav from '../components/Nav'

import PhotoEditor from '../components/photo/PhotoEditor'
import PhotoPicker from '../components/photo/PhotoPicker'

import { resetPhotoData, setPhotoData } from '../actions/photo'

type AppProps = {
  photo: Object,
  actions: Object,
}

const App = ({ photo, actions }: AppProps) => (
  <div>
    <Nav />
    <div className="container">
      <main>
        <div className="row">
          <div className="col">
            {
              photo.data ?
                <PhotoEditor
                  photo={photo}
                  reset={actions.resetPhotoData}
                /> :
                <PhotoPicker
                  setPhotoData={actions.setPhotoData}
                />
            }
          </div>
        </div>
      </main>
      <footer>
        <div
          className="fb-like"
          data-href="https://tbc.1pete.com/"
          data-layout="button"
          data-action="like"
          data-size="small"
          data-show-faces="false"
          data-share="true"
        />
      </footer>
    </div>
  </div>
)

const mapStateToProps = state => ({
  photo: state.photo,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    resetPhotoData,
    setPhotoData,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
