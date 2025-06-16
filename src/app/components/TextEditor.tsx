import React, { useRef } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { Editor } from '@tinymce/tinymce-react';

type TextEditorProps = {
  text: string;
  onChange: (value: string) => void;
};

export default function TextEditor({ text, onChange }: TextEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

  return (
    <Editor
      apiKey={apiKey}
      value={text}
      onEditorChange={(newValue) => onChange(newValue)}
      onInit={(_evt, editor) => (editorRef.current = editor)}
      init={{
        height: 400,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
}
