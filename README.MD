# SHARK-BLOG

一个简单易用的静态博客框架


# 安装

```shell
npm install shark-blog -g
```

# 预览

[AEPKILL-BLOG](http://blog.aepkill.com/)

# 快速上手

创建一个新的博客并启动一个本地服务器来预览:

```shell
blog create my-blog
cd my-blog
blog start
```

# shark-blog.json

新创建的博客下有一个 `shark-blog.json`文件，这个是博客的配置文件，它包含以下可配置项：

1. title 博客的 title
2. description 简短的描述
3. site 博客部署的网站域名
4. pageSize 每页包含多少博客项
5. author 博客作者
6. concat 博客作者联系方式
7. language 博客语言
8. rootDir 博客根目录
9. postDir 博客文章存放的目录，相对于博客根目录
10. theme 博客主题
11. publicPath 博客的公共路径，这个值现在没用到，保留
12. htmInject 一个数组，存放要注入博客元数据的 `html` 文件
13. extra 这个值是给主题用的，由具体的博客主题决定

# 定制主题

如果要自己写主题的话，参考 `src`目录下的默认主题源码。

# 为啥要写这个

一开始我是用 `hexo`的，但是我要使用两个仓库来管理我的博客，一个是用于存放博客源码一个则是用于发布。

而且当我使用在文章中插入图片的时候，我得需要先把图片上传到图床，然后获取链接在粘贴到文章里面。

还有一个次要的原因就是 `hexo g`有点慢，每次更新都要卡上十来秒。

`shark-blog`就是为了解决以上问题的，所有的博客文章都只需要存放在 `post` 目录下就好了，不用单独占用一个仓库，然后可以用相对路径来插入图片，比如在 `post/xxx.md` 中，你可以使用 `../img/logo.png` 来访问 `img/logo.png` 这个图片。

`shark-blog` 的更新处理速度也非常快，一千篇博客大概 1 秒钟就处理好了。

大概就这些原因吧。

# 参(chao)考(xi)设计

* [HTML5-UP](https://html5up.net/)
* [UNO-ZEN](https://github.com/Kikobeats/uno-zen)

# License

MIT © [AEPKILL](mailto:a@aepkill.com)
