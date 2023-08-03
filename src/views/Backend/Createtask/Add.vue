<template>
  <v-form ref="form" @submit.prevent="save" v-model="valid" lazy-validation enctype="multipart/form-data" class="mt-2">
    <v-card class="pa-5">
      <div class="card-body">
    <fieldset class="form-group border py-1 px-3">
      <legend class="w-auto px-2" style="float:none; font-size:21px;">Create New Task:</legend>
    <v-row>
      <v-col md="12" cols="12">
          <v-text-field
            v-model="resource.title"
            :error-messages="errors.title"
            label="Title"
            required
          ></v-text-field>
      </v-col>
      <v-col md="12" cols="12">
          <b-form-textarea
            id="description"
            v-model="resource.description"
            :error-messages="errors.description"
            label="Description"
            placeholder="Description"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
      </v-col>
      <v-col md="6" cols="12">
          <v-text-field
            v-model="resource.deadline"
            :error-messages="errors.deadline"
            label="Deadline"
          ></v-text-field>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          v-model="resource.status"
          label="Standard"
        ></v-select>
      </v-col>

    </v-row>


    <v-btn
      style="max-height:37px"
      type="submit"
      color="primary"
      class="mr-4 mt-4"
      :loading="loading"
      :disabled="loading"
    >Submit</v-btn>

    </fieldset>
    </div>
    </v-card>
  </v-form>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data: () => ({
    errors: [],
    valid: true,
    loader: null,
    loading: false,
    menu1: false,
    resource: {
      title: "",
      description: "",
      deadline: "",
      status: "",
    },
    url:null,
    items: ['Open', 'In-Progress', 'Done'],
  }),
  created() {
  },
  computed: {
  },
  methods: {
    save() {
      let isValidate = true;
      this.$refs.form.validate();
      this.$refs.form.inputs.forEach((input) => {
        if (input.hasError) {
          isValidate = false;
        }
      });
      if (!isValidate) {
        return;
      }
      this.loading = true;
      let formData = new FormData();
      for (let field in this.resource) {
        formData.append(field, this.resource[field]);
      }
      this.$store
        .dispatch("resource/AddCreateTask", formData)
        .then(() => {
          this.loading = false;

          this.$router.push("/dashboard/createtask");
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
          console.log(err.response.data.errors);
          this.loading = false;
        });
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
