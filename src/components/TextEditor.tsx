import React, { ForwardRefRenderFunction, useRef, useState,useEffect } from 'react'
import ReactQuill,{ Quill } from 'react-quill';
// @ts-ignore
import { ImageUpload } from "quill-image-upload";
import ImageUploader from '../util/ImageUploader.js';
// @ts-ignore
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
const Font = Quill.import("formats/font");
const parchment = Quill.import("parchment");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);
Quill.register("modules/imageUploader",ImageUploader)
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageUpload", ImageUpload);


const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block", { script: "sub" }, { script: "super" }],
      [{ align: ["right", "center", false] }],
  
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
  
      [{ size: ["small", false, "large", "huge"] }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"]
    ],
    clipboard: {
      matchVisual: false
    },
    history:{
      delay:2000
    },
    imageUploader: {
      url: "/api/upload",
      callbackOK: (serverResponse:any, next:any) => {
        next(serverResponse);
      },
    },
    imageResize: {
      parchment: parchment,
      modules: ["Resize", "DisplaySize"]
    }
  };
  
const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "code-block"
  ];


const TextEditor = React.forwardRef<any,any>((props,ref) =>{
    const [content,setContent] = useState("")
    useEffect(()=>{
      if(props.content){
        setContent(props.content)
      }
    },[props.content])
    return  <ReactQuill ref={ref} modules={modules} value={content} onChange={setContent} formats={formats} />  
    
})

  
export default React.memo(TextEditor)