# MBRUSH
mbrush 是用户在移动端网页中对图片进行操作的前端库
## 主要技术点
### 文件操作

#### 文件选取
[Using files from web application](https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications) 通过监听 input 的 onchange 可以拿到当前上传的文件对象，
在 this.files 里面是一个文件对象列表，如果是多选文件的话，我们需要通过 forEach 去拿到单个的 File 对象，如果是单选文件，那么 files 的第一个就是当前文件。

#### FileReader
当拿到文件后，我们这时需要通过 FileReader 将其读取成我们想要的格式。 [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) 是用于读取 [File](https://developer.mozilla.org/en-US/docs/Web/API/File) 或者 [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
的对象，这里我们通过 onchange 事件拿到 File 对象后只需要 new 一个 FileRader 对象，FileReader 对文件的读取是一个异步的过程，所以我们需要监听它的 onload 事件来获取最后的
文件数据。

FileReader 对象事件处理方法：
* FileReader.onabort
* FileReader.onerror
* FileReader.onload
* FileReader.onloadstart
* FileReader.onloadend
* FileReader.onprogress

FileReader 的方法有：
* FileReader.abort()
* FileReader.readAsArrayBuffer()
* FileReader.readAsBinaryString()
* FileReader.readAsDataURL()
* FileReader.readAsText()

下面的例子中，我们 new 了一个 FileReader 对象， 然后监听 reader 的 onload 的方法，以 DataURL 的方式去读取文件内容，这样得到的 result 实际上是一个 base64 的图片地址

```javascript
var reader = new FileReader();
reader.onload = function (e) {
    console.log(e.target.result)
}
reader.readAsDataURL();
```

在 mbrush 中，我们对文件的操作有两种方式：
* 通过 readAsDataURL 的方式读取图片地址，将其作为 src 复制给一个图片，使得图片可以渲染出来，然后通过 canvas 的 drawImage 将我们选取的图片转换到 canvas 上。
* 由于我们在选取图片的时候，要判断图片拍摄的方向，所以需要读取图片的 EXIF 信息。图片的 EXIF 信息是存在图片文件的前 128kb 的内容中，所以我们要将图片的前 128kb 信息通过
readAsBinaryString 的方式读取出来，然后再根据 EXIF 的规范去进行文件解析。

#### Blob
#### ArrayBuffer
#### DataView
