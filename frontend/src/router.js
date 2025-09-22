import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    path: '/inquiries',
    name: 'Inquiries',
    component: () => import('@/pages/Inquiries.vue'),
  },
  {
    path: '/inquiry/:id',
    name: 'InquiryDetail',
    component: () => import('@/pages/InquiryDetailView.vue'),
  },
  {
    path: '/accepted-inquiries',
    name: 'AcceptedInquiries',
    component: () => import('@/pages/AcceptedInquiries.vue'),
  },
  {
    path: '/applications',
    name: 'Applications',
    component: () => import('@/pages/Application.vue'),
  },
  {
    path: '/university-applications',
    name: 'UniversityApplications',
    component: () => import('@/pages/UniversityApplication.vue'),
  },
  {
    path: '/visa-applications',
    name: 'VisaApplications',
    component: () => import('@/pages/VisaApplication.vue'),
  },
  {
    path: '/team-management',
    name: 'TeamManagement',
    component: () => import('@/pages/TeamManagement.vue'),
  },
  {
    path: '/course-management',
    name: 'CourseManagement',
    component: () => import('@/pages/CourseManagement.vue'),
  },
  {
    path: '/university-management',
    name: 'UniversityManagement',
    component: () => import('@/pages/UniversityManagement.vue'),
  },
  {
    path: '/course-suggestions',
    name: 'CourseSuggestions',
    component: () => import('@/pages/CourseSuggestion.vue'),
  },
  {
    path: '/agreement-management',
    name: 'AgreementManagement',
    component: () => import('@/pages/AgreementManagement.vue'),
  },
  {
    path: '/agreement-templates',
    name: 'AgreementTemplates',
    component: () => import('@/pages/AgreementTemplateManagement.vue'),
  },
  {
    path: '/offer-management',
    name: 'OfferManagement',
    component: () => import('@/pages/OfferManagement.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

export default router
