let url = "https://picsum.photos/v2/list?page=3&limit=10";
let imagesAr = [];
fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
    for (i = 0; i < data.length; i++) {
      let image = document.createElement("IMG");
      image.src = data[i].download_url;
      image.id = `image${i}`;
      imagesAr[i] = image;
      document.querySelector("#container").append(image);
      imageNum = data.length;
    }
  })
  .then(function() {
    let index = 0;
    class Motion {
      constructor(element) {
        this.element = element;
        this.index = index;
      }
      moveRight(x) {
        var curRectX = this.positionX(this.element);
        var curRectY = this.positionY(this.element);
        this.element.style.transform = `translate(${curRectX +
          x}px, ${curRectY}px)`;
      }
      moveLeft(x) {
        var curRectX = this.positionX(this.element);
        var curRectY = this.positionY(this.element);
        this.element.style.transform = `translate(${curRectX -
          x}px, ${curRectY}px)`;
      }
      moveDown(y) {
        var curRectX = this.positionX(this.element);
        var curRectY = this.positionY(this.element);
        this.element.style.transform = `translate(${curRectX}px, ${curRectY +
          y}px)`;
      }
      moveUp(y) {
        var curRectX = this.positionX(this.element);
        var curRectY = this.positionY(this.element);
        this.element.style.transform = `translate(${curRectX}px, ${curRectY -
          y}px)`;
      }
      positionX(rect) {
        var bodyRect = document
          .querySelector("#container")
          .getBoundingClientRect();
        let curRectX = rect.getBoundingClientRect().left - bodyRect.left;
        return curRectX;
      }
      positionY(rect) {
        var bodyRect = document
          .querySelector("#container")
          .getBoundingClientRect();
        let curRectY = rect.getBoundingClientRect().top - bodyRect.top;

        return curRectY;
      }
      scale(value) {
        this.element.style.transform = `scale(${value},${value})`;
      }
      rotate() {
        this.element.style.transform = `rotate(${Math.random() * 25 - 10}deg)`;
      }
      toBack() {
        index = index - 1;
        this.element.style.zIndex = `${index}`;
      }
      toFront() {
        index = index + 1;
        this.element.style.zIndex = `${index}`;
      }
    }

    function next(element) {
      const box = new Motion(element);
      box.moveRight(295);
      setTimeout(() => {
        box.toFront();
      }, 300);
      setTimeout(() => {
        box.moveLeft(295);
        box.rotate();
      }, 450);
      setTimeout(() => {}, 750);
    }

    function previous(element) {
      const box = new Motion(element);
      box.moveRight(-295);
      setTimeout(() => {
        box.toBack();
      }, 300);
      setTimeout(() => {
        box.moveLeft(-295);
        box.rotate();
      }, 450);
      setTimeout(() => {}, 750);
    }

    function rotation(element) {
      const box = new Motion(element);
      box.rotate();
    }

    for (i = 0; i < imageNum; i++) {
      rotation(imagesAr[i]);
    }

    let click = 0;
    document.getElementById("next").addEventListener("click", function() {
      if (click < imageNum - 1) {
        next(imagesAr[click]);
        click++;
      } else if ((click = imageNum - 1)) {
        next(imagesAr[click]);
        click = 0;
      } else {
        click = 0;
      }
    });
  
  //previous button not yet running properly
    document.getElementById("previous").addEventListener("click", function() {
      if (click < imageNum - 1) {
        previous(imagesAr[click]);
        click++;
      } else if ((click = imageNum - 1)) {
        previous(imagesAr[click]);
        click = 0;
      } else {
        click = 0;
      }
    });
  });
