const bootstrapStyle = document.getElementById('bootstrap-animation')!;
const animationElement = document.getElementById('loading')!;

class Bootstrap {
  animationPlaying = false;
  appLoaded = false;
  constructor() {
    setTimeout(this.playBootstrapAnimation.bind(this), 800);
  }
  playBootstrapAnimation() {
    if (!this.appLoaded) {
      animationElement.style.display = 'block';
      this.animationPlaying = true;
    }
  }
  endBootstrapAnimation() {
    animationElement.className = `end`;
    setTimeout(this.onBootstrapAnimationEnd.bind(this), 1100);
  }
  bootstrap() {
    bootstrapStyle.parentElement!.removeChild(bootstrapStyle);
    animationElement.parentElement!.removeChild(animationElement);
    if (sharkBlog.onBootstrap) {
      sharkBlog.onBootstrap();
    }
  }
  onBootstrapAnimationEnd() {
    this.animationPlaying = false;
    this.bootstrap();
  }
  onApploaded() {
    this.appLoaded = true;
    if (this.animationPlaying) {
      this.endBootstrapAnimation();
    } else {
      this.bootstrap();
    }
  }
}

const bootstrap = new Bootstrap();
window.sharkBlog = {};
sharkBlog.onAppLoaded = bootstrap.onApploaded.bind(bootstrap);
