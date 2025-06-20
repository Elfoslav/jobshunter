'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

type TextEditorProps = {
  text: string;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
};

const config = {
  // language: 'cs_cz',
  readonly: false,
  toolbar: true,
  toolbarSticky: false,
  toolbarAdaptive: false,
  buttons: [
    'bold',
    'italic',
    'underline',
    '|',
    'ul',
    'ol',
    '|',
    'outdent',
    'indent',
    '|',
    'paragraph',
    'font',
    'fontsize',
    'brush', // text color
    '|',
    'image',
    'link',
    '|',
    'align',
    'undo',
    'redo',
    'hr',
    'eraser',
    'fullsize',
    'source',
  ],
};

export default function TextEditor({
  text,
  onBlur,
  onChange,
}: TextEditorProps) {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      config={config}
      value={text}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}
