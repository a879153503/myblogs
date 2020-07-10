
大小写敏感
---
::: tip 提示
Java 是大小写敏感的，这就意味着标识符 Hello 与 hello 是不同的。
:::

类名
---
::: tip 提示
对于所有的类来说，类名的首字母应该大写。如果类名由若干单词组成，那么每个单词的首字母应该大写。
```java
public class MyClass () {

}
```
:::

方法名
---
::: tip 提示
对于所有的类来说，类名的首字母应该大写。如果类名由若干单词组成，那么每个单词的首字母应该大写。
```java
public void getString () {

}
```
:::

变量名
---
::: tip 提示
变量名应该用有意义的英文单词，变量名如果只有一个单词，则所有的字母小写，变量名如果由多个英文单词组成，则从第二个单词开始首字母大写。
```java
String password = "password";
String lastName = "lastName";
```
:::

常量名
---
::: tip 提示
常量的声明应该全部大写，每个单词之间用_连接
```java
final String WWW_INEEKE_CN="www.ineeke.com"
```
:::

新建类
---
::: tip 提示
新建类都应该在开头有一个注释，其中列出创建人、日期和类的功能概述
```java
/**
 * demo
 *
 * @author 乔鹏
 * @date 2020/5/10
 */
public class Demo{
	
}
```
:::

对钱的类型定义
---
::: tip 提示
`在初学Java的时候，我们知道float和double都表示浮点数。
但是由于float和double所表示的浮点数是近似值，不是精确的值，
因此，二者不适合作为价格的数据类型。
Java语言提供了另外一种数据类型BigDecimal，可以表示精确的浮点数，
适合用作财务计算的数据类型。但是需要注意的是，
在使用BigDecimal的时候，BigDecimal有多个重载的构造方法能表示精度的值，
只有用参数为String类型的构造方法才能表示。`
:::
