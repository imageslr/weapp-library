module.exports = {
  title: '在线借书平台',
  description: '一个连接读者与读书馆的图书资源共享平台',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }]
  ],
  base: '/weapp-library/',
  themeConfig: {
    sidebar: {
      '/guide/': [{
        title: '文档',
        collapsable: false,
        children: [
          '',
          'install',
          'feature',
          'front',
          'api',
        ]
      }]
    },
    repo: 'imageslr/weapp-library',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: '在 Github 上编辑此页',
    lastUpdated: '上次更新'
  }
}
