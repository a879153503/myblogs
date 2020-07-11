非空判断
---
错误列子:
````java
if(user.getUserName().equals("hollis")){
}
````
::: danger 警告
这段代码极有可能在实际运行的时候抛出NullPointerException。
无论是user本身为空，还是user.getUserName()为空， 
都会抛出异常。 所以，在调用一个参数时要确保他是非空的
:::
上面的代码可以改为：
```java
if(user!=null&&"hollis".equals(user.getUserName())){
}
```


用StringBuffer代替String
---
在循环中构建一个String对象时，从性能上讲使用StringBuffer来代替String对象更好。 例如：
```java
StringBuffer buf = new StringBuffer();
  for (int i = 0; i < field.length; ++i) {
    buf.append(field[i]);
  }
  String s = buf.toString();
```


尽量减少对变量的重复计算
---
明确一个概念，对方法的调用，即使方法中只有一句语句，也是有消耗的，包括创建栈帧、调用方法时保护现场、调用方法完毕时恢复现场等。所以例如下面的操作：
```java
for (int i = 0; i < list.size(); i++){
　　...
}
```
建议替换为：
```java
for (int i = 0, length = list.size(); i < length; i++){
　　...
}
```

懒加载的策略
---
例如：
```java
String str = "aaa";
if (i == 1)
{
　　list.add(str);
}
```
建议替换为：
```java
if (i == 1)
{
　　String str = "aaa";
　　list.add(str);
}
```

集合指定初始长度
---
比如ArrayList、LinkedLlist、StringBuilder、StringBuffer、HashMap、HashSet等等，以StringBuilder为例：
```java
StringBuilder()　　　　　　// 默认分配16个字符的空间
StringBuilder(int size)　　// 默认分配size个字符的空间
StringBuilder(String str)　// 默认分配16个字符+str.length()个字符空间
```

乘法和除法使用移位操作
---
例如：
```java
for (val = 0; val < 100000; val += 5)
{
　　a = val * 8;
　　b = val / 2;
}
```
用移位操作可以极大地提高性能，因为在计算机底层，对位的操作是最方便、最快的，因此建议修改为：
```java
for (val = 0; val < 100000; val += 5)
{
　　a = val << 3;
　　b = val >> 1;
}
```
::: tip 提示
移位操作虽然快，但是可能会使代码不太好理解，因此最好加上相应的注释。
:::

循环内不要不断创建对象引用
---
例如：
```java
for (int i = 1; i <= count; i++)
{
  Object obj = new Object();    
}
```
这种做法会导致内存中有count份Object对象引用存在，count很大的话，就耗费内存了，建议为改为：
```java
Object obj = null;
for (int i = 0; i <= count; i++)
{
  obj = new Object();
}
```
::: tip 提示
这样的话，内存中只有一份Object对象引用，每次new Object()的时候，Object对象引用指向不同的Object罢了，但是内存中只有一份，这样就大大节省了内存空间了。
:::

复制数组
---
```java
* @param      src      the source array. 源数组
* @param      srcPos   starting position in the source array. 源数组的起始位置
* @param      dest     the destination array. 目标数组
* @param      destPos  starting position in the destination data. 目标数组的起始位置
* @param      length   the number of array elements to be copied. 复制的长度

int[] array = {1, 2, 3, 4, 5};
int[] targetArr = new int[array.length];
System.arraycopy(array,0,targetArr,0,array.length);
```

不要让方法中有太多的形参
---
::: tip 提示
违反了面向对象的编程思想，太多的形参，和面向对象的编程思想并不契合。
参数太多势必导致方法调用的出错概率增加。
可以把这多个参数封装在一个实体类中，作为方法的形参。
:::

不要对数组使用toString()方法
---
```java
public static void main(String[] args)
{
    int[] is = new int[]{1, 2, 3};
    System.out.println(is.toString());
}

结果是：[I@18a992f]
```
::: tip 提示
本意是想打印出数组内容，却有可能因为数组引用is为空而导致空指针异常。
如果想打印数组可以使用Arrays.toString(array)
:::

基本数据类型转为字符串
---
::: tip 提示
把一个基本数据类型转为字符串，基本数据类型.toString()是最快的方式、String.valueOf(数据)次之、数据+""最慢。
:::
