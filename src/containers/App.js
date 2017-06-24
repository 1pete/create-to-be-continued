import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PhotoEditor from '../components/photo/PhotoEditor'
import PhotoPicker from '../components/photo/PhotoPicker'

import { resetPhotoData, setPhotoData } from '../actions/photo'

type AppProps = {
  photo: Object,
  actions: Object,
}

const App = ({ photo, actions }: AppProps) => (
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
