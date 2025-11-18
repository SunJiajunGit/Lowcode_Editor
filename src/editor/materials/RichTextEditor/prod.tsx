import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { CommonComponentProps } from '../../interface';

const RichTextEditor = ({ id, value, placeholder, onChange, styles }: CommonComponentProps) => {
  const [editorValue, setEditorValue] = useState(value || '');

  const handleChange = (newValue: string | undefined) => {
    const val = newValue || '';
    setEditorValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div data-component-id={id} style={styles}>
      <Editor
        height="200px"
        defaultLanguage="html"
        value={editorValue}
        onChange={handleChange}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          placeholder: placeholder || '请输入富文本内容...'
        }}
      />
    </div>
  )
}

export default RichTextEditor;