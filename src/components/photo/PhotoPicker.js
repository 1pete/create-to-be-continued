// @flow

import React, { Component } from 'react'

type PhotoPickerProps = {
  setPhotoData: Function,
}

class PhotoPicker extends Component {
  props: PhotoPickerProps
  handleFileChangeWrapper: Function

  constructor() {
    super()

    this.handleFileChangeWrapper = this.handleFileChange.bind(this)
  }

  state = {
    loading: false,
  }

  handleFileChange(event: any) {
    const { target } = event
    const { files } = target

    if (files && files[0]) {
      const reader = new FileReader()

      reader.onloadstart = () => {
        this.setState({ loading: true })
      }

      reader.onload = (readerEvent) => {
        this.props.setPhotoData(readerEvent.target.result)
      }

      reader.readAsDataURL(files[0])
    }
  }

  render() {
    const { loading } = this.state

    return (
      <div className="photo-picker">
        <input
          id="input-photo-picker"
          type="file"
          accept="image/*"
          onChange={this.handleFileChangeWrapper}
        />
        {!loading &&
          <label htmlFor="input-photo-picker">
            Upload a file
          </label>
        }

        {loading &&
          <span>Loading...</span>
        }
      </div>
    )
  }
}

export default PhotoPicker
