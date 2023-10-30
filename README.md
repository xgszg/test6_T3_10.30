# 启动项目

1. npm install
2. npm run dev

# 接口说明

## 获取苹果列表

```javascript
axios.get('/appleList')
```

## 删除

```javascript
axios.delete(`/appleDel/${id}`)
```

## 编辑

```javascript
axios.patch(`/Appleedit/${id}`, {
  price: '价格',
})
```

## 新增

```javascript
axios.patch(`/Addapple`, {
  id: 'id'
  price: '价格',
})
```
