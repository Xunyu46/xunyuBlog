---
title: Symbol、BigInt、模板字符串的应用场景和底层原理
date: 2023-10-30
sidebar: 'auto'
categories:
  - ES6
tags:
  - ES6
publish: true
---

# Symbol、BigInt、模板字符串的应用场景和底层原理

本节会重点学习模板字符串和 ES6 中新增的两种原始数据类型 Symbol 和 BigInt，模板字符串与 Symbol 在未来的实际开发几乎每天都会使用。

> 接下来我们会从以下几个方面来展开讲解

**原始数据类型 Symbol**

- 什么是 Symbol
- Symbol 的语法规范
- Symbol 属性的遍历
- `Symbol.keyFor()`
- Symbol 的作用
- Symbol 与基本数据类型的转换

**原始数据类型 BigInt**

- 为什么要有 BigInt 类型
- 如何定义 BigInt 类型数据
- 注意事项

**模板字符串**

- 什么是模板字符串
- 模板字符串的注意事项
- 模板字符串在实际开发中的应用

**标签模板**

- 模板字符串中没有变量
- 模板字符串中有变量
- 函数内还原原模板字符串
- 标签模板应用场景

**模板字符串大厂面试真题解析**

- 手写 ES6 的模板字符串（百度）
- 扩展知识：eval、Function 构造函数

## 一、原始数据类型 Symbol

ES5 的对象属性名都是字符串，这容易造成属性名的冲突。比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。

如果有一种机制，能保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。

> 这就是 ES6 引入`Symbol`的原因。

### 1、什么是 Symbol ？

Symbol（符号、象征） 是 ES6 中引入的一种新的**基本（原始）数据类型**，用于表示一个独一无二的值。它是 JavaScript 中的第七种数据类型，与 undefined、null、Number（数值）、String（字符串）、Boolean（布尔值）、Object（对象）并列。

> 创建一个 Symbol 值的方式如下：

```js
const s = Symbol()
console.log(s) // Symbol()
console.log(typeof s) // 类型是：Symbol
```

