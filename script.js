const image = new Image();
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

image.src = 'path/to/image.jpg';
image.onload = function() {
  canvas.width = image.width;
  canvas.height = image.height;
  
  ctx.drawImage(image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const alpha = data[i + 3];
    
    // Check if the pixel color is close to the background color
    if (Math.abs(r - backgroundR) < 20 && Math.abs(g - backgroundG) < 20 && Math.abs(b - backgroundB) < 20 && alpha !== 0) {
      data[i + 3] = 0; // Make the pixel transparent
    }
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(imageData, 0, 0);
  
  const outputImgURL = canvas.toDataURL();
  const outputImg = document.createElement('img');
  outputImg.src = outputImgURL;
  
  document.body.appendChild(outputImg);
};
