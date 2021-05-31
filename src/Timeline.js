import Vue from 'vue';
import App from './components/TimelinePlugin.vue';
import { BootstrapVue, IconsPlugin, ModalPlugin } from 'bootstrap-vue';
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use( BootstrapVue )
Vue.use( IconsPlugin )
Vue.use( ModalPlugin )

const optionsDefaults = {
  data: [],
  // 預設卡片顯示數
  perItem: 4,
  // 新增按鈕的 Callback
  onAdd: null,
  // 編輯按鈕的 Callback
  onEdit: null,
  // 刪除按鈕的 Callback
  onDelete: null,
}
export default {
  install ( vue, opts ) {
    // merge default options with arg options
    const options = { ...optionsDefaults, ...opts };

    // Create plugin's root Vue instance
    const root = new Vue( {
      data: { data: options.data, perItem: options.perItem, sort: 'asc', type: '', id: '' },
      render: createElement => createElement( App ),
      methods: {
        sortData: function ( type, data ) {
          // 如果排列方式改變，則重新計算顯示數量，並回到頂端
          if ( type === this.sort ) {
            // 且並非傳入新資料
            if ( !data ) return;
          } else {
            this.sort = type;
            this.perItem = options.perItem;
            window.scrollTo( 0, 0 );
          }

          let newData = data || this.data;

          switch ( this.sort ) {
            case 'asc': {
              let sortAsc = ( x, y ) => x.id - y.id;
              this.data = newData.sort( sortAsc );
              break;
            }
            case 'des': {
              let sortDes = ( x, y ) => y.id - x.id;
              this.data = newData.sort( sortDes );
              break;
            }
          }
        },
        setData: function ( data ) {
          this.data = data;
        },
        // 調整彈窗 type、紀錄相關資料 id
        modal: function ( type, id ) {
          this.type = type;
          this.id = id;
        },
        // 點擊 load 按鈕，新增perItem
        load: function ( perItem ) {
          if ( this.perItem < this.data.length) {
            this.perItem = perItem + options.perItem;
          }
        },
        addData: function ( data ) {
          let copy = Object.assign( [], this.data );
          copy.push( data );
          this.sortData( this.sort, copy );
        },
        editData: function ( data ) {
          let self = this;
          this.data.forEach( function ( obj ) {
            if ( obj.id === self.id ) {
              obj.title = data.title;
              obj.name = data.name;
              obj.email = data.email;
              obj.bref = data.bref;
              obj.datetime = data.datetime;
            }
          } );
        },
        deleteData: function ( id ) {
          let self = this;
          this.data.forEach( function ( obj, i ) {
            if ( true && obj.id === id ) {
              self.data.splice( i, 1 );
            }
          } );
        },
      },
      created: function () {
        this.sortData( this.sort );
      }
    } )

    // Mount root Vue instance on new div element added to body
    root.$mount( document.body.appendChild( document.createElement( 'div' ) ) )

    // Register data mutation handlers on root instance
    root.$on( 'add', options.onAdd );
    root.$on( 'edit', options.onEdit );
    root.$on( 'delete', options.onDelete );

    // Make the root instance available in all components
    vue.prototype.$timeline = root;

    // Custom Directives，升/降冪、新增user按鈕
    vue.directive( 'act', {
      bind ( el, binding ) {

        el.addEventListener( 'click', () => {
          if ( binding.value === 'des' ) {
            root.sortData( 'des' );
          } else if ( binding.value === 'asc' ) {
            root.sortData( 'asc' );
          } else if ( binding.value === 'add' ) {
            root.modal( 'Add' );
          }
        } )
      }
    } )

  }
}

