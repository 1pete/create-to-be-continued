// @flow

import React, { Component } from 'react'
import FileSaver from 'file-saver'
import html2canvas from 'html2canvas'

import tbcImage from '../../contents/tbc.png'

import type { Photo } from '../../types'

type PhotoEditorProps = {
  photo: Photo,
  reset: Function,
}

class PhotoEditor extends Component {
  props: PhotoEditorProps
  container: any
  targetPhoto: Image
  onSaveWrapper: Function

  state = {
    saving: false,
  }

  constructor({ photo }: PhotoEditorProps) {
    super()

    this.targetPhoto = new Image()
    this.targetPhoto.src = photo.data

    this.onSaveWrapper = this.onSave.bind(this)
  }

  onSave() {
    this.setState({ saving: true })
    html2canvas(this.container)
      .then((canvas) => {
        // FileSaver
        canvas.toBlob((blob) => {
          FileSaver.saveAs(blob, 'download.png')
          this.setState({ saving: false })
        })
      })
  }

  render() {
    const {
      photo: {
        data,
        filterColor,
        filterOpacity,
        logoScale,
        logoMarginLeft,
        logoMarginBottom,
      },
      reset,
    } = this.props

    const { saving } = this.state

    return (
      <div className="photo-editor-container">
        <div
          className="photo-editor"
          ref={(node) => { this.container = node }}
        >
          <img
            src={data}
            className="target-image"
            alt=""
          />
          <div
            className="filter"
            style={{
              backgroundColor: filterColor,
              opacity: filterOpacity,
            }}
          />
          <img
            src={tbcImage}
            className="logo-image"
            alt=""
            style={{
              left: `${logoMarginLeft}%`,
              bottom: `${logoMarginBottom}%`,
              height: `${logoScale}%`,
            }}
          />
        </div>
        <div className="photo-editor-actions">
          <button
            className="btn btn-primary"
            onClick={this.onSaveWrapper}
            disabled={saving}
          >{saving ? 'Saving...' : 'Save'}</button>
          <button
            className="btn btn-danger"
            onClick={reset}
          >Reset</button>
        </div>
      </div>
    )
  }
}

export default PhotoEditor
