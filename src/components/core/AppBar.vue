<template>
  <div>
    <div class="header_main">
      <v-container class="py-0">
        <b-navbar toggleable="lg" type="dark">
          <b-collapse id="nav-collapse" is-nav>

            <div v-if="activeOverlay" class="overlay"></div>
            <!-- Right aligned nav items -->
          </b-collapse>
        </b-navbar>
      </v-container>
    </div>
  </div>
</template>

<script>
// Utilities
import { mapMutations,mapState,mapActions } from "vuex";

export default {
  name: "CoreAppBar",
  data: () => ({
    activeOverlay: false,
    drawer: false,
    load: false,
    group: "",
    // categories: [],
    new_column_flag: false,
    temp_category: [],
    apiArg: {
          child_category_id: '',
        }
  }),
  async created(){
  },
  computed: {

  },
  methods: {
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href.endsWith("!") ? 0 : item.href);
    },
    toggleCategory(index) {
      this.temp_category = this.categories[index].sub_category;
    },
  },
};
</script>


<style scoped>
.variant-change{
  cursor: pointer;
}
.variant-change:hover{
  color: #8585c7
}

.overlay {
  position: fixed;
  top:154px;
  left:0;
  right:0;
  bottom:0;
  background-color: rgba(0,0,0,.5);
  visibility: visible;
  color: white;
  text-align:center;
  z-index: 2;
}

.hover_item {
    position: relative;
    display: inline-block;
}
li.d-flex.flex-row.justify-content-between {
    position: relative;
    padding: 10px 0px;
}

.hover_item:hover:after{
  opacity: 1;
    visibility:visible;
}

.hover_item:after {
    content: '';
    position: absolute;
    bottom: -11px;
    left: 0px;
    width: 100%;
    height: 1px;
    background: #000;
    opacity: 0;
    visibility: hidden;
    z-index: 999999;
}
/* Dropdown Button */
.dropbtn {
  /* background-color: #04aa6d;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none; */
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  /* position: absolute; */
  background-color: #fff;
  min-width: 160px;
  /* box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); */
  z-index: 2;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ddd;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  /* background-color: #3e8e41; */
}
</style>
