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
        // sidebar: {
        //     '/java/': [{
        //         title: 'java',
        //         collapsable: false,
        //         children: [
        //             {title: 'java中的规范', path: '/java/java-1'},
        //             {title: 'java代码优化', path: '/java/java-2'}
        //         ]
        //     }],
        //     '/jenkins/': [{
        //         title: 'jenkins',
        //         collapsable: false,
        //         children: [
        //             {title: 'jenkins发包执行cmd启动jar', path: '/jenkins/jenkins-1'}
        //         ]
        //     }]
        // }
        sidebar:[
            {
                title: 'Java',
                path: '/java/',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {title: 'java中的规范', path: '/java/java-1'},
                    {title: 'java代码优化', path: '/java/java-2'},
                ]
            },
            {
                title: 'jenkins',
                path: '/jenkins/',
                collapsable: false,
                sidebarDepth: 2,
                children: [
                    {title: 'jenkins发包执行cmd启动jar，当jenkins job完成jar停止', path: '/jenkins/jenkins-1'},
                ]
            }
        ]
    }
};