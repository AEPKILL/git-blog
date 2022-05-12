declare namespace SharkBlog {
  interface BlogConfig<T = any> {
    title: string;
    description: string;
    site: string;
    pageSize: number;
    author: string;
    language: string;
    postDir: string;
    metaDir: string;
    rootDir: string;
    theme: string;
    concat: string;
    publicPath: string;
    htmlInject: string[];
    extra?: T;
  }
}
