module.exports = {
    title: '乔鹏的博客',
    head: [
        ['link', {rel: 'icon', href: '/'}]
    ],
    themeConfig: {
        // logo: '/img/logo.jpg',
        nav: [
            {text: '首页', link: '/'},
            {text: '百度', link: 'http://www.baidu.com'},
            {text: '谷歌', link: 'http://www.itboyhub.com'},
            {
                text: '学习资源', items: [
                    {text: 'W3school', link: 'https://www.w3school.com.cn/index.html'},
                    {text: '菜鸟教程', link: 'https://www.runoob.com/'}
                ]
            }
        ],
        sidebar:[
            {
                title: 'Java',
                path: '/java/',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {title: 'java中的规范', path: '/java/java-1'},
                    {title: 'java代码优化', path: '/java/java-2'},
                    {title: 'springboot整合freemarker摘要', path: '/java/springboot-1'}
                ]
            },
            {
                title: 'jenkins',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {title: 'jenkins发包执行cmd启动jar111', path: '/jenkins/jenkins-1'},
                ]
            },
            {
                title: 'vue',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {title: '用webstorm2020.01&vuecli3搭建vue项目', path: '/vue/vue-1'},
                ]
            }
        ]
    }
};