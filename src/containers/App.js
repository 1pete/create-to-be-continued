import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Nav from '../components/Nav'

import PhotoEditor from '../components/photo/PhotoEditor'
import PhotoPicker from '../components/photo/PhotoPicker'

import { setPhotoData } from '../actions/photo'

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
              photo.data
              ? <PhotoEditor photo={photo} />
              : <PhotoPicker setPhotoData={actions.setPhotoData} />
            }
          </div>
        </div>
      </main>
    </div>
  </div>
)

const mapStateToProps = state => ({
  photo: state.photo,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setPhotoData,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
