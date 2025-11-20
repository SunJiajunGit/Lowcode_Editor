import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CommonComponentProps } from '../../interface';

// 自定义工具栏配置
const modules = {
  toolbar: {
    container: [
      // 字体样式
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      
      // 对齐方式
      [{ 'align': [] }],
      
      // 列表
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      
      // 插入功能
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      
      // 表格
      [{ 'table': [] }],
      
      // 清除格式
      ['clean']
    ],
    handlers: {
      // 可以添加自定义处理函数
    }
  },
  clipboard: {
    matchVisual: false,
  }
};

const formats = [
  'font', 'size',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'align',
  'list', 'bullet', 'indent',
  'blockquote', 'code-block',
  'link', 'image', 'video',
  'table'
];

const RichTextEditor = ({ 
  id, 
  value, 
  placeholder, 
  onChange, 
  styles,
  theme = 'snow',
  readOnly = false
}: CommonComponentProps) => {
  const [editorValue, setEditorValue] = useState(value || '');
  const quillRef = useRef<any>(null);

  useEffect(() => {
    setEditorValue(value || '');
  }, [value]);

  const handleChange = (content: string, delta: any, source: any, editor: any) => {
    setEditorValue(content);
    if (onChange) {
      onChange(content);
    }
  };

  // 获取编辑器实例的方法
  const getEditor = () => {
    return quillRef.current?.getEditor();
  };

  // 插入内容的方法
  const insertText = (text: string) => {
    const editor = getEditor();
    if (editor) {
      const range = editor.getSelection();
      if (range) {
        editor.insertText(range.index, text);
      } else {
        editor.insertText(editor.getLength(), text);
      }
    }
  };

  // 设置文本格式的方法
  const formatText = (format: string, value: any) => {
    const editor = getEditor();
    if (editor) {
      editor.formatText(format, value);
    }
  };

  // 获取选中文本的方法
  const getSelectedText = () => {
    const editor = getEditor();
    if (editor) {
      const range = editor.getSelection();
      if (range) {
        return editor.getText(range.index, range.length);
      }
    }
    return '';
  };

  return (
    <div data-component-id={id} style={styles}>
      <ReactQuill
        ref={quillRef}
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme={theme}
        placeholder={placeholder || '请输入内容...'}
        readOnly={readOnly}
        style={{ 
          height: '300px',
          border: '1px solid #d9d9d9',
          borderRadius: '6px'
        }}
      />
      
      {/* 自定义工具栏扩展（可选） */}
      <div style={{ 
        marginTop: '10px', 
        padding: '8px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#666'
      }}>
        <strong>编辑器功能说明：</strong>
        <ul style={{ margin: '4px 0', paddingLeft: '16px' }}>
          <li>文本格式化：粗体、斜体、下划线、删除线</li>
          <li>对齐方式：左对齐、居中、右对齐、两端对齐</li>
          <li>字体样式：字体、大小、颜色、背景色</li>
          <li>插入功能：链接、图片、视频、表格</li>
          <li>列表功能：有序列表、无序列表、缩进</li>
        </ul>
      </div>
    </div>
  );
};

export default RichTextEditor;