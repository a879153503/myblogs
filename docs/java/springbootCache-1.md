数据库的数据是存储在硬盘上的，频繁访问性能较低。而缓存数据存储在内存中，访问性能比硬盘快了一个数量级。如果将一些需要频繁查询的热数据放到缓存中，可以大大减轻数据库的访问压力。

##### <font color='#B22222'>application.properties</font>
```xml
spring.redis.host=127.0.0.1
spring.redis.port=6379
spring.redis.database=0
spring.cache.cache-names=qpweb
spring.cache.redis.time-to-live=60000
```
+ spring.cache.cache-names: 在启动时创建缓存名称，即前面的cacheNames，多个名称用逗号分隔。
+ spring.cache.redis.time-to-live:  一分钟没再使用缓存就清空

`默认情况下，缓存的数据会一直保存在内存中，有些数据可能用一次后很长时间都不会再用，这样会有大量无用的数据长时间占用内存，通过配置properties可以及时清除不需要的缓存。`

##### <font color='#B22222'>pom.xml</font>
```xml
<!--WEB依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--redis依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!--spring-cache-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-cache</artifactId>
        </dependency>
```
##### <font color='#B22222'>启用缓存</font>
在你的springboot启动类中添加一个`@EnableCaching`注解,表示启动spring cache缓存
代码如下:
```java
@SpringBootApplication
@EnableCaching
public class ExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(ExampleApplication.class, args);
    }

}
```
##### <font color='#B22222'>使用缓存</font>
为了方便演示就不去连接数据库了，直接在service层返回数据
```java
    @Cacheable(cacheNames = "qpweb")
    public User getUserById(Integer id){
        System.out.println("getUserById>>>>>"+id);
        User user = new User();
        user.setId(id);
        return user;
    }
```
+ @Cacheable:指在执行在方法前，首先查找该方法是否有缓存，如果有则直接返回缓存，如果没有则执行方法。
+ cacheNames：指定缓存的名称，不同缓存的数据是彼此隔离的。

##### <font color='#B22222'>缓存的key</font>
上面cacheNames指定了缓存名称，但是每个方法由于传参不同，其return数据也会不同，所以一个方法中可能会有多个缓存。要在同一个cacheNames中区别不同的缓存，就需要使用key。修改前两行代码，给find方法传入了一个User，这是我自定义的类，其中有一个id参数。同时指定了key为"#user.id"，这是SpEL表达示，指使用user的id作为当前缓存的key。
```java
    @Cacheable(cacheNames = "qpweb",key = "#user.id")
    public User getUserById(User user){
        System.out.println("getUserById>>>>>"+id);
        return user;
    }
```
##### <font color='#B22222'>修改缓存</font>
```java
    @CachePut(cacheNames = "qpweb",key = "#user.id")
    public User updateUserById(User user) {
        return user;
    }
```
+ @CachePut：无论是否存在缓存，它都会执行，而且用return数据刷新缓存。
+ cacheNames：指定要修改的key所属的cacheNames。
+ key：这里方法参数就是id，所以可以直接用#id。
##### <font color='#B22222'>删除缓存</font>
```java
    @CacheEvict(cacheNames = "qpweb")
    public void deleteUserById(Integer id){
        System.out.println("deleteUserById>>>>>>"+id);
    }
```
+ @CacheEvict:执行完方法后把方法删除的数据从缓存统一删除
+ cacheNames：指定要修改的key所属的cacheNames。
+ key：这里就一个参数，如果多个参数要指定具体的key

##### <font color='#B22222'>全局配置:@CacheConfig</font>
`此注解标注在类上，可以统一配置一些属性`
```java
@Service
@CacheConfig(cacheNames = "qpweb")
public class CacheService {
}
```
`如上我就指定了这个类下面所有方法的缓存名称都为 "qpweb"`

##### <font color='#B22222'>condition条件</font>
如果只想将id为1的查询写入缓存，而其他数据不需要缓存。可以添加condition缓存条件，如下。这里id参数是个字符串型，所以加了单引号，否则1就是整数，条件不成立。
```java
@Cacheable(cacheNames = "hello",key="#user.id",condition ="#user.id=='1'" ) 
```
##### <font color='#B22222'>unless条件</font>
condition是在调用方法之前判断条件，决定是否缓存。unless是在调用方法之后判断条件，决定是否不缓存。
```java
	@Cacheable(cacheNames = "qpweb",unless="#result.id.contains('1')" ) 
	public User getUserById(Integer id){
        System.out.println("getUserById>>>>>"+id);
        User user = new User();
        user.setId(id);
        return user;
    }
```
+ unless：如果SpEL条件成立，则不缓存。
+ #result.id.contains：result指方法return的数据，id指return的user的id参数，contains指id的值是否包含'1'，如果包含则unless条件成立，不进行缓存。