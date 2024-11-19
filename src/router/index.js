// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import Teachers from '@/views/student_pages/Teachers.vue';
import Exams from '@/views/student_pages/Exams.vue';
import ViewRequests from '@/views/teacher_pages/ViewRequests.vue';
import FillRequest from '@/views/teacher_pages/FillRequest.vue';
import ViewAssistents from '@/views/teacher_pages/ViewAssistents.vue';
import ViewApprovedExams from '@/views/teacher_pages/ViewApprovedExams.vue';

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
      {
        path: 'view_approved_exams',
        name: 'ViewApprovedExams',
        component: ViewApprovedExams,
      },
      {
        path: 'view_requests',
        name: 'ViewRequests',
        component: ViewRequests,
      },
      {
        path: 'view_assistents',
        name: 'ViewAssistents',
        component: ViewAssistents,
      },
      {
        path: 'fill-request/:date?/:id?',
        name: 'FillRequests',
        component: FillRequest,
        props: true, // Activează transmiterea route parameters ca prop-uri

      },
      // Add more authenticated routes here
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL ),
  routes,
});


// Aici protejăm rutele care necesită autentificare
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' }); // Dacă nu e autentificat, redirecționează la login
  } else {
    next(); // Permite accesul la ruta
  }
});

export default router;
