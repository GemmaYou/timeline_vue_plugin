import Vue from 'vue';
import App from './App.vue'
import Timeline from './Timeline.js';
import Mock from 'mockjs';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use( VueAxios, axios )

let _url = '/api/data';
// data 格式
const MOCKDATA = {
  'data|30': [{
    'id|+1': 1,
    'title': '@title',
    'datetime': '@date',
    'name': "@name(true)",
    'email': '@email',
    'bref': '@sentence'
  }]
};
// 產生 data
const userData = Mock.mock( MOCKDATA ).data;
/*-- ajax 接口 --*/
// all data
Mock.mock( _url, 'get', userData );
// add data
Mock.mock( _url, 'post', function ( req ) {
  req = JSON.parse( req.body );
  const newID = userData.length + 1;
  const newData = {
    id: newID,
    title: req.title,
    name: req.name,
    email: req.email,
    bref: req.bref,
    datetime: new Date().toISOString().slice( 0, 10 )
  };

  userData.push.apply( userData, [newData] );

  // 回傳新增的資料
  return Mock.mock( {
    status: 200,
    message: 'add success',
    data: newData,
  } );
} );

// modify data
Mock.mock( /\/api\/data/, 'put', function ( req ) {
  let id = /\/api\/data\/(\d+)/.exec( req.url );
  id = Number( id[1] );
  req = JSON.parse( req.body );
  const newData = {
    id: id[1],
    title: req.title,
    name: req.name,
    email: req.email,
    bref: req.bref,
    datetime: new Date().toISOString().slice( 0, 10 )
  };

  userData.forEach( function ( obj ) {
    if ( obj.id === id ) {
      obj.title = newData.title;
      obj.name = newData.name;
      obj.email = newData.email;
      obj.bref = newData.bref;
      obj.datetime = newData.datetime;
    }
  } );

  // 回傳修改後的資料
  return Mock.mock( {
    status: 200,
    message: 'modify success',
    data: newData,
  } );
} );

// delete data
Mock.mock( /\/api\/data/, 'delete', function ( req ) {
  let id = /\/api\/data\/(\d+)/.exec( req.url );
  id = Number( id[1] );
  userData.forEach( function ( obj, i ) {
    if ( true && obj.id === id ) {
      userData.splice( i, 1 );
    }
  } );

  // 回傳刪除的id以及整筆資料
  return Mock.mock( {
    status: 200,
    message: 'delete success',
    data: {
      id: id,
      data: userData
    },
  } );
} );

// 使用 timeline plugin 並傳入 options methods
Vue.use( Timeline, {
  onAdd: function ( data ) {
    this.axios
      .post( _url, data )
      .then( ( res ) => {
        this.$timeline.addData(res.data.data);
      } )
      .catch( ( err ) => {
        console.log( err );
      } );
  },
  onEdit: function ( id, data ) {
    this.axios
      .put( `${_url}/${id}`, data )
      .then( ( res ) => {
        this.$timeline.editData(res.data.data);
      } )
      .catch( ( err ) => {
        console.log( err );
      } );
  },
  onDelete: function ( id ) {
    this.axios
      .delete( `${_url}/${id}` )
      .then( ( res ) => {
        this.$timeline.deleteData(res.data.data.id);
      } )
      .catch( ( err ) => {
        console.log( err );
      } );
  },
} );

Vue.config.productionTip = false;

new Vue( {
  render: h => h( App ),
} ).$mount( '#app' )
