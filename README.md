# 主要

```
src/
├── Timeline.js
└── components
    ├──TimelinePlugin.vue
    ├──timeline.vue
    └──dialog.vue
```

# 依賴

- **bootstrap-vue**

# 使用說明

## 安裝

```js
import Timeline from './Timeline.js';
```

## 用法

### Syntax

```js
Vue.use( Timeline [, options] );
```

- **options** (optional)
  - Type: `Object`
  - 可用的 [options](#options)

##範例

```js
Vue.use(Timeline, {
  data: [],
  perItem: 5,
  onAdd: null,
  onEdit: null,
  onDelete: null,
});
```

# Options

### data

- Type: `Object`
- Default: `empty object`
- note: 所有 user 資料

### perItem

- Type: `Number`
- Default: `4`
- note: 自訂筆數

### OnAdd

- Type: `Function`
- Default: `function( data )`
- note: 新增 user 的 callback

### OnEdit

- Type: `Function`
- Default: `function( id, data )`
- note: 編輯 user 的 callback

### OnDelete

- Type: `Function`
- Default: `function( id )`
- note: 刪除 user 的 callback

# Methods

### setData( data )

設置 data

- **data**
  - Type: `Object`
  - note: 所有 user 資料

### sortData( type, data )

排序資料

- **type**
  - Type: `String`
  - note: 排序方式( 升冪 asc / 降冪 des)

- **data**
  - Type: `Object`
  - note: 所有 user 資料

### modal( type, id )

彈窗狀態調整、紀錄相關 id

- **type**
  - Type: `String`
  - note: 彈窗模式( add / 降冪 edit)

- **id**
  - Type: `Number`
  - note: 資料 id

### load( perItem )

新增顯示資料數量

- **perItem**
  - Type: `Number`
  - note: 欲顯示的資料數量

### addData( data )

新增 user 資料

- **data**
  - Type: `Object`
  - note: 新增的 user 資料

### editdata( data )

修改 user 資料

- **data**
  - Type: `Object`
  - note: 修改後的 user 資料

### deleteData( id )

刪除 user 資料

- **id**
  - Type: `Number`
  - note: 刪除的 user id
