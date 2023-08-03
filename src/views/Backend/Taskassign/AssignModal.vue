<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      width="auto"
    >
      <v-card>
        <v-card-title>Select User</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="dialogm1"
            column
          >
            <v-select
            :items="users"
            v-model="selectUser"
            :item-text="item=>item.name"
            :item-value="item=>item.id"
            label="Standard"
            ></v-select>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeModal()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="sendEmail()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  export default {
    name: "AssignModal",
    data () {
      return {
        dialogm1: '',
        selectUser: '',
      }
    },
    props:{
        dialog:Boolean,
        users: []
    },
    computed: {},
    

    created() {
    },

    methods: {
        sendEmail(){
            let id = this.selectUser;
            this.$emit('EmailSend',id);
        },
        closeModal(){
            this.dialog = false;
        }
    },
  }
</script>