![image-20221027170048081](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2QAAAB3CAIAAADjIBQ3AAAgAElEQVR4nO3df1xT970/8DfftnvQ613HDzkkyGaDTZ3OMEp5FLXLqsiXQUq7KcZuXVsYP/ro2sID702xl3XzctdylXJXHnBr/VZlSat2NVq7XgqMC2ibVqDDyCWKs6iRTsnhIILtXPNYr+P7x0lOTn5BAvkB+no++INzcn58kvPJJ+983p/zScTVL/5CAAAAAACe/J9wFwAAAAAA5i4EiwAAAADgFYJFAAAAAPDq1nAXgIzG4y3vv2+1WqfdUiKVFhWXREZG+nLYM5+eW3r3klmXDgAAAOCmFv5gsc9oXLZ8eWrqvdNuuWf3LtZiuVMmC0GpAAAAAIC8BYsTE+MnjMZpd46Kil62fLmPXX1THwchIAAAAMAc5DlY3Ld3LxHdPl0U+KXVajQeLyouCXy5AAAAAGAO8BwsshZLUXHJtL19F8zmPbt3BaFUAAAAADAnhH/M4tzGGapr9JxoRUp+fYFirK2mqjd1a2VmbNgKFk5XWrZs3N5tX1qp0W9XxQX/rKYdGaXUcPTp7wT/VB7068oaTfYFRWldvjwsxQgZrv2V6lZzSn59gUK81lBdw+bWqpPDUaR+XVkjhfCVd3nvM+rKCiXj3yEGtZqGPiIm+6ZtK5z068oaTTJVxeYst9exX1fWaFIWhqlqhdagVtPQF4g2RPSOCMgxx9pqqpppBvU8FELWAnPtr1S3ksdaOvcMajVNCS5FNenLdQbXptuNr80pZ6iu6U2r2JzFhCdYnJgYP9LReWX8ChGxFsv4+ITZfJ6IEhISclQPhqVIU5hbTVi/rqxpUfg+e640b1lfSxUHj26P4VeYduxkiUIQLIbPWFtNVXN8aV2t3LaoG+BIPg9aklnr0+n7/a38YQ0oA83x3u/XlVXXkD+fo2NtNQ3D2VvrECY6MTe3DGa5fERxhiaTl81vPKa+PkbGmPr6SR6494i8oLZ+Jvs5vVtjsyrqswJWpAAKaQvMZG6uy7QvmPTlLZK5GT17pVDX1apncwAvMcas5lmMio5am7FuBjsOnBowGo9fMJsvmM1Wq3ViYpz//9jHH18wm2dTJAiqUzvX18pe7dz+YIywSvH0U1N+gZn/uIFeTqbKET7eYrPy51XbMWMKtYoxNOoGw12OOSE5vzSF6+3jpt9SLCEekaITRqFkTH39ziu5/l6Okd0U7ymifqMhJeeJNMZgvHni41m6aVvgucXXnsWJifGoqGiXlVFR0RnrZhIsWq3WyMhIqVTqst48PyNFW7KJSNQ9btKX66gwnxp1Bvv6mLaaqmaOyJbLtu8tynYJ6Sq+i7hyUVN1q1l0WPuJTFXlrfaDmPTl/ClcDhsEo+/v/d1KjX6Ft8fF6en0LYf/PYcPKU/uXPMMNRz+1t71tT1ERJsaPrDHlyd3rnnmAP/vj1/tfMp25FM7Hyj9ne2Yoo2diLZ5JMi5aUaSQObhESJP7ROfrrVtKGQb+asv9K6Jvr7zV7aQGhpNwvUS1R8h1+mpVnheGUSSrAJ1b02D1uSlXrmVR3g1GjUGYtSVBbRb1MvYrytrHBE/QftDojosSjDxgz1K04wNzZxMVbFZIjrzFAnNYLJVA9FFd5TB+cqWkq6hj4h0ZeX2bTxXFden+QRphUX78Ufsr484FS7Okgsvmi1nlDtcw9co55dI9Do7NTW2qCUkKZRFKWkjDU3tGcmO2jvY3Eqq/LReHevYzHuryL/CxDd38cJmzoX3oUY9oKQPzqSJOo08ZfQCb9BoUqbmx0pGZM0tBk4hvpriCydqzPnGpELSZHumHqu9y8goD02K6EK7Vkjbu7VCyTqlJseEDyynk05dx4JhyhbYSwUWF15ZWKtO9r1NJtuWZD9ytUZPitLKRU3VxtBXGP85EsfCor3m5Kf16pzSPo5GyVuMEc9vOKjV+BosHvv44xNGo0yWJEtKkslkErc4z19SqbTQ7TbqX/6icpaHDb1BraaB8uvrFMRX0Op24R1raDSW1tWqiTNU1zSUayglv75OQVz7K9VCds92XeuzGP5QVdp4oY1o2L1oa11tLL+71lRfoJAX1NY7dRFzhmrdRRW/O2doGwnuU2WHetK//5yXjPOpnQ+UmoX09Mmda9b/CwnxIh0o3a7Rf9AZR1datmws3aE8+vR36ErzlmeGthzuzIkhutLcMkxEtjS37NXOoyuIiEbf/xf1Azvd4sVTOx8oJds2V1q2bNzy/kFxZ2egyVXZsmpdWbVbfGaLfmo3M0T85asmH2I4U4Mxv74un18Y1Gocycr+dgORt1oxqK3RJ+TXVyqIaLCtPdDP0iNGWZzdWy3+VBN4LGTm5rpkcWJrLI3RG03qZAURjbEjRBzL8m3+CMsxEomttUosrK3nt2+rqSrXOUbScK1NVFFfx0djwpnbXwnD+DaOHSZZWjxx7a9UG9NsF92kL6/RS4SSiK9s7da2mqrhHNvbeeqqInqaY22ixX5dWWNNWTOjrqytZ2hQq2nY3b6c34vrZ0UvvjigNzfX9BXW1hfwJ9UaUviPN5O+XGgr7PXHNm6pVk78hagxBD/jFpOVo2xuGeAy7Scy9fUxaap46hU2mbJV5F9hrv2Val1ZOSkLa+uTaaytpqpRl8JXG19rFGc4bejt45S2z1S+GEF+8lx7U58it4CIktOYVtHZicQXjjhDdU2Z1vHl39Co5esAX+VeoaliFE9NCg0axRearxWu71ZivRzE7aRe6liwTNkCe6jA9rR1Bb/ewHo+rIj4nWvv8U3Or68Tp6E550sWkgozW5yh2vGpMdZWU8WR0vGoTzEG2S+3r2loWVKS1Wo9fXqg+f2mV/+z4aVf/9v+vXu7jh1jLZaAP7+5xtCoKSu3/eldEyjtTX2KUvtbOjYrR8kZB+ypKmUh30IxylwFkX0zJjM3hS6yHBFRf4uesp+wvwPlqmxZn9Ge9WPUxfzVYpS5ChoeGfNSvEQJvzujzApuPvjKxSGSLfYck/GdjhohYlvxVMMjPUe7rtgfT9+yhb8JJibn8U00NDRqW784kd8jRpWzgojI9Lvankca7F2MFPfgc1tWHvj4pNu5HNvE5Dy+qefD7lEKIiZzc12FmlqryjVlWiF5xBmaTDJVgdBKygvyxVd/isOpVfYrxdcfoQVMzlQyU9UKWYLte548K1Qj4ZjMJ1Sk393uWv2mqroOsZJ4sq3nBnpJmWLPvvUbDUzqcoYGm1vNKflC2BebVaB2SlMqcl0/FE366lZSVYR4TORYm1bPKXKzmMHmVnJcdEWGSpxPFF1ZJ9NWFeenydhf2OQcNUPCjnJVtoy7ZHtPMZlq4cVPdW4fhNczOUfNcCzLl7/FkJIvfNjLszJjiTM0mextFN8u+Z9nnwlFhor0zbYXbaytxZCS4xRqTFW1nFpR4ZnGZuUoaYRvU32uUczyNMbc22973ewVMqjG+ozmlFS5+9l5jmIzylwFid5QMucq57qjmMcmhUheIFzo5DR7rfCKa2/qEz6AiEihLlQ4ndRTHQsi7y2wpwps6mwmdaVjvXL6tsLbO9dpm9BXmNnqb9Fz4vikQO1UYOcYw1MDbpOSr072OQ0tkyWJF/nA8fTpASJatmz5o4895s8zmGem6sNgL5nJ1FCucdqe9dRfzixyD7PG2BHiTFXlreLtWI7kRETxEvFBuEtXiNziA2Z5GqNv1BhCdruleegKrfAQL7JDPbT4MXGno2Rxes+QhYjf2B4U8ro/Y4niYlauWVlb+sCB9AqhX/DKxSFK/7641zomcTEddT4pO9RDb/eseVt8/k1Bv8mGUVbWKsmkL9eVlfM99iMsJ0TqvHgJI/ScTcFxZcf6jGYm1eX19FYrlKkKc2NNWXOo78WOzcpRNuveaEveLBr87rXqujz35FQltbAcyam/l1KfUNHF3SNjpCB2RJaWE0vcAN9dJzqIJIF6WY6SGSL3d81IU7UulDcqGho1jrxtXWYscYZhMvfVlDWLizwyRopYItf3rMN0VcVT4yBI9HJQp/tDmUXCauEbBe8iy1EyDfRyzq+zrVSOJ2hfOW31nb3YlFRZs3GQFHLiBno5Za6C78DgTdkqOnF5pkTk6AAW7eutRvHFGOAylQxnaDIpc/OD3IQKT9bl7LaHnZ6OZJGMLglL4joQK3F/1g4emxT+7OK7+5UeNhBhL5kpPldcESSLZKLPIE91LNjVxnML7KEC9xsNFF/qX3G8vXOdhLzCzNYYO0KeKwPPp2dN9svta7AYGRkpkUpd+hEjIyPXZqxbff/9Ph7kBjW7D2+PcZ7PX9T4+9cGtZqq8tZgjx2JSVxMovjPVfpif4cmxORs78yhUzsf2LimxjHG0VvnpZNgj1P0RqGuq5BU1zS1cZuziIiRSKbdZToe74HwWCuY/Po6Pq2mCfr4VCcKdaGirLFlMCtn+kK67ZuSomvq45aTkdIKYpmRRK5lgEumXi4xl+FDBK/BkBfm3v6xUHWsevyiOKM3WiCqioh9qpRaOfF3L06/i8fXOTxTPTCZuSmapjZus6RFT9lb3Qswu1bR1xrFZOamtPaxRNTfyylyg/06cP29HJldghvnTHRguDcp9ulgbAOWqmumfy2n/AITPi4tsKcK3G8MVuFDXGECInD32PlxN7TMeY7uqOjoZ0pLb/ZIUbJIZk9/zECsJJ6EvNIsyAtq6yuzqbkluDeuKn6sSX97b4un8koWp7vkgtmhHt/Cx+889UGnvoK2/+4UH4/+7sNTokc95L4li9NFieyQYyQJ/D/xEsYlbWcfh+f6jc1rDRFlaZ1Xeq8VsVkV9XX5yr4WQwgShoLk/NIUU4PWkczzverGJDDm4ZErw5SWwhApUlI4lh1hOUVKMvEvpvNtoRw7PMWHfXxuZYWaWqu04bqTVBhr75cpqsrMmPr6GEeibXrurzNfKvt4mJCTpyrMvf0Go0mWluzyYTa7VtG/GiVPVRiMJlF2OIjG+ozmlPz6ulrHX6HC7K3RZi+ZvUQ8Y+zIFBGAxyaFP7Uf33Aki2QuI2q8lyfkxC2wpwrsXnj7xiIz/NQOZYWZPbfKMPNYhfwLFpOcMtET4+Pnz5+f+ZlvDExmbgonGtHFGbRuo7umkJyjZkwNjk8+k96XT0FHSyranr0U/DvJY1SaCtq+PmOnaBChacdOE1Hcg4/9uLu29n17wU7uLH1702NT33RycqdwHHaoh/9H8WNN+tulwvrR91/eTpo85/uvXc91pXnn+7MPuL3jDNWi6WO49qY+Ji2F4cd5mJu1QtA2qNXZR18xkgQyNNlqwqBWZ3A/Ks+lAvS3GzhvtUJUtbiRiwF9hr6Qq7Jlfa2OSaqnrLriFjw2JVXWp2voszXW8lSFoVFnsDe1clW2rE8nDAUea9PqKTtjqq/sjLIyX9mnKwtTvOhSYOrXuY5j9mCKqjIz4ujTpG+c/qVwKfZgW/uYW6nG2nSh+waSnKOmVn2f+5jUmbaKdv7VqORUZV/LG72cMjXY/fSmzma3sySnKskxnlJ0LUz6RpMy19G36pjBimt/o5mmGmDnqUkRBw1jbVq981X2EG+5fq65lie0fG2BbRXYpfBcu6Gf/GiT3c7uNCIzdBUmEJJTlWRqarO9QH48a0/f1vyYlFsYthgVHZ2Xt3Hf3jcPHzpERKmp9/p+kPnIaVQEk721MlP8qLygQl1dI4ywURbWTjMcxAmjrMxny3Vl5bZFdWXFNHsk56gZ+73VBfGS4Rr7viEZyhb34L8fXdW8ZX3GGvua9IqD24mIvvPUBw07H9i4poZf7W3KG5GEb5mF4whp5RjV9sPkOL7nn4f5zlOHNVvWi8+lmt3TmhIjSRAPSxVNX5KcX1+oK6vW6PlHRKlheUG+slzH1wplYYV62Fveh1FWVlC1+CKSt1ohoVZ7NZvJr4nMFpP5hMoozEbhveoyylyF3nYPb4WS4QfUt5oT7F/EJYtkZEoUmlomc3MlvVKtKbMt+pTaVldmX6zWlVVn1zu/GUOBydxceKlMPJbRlykcvFeVmRVCWZzdW80PnVSUFioM06ahXV7nlPx6IkrO36qqqRKXKnRzMjPL0xgZ5XhqsvxvFZ329qtGKVJSdIbh7CeCnVLsNxpIUep6FkVKCjUYTerkeCKSqXJot6ZMmB9HtLGyMLWvXNNg+792yve+pyaFyS9N0fCNmEyVr2aEWYqc362io8gLaku1GvHnWvim2Z+qBfZYgZ0Lz6grM8mPNllMkaFiqho1BsfHa6gqjM/MzaIh1Ez21kpxyRTqunx9uW0DX5+1c4whrI64+sVf3Df+j9qXIyMjIyMj+cUi+xw3r/5ng/Cz0azFsmf3LqvVuj4vz994sbOj44L5vMepc6b4TeqpH3Vx5tNzS+9e4lepAADgpjI3ZstzmRtPzGWCQAizuVFhZmZWP0jjuWexqLjYeNzovl4mk8lkMj5ck0ilRcUle3bvOnzoUFJSkvuU3VMbH5840tkxgxIDAAAEQL+uoY9Rz/XZ8mDOmM8VZlCrMzDZW2dads/BorefZklNvTcq2hEU8vHisGXY30iRiCYmxjs7PASLFotl0t9jAQAA+M722xXhGNEB89G8rDDinzIiSrHNzj0zntPQwXbBbN63902r1erXXlHR0c88Wyokx6eGNDQAAADA7IUnWAQAAACAecGPqXMAAAAA4GaDYBEAAAAAvEKwCAAAAABeIVgEAAAAAK/8+AUXuPEs+9eb9Pam0//6j+EuAgAAwPyAnkUAAAAA8OrWM5+eC3cZIIzip9/kRoRqDwAA4CPMswgAAAAAXiENDQAAAABe4QYX8Nv/fvVVuIsAAAAAIYJgEWbii8+vhrsIAAAAEAoIFmGGFi9eHO4iAAAAQNBhzCIAAAAAeHXDBovzd26UuVPyM5+emzuFAQAAgLC4YYNFAAAAAJg9pzGLnR0d4sWJiXHrl1aJVDrtUZKSku6UyQJSINZisVgsVqtVIpXKAnRMAAAAAJgZ1xtczObzwv8T4xNW65dfWr+c+hAXzOakpKRZlsNqtR7p7Dj28ccu6++UyfI2boyKip7l8W8SZ8786crYlcuXRzmOYxhm4cK4mNiYpUu/He5yAQAAwHzl4W7oouIS/p/Ojo4L5vOF9kVvfvmLylkWgrVY9u3dOzEx7v7QBbP51YaGDRs3Llu2fJZnubGdNJm6u44NDQ0Jay6Yzfw/ixcvXrlq9QqFIkxFAwAAgHks/FPnTEyM79m9y2q1EtGyZctVuQ/y/YgTE+PG48auYx9brdb9e/cWFZcEKtN9g/nb3/526KB+4NQpYU1UVHRUdNTE+AQffw8NDQ0NDZlM/Xkb1V/72teCWBS25cUX3jvrWJY8/uLWddTy4gvv0Y+2vpArIePrBTtoy+4nlwWxEAAAABBIvgaLExPjQcoFHzp4kI8UiWh8Yjwy8nb+/6io6Ix165YvX86Hkvv2vvnPz1VERkYG+PT9urKmRVsrM2MDetQjnR2Tk54fyli3LoAn+vzqVb3+gNCJ+I2oqIcefljIO58586f/eu+9qxMTRDRw6tRf//pXtXrTHd/4RgAL4OYet1gw54XdOR42NL5e8M43X34xJy6YpQEAAIBZ8vVu6HcOHjx86JAQ1QWK0XicD3T4KJC1WIReRp5EKv3pY48TkdVqbX6/KbBnD57Fi+/8yPDhkc4O8d9HHxkCHim++YZOiBRjYmI0z1UsXfrty5cvd3Z0XL58eenSb2ueq4iJieE3uGA2v/mG7vOr+PEVAAAA8JUfaWij8fjAwKnADh9kLRYiioqOfubZ0j27d7EWCx8vFhWXCJ2Id8pkMpnMbDZbLJZAnZc3qNU09BGRqaq8lVLy6wsURDTWVlPVzPEbyFQVm7MYIiIy6ct1VFghaarRcy4PeZC0ZMl96ekff/SReGXuQw8FtvwffvgBy7LCoio3l4j+673ff9LTQ0RHOjvuS09/6OEfqnJz977xBr8Ny7IffvhB7kMPB7YkUzrxZvHr9PRrj6c6Vp3e+fPtvUR04rni9yjtSe1T9xARGV8v2HGC32CdbXu244WqrpVPrup+/U1W8viLW9dJQlhwAAAA8HeeRX744P69ewPVxcgHi8uWLYuMjCwqLuGn6XHvX7xTliRsHEDygtr6QgUx2VvravlIcVCrqepN3VpXW19XW1+Xn9hc80obJ2xvaNRSseeH3D2wZm1cnCPFKk1ISE29N4CFn5gY7+nuFq+Jj4+/fv36qZMnhTWnTp68fv16fHy8eLOe7m6P9xKF0rKnXtM+fQ9JHn5592uiSJG27H5Nu/s17YsPD+2o6rCHwWfffY+efU27G5EiAABAGMxkUu7Tpwf+4+WagAQcZlsO+nYimiJelCbY5noUUq5BwbU39THqYmH8okJdqDD39o/ZH5epCpS2zkRFhooRP+Tu9ttv/973vy8sqlQPBrawnw195rJmwT8s+Pzzq9euXRPWXLt27fPPry74hwXT7hs4J7YX/7yA/3uhZdTXvdiOd06se9o+2FGSk5fGdvXao8W0hxEmAgAAhMtM7oaOio7OywvM3IcSqVTcX8jHi+75aMuwRdh+9if1ir1kpvhccW5ZskjGXbpCxIePiRLHY7GSeJpOauq9fxo4ffr0gCI5OeC3cid/97t//OMn4uj58uXL0oSEFQrFSZOJX7NCoYiOjrEMD4t3vFMmS/7udwNbGBH3G1x8YRlmqWPHzzucVxJJieiuxGBedAAAAJiS38HiqtWrM9ZlBuquZKlUylosp08PCHd+eIwX+anCo6KjA383tAtmUUxAj7c2I+P06YGsH/wgoEe1+Z5SKQ4We7q7f7RhwyM//klcHHOks2Ntxjr+VXXJVn9PqQxGYWZvnfO4RiIiYj1uCQAAACHjRxo6Kjq6qLhE9WBuACM2icSWdBYHPe75aP5RqSTIPUySRTLOOCAeiMheMnsJH8fYEUqIn3bCHWlCwtqMdUGadWjp0m8/9PAPhcXjx3vPDg4SUca6db9+qZqPFM8ODh4/3its89DDP5yTP+giTZDQ0DBCQwAAgDnH12Bx1f33/7PmuYDnUlPvvTcqOpqI9u190z0fLcSL/MrAzjvjwF26wv/DZOamcPrd7faRiCZ9o0mZ65iC0dCoG7Tt0v5GM6lVPv0mSrCKTURE96Wn5xf8LDbWVkad9re/f/fdT3p6LpjNn/T0/P7dd3Xa3/IPxcbG5hf87L709OAVxm/sny/b/pOs23DP2Xf/n3BTy2jT6x0IHQEAAOYAX9PQQfq1vcjIyLy8jfy9LHt271p9//2rVt8v9FwuX75ciBRzVA8GZcBico6aqWko1/BT58gLaku1mqryVv5BZWGtOtmxrbIwta9c02B/SOl15pyQuksuLywu6T52rLu766uvvur94ycuG9x2220rV65auXr1HXfcEZYSepb68OOSqu3FP7dNnZP65Ms/qnruhZ+/yT+a9qQ2N7zlAwAAACKiiKtf/EVY6OzoMJvPz+C3oWf5W3xG4/HDhw4Ji1FR0Vbrl+Kpc1atXq160L/Y4cyn55bevWTGRXLDz7PoFDsGyYxLPsKy/9PXNzo6evny6OXLlxcuXLhwYVxcXNx3U1LiJTO5nfjMp+eIyL0w//vVV198fnXx4sUzOCYAAADMLx56Fjs7bPekXjCfH5+YEBaDJzX13gRpwqFDB/l+RPGkPJGRkYGdBvwGFi+RZGVnh7sUAAAAcEPxECzytx4T0bW//OXvf/+7sOhNQAYySqTSZ54tvWA2Dw8Ps6zF+qVVIpUmJSVJpNKg3wENAAAAAF44BYsZ69YRBfFujGndKZMF/B6aAFGo62rDXQYAAACAUHMaswjgC4xZBAAAuHnM5Of+AAAAAOAmMZOf+wMgoqGhoXAXAQAAAIIOwSLMxNfv+Ea4iwAAAAChgGAR/HbrbbeFuwgAAAAQIhizCAAAAABe3cr/SgcAAAAAgLuIycnJcJcBAAAAAOYopKEBAAAAwCsEiwAAAADgFYJFAAAAAPAKwSIAAAAAeIVgEQAAAAC8QrAIAAAAAF4hWAQAAAAAr26mYLH7pZ5fd4mWu05GvPRZ2EoDAAAAMA8EOFj87NcRPRH2P6fIzC9dJyMiTnb7s8fF/b3283resfulnlXGqJ+tEq1aJd1vtGzaPzbTUgIAAADc8AL4Cy7smU3SCdp314FHY2d7qK6TEaupa3LFykDt6G09e2aTdEJxLP2XqwgAAAAA3ASwZ9H8lZ4W/NPsI8XAG3ur9pp6n9RD6ClZ+pt9t/yq9szF0BcKAAAAYB4IcBr62m/cs7pdJyMiet9iheWxt/J6Nu0fI/bMpoiTb/Hp45c+636pJyKixykp3HXSQ2aZPbNJyHTn+RbksZcPv+M1ik3M+Lr6nS8MrMcHAQAAAG5yAQwWV634875b9D896xrzrZLu33D9cKd9TZflUUfodu1RMzN5bAG9YPmN7K4/77tFf+iyPf67tqr2tj9Ppk9O3rV/w7VV/J0o9qzx5GT65GR6V+rEN32IFy92fqHfcFuit4clC9dvuH7WPMMnDQAAAHBDC2jPYuKjaZOT6faQUehNjFXmOaLA7s5r9OId9ozwLfuLvkVERAv+6dHYRFmk6GALug4tTSQiiv2JZgEZv7xoC/scN6msLIrypVPwovk6pd7uNVgkIiKTGbe5AAAAALgLwtQ5fMjY9eL1R5+xdfslPsr8my2q++y/XxACRH+889VF97BPcruC0CkIAAAAEDxBm2dxZcYCPsIjIqJv/d8Xrx/uHKOuz3/1IvMTiX+Humi20obbEokSZbfwXYw27JcmuuUu2TS7u+7liUI2B+/LAQAAAAi7YAWLY2/VitPNtLIoin5q3lRr9b9b8bPf/vS6Om9hou1mlInfdtlP8cyE3ofQc5pbWNjLh9+ZPuIEAAAAuCkFLlgUTYvdExFx9tFU6eQvRHGhZOH6Ddf19HWlL92KstvUdG2V7VAWOpZum7tRsvTAsQW/Wu1+irG38oBOR3YAAAPXSURBVHoiInoiVl8j246i+68lC9eL77BxKXbnF/oNvpUKAAAA4KYTwEm5pzH2Vt7Zw3mBmLJ7BrpORqy27rekuXZDsmc2Sb9Y774eAAAAAIhC99vQF/ebH6Wo34Rryu5VK8Q33NiNvfXMBO2TIVIEAAAA8CL4PYvdL/WseoGIFszk5/sCXZL/zhD9sl/XyYjOO5xy5QAAAADgJHRpaAAAAACYd0KVhgYAAACAeQjBIgAAAAB4hWARAAAAALy69erVq+EuAwAAAADMUbjBBQAAAAC8QhoaAAAAALxCsAgAAAAAXiFYBAAAAACvECwCAAAAgFcIFgEAAADAKwSLAAAAAOAVgkUAAAAA8GpuBosnqpPk1b3+7MHqC5PksiS5zN8dAQAAAMC7uRks+k+ibjw/aD5/oCTcBQEAAAC4kdwowSIAAAAABEGAg0XjNlsuWJYkLzw4SkR8Ttn+PxHR6MESWaF+lEbfLpRXH+TTx9uMvdtkSXJZod6xHZ2o9pBZHn27UDhFydtsYIsPAAAAAE4CGSyOHizJ+7T6k/OD5vOD5vODjRvjiIjonpKaNUeaj9qjwBO7Ko6WPK3mH9tVce7Z8wdKaE/ejiWfHKtee7St0x7/7dq0Y8mxQfP5wU9q1uzatM1IRDT6duHq5+8+wB/ffGDJ86sRLwIAAAAEUaDT0KJoTxD3vSxHFNj7h11UlJ1me2htTVEqERGVPK2Ok9x1l2ivkgO7HpEQEcVtfLqEzg2yROzRPxxds63gHtsWaUXb1hz9w0eivkgAAAAACKhABotxG3d9UkPPr+ZzxHxfIBERSdTPPmmL6ozte4QA0R9Hz10kunjuCC2RSxwnlN9NR85eDETZAQAAAMCDAPcsxm3cxeeIDz25J080ADE1s+hI89FROtH6etGztvS0z9izZ2nNkkSixCVr+S5Gm9HBT2ntXYkBKz0AAAAAOAvW3dDfvGuN03Ja0Taq3FK446z/3YpGbeWRNVkZEiLJmh+sOfq89gS/fvRg5fNH/Q89AQAAAMBntwbwWMZt8rzXhaWiQ+fVojguLkO15vkK2lbtS2yXuGQNPb9JvotfevKAuZEfpxj3SOOBc0mbZK8Lp3ieDz1HD5bcV3HUtvcm+S6itTXHGhFHAgAAAMxOxOTkZGjONHqw5L7mrE8a1YjgAAAAAOaLQPYsToXVb6mgbccQKQIAAADMJ8EPFnu3yTbtIaKSA4OPSKbdGgAAAADmkNCloQEAAABg3sFvQwMAAACAV7devXo13GUAAAAAgDkKaWgAAAAA8AppaAAAAADwCsEiAAAAAHj1/wGbuToaxcXEeAAAAABJRU5ErkJggg==)

注：

- Symbol 值通过`Symbol()`函数生成，上面代码中，变量`s`就是一个独一无二的值。
- `typeof`运算符的结果，表明变量`s`是 Symbol 数据类型，而不是字符串之类的其他类型。

### 2、Symbol 的语法规范

通过上边的学习，使用以下语法可创建一个 Symbol 变量

```js
let s = Symbol()
console.log(s) // Symbol()
```

我们说 `Symbol()` 生成的是一个独一无二的值，所以如果用 `Symbol()` 创建多个 Symbol 值时，即使他们长的完全一样，但是值是不相同的。

> 如下

```js
let s = Symbol()
let m = Symbol()

console.log(s) // Symbol()
console.log(m) // Symbol()

console.log(s === m) // false
```

> 以上代码中， `s === m` 返回的结果为 false ，可知 Symbol 值是唯一的，变量 s 和变量 m 并不是同一个值，但它们在控制台的输出却是一样的。如下输出结果

![image-20221027170829656](https://www.arryblog.com/assets/img/image-20221027170829656.eb509587.png)

以上的方式不利于我们区分两个变量，同时我们也不知道 Symbol 象征或代表的是什么 ？

> 为此，我们可以在调用 Symbol 的时候传入一个字符串作为对当前 **Symbol 变量的描述**

```js
let s = Symbol('color')
let m = Symbol('message')

console.log(s) // Symbol(color)
console.log(m) // Symbol(message)
```

![image-20230103181957889](https://www.arryblog.com/assets/img/image-20230103181957889.b38aff9b.png)

> **强调**：不过还是要特别注意，Symbol 的变量的描述是一样的，也是两个不同的值

```js
const s = Symbol('a')
const m = Symbol('a')
console.log(s)
console.log(m)
console.log(s === m)
```

![image-20230103162930240](https://www.arryblog.com/assets/img/image-20230103162930240.10f3b2dc.png)

- Symbol 的描述符，如果传如的不是字符串类型，则会转换为对应的字符串

```js
let s1 = Symbol('abc')
let s2 = Symbol(11)
let s3 = Symbol([1, 2, 3])
let s4 = Symbol({})
console.log(s1)
console.log(s2)
console.log(s3)
console.log(s4)
```

> **注**：Symbol 是基本数据类型，调用 Symbol 时不可以使用 new 关键字。如下写法是错误的：

```js
const b = new Symbol() // 报错 Symbol is not a constructor ，Symbol 不是构造函数
```

![image-20221027171633387](https://www.arryblog.com/assets/img/image-20221027171633387.b279b58b.png)

### 3、Symbol.for()

- 有时，我们希望重新使用同一个 Symbol 值，`Symbol.for()`方法可以做到这一点。

- Symbol 提供的一种可以创建相同 Symbol 的机制，就是使用 `Symbol.for()`方法进行注册。

- 当我们使用

  ```
  Symbol.for()
  ```

  来创建 Symbol 值时，首先会在

  全局环境中搜索，检测给定的 key（描述符）是否已存在

  - 如果不存才会创建一个新的 Symbol 值，并且会在全局环境中登记。
  - 如果已存在，则会使用已存在的 Symbol 值。

- 不管 `Symbol.for()`在哪里调用，最后都会登记注册在全局环境中

```js
function fn() {
  // 全局注册以"icoding"为描述符的 Symbol
  const m = Symbol.for('icoding')
  return m
}
const s = fn()
// 由于描述符"icoding"已被注册到全局，因此这里创建的 Symbol 与全局是同一个
const y = Symbol.for('icoding')
console.log(s === y) //true
```

### 4、Symbol.keyFor()

`Symbol.keyFor()` 返回一个全局注册的 Symbol 的描述符

```js
let s = Symbol.for('icoding')
let m = Symbol.keyFor(s)

console.log(m) // icoding
```

> **注意：** 返回结果是已经注册过的变量 s 的描述符 icoding

### 5、Symbol 与基本数据类型转换

Symbol 不能转成数字

```js
let s = Symbol('123')
console.log(Number(s)) // 报错
```

使用 Number 对 Symbol 值转换会报错

![image-20221027230231277](https://www.arryblog.com/assets/img/image-20221027230231277.2f33c84d.png)

Symbol 可以转成 布尔值 和 字符串

```js
let s = Symbol('123')
console.log(typeof s) // symbol

let str = String(s)
console.log(str) // Symbol(123)
console.log(typeof str) // string

let bool = Boolean(s)
console.log(bool) // true
console.log(typeof bool) // boolean
```

> 以上代码我们可以看到，Symbol 值可以通过 String 转成字符串形式，也可以通过 Boolean 转成布尔值

### 6、Symbol 属性的遍历

- 以 Symbol 类型的变量作为对象属性时，该属性不会出现在 `for … in`、`for … of`循环中（后面会讲解`for…of`循环的）。也不会被`Object.keys()`、`Object.getOwnPropertyNames()`返回。
- 我们可以通过`Object.getOwnPropertySymbols()`方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
- 如果想要一次性获取到对象的所有属性，可以利用`Reflect.ownKeys(obj)`

```js
let s = Symbol('ss')
let m = Symbol('mm')
// 由于 s 和 m 是变量，而不是字符串，因此需要使用中括号括起来（否则它会被当做字符串使用）
let obj = {
  username: 'icoding',
  [s]: 18,
  [m]: function () {},
}
// for ... in 循环遍历 obj
for (o in obj) {
  console.log(o) // username
}

// getOwnPropertySymbols()方法
const arr = Object.getOwnPropertySymbols(obj)
console.log(arr)

// Reflect.ownKeys()方法
const arr = Reflect.ownKeys(obj)
console.log(arr)
```

> `for … in` 方式遍历 obj 对象时，Symbol 类型的属性没有输出，只输出了 username 属性。

![image-20230103171324830](https://www.arryblog.com/assets/img/image-20230103171324830.9b13f0c6.png)

### 7、Symbol 的应用

因为 Symbol 产生的是独一无二的值，所以我们可以利用这个特性解决以下三大问题

- 消除对象同名属性之间覆盖问题
- 对象的属性不能单独访问
- 消除魔术字符串

### 7.1、消除对象同名属性之间覆盖问题

- 由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。
- 如果我们对一个对象身上有哪些属性不清楚，但我们想再给对象添加一个新属性时，有可能新属性名与对象原有的属性名相同，而造成同名属性的覆盖，如果用 Symbol 就可以解决这个问题。

```js
// addMethod方法为obj对象添加某个属性，属性值为fn
function addMethod(obj, fn) {
  // ....
  // 为对象obj添加了唯一的属性s
  const s = Symbol('color')
  obj[s] = fn
}
```

### 7.2、对象的属性不能单独对外访问

以 Symbol 值作为对象的属性名不会被常规的方法遍历得到，所以我们可以利用这个特性为对象定义一组非私有属性，但这些属性又希望只用于内部方法的效果。

```js
// ES5 版本
const Person = (function () {
  var m = Symbol('m')
  function Person() {
    this[m] = 100 //
  }
  Person.prototype.getM = function () {
    return this[m]
  }
  return Person
})()

const p = new Person()
console.log(p.getM())
// ES6版本 配合模块化
// person.js
const m = Symbol('m')
export default class Person {
  constructor(name) {
    this.name = name
    this[m] = 100
  }
  getM() {
    return this[m]
  }
}
// export { Person };

// index.html  页面导入模块
import Person from './a.js'
const p = new Person('icoding')
console.log(p.getM())
for (let key in p) {
  console.log(key)
}
```

### 7.3、消除魔术字符串

- 魔术字符串是指：在代码之中出现多次、与代码形成强耦合的某一个具体的字符串或数值。
- 风格良好的代码，应该尽量消除魔术字符串，而由含义清晰的**变量代替**

> 如果我们要计算不同形状的面积，我们可以写下面这个方法来实现

```js
function getArea(shape, options) {
  let area = 0 // 保存最终计算得到的面积
  switch (shape) {
    case 'rectangle': // 魔术字符串
      area = options.width * options.height
      break
    case 'triangle': // 魔术字符串
      area = (options.width * options.height) / 2
      break
    case 'circle': // 魔术字符串
      area = Math.PI * options.radius * options.radius
      break
  }
  return area
}

getArea('rectangle', { width: 100, height: 100 })
```

> 以上代码中的字符串 "rectangle"、“triangle”、"circle"就是魔术字符串，它多次出现，与代码形成强耦合，不利于将来的修改和维护。

常用来消除魔术字符串的方法，就是把它写成一个变量。我们定义一个对象

```js
let shapeType = {
  rectangle: 'rectangle',
  triangle: 'triangle',
  circle: 'circle',
}
```

然后我再把代码中的魔术字符串改成 shapeType 的属性值

```js
// 计算图形的面积
function getArea(shape, options) {
  let area = 0 // 保存最终计算得到的面积
  switch (shape) {
    case shapeType.rectangle: // 魔术字符串
      area = options.width * options.height
      break
    case shapeType.triangle: // 魔术字符串
      area = (options.width * options.height) / 2
      break
    case shapeType.circle: // 魔术字符串
      area = 2 * Math.PI * options.radius
      break
  }
  return area
}

getArea(shapeType.rectangle, { width: 100, height: 100 })
```

我们知道，其实 shapeType 中每个属性对应的值是多少，根本不重要，只要保存这些属性的值都是唯一的就行（与其它属性值不相同），所以我们可以把他们的值改成 `Symbol()`

```js
// 完整版代码

let shapeType = {
  rectangle: Symbol(),
  triangle: Symbol(),
  circle: Symbol(),
}

// 计算图形的面积
function getArea(shape, options) {
  let area = 0 // 保存最终计算得到的面积
  switch (shape) {
    case shapeType.rectangle: // 魔术字符串
      area = options.width * options.height
      break
    case shapeType.triangle: // 魔术字符串
      area = (options.width * options.height) / 2
      break
    case shapeType.circle: // 魔术字符串
      area = 2 * Math.PI * options.radius
      break
  }
  return area
}

console.log(getArea(shapeType.rectangle, { width: 100, height: 100 }))
```

### 8、Symbol 总结

一般 Symbol 值就是为对象属性的键值，防止对象的某个属性被同名覆盖。

使用 Symbol 作为对象属性时，需要使用方括号语法去访问对应的属性，而不是字符串。

## 二、原始数据类型 BigInt

bigint 是 ES6 中新增的一种原始数据类型，它是 JavaScript 中的第八种数据类型，与 undefined、null、Number（数值）、String（字符串）、Boolean（布尔值）、Object（对象）、Symbol 并列。

### 1、为什么要有 BigInt 类型

在之前的课程中我们了解到，JS 能表示的最大的安全正整数保存在`Number.MAX_SAFE_INTEGER`中，他的值 等于`2^53-1=9007199254740991`

> 如果 JS 中整数的范围一旦超过这个范围，就无法精确表示。

```js
let n = Number.MAX_SAFE_INTEGER
console.log(n) // 9007199254740991
let n1 = 9007199254740991 + 1
let n2 = 9007199254740991 + 2
console.log(n1 === n2) // true
```

注：

以上的 n1 显然和 n2 不相等，但是最后的结果显示的为 true，说明 JS 已经无法安全的识别这是两个不同的数了。

为了解决这个问题，JS 中引用了 BigInt 这种**原始数据类型**。他可以表示大于`2^53 - 1` 的整数。它只用来表示整数，同时没有**位数**的限制，任何位数的整数都可以精确表示。

### 2、如何定义 BigInt 类型数据

- 可以在一个整数的字面量后面加 n 的方式定义一个 BigInt
- 也可以调用函数`BigInt()`并传递一个整数值或字符串值

```js
let n1 = 2n
let n2 = BigInt(3n)
let n3 = BigInt('3')
console.log(n1) // 2n
console.log(n2) // 3n
console.log(n3) // 3n

console.log(typeof n1) // bigint
console.log(typeof n2) // bigint
console.log(typeof n2) // bigint

console.log(2 == n1) // true
console.log(3 == n2) // true
console.log(3 == n3) // true

console.log(2 === n1) // false
console.log(3 === n2) // false

// 不过我们最好不要用==来比较bigint和number类型，因为会出错
let n1 = 9007199254740993
let n2 = 9007199254740992n
console.log(n1 == n2) // true
```

> 以上的 2n 和 3n 表示的就是数字 2 和 3，只是在后面加了 n 后，表示的类型不再是`number` 而是`bigint`

### 3、注意事项

- BigInt 只能用来表示整数，如果是小数，则会自动忽略小数部分

```js
let n = 2.3 // 抛出语法类型错误
let n = BigInt('2.33') // 抛出语法类型错误
```

- 超出 `2^53-1` 的整数，能精确表示

```js
let n1 = 9007199254740992n
let n2 = 9007199254740994n
console.log(n1 === n2)
```

- BigInt 类型不能与 Number 类型进行混合运算

```js
let n1 = 1 + 2n // 抛出语法错误
```

- 二进制、八进制、十六进制的表示法后面都要加上后缀 n

```js
let n1 = 0b001n
let n2 = 0o12n // 0o开头 ，数字中八进制是以0开头
let n3 = 0xan
console.log(n1)
console.log(n2)
console.log(n3)
console.log(typeof n1)
console.log(typeof n2)
console.log(typeof n3)
```

- 几乎所有 Number 运算符都可以有 bigint 中使用，但 `>>>` 无符号右位移运算和一元求正运算符 `+`
- 如果是参于 `/` 除法运算，最后会丢掉小数部分，只取整数部分

```js
let n1 = 2n + 3n
console.log(2n + 3n) // 5n
console.log(2n * 3n) // 6n
console.log(5n / 2n) // 2n
console.log(5n % 2n) // 1n
console.log(5n || 0n) // 5n
console.log(5n && 0n) // 0n
console.log(+3n) // 抛出类型错误
console.log(2n >>> 0) // 抛出类型错误
// >>> 运算抛出错误，是因为>>>要求最高位补0，但bigin类型没有最高位
```

## 三、模板字符串

我们在 ES5 之前使用的普通字符串如下

```js
// 我们常用的普通字符串，使用单引号 '' 或 双引号 "" 的形式
'icoding'
'icoding'
```

> 模板字符串相当于加强版的字符串，把原来的`''` 或 `""` 替换成反引号 ` 将内容引用起来即可，这样就变成 模板字符串了。

### 1、普通字符串和模板字符串的简单用法

```js
// 定义模板字符串，使用 `` 反引号
;`icoding`
// 我们可能有疑惑，模板字符串和普通字符串有什么区别呢 ？ 其实，简单写法没啥区别
// 如下常量声明：
const brand1 = 'icoding' // 普通字符串声明
const brand2 = `icoding` // 使用模板字符串声明

// 观察 brand1 和 brand2 之间是否有区别
console.log(brand1, brand2, brand1 === brand2) // icoding icoding true
console.log(typeof brand2) // string
```

> 我们可以看到如果只是简单的用法，普通字符串和模板字符串之间没有什么区别

### 2、模板字符串与普通字符串的区别

```js
// 声明一个person对象
const person = {
  username: 'icoding',
  age: 20,
  sex: 'male',
}
// 通过普通字符串拼接
const msg =
  '我叫：' + person.username + ' ，性别是：' + person.sex + '，今年：' + person.age + ' 岁了'
console.log(msg) // 我叫：icoding ，性别是：male，今年：20 岁了
```

> ES5 之前，我们基本都是使用拼接字符串的方式，如果一旦内容多了，拼起来就费时费力
>
> 在 ES6 中，我们使用模板字符串来完成，如下

```js
// 声明一个person对象
const person = {
  username: 'icoding',
  age: 20,
  sex: 'male',
}
// 通过模板字符串拼接
const msg = `我叫：${person.username} ，性别是：${person.sex}，今年：${person.age} 岁了`
console.log(msg) // 我叫：icoding ，性别是：male，今年：20 岁了
```

注：

有了模板字符串后，就直接通过反引号中直接定义多行字符串和变量的拼接，凡是使用 `+` 拼接的都可以替换成模板字符串。

> 如果是变量就包裹在 `${}` 的大括号中即可

**总结：**

- 和其他东西一起使用时，使用模板字符串，方便注入
- 其他情况下使用模板字符串或普通字符串都行

### 3、模板字符串的注意事项

模板字符串在实际开发过程中应该注意哪些 ？

### 3.1、输出多行字符串

```js
// 普通字符串
const msg = '第1行\n第2行'
console.log(msg)
// 输出结果如下
```

![image-20221009162025287](https://www.arryblog.com/assets/img/image-20221009162025287.e3ac41cb.png)

```js
// 模板字符串
const msg = `第1行\n第2行`
console.log(msg)
// 输出结果如下
```

![image-20221009162025287](https://www.arryblog.com/assets/img/image-20221009162025287.e3ac41cb.png)

```js
// 模板字符串，添加空格、换行或缩进
const msg = `第1行
第2行`
console.log(msg)
```

![image-20221009162757585](https://www.arryblog.com/assets/img/image-20221009162757585.089393ce.png)

总结：

在模板字符串中，所有的空格、换行或缩进都会被保留并输出，简单说：格式会原样输出

### 3.2、输出 ` 和 \ 等特殊字符

在模板字符串中要输出特殊字符，同样需要用到转义符 `\` 反斜杠来进行转义，才能正常输出

```js
// 输出 反引号 `
const msg = `\``
console.log(msg) // `
// 输出 反斜杠
const msg1 = `\\`
console.log(msg1) // \
// 输出 ' 单引号
const msg2 = `'` // 类似 '' "" 不属于特殊字符
console.log(msg2) // '
```

![image-20221009172635171](https://www.arryblog.com/assets/img/image-20221009172635171.d9cfd659.png)

### 3.3、模板字符串的注入

在注入过程中，我们会使用 `${}`

```js
// 模板字符串的注入，使用 ${}
const username = 'icoding'
const person = { age: 20, sex: 'male' }
const getSex = function (sex) {
  return sex === 'male' ? '男' : '女'
}

const msg = `我叫 ${username} ，今年 ${person.age + 6} 岁了，我是 ${getSex(person.sex)} 生`
console.log(msg) // 我叫 icoding ，今年 26 岁了，我是 男 生
```

> 模板字符串中到底可以放什么内容，有没有规律呢 ？
>
> 其实只要最终可以得出一个值的就可以通过`${}`注入到模板字符串中

### 4、模板字符串在实际开发中的应用

通过模板字符串动态注入数据，遍历动态数据。

> 实现效果如下：

![image-20221009183446502](https://www.arryblog.com/assets/img/image-20221009183446502.b6625b73.png)

> 代码如下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>学生信息表 - 模板字符串的应用</title>
    <style>
      table {
        border-collapse: collapse;
        width: 860px;
        margin: 50px auto;
      }
      table tr th,
      td {
        border: 1px solid #dfe2e5;
        text-align: center;
        padding: 0.6em 1em;
      }
      caption {
        font-size: 22px;
      }
    </style>
  </head>
  <body>
    <table>
      <thead>
        <caption>大一班学生信息表</caption>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>户籍所在地</th>
        </tr>
      </thead>
      <tbody id="stu-list">
        <!-- <tr>
          <td>arry</td>
          <td>男</td>
          <td>18</td>
          <td>北京</td>
        </tr> -->
        <tr>
          <td colspan="4">信息正在加载中 ...</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>备注</th>
          <td colspan="3">新学期开学，学生信息表</td>
        </tr>
      </tfoot>
    </table>

    <script>
      // 数据，目前作为演示，在实际开发中这些数据都会用过 Ajax 动态的加载
      const students = [
        {
          username: 'arry',
          age: 18,
          sex: 'male',
          city: '北京',
        },
        {
          username: '清心',
          age: 20,
          sex: 'female',
          city: '湖南',
        },
        {
          username: 'allen',
          age: 21,
          sex: 'male',
          city: '深圳',
        },
        {
          username: 'jack',
          age: 22,
          sex: 'female',
          city: '上海',
        },
      ]

      // 获取将要填充数据的容器
      const dataList = document.getElementById('stu-list')
      // 声明变量来保存拼接的字符串
      let html = ''
      // 循环遍历拼接数据
      for (let i = 0; i < students.length; i++) {
        // 使用模板字符串拼接
        html += `<tr>
                <td>${students[i].username}</td>
                <td>${students[i].age}</td>
                <td>${students[i].sex === 'male' ? '男' : '女'}</td>
                <td>${students[i].city}</td>
                </tr>`
      }

      // 查看模板字符串注入后的数据
      //   console.log(html);

      // 将拼接注入的数据填充到容器中
      dataList.innerHTML = html
    </script>
  </body>
</html>
```

## 四、标签模板

- 模板字符串还可以紧跟在一个函数后面，该函数将被调用，用来处理这个模板字符串，这被称为 **“标签模板”** 功能。
- 标签模板其实是函数的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

> 但是，如果模板字符串中有变量，就不再是简单的调用了，而是将模板字符串先处理成多个参数，再调用函数。

### 1、模板字符串中没有变量

函数后面紧跟的模板字符串中没有变量，则模板字符串为函数的参数

```js
function tagFn(string) {
  console.log(arguments)
  console.log(arguments[0][0])
  console.log(string)
}
tagFn`模板字符串内容`
```

![image-20230108212619203](https://www.arryblog.com/assets/img/image-20230108212619203.4cc9ff1b.png)

### 2、模板字符串中有变量

函数后面紧跟的模板字符串中包含变量，则模板字符串将会被处理成多个参数，再调用函数

| 参数       | 说明                                                                                                                                                      |
| :--------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 第一个参数 | 第一个参数是一个类数组对象，其内部包含一个数组，数组成员为模板字符串中那些没有变量替换的部分，你可以理解为 a 被 `${...}` 这种表达式分隔的字符串组成的数组 |
| 其余参数   | 其它参数都是模板字符串中`${...}`被替换后对应的值                                                                                                          |

```js
function sayHello(string, value1, value2, value3) {
  // 类数组对象，其内包含一个数组，数组成员是由${...}分隔后的字符串组成的
  console.log(string)
  // string.raw为一个数组，数组成员是由${...}分隔后的字符串组成的
  console.log(string.raw)
  console.log(value1) // 对应模板字符串中${username}解析后的值
  console.log(value2) // 对应模板字符串中${city}解析后的值
  console.log(value3) // 没有对应的变量被解析，则值为undefined
}

let username = '清心'
let city = '北京'
sayHello`Hello${username},欢迎你来到${city}`
```

![image-20230108222459698](https://www.arryblog.com/assets/img/image-20230108222459698.845e2f23.png)

温馨提示

第一个参数是一个类数组对象，对象中包含一个数组，数组中对应的是模板字符串中那些没有变量替换的部分，那数组中的每一项内容在模板字符串中后面紧跟随的变量值为第二个，第三个等参数。

```js
// 第一个参数对应的值为模板字符串中没有变量替换的部分
['Hello', ',欢迎你来到', '', raw: Array(3)]
"清心" // 第二个参数
"北京" // 第三个参数
```

> 根据上面的对应关系，我们来写一个函数，通过函数的参数来还原原模板字符串。

### 3、函数内还原原模板字符串

```js
const obj = {
  username: '清心',
  age: 18,
  sex: '女',
}

function getString(strArr) {
  let result = ''
  let i = 0
  while (i < strArr.length) {
    result += strArr[i++] // i是先赋值，再自增
    if (i < arguments.length) {
      result += arguments[i]
    }
  }
  return result
}

let result = getString`大家好，我是${obj.username},性别${obj.sex},今年${obj.age}岁了`
console.log(result) // 大家好，我是清心,性别女,今年18岁了
```

### 4、标签模板应用场景

当我们需要对模板字符串`${...}`中的内容需要进一步的验证和加工时，就可以利用到标签模板功能来处理。

### 4.1、案例：根据数据渲染荣誉展示模块

![image-20230109160342276](https://www.arryblog.com/assets/img/image-20230109160342276.974157bb.png)

### 4.2、实现思路

确认每一条信息的相同点和不同点，得出对应的模板字符串结构如下：

```js
恭喜xxx同学，在xxxx年xxx月参于的xxxx项目中担任xxx一职，表现优异，认真负责，荣获xxxx奖
```

其中，动态内容有：人名，时间，项目名、角色，奖项。 需要我们用`${...}`向模板字符串中注入对应内容

**后台返回的数据**

```js
const data = [
  {
    username: '刘梦宇', // 用户名
    projectName: '槐里集团', // 项目名
    role: 3, // 用户角色，角色有 技术总监 、项目经理、 项目组长 、工程师
    time: 1669824000000, // 时间戳
    honour: 1,
  },
  {
    username: '王妍',
    projectName: '槐里集团',
    role: 4,
    time: 1669824000000,
    honour: 2,
  },
  {
    username: '许尹阳',
    projectName: '槐里集团',
    role: 4,
    time: 1669824000000,
    honour: 2,
  },
  {
    username: '侯天帅',
    projectName: '槐里集团',
    role: 4,
    time: 1669824000000,
    honour: 3,
  },
  {
    username: '王薇',
    projectName: '槐里集团',
    role: 4,
    time: 1669824000000,
    honour: 4,
  },
]
```

其中角色和荣誉后对应的内容如下

```js
// 角色处理
const role = {
  1: '技术总监',
  2: '项目经理',
  3: '项目组长',
  4: '工程师',
}

// 荣誉
const honour = {
  1: '年度卓越贡献奖',
  2: '最佳效率奖',
  3: '最佳创意奖',
  4: '最佳贡献奖',
}
```

### 4.3、HTML 布局和 CSS 样式

```html
<style>
  html,
  body,
  ul,
  li,
  h3 {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .honour {
    width: 800px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ddd;
  }
  h3 {
    font-size: 24px;
    background-color: rgb(237, 251, 252);
    padding: 10px;
  }
  .honour li {
    font-size: 18px;
    border-bottom: 1px dashed #ddd;
    line-height: 30px;
    padding: 10px;
    color: #666;
  }
  span.text {
    color: red;
  }
</style>

<div class="honour">
  <h3>荣誉展示</h3>
  <ul id="J_honour"></ul>
</div>
```

### 4.4、标签模板功能实现

- 根据后台返回数据，确定模板字符串结构

```js
;`恭喜${item.username}同学，在${item.time}参于的<<${item.projectName}>>项目中担任${item.role}一职，表现优异，认真负责，荣获${item.honour}。`
```

- 书写标签模板，在函数中对 用户名、时间、项目名、角色、荣誉做相关处理

```js
function honour(arrs, usernameExp, timeExp, projectExp, roleExp, honourExp) {
  // 名字处理
  let username = `<span class='text'>${usernameExp}</span>`
  // 角色处理
  const role = {
    1: '技术总监',
    2: '项目经理',
    3: '项目组长',
    4: '工程师',
  }
  let strRole = role[roleExp]

  // 时间处理
  const time = new Date(timeExp)
  let strTime = `${time.getFullYear()}年${time.getMonth() + 1}月`

  // 荣誉
  const honour = {
    1: '年度卓越贡献奖',
    2: '最佳效率奖',
    3: '最佳创意奖',
    4: '最佳贡献奖',
  }
  const strHonour = `<span class='text'>${honour[honourExp]}</span>`

  // 输出内容.......
}
```

- 处理标签模板的返回值

```js
// 输出内容......
let output = arrs[0] // 添加被${...}分隔出来的第一个内容
;[username, strTime, projectExp, strRole, strHonour].forEach(function (item, index) {
  output += item // 添加${...}解析出来的内容
  output += strArr[++index] // 添加以${...}分隔出来的内容
})
return output // 返回拼接后的字符串
```

### 4.5、数据渲染成真实 DOM

```js
// DOM渲染
function render(obj, data) {
  let html = '' // 拼接li结构字符串
  // 遍历数据，对数据做处理
  data.forEach(function (item) {
    let result = honour`恭喜${item.username}同学，在${item.time}参于的<<${item.projectName}>>项目中担任${item.role}一职，表现优异，认真负责，荣获${item.honour}。`
    html += `<li>${result}</li>` // 拼接每一个li
  })
  obj.innerHTML = html //添加到页面中
}

// 获取DOM元素
const ul = document.getElementById('J_honour')
render(ul, data) // 开始渲染
```

### 4.5、完整版代码

```html
<style>
  html,
  body,
  ul,
  li,
  h3 {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .honour {
    width: 800px;
    margin: 100px auto;
    padding: 20px;
    border: 1px solid #ddd;
  }
  h3 {
    font-size: 24px;
    background-color: rgb(237, 251, 252);
    padding: 10px;
  }
  .honour li {
    font-size: 18px;
    border-bottom: 1px dashed #ddd;
    line-height: 30px;
    padding: 10px;
    color: #666;
  }
  span.text {
    color: red;
  }
</style>

<div class="honour">
  <h3>荣誉展示</h3>
  <ul id="J_honour"></ul>
</div>
<script>
  function honour(strArr, usernameExp, timeExp, projectExp, roleExp, honourExp) {
    // 名字处理
    let username = `<span class='text'>${usernameExp}</span>`
    // 角色处理
    const role = {
      1: '技术总监',
      2: '项目经理',
      3: '项目组长',
      4: '工程师',
    }
    let strRole = role[roleExp]

    // 时间处理
    const time = new Date(timeExp)
    let strTime = `${time.getFullYear()}年${time.getMonth() + 1}月`

    // 荣誉
    const honour = {
      1: '年度卓越贡献奖',
      2: '最佳效率奖',
      3: '最佳创意奖',
      4: '最佳贡献奖',
    }
    const strHonour = `<span class='text'>${honour[honourExp]}</span>`
    // 输出内容......
    let output = strArr[0] // 添加被${...}分隔出来的第一个内容
    ;[username, strTime, projectExp, strRole, strHonour].forEach(function (item, index) {
      output += item // 添加${...}解析出来的内容
      output += strArr[++index] // 添加以${...}分隔出来的内容
    })
    return output // 返回拼接后的字符串
  }

  // DOM渲染
  function render(obj, data) {
    let html = '' // 拼接li结构字符串
    // 遍历数据，对数据做处理
    data.forEach(function (item) {
      let result = honour`恭喜${item.username}同学，在${item.time}参于的<<${item.projectName}>>项目中担任${item.role}一职，表现优异，认真负责，荣获${item.honour}。`
      html += `<li>${result}</li>` // 拼接每一个li
    })
    obj.innerHTML = html //添加到页面中
  }

  // 获取DOM元素
  const ul = document.getElementById('J_honour')
  const data = [
    {
      username: '刘梦宇', // 用户名
      projectName: '槐里集团', // 项目名
      role: 3, // 用户角色，角色有 技术总监 、项目经理、 项目组长 、工程师
      time: 1669824000000, // 时间戳
      honour: 1,
    },
    {
      username: '王妍',
      projectName: '槐里集团',
      role: 4,
      time: 1669824000000,
      honour: 2,
    },
    {
      username: '许尹阳',
      projectName: '槐里集团',
      role: 4,
      time: 1669824000000,
      honour: 2,
    },
    {
      username: '侯天帅',
      projectName: '槐里集团',
      role: 4,
      time: 1669824000000,
      honour: 3,
    },
    {
      username: '王薇',
      projectName: '槐里集团',
      role: 4,
      time: 1669824000000,
      honour: 4,
    },
  ]
  render(ul, data) // 开始渲染
</script>
```

## 五、模板字符串面试真题解析 和 扩展知识

深入浅出互联网大厂 ES6 高频面试真题解析 和 相关扩展知识
面试真题是检验自己学习成果和查缺补漏的最好方式之一，同时也是了解企业对求职者技能要求的风向标 。

### 1、手写 ES6 的模板字符串（百度）

手写一个方法，能成功解析字符串中的`${}`方式注入的内容

```js
let obj = {
  name: '清心',
  age: 23,
}
// 以下字符串中的${obj.name}和${obj.age} 能成功被解析成 清心和 23
let str = '大家好，我是${obj.name},今年${obj.age}岁了'
```

实现思路：

首先我们要用正则表达式，提取字符串中`${}`包裹的内容，正则如下

```js
const reg = /\${(.+?)}/g // 正则表达式
```

- 把正则表达式中子表达式`(.+?)`的内容提取出来，然后解析成对应的内容，如`obj.name`解析成清心,obj.age 解析成`23`
- 最后用子表达式解析成功的内容替换正则匹配到的`${}`内容

### 1.1、实现方法一：正则与 eval() 函数结合

如果对 `eval()` 函数不了解，可以参考后面的扩展知识，给大家提供了相关的文档

```js
// 自定义字符串解析方法，可以解析string中${}方式，读取变量中值
function strParse(string) {
  const reg = /\${(.+?)}/g // 正则表达式
  let newStr = string.replace(reg, function (v, p1) {
    // eval(obj.name) 返回解析后的字符串内容 如： obj.name解析成清心
    return eval(p1)
  })
  return newStr // 返回替换成功的字符串
}

let obj = {
  name: '清心',
  age: 23,
}
let str = '大家好，我是${obj.name},今年${obj.age}岁了'
console.log(strParse(str)) // 大家好，我是清心,今年23岁了

let a = 2
let b = 3
let str2 = `a+b=${a + b}`
console.log(strParse(str2)) // a+b=5
```

如果想成功解析字符串中的`` 结构，只需将正则替换为如下

```js
const reg = /\{{(.+?)}}/g // 正则表达式,解析字符串中的{{ }}模式
// let str = "大家好，我是{{obj.name}},今年{{obj.age}}岁了";
```

### 1.2、实现方法二：正则与 Function 构造函数

如果对 Function 构造函数不了解，可以参考后面的扩展知识，给大家提供了相关的文档

```js
let obj = {
  name: '清心',
  age: 23,
}
let str = '大家好，我是${obj.name},今年${obj.age}岁了'
console.log(strParse(str)) //

// strParse函数能成功解析字符串中的${}
function strParse(string) {
  const reg = /\${(.+?)}/g // 正则表达式
  let newStr = string.replace(reg, function (v, p1) {
    // 生成函数 function anonymous(){return obj.name} 然后自调用
    return Function('return ' + p1)()
  })
  return newStr
}
```

注：

上面的 obj 为全局作用域中的变量，如果 obj 不在全局作用域中，那最后就得不到想要的结果，因为 Function 创建的函数只能访问当前作用域中局部变量和全局作用域中变量。

所以我们需要将对应的数据当成函数的参数，传入到函数的内部，具体代码如下

> 不过这种方式，所有变量需要成为对象的属性，否则也是读取不到的

```js
function fn() {
  let obj = {
    name: '清心',
    age: 23,
  }
  let str = '大家好，我是${obj.name},今年${obj.age}岁了'
  const reg = /\${(.+?)}/g // 正则表达式
  let newStr = str.replace(reg, function (v, p1) {
    // 创建函数 function anonymous(obj){ retunr obj.name} 然后自调用，传入数据
    return Function('obj', 'return ' + p1)(obj)
  })
  console.log(newStr)
}

fn()
```

封装后共享代码

```js
// dataname 数据对象名   data数据对象   string需要处理的字符串
function strParse(dataname, data, string) {
  const reg = /\${(.+?)}/g // 正则表达式
  let newStr = string.replace(reg, function (v, p1) {
    // 创建函数 function anonymous(obj){ retunr obj.name} 然后自调用，传入数据
    return Function(dataname, 'return ' + p1)(data)
  })
  return newStr
}

function fn() {
  let obj = {
    name: '清心',
    age: 23,
  }
  let str = '大家好，我是${obj.name},今年${obj.age}岁了'
  let newStr = strParse('obj', obj, str)
  console.log(newStr)
}
fn()
```

### 1.3、实现方法三：正则与 Function 构造函数

这一步我们想要解决的是，能成功解析字符串`${...}`的内容，但`${...}`中的内容是直接引用对象的属性，而不是**对象.属性**的方式。

> 如下

```js
let obj = {
  name: '清心',
  age: 23,
  arr: [1, 2, 3],
}
// let str1 = "大家好，我是${obj.name},今年${obj.age}岁了${obj.arr[0]}";
let str2 = '大家好，我是${name},今年${age}岁了${arr[0]}'
// str2字符串中的${name} ${age} ${arr[0]} 要能被成功解析为 清心 23  1
```

我们来回顾下，之前讲的 strParse 方法

```js
function strParse(str, obj) {
  const reg = /\${(.+?)}/g // 正则表达式
  let newStr = str.replace(reg, function (v, p1) {
    // 难点就在于，如何让p1字符串解析成对应值
    return Function('obj', 'return ' + p1) // p1代表 name,age,arr[0]
  })
  return newStr
}
```

注：

上面代码中的 p1 代表`name,age,arr[0]`

但 Function 创建的函数只能访问当前作用域中的变量或全局作用域，当前作用域中没有 name,age,arr 变量，所以肯定访问不到，最终报错。

所以我们需要将这些变量作为函数的参数传进来，而这些变量名正好对应 obj 对象的属性名，所以我们可以把对象的属性名当做函数的形参，对象属性名对应的属性值，当成实参传入。

写一个方法，将对象的属性名和属性值当成新创建函数的形参和对应的实参

```js
// 解析字符串中的${...} 格式的内容
function interpolate(obj) {
  const keys = Object.keys(obj) // 取得所有对象的属性名，返回结果为数线
  const values = Object.values(obj) // 取得所有对象的属性值，返回结果为数组
  return new Function(...keys, "return name +''+ age+''+ arr[0]")(...values)

  // 上面 new Function代码相当于创建如下函数,并执行
  // (function anonymous(name,age,arr){
  //     return name+"-"+age+"-"+arr[0];
  //  })("清心",23,[1,2,3]);
}

let obj = {
  name: '清心',
  age: 23,
  arr: [1, 2, 3],
}
console.log(interpolate(obj)) // 清心-23-1
```

两者一整合，完美实现

```js
function strParse(str, obj) {
  const reg = /\${(.+?)}/g // 正则表达式
  let newStr = str.replace(reg, function (v, p1) {
    return (function interpolate(obj) {
      const keys = Object.keys(obj) // 取得所有对象的属性名，返回结果为数线
      const values = Object.values(obj) // 取得所有对象的属性值，返回结果为数组
      return Function(...keys, 'return ' + p1)(...values)
    })(obj)
  })
  return newStr
}

function fn() {
  let obj = {
    name: '清心',
    age: 23,
    arr: [1, 2, 3],
  }
  let str = '大家好，我是${name},今年${age}岁了${arr[0]}'
  return strParse(str, obj)
}
console.log(fn()) // 大家好，我是清心,今年23岁了1
```

总结：通过这个面试题，我们重点掌握以下三个思想

- 如何利用正则匹配符合模式的内容
- 如何把一个字符串，像正常的 JS 代码一样去执行
- Function 函数创建的函数相当于是在全局作用域中被创建的，所以他只能访问当前函数内的局部变量和全局变量，所以我们要把创建出来的函数体中用到变量，全都都当成参数给他传进去，同时还要把对应参数的实参也要传进去。

### 2、扩展知识：eval、Function 构造函数

深入浅出 eval、Function 构造函数

### 2.1、eval() 函数

- `eval()` 函数 将传入的字符串当成 JS 脚本代码来执行
- 如果参数是一个表达式，`eval()` 函数将执行表达式。如果参数是 JavaScript 语句，`eval()` 将执行 JavaScript 语句（代码）。

```js
eval(string) // 语法
// eval中的字符串会被当成正常的JS脚本来执行
eval('let a=1;let b=2; console.log(a+b);') // 3

const a = 3
const b = 4
console.log(eval('a+b')) // 7 对表达式求值，并将结果返回

const obj = { a: 1 }
console.log(eval(obj.a)) // 1 对表达式求值，并将结果返回
```

### 2.2、Function 构造函数

Function 构造函数用来创建一个新的函数对象，可以直接调用 Function 构造函数，也可以用 new 关键字来调用

```js
let fn1=new Function(arg1,arg2,arg3...,functionBody);
let fn2=Function(arg1,arg2,arg3...,functionBody);
```

- fn1 和 fn2 为新创建出来的函数
- arg1，arg2，arg3... 都是一个字符串，为新创建出来的函数的形参
- functionBody 是 `Function()` 构造函数的最后一个参数，表示新创建出来的函数的函数体代码
- 如果`Function()`或 `new Function()`中只一个参数，那这个参数就是函数体代码，这个新创建出来的函数没有参数。

```js
// 以下代码相当于创建了匿名函数  sum= function anonymous(a,b){return a+b}
var sum = new Function('a', 'b', 'return a+b')
console.log(sum(1, 2)) // 3

// 相当于创建了匿名函数
// sayHell=function anonymous(){console.log("大家好，我是...")}
var sayHello = new Function('console.log("大家好，我是...")')
sayHello() // 大家好，我是...
```

### 2.3、Function 构造函数注意事项

Function 构造函数创建的函数，总是被创建于全局环境（全局作用域），因此运行此函数时只能访问到当前函数作用域中的局部变量和全局变量。

```js
let a = 5
function createFn() {
  let a = 3
  return new Function('console.log(a)') // 这里的a指向最外层全局作用域中的a
  // 上面代码相当于创建函数
  // function anonymous(){
  //    console.log(a); // 这里的a指向最外层全局作用域中的a
  // }
}
const fn = createFn()() // 5
let a = 5
function createFn() {
  let a = 3
  let c = '清心'
  // b最终接受传过的的实参b=2，a指向全局作用域中的a=5 ，c指向函数体内的c=1
  return new Function('b', 'let c=1;console.log(a+b+c)')
  // 上面代码相当于创建函数
  // function anonymous(b) {
  //   let c = 1;
  //   console.log(a + b + c);
  // }
}
const fn = createFn()(2) // 5
```

推荐阅读：

里面会讲到 `eval()` 和 `Function()` 之间的对比，还有更多替代 eval 实现复杂效果的方法

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval
