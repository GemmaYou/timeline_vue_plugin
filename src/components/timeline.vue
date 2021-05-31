<template>
  <div class="timeline">
    <div class="timeline-body">
      <div class="act-group">
        <div
          v-for="(item, index) in showData()"
          class="act"
          :class="[(index + 1) % 2 == 1 ? 'odd' : 'even']"
          :id="item.id"
          :key="item.id"
        >
          <div class="act-number">
            {{ item.id }}

            <div class="act-triangle">{{ item.id % 2 == 1 ? '&#9656;' : '&#9666;' }}</div>
          </div>
          <div class="act-middle"></div>
          <div class="act-content">
            <div class="act-header">{{ item.title }}</div>
            <div class="act-info">{{ item.name }}<br />{{ item.email }}</div>
            <div class="act-split"></div>
            <div class="act-body">
              <p class="act-bref">{{ item.bref }}</p>
              <p class="act-date">{{ item.datetime }}</p>
              <div class="act-btns">
                <button
                  v-b-modal.modal-prevent-closing
                  class="act-edit"
                  @click="focusData(item.id)"
                >
                  Edit
                </button>
                <button class="act-delete" @click="deleteData(item.id)">X</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer"><button class="load" @click="load">Load More</button></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: ['data', 'perItem'],
  data: function() {
    return {};
  },
  methods: {
    showData: function() {
      if ( this.perItem ) {
        return this.data.slice(0, this.perItem);
      } else {
        return null;
      }
    },
    load: function() {
      this.$emit('load', this.perItem);
    },
    focusData: function(id) {
      let result;
      this.data.forEach( data => {
        if ( data.id === id ) {
          result = data;
        }
      });
      this.$emit('focusData', id, result, 'Edit');
    },
    deleteData: function( id ) {
      this.$timeline.$emit( 'delete', id );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
@mixin top-border-radius {
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
@mixin bottom-border-radius {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.timeline {
  margin: 100px 0;
  .timeline-body {
    .act-group {
      width: 100%;
      top: -10px;
      left: 0;
      display: flex;
      flex-direction: column;
      .act {
        border-radius: 10px;
        margin: 10px auto;
        position: relative;
        .act-number {
          margin: auto;
          width: 25px;
          height: 25px;
          line-height: 25px;
          vertical-align: middle;
          text-align: center;
          border-radius: 50%;
          color: #fff;
          position: relative;
          .act-middle {
            position: absolute;
            width: 4px;
            height: 100%;
            background-color: grey;
          }
          .act-triangle {
            position: absolute;
            font-size: 25px;
          }
        }
        .act-middle {
          width: 4px;
          height: 100%;
          background-color: grey;
          position: absolute;
          top: 25px;
        }
        .act-content {
          margin-top: -25px;
          width: 250px;
          background-color: #efefef;
          @include top-border-radius;
          @include bottom-border-radius;
          .act-header {
            @include top-border-radius;
            color: #fff;
            padding: 0 10px;
            font-size: large;
          }
          .act-info {
            padding: 2px 10px;
          }
          .act-split {
            margin: 0 10px;
            height: 2px;
            background-color: #ffffff;
          }
          .act-body {
            display: grid;
            grid-template-rows: repeat(2, auto);
            grid-template-columns: repeat(2, auto);
            padding: 2px 10px 5px;
            .act-bref {
              grid-area: 1/ 1/ 2/ 3;
            }
            .act-date {
              margin: 0;
              color: #999999;
            }
            .act-btns {
              button {
                font-size: 1rem;
                line-height: 1rem;
              }
              .act-edit {
                background-color: $black;
                border: none;
                color: #fff;
                border-radius: 5px;
                margin-right: 3px;
                cursor: pointer;
                &:focus {
                  outline: none;
                }
              }
              .act-delete {
                background-color: #9f0000;
                border: none;
                color: #fff;
                border-radius: 5px;
                height: 18px;
                cursor: pointer;
                &:focus {
                  outline: none;
                }
              }
            }
          }
        }
      }
      .odd {
        .act-number {
          background-color: $green;
          .act-triangle {
            top: 0;
            left: -30px;
            color: $green;
          }
        }
        .act-middle {
          left: 287.5px;
        }
        .act-content {
          margin-right: 330px;
          .act-header {
            background-color: $green;
          }
          .act-body {
            .act-date {
              grid-area: 2/ 2/ 3/ 3;
              text-align: right;
            }
            .act-btns {
              grid-area: 2/ 1/ 3/ 2;
            }
          }
        }
      }
      .even {
        .act-number {
          background-color: $yellow;
          .act-triangle {
            top: 0;
            right: -30px;
            color: $yellow;
          }
        }
        .act-middle {
          right: 287.5px;
        }
        .act-content {
          margin-left: 330px;
          .act-header {
            background-color: $yellow;
          }
          .act-body {
            .act-date {
              grid-area: 2/ 1/ 3/ 2;
            }
            .act-btns {
              text-align: right;
              grid-area: 2/ 2/ 3/ 3;
            }
          }
        }
      }
    }
    .footer {
      text-align: center;
      .load {
        background-color: $green;
        color: #fff;
        border: none;
        border-radius: 10px;
        height: 40px;
        width: 130px;
        font-size: 20px;
        margin-top: 15px;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
