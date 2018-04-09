interface SharkBlog {
  onBootstrap?(): void;
  onAppLoaded?(): void;
}
interface Window {
  sharkBlog: SharkBlog;
}

declare const sharkBlog: SharkBlog;
