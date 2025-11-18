import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, message } from 'antd';
import { CommonComponentProps } from '../../interface';

declare global {
  interface Window {
    BMap: any;
  }
}

const LocationPicker = ({ id, value, placeholder, onChange, styles, apiKey }: CommonComponentProps) => {
  const [locationValue, setLocationValue] = useState(value || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // 加载百度地图API
  useEffect(() => {
    if (modalVisible && !mapLoaded) {
      const script = document.createElement('script');
      script.src = `https://api.map.baidu.com/api?v=3.0&ak=${apiKey || 'your-baidu-map-api-key'}&callback=initMap`;
      script.async = true;
      
      // 定义全局回调函数
      (window as any).initMap = () => {
        setMapLoaded(true);
      };

      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        delete (window as any).initMap;
      };
    }
  }, [modalVisible, apiKey, mapLoaded]);

  const handleLocationSelect = (location: string) => {
    setLocationValue(location);
    if (onChange) {
      onChange(location);
    }
    setModalVisible(false);
    message.success(`已选择位置：${location}`);
  };

  const showMapModal = () => {
    setModalVisible(true);
  };

  const initMap = () => {
    if (!window.BMap) {
      message.error('百度地图API加载失败，请检查API Key');
      return;
    }

    const map = new window.BMap.Map('map-container');
    const point = new window.BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    
    // 添加地图控件
    map.addControl(new window.BMap.NavigationControl());
    map.addControl(new window.BMap.ScaleControl());
    map.addControl(new window.BMap.OverviewMapControl());
    
    // 添加点击事件
    map.addEventListener('click', (e: any) => {
      const geoc = new window.BMap.Geocoder();
      geoc.getLocation(e.point, (result: any) => {
        if (result) {
          const address = result.address;
          handleLocationSelect(address);
        }
      });
    });

    // 添加标记
    const marker = new window.BMap.Marker(point);
    map.addOverlay(marker);
  };

  useEffect(() => {
    if (modalVisible && mapLoaded && window.BMap) {
      initMap();
    }
  }, [modalVisible, mapLoaded]);

  return (
    <div data-component-id={id} style={styles}>
      <Input.Group compact style={{ display: 'flex' }}>
        <Input
          value={locationValue}
          placeholder={placeholder || '请选择位置'}
          readOnly
          style={{ flex: 1 }}
        />
        <Button type="primary" onClick={showMapModal}>
          选择位置
        </Button>
      </Input.Group>

      <Modal
        title="选择位置"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <div id="map-container" style={{ height: '400px', width: '100%' }} />
        <div style={{ marginTop: '16px', textAlign: 'center' }}>
          <Button type="primary" onClick={() => handleLocationSelect('当前位置')}>
            使用当前位置
          </Button>
          <Button style={{ marginLeft: '8px' }} onClick={() => setModalVisible(false)}>
            取消
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default LocationPicker;