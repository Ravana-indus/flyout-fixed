<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-4 left-4 z-50">
      <Button
        @click="sidebarOpen = !sidebarOpen"
        variant="outline"
        size="sm"
        class="bg-white shadow-lg"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </Button>
    </div>

    <!-- Sidebar -->
    <div
      :class="[
        'fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex-shrink-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Logo and Brand -->
        <div class="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <h1 class="text-xl font-bold text-gray-900">Flyout</h1>
            </div>
          </div>
          <Button
            @click="sidebarOpen = false"
            variant="ghost"
            size="sm"
            class="lg:hidden"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </Button>
        </div>

        <!-- User Profile -->
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-900">{{ userName || 'Provider Name' }}</p>
              <p class="text-xs text-gray-500">{{ userEmail || 'provider@example.com' }}</p>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div class="space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                item.current
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
              @click="setCurrentNav(item)"
            >
              <component
                :is="item.icon"
                :class="[
                  'mr-3 h-5 w-5 flex-shrink-0',
                  item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                ]"
              />
              {{ item.name }}
              <span
                v-if="item.count"
                :class="[
                  'ml-auto inline-block py-0.5 px-2 text-xs rounded-full',
                  item.current ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-200 text-gray-700'
                ]"
              >
                {{ item.count }}
              </span>
            </router-link>
          </div>

          <div class="pt-6 mt-6 border-t border-gray-200">
            <div class="space-y-1">
              <router-link
                v-for="item in settingsNav"
                :key="item.name"
                :to="item.href"
                :class="[
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  item.current
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                ]"
                @click="setCurrentSettingsNav(item)"
              >
                <component
                  :is="item.icon"
                  :class="[
                    'mr-3 h-5 w-5 flex-shrink-0',
                    item.current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500'
                  ]"
                />
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </nav>

        <!-- Logout Button -->
        <div class="p-4 border-t border-gray-200">
          <Button
            @click="handleLogout"
            variant="outline"
            class="w-full justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
            Logout
          </Button>
        </div>
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-30 bg-gray-600 bg-opacity-50 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col lg:pl-0">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <!-- Header -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">Inquiry Details</h1>
              <p class="mt-1 text-sm text-gray-500">View and manage inquiry information</p>
            </div>
            <div class="flex space-x-2">
              <Button @click="goBack" variant="outline" icon-left="arrow-left">Back</Button>
              <Button @click="$resources.inquiry.fetch()" :loading="$resources.inquiry.loading" icon-left="refresh-cw">
                Refresh
              </Button>
            </div>
          </div>
        </div>

    <!-- Loading state -->
    <div v-if="$resources.inquiry.loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Loading inquiry details...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="$resources.inquiry.error" class="text-center py-12">
      <div class="text-red-600 mb-2">
        <svg class="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="text-red-600 font-medium mb-2">Error loading inquiry</div>
      <div class="text-gray-600 mb-4">{{ $resources.inquiry.error }}</div>
      <Button @click="$resources.inquiry.fetch()" variant="outline">Retry</Button>
    </div>

    <!-- Inquiry details -->
    <div v-else-if="inquiry" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Basic Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Basic Information</h3>
          </div>
          <div class="p-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Inquiry ID</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="mt-1">
                  <span :class="getStatusClass(inquiry.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ inquiry.status }}
                  </span>
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Priority</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.priority || 'Not set' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Inquiry Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(inquiry.inquiry_date) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Client Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Client Information</h3>
          </div>
          <div class="p-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Client Name</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.client_name }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Client ID</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.client_id }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.client_email }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Phone</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.client_phone || 'Not provided' }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Service Requirements -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Service Requirements</h3>
          </div>
          <div class="p-6">
            <dl class="space-y-4">
              <div>
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{{ inquiry.description || 'No description provided' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Preferred Countries</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.preferred_countries || 'Not specified' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Required Languages</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.required_languages || 'Not specified' }}</dd>
              </div>
              <div v-if="inquiry.special_requirements">
                <dt class="text-sm font-medium text-gray-500">Special Requirements</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.special_requirements }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Budget Information -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Budget Information</h3>
          </div>
          <div class="p-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-3">
              <div>
                <dt class="text-sm font-medium text-gray-500">Minimum Budget</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatCurrency(inquiry.budget_min, inquiry.currency) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Maximum Budget</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatCurrency(inquiry.budget_max, inquiry.currency) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Budget Flexibility</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.budget_flexibility || 'Not specified' }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <InquiryViewButtons :inquiry="inquiry" @inquiry-updated="refreshInquiry" />

        <!-- Status History -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Status History</h3>
          </div>
          <div class="p-6">
            <dl class="space-y-3">
              <div>
                <dt class="text-sm font-medium text-gray-500">Created</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(inquiry.creation) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Last Modified</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(inquiry.modified) }}</dd>
              </div>
              <div v-if="inquiry.conversion_date">
                <dt class="text-sm font-medium text-gray-500">Conversion Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(inquiry.conversion_date) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Assignment Information -->
        <div v-if="inquiry.selected_provider" class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Assignment</h3>
          </div>
          <div class="p-6">
            <dl class="space-y-3">
              <div>
                <dt class="text-sm font-medium text-gray-500">Assigned Provider</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ inquiry.selected_provider }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Conversion Notes -->
        <div v-if="inquiry.conversion_notes" class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Conversion Notes</h3>
          </div>
          <div class="p-6">
            <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ inquiry.conversion_notes }}</p>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'frappe-ui'
