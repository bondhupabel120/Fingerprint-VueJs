import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import App from '../views/Layout.vue'
import DashboardLayout from "@/components/Backend/Layout/Layout";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    meta: { title: "Home Layout"},
    component: App,
    children: [
      {
        meta: { title: "Home"},
        path: "/",
        component: Home,
      },
      {
        path: '/login',
        name: 'LoginPage',
        component: () => import('../views/loginPage.vue')
      },
      {
        path: '/registration',
        name: 'RegistrationPage',
        component: () => import('../views/registrationPage.vue')
      },

    ]
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardLayout,
    meta: {
      requiresAuth: true,
      is_admin: true,
    },
    children: [
      {
        meta: { title: "CreateTask", requiresAuth: true, is_admin: true },
        path: "/dashboard/createtask",
        name: "createtaskList",
        component: () => import('../views/Backend/Createtask/Index.vue')
      },
      {
        meta: { title: "Add CreateTask", requiresAuth: true, is_admin: true },
        path: "/dashboard/add_createtask",
        name: "AddCreatetask",
        component: () => import('../views/Backend/Createtask/Add.vue')
      },
      {
        meta: { title: "TaskAssign", requiresAuth: true, is_admin: true },
        path: "/dashboard/taskassign",
        name: "taskassignList",
        component: () => import('../views/Backend/Taskassign/Index.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("auth_token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let user = JSON.parse(localStorage.getItem("user_data"));
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (user.user_type == 1) { //admin check
          next();
        } else {
          next({ path: "/" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("auth_token") == null) {
      next();
    } else {
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default router
