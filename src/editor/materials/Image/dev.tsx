import { Image as AntdImage } from 'antd';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

const Image = ({id, src, alt, width, height, preview, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'Image',
      item: {
          type: 'Image',
          dragType: 'move',
          id: id
      }
  });

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