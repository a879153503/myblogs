第一步，当然是添加依赖

```xml
	 <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-freemarker</artifactId>
     </dependency>
```
添加好依赖后
springboot会做自动化依赖配置
基本来说不用再做任何配置就可以使用freemarker了。

当然，如果要了解他是如何运行的，还请往下面看

依赖后会有这么一个类
```java
FreeMarkerAutoConfiguration
```
里面有这么一个注解
```java
@ConditionalOnClass({ freemarker.template.Configuration.class, FreeMarkerConfigurationFactory.class })
```
大致可以理解为如果咱们有freemarker的依赖项那么下面的配置才会生效
往下看
还有这么一个注解
```java
@Import({ FreeMarkerServletWebConfiguration.class, FreeMarkerReactiveWebConfiguration.class,
		FreeMarkerNonWebConfiguration.class })
```
看名字大致知道
1. 为web环境下的freemarker配置
2. 第二个为Reactive web环境下的freemarker配置
3. 第三个为javaSE环境下的freemarker配置

 那么本文以第一个环境配置为例子
进去后会发现
```java
	@Bean
	@ConditionalOnMissingBean(name = "freeMarkerViewResolver")
	@ConditionalOnProperty(name = "spring.freemarker.enabled", matchIfMissing = true)
	public FreeMarkerViewResolver freeMarkerViewResolver() {
		FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();
		getProperties().applyToMvcViewResolver(resolver);
		return resolver;
	}
```
会有这么一个视图解析器
这也是freemarker的核心配置

不知大家发现没有，这里有这么一个注解
```java
@ConditionalOnMissingBean(name = "freeMarkerViewResolver")
```
简单来说就是 如果你已经自己定义了一个名字为'freeMarkerViewResolver'的视图解析器
那么spring的就不会生效 没有则反之

>这也体现了spring“约定大于配置”的理念
即：如果你配置了那么就用你的，如果你没配置就用spring的
这在spring大多数源码里大家都可以看到
这里不做过多赘述

最后一个
freemarker默认的访问路径是在根目录resources下的templates目录里
在FreeMarkerAutoConfiguration类里有这么一个注解
```java
@EnableConfigurationProperties(FreeMarkerProperties.class)
```
点进去会发现
```java
@ConfigurationProperties(prefix = "spring.freemarker")
```
有这么一个注解
类型安全的属性注入
前缀为spring.freemarker
下面有这么几个配置项
```java
public static final String DEFAULT_TEMPLATE_LOADER_PATH = "classpath:/templates/";

public static final String DEFAULT_PREFIX = "";

public static final String DEFAULT_SUFFIX = ".ftl";
```
以第一个为例
这个就是freemarker默认的访问路径

在springboot的application.properties里就可以进行配置
```java
spring.freemarker.template-loader-path=你自己的路径
```