# SHARK-BLOG

一个简单易用的静态博客框架

>这真是一个极好的博客解决方案。  --尼古拉斯·赵四
>
>Wow , such a easy static blog framework.  --Isaac·Two·Dog

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

# 为啥要写这个

一开始我是用 `hexo`的，但是我要使用两个仓库来管理我的博客，一个是用于存放博客源码一个则是用于发布。

而且当我使用在文章中插入图片的时候，我得需要先把图片上传到图床，然后获取链接在粘贴到文章里面。

还有一个次要的原因就是 `hexo g`有点慢，每次更新都要卡上十来秒。

`shark-blog`就是为了解决以上问题的，所有的博客文章都只需要存放在 `post` 目录下就好了，不用单独占用一个仓库，然后可以用相对路径来插入图片，比如在 `post/xxx.md` 中，你可以使用 `../img/logo.png` 来访问 `img/logo.png` 这个图片。

`shark-blog` 的更新处理速度也非常快，一千篇博客大概 1 秒钟就处理好了。

以上就是为什幺要写 `shark-blog` 的原因。

# 参(chao)考(xi)设计

* [HTML5-UP](https://html5up.net/)
* [UNO-ZEN](https://github.com/Kikobeats/uno-zen)

# License

MIT © [AEPKILL](mailto:a@aepkill.com)
