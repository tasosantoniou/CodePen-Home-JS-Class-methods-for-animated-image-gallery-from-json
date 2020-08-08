let url = "https://picsum.photos/v2/list?page=3&limit=10";
let imagesAr = [];
fetch(url) 
  .then((resp) => resp.json())
  .then(function (data) {
    for (i = 0; i < data.length; i++) {
      let image = document.createElement("IMG");
      image.src = data[i].download_url;
      image.id = `image${i}`;
      image.loading = 'lazy'
      imagesAr[i] = image;
      document.querySelector("#container").append(image);
      imageNum = data.length;
    }
  })
  .then(function () {
    let index = 0;
    class Motion {
      constructor(element) {
        this.element = element;
        this.index = index;
      }
      moveRight(x) {
        var curRectX = this.positionX(this.element);
        var curRectY = this.positionY(this.element);
        this.element.style.transform = `translate(${
          curRectX + x
        }px, ${curRectY}px)`;
      }
      moveLeft(x) {
        var curRectX = this.positionX(this.element);
        var curRectY = this.positionY(this.element);
        this.element.style.transform = `translate(${
          curRectX - x
        }px, ${curRectY}px)`;
      }
      moveDown(y) {
        var curRectX = this.positionX(this.element);
        var curRectY = this.positionY(this.element);
        this.element.style.transform = `translate(${curRectX}px, ${
          curRectY + y
        }px)`;
      }
      moveUp(y) {
        var curRectX = this.positionX(this.element);
        var curRectY = this.positionY(this.element);
        this.element.style.transform = `translate(${curRectX}px, ${
          curRectY - y
        }px)`;
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
        function findLowestZIndex() {
          const elems = document.querySelectorAll(".container *");
          let lowest = 0;
          for (let i = 0; i < elems.length; i++) {
            let zindex = parseInt(
              document.defaultView
                .getComputedStyle(elems[i], null)
                .getPropertyValue("z-index")
            );
            if (zindex < lowest && zindex != "auto") {
              lowest = zindex;
            }
          }

          return lowest;
        }
        this.element.style.zIndex = `${findLowestZIndex() - 1}`;
      }
      toFront() {
        function findHighestZIndex() {
          const elems = document.querySelectorAll(".container *");
          let highest = 0;
          for (let i = 0; i < elems.length; i++) {
            let zindex = parseInt(
              document.defaultView
                .getComputedStyle(elems[i], null)
                .getPropertyValue("z-index")
            );
            if (zindex > highest && zindex != "auto") {
              highest = zindex;
            }
          }
          return highest;
        }

        this.element.style.zIndex = `${findHighestZIndex() + 1}`;
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

    let nextPressed = false;
    let prevPressed = false;
    document.getElementById("next").onclick = function () {
      nextPressed = true;
    };
  
  document.getElementById("previous").onclick = function () {
      prevPressed = true;
    };

    document.getElementById("next").addEventListener("click", function () {
    if (prevPressed && click<=imageNum-2) {
        click = click + 1;
        prevPressed = false; 
      }
      
      if (click < imageNum - 1) {
        next(imagesAr[click]);
        click++;
      } else { 
        next(imagesAr[click]);
        click = 0;
      }
      front = click - 1;
      console.log(front);
      return front;
    });

    document.getElementById("previous").addEventListener("click", function () {
      if (nextPressed && click>=1) {
        click = click - 1;
        nextPressed = false;
      }

      if (click > 0) {
        previous(imagesAr[click]);
        click--;
      } else {
        previous(imagesAr[click]);
        click = imageNum - 1;
      }
      console.log(click);
      return click;
    });
  });
