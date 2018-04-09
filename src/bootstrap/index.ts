const bootstrapCss = document.getElementById('bootstrap-animation')!;
const animationElement = document.getElementById('sky')!;

class Bootstrap {
  animationPlaying = false;
  appLoaded = false;
  constructor() {
    setTimeout(this.playBootstrapAnimation.bind(this), 1000);
  }
  playBootstrapAnimation() {
    if (!this.appLoaded) {
      animationElement.style.display = 'block';
      this.animationPlaying = true;
    }
  }
  endBootstrapAnimation() {
    animationElement.className = `${animationElement.className} end`;
    setTimeout(1500, this.onBootstrapAnimationEnd.bind(this));
  }
  bootstrap() {
    bootstrapCss.parentElement!.removeChild(bootstrapCss);
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
