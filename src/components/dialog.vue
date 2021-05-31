<template>
  <div>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      :title="type"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <div class="formDate" id="datetime-div" v-if="focus.datetime">{{ focus.datetime }}</div>
      <div class="formDate" id="datetime-div" v-else>{{ today }}</div>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            :value="focus.title"
            :state="titleState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            :value="focus.name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="email"
          label-for="email-input"
          invalid-feedback="Email is required"
          :state="emailState"
        >
          <b-form-input
            id="email-input"
            :value="focus.email"
            :state="emailState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="bref"
          label-for="bref-input"
          invalid-feedback="Bref is required"
          :state="brefState"
        >
          <b-form-textarea
            id="bref-input"
            :value="focus.bref"
            :state="brefState"
            required
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['id','focus', 'type'],
  data() {
    return {
      nameState: null,
      titleState: null,
      emailState: null,
      brefState: null,
      today: new Date().toISOString().slice(0, 10),
    };
  },
  methods: {
    checkFormValidity: function() {
      this.titleState = this.$refs.form[0].checkValidity();
      this.nameState = this.$refs.form[1].checkValidity();
      this.emailState = this.$refs.form[2].checkValidity();
      this.brefState = this.$refs.form[3].checkValidity();
      if (this.titleState && this.nameState && this.emailState && this.brefState) {
        return true;
      } else {
        return false;
      }
    },
    resetModal: function() {
      this.nameState = null;
      this.titleState = null;
      this.emailState = null;
      this.brefState = null;
      this.$emit(
        'focusData',
        this.id,
        {
          id: '',
          title: '',
          datetime: '',
          name: '',
          email: '',
          bref: '',
        },
        ''
      );
    },
    handleOk: function(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit: function() {
      // Exit when the form isn't valid
      if ( this.checkFormValidity() ) {
        let title = document.getElementById('title-input').value;
        let name = document.getElementById('name-input').value;
        let email = document.getElementById('email-input').value;
        let bref = document.getElementById('bref-input').value;
        let data = {
            title: title,
            name: name,
            email: email,
            bref: bref,
        }
        if (this.type === 'Add') {
          this.$timeline.$emit('add' , data);
        } else if (this.type === 'Edit') {
          this.$timeline.$emit('edit', this.id, data);
        }
      } else {
        return;
      }
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing');
      });
    },
    show: function() {
      this.$bvModal.show('modal-prevent-closing');
    },
  },
};
</script>
