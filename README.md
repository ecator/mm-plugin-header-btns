# Channel header buttons for Mattermost plugin ![build status](https://github.com/ecator/mm-plugin-header-btns/actions/workflows/build.yml/badge.svg)

 在频道顶部增加一排链接按钮，主要用于连接其他系统的一个快捷入口。
 
# 开发

需要下面的环境：

- go: 1.19
- nodejs: 14

当然推荐使用[Docker Dev Environment](https://open.docker.com/dashboard/dev-envs?url=https://github.com/ecator/mm-plugin-header-btns)，克隆好代码后可以直接运行下面命令编译：

```
make dist
```

如果需要测试推荐使用下面方式发布到服务器：

```
export MM_SERVICESETTINGS_SITEURL=http://ip:8065
export MM_ADMIN_TOKEN=<your_personal_access_token>
make deploy
```
# 使用

在插件设置页面可以看到`urls`、`icons`、`titles`这3项目，每个项目可以用换行符隔开以此添加多个，最后个数以`urls`为准。

需要注意的是修改配置后需要禁用一次插件然后再重新启用，不然客户端的按钮不能更新。


# 参考

- [Overview of Mattermost Plugins](https://developers.mattermost.com/integrate/plugins/overview/)
- [mattermost/mattermost-plugin-starter-template: Build scripts and templates for writing Mattermost plugins.](https://github.com/mattermost/mattermost-plugin-starter-template)
- [mattermost/mattermost-plugin-demo: A demo of what Mattermost plugins can do.](https://github.com/mattermost/mattermost-plugin-demo)