import InquiryViewButtons from './InquiryViewButtons.vue'

export default {
  name: 'InquiryDetailView',
  components: {
    Button,
    InquiryViewButtons
  },
  data() {
    return {
      inquiryId: this.$route.params.id,
      sidebarOpen: false,
      userName: 'Loading...',
      userEmail: 'Loading...',

      // Navigation
      navigation: [
        { name: 'Dashboard', href: '/dashboard', icon: 'DashboardIcon', current: false },
        { name: 'Inquiries', href: '/inquiries', icon: 'InquiriesIcon', current: true },
        { name: 'Accepted Inquiries', href: '/accepted-inquiries', icon: 'AcceptedIcon', current: false },
        { name: 'Applications', href: '/applications', icon: 'ApplicationIcon', current: false },
        { name: 'University Applications', href: '/university-applications', icon: 'UniversityIcon', current: false },
        { name: 'Visa Applications', href: '/visa-applications', icon: 'PassportIcon', current: false },
        { name: 'Team Management', href: '/team-management', icon: 'UsersIcon', current: false },
        { name: 'Course Management', href: '/course-management', icon: 'BookIcon', current: false },
        { name: 'University Management', href: '/university-management', icon: 'BuildingIcon', current: false },
        { name: 'Course Suggestions', href: '/course-suggestions', icon: 'LightBulbIcon', current: false },
        { name: 'Agreement Management', href: '/agreement-management', icon: 'ClipboardListIcon', current: false },
        { name: 'Agreement Templates', href: '/agreement-templates', icon: 'DocumentDuplicateIcon', current: false },
        { name: 'Offer Management', href: '/offer-management', icon: 'GiftIcon', current: false },
        { name: 'Calendar', href: '/calendar', icon: 'CalendarIcon', current: false },
      ],

      settingsNav: [
        { name: 'Reports', href: '/reports', icon: 'ReportsIcon', current: false },
        { name: 'Settings', href: '/settings', icon: 'SettingsIcon', current: false },
        { name: 'Help', href: '/help', icon: 'HelpIcon', current: false },
      ]
    }
  },
  resources: {
    inquiry: {
      url: 'frappe.client.get',
      makeParams() {
        console.log("🔎 Params for inquiry:", {
          doctype: 'Inquiry',
          name: this.inquiryId
        })
        return {
          doctype: 'Inquiry',
          name: this.inquiryId
        }
      },
      auto: true,
      transform(data) {
        console.log("📄 Inquiry data received:", data)
        return data.message
      },
      onSuccess(data) {
        console.log("✅ Inquiry loaded successfully:", data)
      },
      onError(error) {
        console.error("❌ Failed to load inquiry:", error)
      }
    }
  },
  computed: {
    inquiry() {
      return this.$resources.inquiry.data || {}
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    refreshInquiry() {
      this.$resources.inquiry.fetch()
    },
    setCurrentNav(selectedItem) {
      this.navigation.forEach(item => {
        item.current = item.name === selectedItem.name
      })
      this.settingsNav.forEach(item => {
        item.current = false
      })
    },
    setCurrentSettingsNav(selectedItem) {
      this.settingsNav.forEach(item => {
        item.current = item.name === selectedItem.name
      })
      this.navigation.forEach(item => {
        item.current = false
      })
    },
    handleLogout() {
      console.log('Logout clicked')
      if (confirm('Are you sure you want to logout?')) {
        localStorage.clear()
        window.location.href = '/login'
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'Not set'
      return new Date(dateString).toLocaleDateString()
    },
    formatDateTime(dateString) {
      if (!dateString) return 'Not set'
      return new Date(dateString).toLocaleString()
    },
    formatCurrency(amount, currency) {
      if (!amount || amount === 0) return 'Not specified'
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD'
      }).format(amount)
    },
    getStatusClass(status) {
      const statusClasses = {
        'Open': 'bg-yellow-100 text-yellow-800',
        'Draft': 'bg-green-100 text-green-800',
        'New': 'bg-blue-100 text-blue-800',
        'Accepted': 'bg-purple-100 text-purple-800',
        'Qualified': 'bg-indigo-100 text-indigo-800',
        'Converted': 'bg-green-100 text-green-800'
      }
      return statusClasses[status] || 'bg-gray-100 text-gray-800'
    },
    editInquiry() {
      // TODO: Implement edit functionality
      console.log('Edit inquiry:', this.inquiry)
    },

    // Icon components
    DashboardIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`
    },
    InquiriesIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`
    },
    AcceptedIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    },
    ApplicationIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
    },
    UniversityIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
    },
    PassportIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
    },
    UsersIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
    },
    BookIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
    },
    BuildingIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
    },
    LightBulbIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`
    },
    ClipboardListIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>`
    },
    DocumentDuplicateIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2 2H8a2 2 0 01-2-2v-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>`
    },
    GiftIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>`
    },
    CalendarIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
    },
    ReportsIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
    },
    SettingsIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
    },
    HelpIcon: {
      template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
    }
  }
}
</script>
