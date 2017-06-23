// @flow

import React, { Component } from 'react'
import FileSaver from 'file-saver'
import html2canvas from 'html2canvas'

import tbcImage from '../../contents/tbc.png'

import type { Photo } from '../../types'

type PhotoEditorProps = {
  photo: Photo,
}

class PhotoEditor extends Component {
  props: PhotoEditorProps
  container: any
  targetPhoto: Image
  onSaveWrapper: Function

  constructor({ photo }: PhotoEditorProps) {
    super()

    this.targetPhoto = new Image()
    this.targetPhoto.src = photo.data

    this.onSaveWrapper = this.onSave.bind(this)
  }

  onSave() {
    html2canvas(this.container)
      .then((canvas) => {
        // FileSaver
        canvas.toBlob((blob) => {
          FileSaver.saveAs(blob, 'download.png')
        })
      })
  }

  render() {
    const { photo: { data } } = this.props

    const a = {
      filterColor: '#FFA726',
      filterOpacity: 0.3,
      logoScale: 15,
      logoMarginLeft: 3,
      logoMarginBottom: 3,
    }

    const { filterColor, filterOpacity, logoScale, logoMarginLeft, logoMarginBottom } = a

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
          >Save</button>
        </div>
      </div>
    )
  }
}

export default PhotoEditor
