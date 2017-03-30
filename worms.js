import P5 from 'p5'

export default new P5((sketch) => {
  let angles, nrOfWalkers, walkers, stepSize, w, h

  class Walker {
    constructor (stepSize) {
      this.x = sketch.floor(sketch.random(w / stepSize)) * stepSize
      this.y = sketch.floor(sketch.random(h / stepSize)) * stepSize
      this.stepSize = stepSize
      this.hue = sketch.random(60) + 260
      this.tail = []
      this.tailLength = 20
    }

    walk () {
      if (this.tail.length > this.tailLength) {
        this.tail.splice(0, 1)
      }

      var angle = sketch.random(angles)
      this.x += sketch.cos(angle) * this.stepSize
      this.y += sketch.sin(angle) * this.stepSize
      this.tail.push([this.x, this.y])
      sketch.stroke(this.hue, 100, 55, 1)

      for (var i = 0; i < this.tail.length - 1; i++) {
        var p1 = this.tail[i]
        var p2 = this.tail[i + 1]
        sketch.line(p1[0], p1[1], p2[0], p2[1])
      }
      this.bounce()
    }

    bounce () {
      if (this.x < 0) this.x = 0
      if (this.x > w) this.x = w
      if (this.y < 0) this.y = 0
      if (this.y > h) this.y = h
    }
  }

  sketch.setup = () => {
    nrOfWalkers = 50
    angles = [0, sketch.PI / 2, sketch.PI, 3 * sketch.PI / 2]
    stepSize = 8
    sketch.setWidthAndHeigt()

    walkers = []
    for (var i = 0; i < nrOfWalkers; i++) {
      var walker = new Walker(stepSize)
      walkers.push(walker)
    }

    console.log(sketch.createCanvas)
    sketch.createCanvas(w, h)
    sketch.strokeWeight(2)
    sketch.colorMode(sketch.HSL)
  }

  sketch.draw = () => {
    sketch.background('black')
    walkers.forEach((w) => {
      return w.walk()
    })
  }

  sketch.mouseDragged = () => {
    // Add your code here
  }

  sketch.keyPressed = (key) => {
    if (key === '') {
      // Add your code here
    }
  }

  sketch.windowResized = () => {
    sketch.setWidthAndHeigt()
    sketch.resizeCanvas(w, h)
  }

  sketch.setWidthAndHeigt = () => {
    w = sketch.round(sketch.windowWidth / stepSize) * stepSize
    h = sketch.round(sketch.windowHeight / stepSize) * stepSize
  }
})
