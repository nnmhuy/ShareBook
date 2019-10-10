import * as loadImage from 'blueimp-load-image'

const dataURLToBlob = (dataURL) => {
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
// size small, medium, large, extraLarge
const resizeImage = (file, imageSize, callback) => {
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
      if (imageSize === 'medium') max_size = 400
      if (imageSize === 'large') max_size = 600
      if (imageSize === 'extraLarge') max_size = 800
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

const rotateImage = (file, rotateOption, callback) => {
  loadImage(file, (img) => {
    if (img.type === "error") {
      console.error("Error loading image ");
      return callback('err')
    }
    var dataUrl = img.toDataURL('image/jpeg');
    var rotatedImage = dataURLToBlob(dataUrl);
    return callback(null, {url: dataUrl, blob: rotatedImage})
  }, {
    orientation: rotateOption,
    canvas: true
  });
} 

export { resizeImage, rotateImage };