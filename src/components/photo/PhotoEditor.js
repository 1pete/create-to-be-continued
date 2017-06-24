// @flow

import React, { Component } from 'react'
import FileSaver from 'file-saver'

import tbcImageData from '../../contents/tbc.png'

import type { Photo } from '../../types'

const tbcImage = new Image()
tbcImage.src = tbcImageData

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
    const {
      photo: {
        filterColor,
        filterOpacity,
        logoScale,
        logoMarginLeft,
        logoMarginBottom,
      },
    } = this.props
    this.setState({ saving: true })

    const { width: canvasWidth, height: canvasHeight } = this.targetPhoto

    const fromPercent = x => x / 100

    const canvas = document.createElement('canvas')
    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const imageHeight = canvasHeight * fromPercent(logoScale)
    const imageWidth = (tbcImage.width / tbcImage.height) * imageHeight

    const ctx = canvas.getContext('2d')
    if (ctx == null) {
      this.setState({ saving: false })
      return
    }

    ctx.drawImage(this.targetPhoto, 0, 0)
    ctx.fillStyle = filterColor
    ctx.globalAlpha = filterOpacity
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    ctx.globalAlpha = 1
    ctx.drawImage(
      tbcImage,
      canvasWidth * fromPercent(logoMarginLeft),
      canvasHeight - (canvasHeight * fromPercent(logoMarginBottom)) - imageHeight,
      imageWidth,
      imageHeight,
    )

    canvas.toBlob((blob) => {
      FileSaver.saveAs(blob, 'download.png')
      this.setState({ saving: false })
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
            src={tbcImageData}
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
