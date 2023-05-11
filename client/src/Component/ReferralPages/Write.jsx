import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Write = () => {
  const [value, setValue] = useState('');
    console.log(value);
  return <ReactQuill theme="snow" id="pa_prblm" value={value} onChange={setValue} />;
}

export default Write;