let images = [
  "/1.png",
  "/2.png",
  "/3.png",
  "/4.png",
  "/5.png",
  "/6.png",
  "/7.png",
  "/8.png"
];

function getRandomImage() {
  let randomNum = Math.floor(Math.random() * images.length);
  return images[randomNum];
}

export default getRandomImage;
