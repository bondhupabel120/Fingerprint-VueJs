<template>
  <v-container fluid>
    <div class="tables-basic">
      <v-card class="mb-1 mt-3">
        <v-data-table :headers="headers" :items="createtasks" sort-by="calories" class="elevation-1">
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Task List</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer>
                <v-col md="6" class="mx-auto" v-if="message">
                  <v-alert type="success">Deleted successfully</v-alert>
                </v-col>
              </v-spacer>
              <v-btn color="primary" dark class="mb-2 btn-sm" to="/dashboard/add_createtask">Create New Task</v-btn>
            </v-toolbar>
          </template>
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.deadline }}</td>
                <td>
                  <v-btn small color="success">{{ item.status }}</v-btn>
                </td>
                <td>
                  <v-btn color="error" small class="mr-2" @click="removeResource(item.id)">
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
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
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Tables",
  data() {
    return {
      message: false,
      baseEnvLocal: baseEnv,
      headers: [
        { text: "Title", align: "start", sortable: false, value: "title"},
        { text: "Description", value: "description" },
        { text: "Deadline", value: "deadline" },
        { text: "Status", value: "status" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("resource", ["createtasks"]),
  },

  created() {
    this.GetCreateTasks();
  },

  methods: {
    ...mapActions("resource", ["GetCreateTasks"]),

    removeResource(id) {
      if (confirm("Are you sure?")) {
        this.$store
          .dispatch("resource/DeleteCreateTask", id)
          .then((res) => {
            this.GetCreateTasks();
            this.message = true;
          })
          .catch(() => {});
      }
    },
  },
};
</script>

