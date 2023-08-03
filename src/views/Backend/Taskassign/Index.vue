<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-card class="mb-1 mt-3">
        <v-data-table :headers="headers" :items="createtasks" sort-by="calories" class="elevation-1">
          
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Task Assign List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer>
                <v-col md="6" class="mx-auto" v-if="message">
                  <v-alert type="success">Task Assign successfully</v-alert>
                </v-col>
              </v-spacer>
            </v-toolbar>
          </template>

          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.deadline }}</td>
                <td>
                  <v-btn v-if="item.assign_to == null" small color="success">Open for Assign</v-btn>
                  <v-btn v-else small color="error">Already Assigned</v-btn>
                </td>
                <td>
                  <v-btn v-if="item.assign_to == null" small color="primary" @click="openModal(item.id)">Click for Assign</v-btn>
                  <v-btn v-else small color="success">{{ item.assign_name }}</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        
          <template v-slot:no-data>
            <v-btn color="primary" @click="Data">Reset</v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
  <assign-modal v-if="dialog" :users="users" @EmailSend="sendEmail" :dialog="dialog"></assign-modal>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AssignModal from './AssignModal.vue';
export default {
  components: { AssignModal },
  name: "Tables",
  data() {
    return {
      message: false,
      baseEnvLocal: baseEnv,
      selectedTask: '',
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title"},
        { text: "Deadline", value: "deadline" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialogm1: '',
      dialog: false,
    };
  },
  
  computed: {
    ...mapState("resource", ["createtasks"]),
    ...mapState("homepage", ["user"]),
    ...mapState("homepage", ["users"]),
  },

  created() {
    this.GetCreateTasks();
    this.getUser();
    this.getUsers();
  },

  methods: {
    ...mapActions("resource", ["GetCreateTasks"]),
    ...mapActions("homepage", ["getUser"]),
    ...mapActions("homepage", ["getUsers"]),

    openModal(task_id) {
      this.selectedTask = task_id;
      this.dialog = true;
    },

    sendEmail(id) {
      let find_user = this.users.find((user)=>user.id === id);
      let data = {
        id: find_user.id,
        email: find_user.email,
        task_id:this.selectedTask
      }
      this.$store
        .dispatch("resource/SendEmail", data)
        .then(() => {
          this.loading = false;
          this.GetCreateTasks();
          this.dialog = false;
          this.message = true;
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          this.loading = false;
        });
    },
  },
};
</script>

