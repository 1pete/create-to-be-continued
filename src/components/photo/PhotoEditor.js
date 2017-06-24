// @flow

import React, { Component } from 'react'
import FileSaver from 'file-saver'

import PhotoCustomize from './PhotoCustomize'
import PhotoPreview from './PhotoPreview'

import tbcImageData from '../../contents/tbc.png'

import type { Photo } from '../../types'

const tbcImage = new Image()
tbcImage.src = tbcImageData

type PhotoEditorProps = {
  photo: Photo,
  reset: Function,
  customize: Function,
}

class PhotoEditor extends Component {
  props: PhotoEditorProps
  targetPhoto: Image
  onSaveWrapper: Function
  toggleCustomizeWrapper: Function

  state = {
    saving: false,
    customize: false,
  }

  constructor({ photo }: PhotoEditorProps) {
    super()

    this.targetPhoto = new Image()
    this.targetPhoto.src = photo.data

    this.onSaveWrapper = this.onSave.bind(this)
    this.toggleCustomizeWrapper = this.toggleCustomize.bind(this)
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
      const pad = num => `${num}`.padStart(2, '0')
      const now = new Date()
      const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${now.getDate()}`
      const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`
      FileSaver.saveAs(blob, `tbc_${date}_${time}.png`)
      this.setState({ saving: false })
    })
  }

  toggleCustomize() {
    this.setState({ customize: !this.state.customize })
  }

  render() {
    const {
      photo,
      reset,
      customize: doCustomize,
    } = this.props

    const { saving, customize } = this.state

    return (
      <div className="photo-editor-container">
        <div className="row">
          <div className={customize ? 'col-lg-8' : 'col'}>
            <PhotoPreview photo={photo} logo={tbcImageData} />
          </div>
          {
            customize &&
            <div className="col-lg-4">
              <PhotoCustomize
                photo={photo}
                customize={doCustomize}
              />
            </div>
          }
        </div>
        <div className="row">
          <div className="col">
            <div className="photo-editor-actions">
              <button
                className="btn btn-primary"
                onClick={this.onSaveWrapper}
                disabled={saving}
              >{saving ? 'Saving...' : 'Save'}</button>
              <button
                className={`btn btn-secondary ${customize ? 'active' : ''}`}
                onClick={this.toggleCustomizeWrapper}
              >{customize && 'Close'} Customize</button>
              <button
                className="btn btn-danger"
                onClick={reset}
              >Reset</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PhotoEditor
