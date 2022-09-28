import {QuillOptions} from 'react-quill'
import Delta from 'quill-delta'
interface Options {
  url: string
  callbackOK: (url:string,next: (url:string) => void) => void
}

class ImageUploader {
  public quill: any
  public option: Options

  constructor(quil: QuillOptions, option: Options) {
    this.quill = quil
    this.option = option
    this.quill
    .getModule("toolbar")
    .addHandler("image", this.selectLocalImage.bind(this))
  }
  private selectLocalImage() {
    const input:HTMLInputElement = document.createElement("input")
    console.log(this.quill.getContents())
    input.setAttribute("type", "file")
    input.click()
    input.onchange = () => {
        const file = input.files
        if(file === null){
            return
        }
        if (/^image\//.test(file[0].type)) {
            this.sendToServer(file[0])
        } else {
            console.warn('You could only upload images.');
        }
    };
  }
  private sendToServer(file:File){
    if(this.option.url){
        const fd = new FormData()
        fd.append("image",file)
        fetch(this.option.url,{method:"POST",body:fd})
        .then(async res=>{
            if(res.ok){
                let dataUrl = await res.text()
                this.option.callbackOK(dataUrl,this.insert.bind(this))
            }
            else return
        })
    }
  }
 private insert(dataUrl:string) {
    const index = (this.quill.getSelection() || {}).index || this.quill.getLength();
    this.quill.updateContents(new Delta().retain(index).insert({image:import.meta.env.VITE_UPLOAD_URL + dataUrl},{link:import.meta.env.VITE_UPLOAD_URL + dataUrl}))
    // this.quill.insertEmbed(index, 'image', import.meta.env.VITE_UPLOAD_URL + dataUrl , 'user');
}
}

export default ImageUploader
