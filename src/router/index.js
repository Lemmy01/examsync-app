// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import Home from '@/views/Home.vue'; // Main page after login
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import Teachers from '@/views/Teachers.vue';
import Exams from '@/views/Exams.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    component: AuthenticatedLayout, // Use layout after login
    meta: { requiresAuth: true },
    children: [
      {
        path: 'teachers',
        name: 'Teachers',
        component: Teachers,
      },
      {
        path: 'exams',
        name: 'Exams',
        component: Exams,
      },
      // Add more authenticated routes here
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL ),
  routes,
});

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Example auth check

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
