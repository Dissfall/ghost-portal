let elem = document.querySelector(".grid");

let msnry = new Masonry(elem, {
  itemSelector: ".grid-item",
  percentPosition: true,
});

imagesLoaded(elem, () => {
  console.log("asdfsd");
  msnry.layout();
});
