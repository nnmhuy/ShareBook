var dataURLToBlob = (dataURL) => {
  var BASE64_MARKER = ';base64,';
  var parts, contentType, raw;
  if (dataURL.indexOf(BASE64_MARKER) === -1) {
      parts = dataURL.split(',');
      contentType = parts[0].split(':')[1];
      raw = parts[1];

      return new Blob([raw], {type: contentType});
  }

  parts = dataURL.split(BASE64_MARKER);
  contentType = parts[0].split(':')[1];
  raw = window.atob(parts[1]);
  var rawLength = raw.length;

  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], {type: contentType});
}

var resizeImage = (file, isBigImage, callback) => {
  // Load the image
  var reader = new FileReader();
  reader.onload = function (readerEvent) {
    var image = new Image();
    image.onload = function (imageEvent) {

      // Resize the image
      var canvas = document.createElement('canvas'),
        max_size = 200,// TODO : pull max size from a site config
        width = image.width,
        height = image.height;
      if (isBigImage) {
        max_size = 400
      }
      if (width > height) {
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        if (height > max_size) {
            width *= max_size / height;
            height = max_size;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, 0, 0, width, height);
      var dataUrl = canvas.toDataURL('image/jpeg');
      var resizedImage = dataURLToBlob(dataUrl);
      // $.event.trigger({
      //   type: "imageResized",
      //   blob: resizedImage,
      //   url: dataUrl
      // });
      callback({url: dataUrl, blob: resizedImage})
    }
    image.src = readerEvent.target.result;
  }
  reader.readAsDataURL(file);
}

export default resizeImage;