<template>
  <div>
    <Timeline :data="getData" :perItem="getPerItem" @load="load" @focusData="focusData" />
    <BootstrapDialog @focusData="focusData" :focus="focus" :id="id" :type="getType" ref="modal" />
  </div>
</template>

<script>
import Timeline from './timeline.vue';
import BootstrapDialog from './dialog.vue';

export default {
  name: 'App',
  data: function() {
    return {
      id: '',
      focus: {
        id: '',
        title: '',
        datetime: '',
        name: '',
        email: '',
        bref: '',
      },
    };
  },
  components: {
    Timeline,
    BootstrapDialog,
  },
  methods: {
    load: function(perItem) {
      this.$root.load(perItem);
    },
    focusData: function(id, data, type) {
      this.id = id;
      this.focus = data;
      this.$root.modal( type, id );
    },
  },
  computed: {
    getData: function() {
      return this.$root.data;
    },
    getPerItem: function() {
      return this.$root.perItem;
    },
    getType: function() {
      return this.$root.type;
    },
  },
};
</script>
