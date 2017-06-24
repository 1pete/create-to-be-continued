import React from 'react'

import type { Photo } from '../../types'

type PhotoPreviewProps = {
  photo: Photo,
  logo: string,
}

const PhotoPreview = ({ photo, logo }: PhotoPreviewProps) => (
  <div className="photo-editor">
    <img src={photo.data} className="target-image" alt="" />
    <div className="filter" style={{ backgroundColor: photo.filterColor, opacity: photo.filterOpacity }} />
    <img
      src={logo}
      className="logo-image"
      alt=""
      style={{
        left: `${photo.logoMarginLeft}%`,
        bottom: `${photo.logoMarginBottom}%`,
        height: `${photo.logoScale}%`,
      }}
    />
    <div className="overlay" />
  </div>
)

export default PhotoPreview
