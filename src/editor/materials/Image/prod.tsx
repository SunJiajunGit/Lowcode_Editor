import { Image as AntdImage } from 'antd';
import { CommonComponentProps } from '../../interface';

const Image = ({id, src, alt, width, height, preview, styles}: CommonComponentProps) => {
  return (
    <AntdImage 
      data-component-id={id} 
      src={src} 
      alt={alt}
      width={width}
      height={height}
      preview={preview}
      style={styles} 
    />
  )
}

export default Image;