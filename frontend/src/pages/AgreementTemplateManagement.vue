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
              <p class="text-xs text-gray-500 mt-1">{{ providerInfo.companyName || 'Company Name' }}</p>
              <p class="text-xs text-indigo-600" v-if="providerInfo.licenseNumber && providerInfo.licenseNumber !== 'Loading...'">
                License: {{ providerInfo.licenseNumber }}
              </p>
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
              @click="item.current = true; setCurrentNav(item)"
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
                @click="item.current = true; setCurrentSettingsNav(item)"
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
      class="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 lg:pl-0">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between h-16 px-6">
          <div class="flex items-center">
            <h2 class="text-2xl font-bold text-gray-900">Agreement Templates</h2>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <Button variant="ghost" size="sm" class="relative">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span class="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </Button>

            <!-- User Menu -->
            <div class="relative">
              <Button variant="ghost" size="sm" @click="userMenuOpen = !userMenuOpen">
                <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </Button>

              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
              >
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                <hr class="my-1">
                <a href="#" @click="handleLogout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Agreement Templates Content -->
      <main class="p-6">
        <!-- Action Buttons -->
        <div class="mb-6">
          <Button variant="solid" @click="createNew">
            <template #prefix>
              <FeatherIcon name="plus" class="h-4 w-4" />
            </template>
            Create Template
          </Button>
        </div>
        <!-- Stats -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Total Templates</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ stats.total }}</dd>
            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Active Templates</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-green-600">{{ stats.active }}</dd>
            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Default Templates</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-blue-600">{{ stats.default }}</dd>
            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Requires Review</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-orange-600">{{ stats.requiresReview }}</dd>
            </div>
          </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <Input
                  v-model="searchQuery"
                  placeholder="Search templates..."
                  :debounce="300"
                  @change="loadTemplates"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                <Input
                  v-model="providerFilter"
                  placeholder="Filter by provider..."
                  :debounce="300"
                  @change="loadTemplates"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Agreement Type</label>
                <Input
                  v-model="agreementTypeFilter"
                  placeholder="Filter by type..."
                  :debounce="300"
                  @change="loadTemplates"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Dropdown
                  :options="statusOptions"
                  v-model="selectedStatus"
                  placeholder="All Templates"
                  @change="loadTemplates"
                />
              </div>
            </div>
          </div>

        <!-- Templates List -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <div v-if="loading" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="mt-2 text-sm text-gray-500">Loading templates...</p>
              </div>

              <div v-else-if="templates.length === 0" class="text-center py-12">
                <FeatherIcon name="file-text" class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-semibold text-gray-900">No templates found</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by creating a new agreement template.</p>
                <div class="mt-6">
                  <Button variant="solid" @click="createNew">
                    <template #prefix>
                      <FeatherIcon name="plus" class="h-4 w-4" />
                    </template>
                    Create Template
                  </Button>
                </div>
              </div>

              <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Template
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Provider
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Agreement Type
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Version
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="template in templates" :key="template.name" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div>
                            <div class="text-sm font-medium text-gray-900">
                              {{ template.template_name }}
                            </div>
                            <div class="text-sm text-gray-500">
                              {{ template.name }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ template.provider }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ template.agreement_type }}</div>
                        <div class="text-sm text-gray-500" v-if="template.service_type">{{ template.service_type }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ template.version }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center space-x-2">
                          <Badge
                            v-if="template.is_active"
                            variant="green"
                            label="Active"
                          />
                          <Badge
                            v-if="template.is_default"
                            variant="blue"
                            label="Default"
                          />
                          <Badge
                            v-if="template.requires_legal_review"
                            variant="orange"
                            label="Review Required"
                          />
                          <Badge
                            v-if="!template.is_active"
                            variant="gray"
                            label="Inactive"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(template.creation) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dropdown :options="getActionOptions(template)" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Template Preview Modal -->
          <div v-if="selectedTemplate" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-screen items-center justify-center p-4">
              <div class="fixed inset-0 bg-black bg-opacity-25" @click="closePreview"></div>
              <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                <div class="flex items-center justify-between p-6 border-b">
                  <h3 class="text-lg font-semibold text-gray-900">Template Preview</h3>
                  <button @click="closePreview" class="text-gray-400 hover:text-gray-600">
                    <FeatherIcon name="x" class="h-6 w-6" />
                  </button>
                </div>
                <div class="p-6 overflow-y-auto max-h-96">
                  <h4 class="font-medium text-gray-900 mb-2">{{ selectedTemplate.template_name }}</h4>
                  <div class="prose max-w-none" v-html="selectedTemplate.template_content"></div>
                </div>
                <div class="flex justify-end p-6 border-t space-x-3">
                  <Button variant="ghost" @click="closePreview">Close</Button>
                  <Button variant="solid" @click="editTemplate(selectedTemplate)">Edit Template</Button>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  </div>
</template>

<script>
import { createResource } from 'frappe-ui'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

// Icon components
const DashboardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`
}

const JobsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`
}

const CustomersIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
}

const InquiriesIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`
}

const AcceptedIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

const ApplicationIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
}

const UniversityIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
}

const PassportIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
}

const UsersIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
}

const CalendarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
}

const ReportsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
}

const SettingsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
}

const HelpIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

const FileIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
}

const InboxIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m6 0a4 4 0 008 0"></path></svg>`
}

const CheckIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

const AcademicCapIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>`
}

const GlobeIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

const UserGroupIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
}

const BookIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`
}

const BuildingIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`
}

const LightBulbIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>`
}

const ClipboardListIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>`
}

const DocumentDuplicateIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2 2H8a2 2 0 01-2-2v-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>`
}

const GiftIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path></svg>`
}

export default {
  name: 'AgreementTemplateManagement',
  setup() {
    const router = useRouter()
    const templates = ref([])
    const loading = ref(false)
    const searchQuery = ref('')
    const providerFilter = ref('')
    const agreementTypeFilter = ref('')
    const selectedStatus = ref('')
    const selectedTemplate = ref(null)

    // State variables for the standardized sidebar
    const sidebarOpen = ref(false)
    const userMenuOpen = ref(false)
    const userName = ref('Provider User')
    const userEmail = ref('provider@example.com')
    const providerInfo = ref({
      companyName: 'Company Name',
      licenseNumber: 'Loading...'
    })

    const navigation = [
      { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon, current: false },
      { name: 'Jobs', href: '/jobs', icon: JobsIcon, current: false, count: 5 },
      { name: 'Customers', href: '/customers', icon: CustomersIcon, current: false },
      { name: 'Inquiries', href: '/inquiries', icon: InquiriesIcon, current: false, count: 12 },
      { name: 'Accepted Inquiries', href: '/accepted-inquiries', icon: AcceptedIcon, current: false },
      { name: 'Applications', href: '/applications', icon: ApplicationIcon, current: false },
      { name: 'University Applications', href: '/university-applications', icon: UniversityIcon, current: false },
      { name: 'Visa Applications', href: '/visa-applications', icon: PassportIcon, current: false },
      { name: 'Team Management', href: '/team-management', icon: UsersIcon, current: false },
      { name: 'Course Management', href: '/course-management', icon: BookIcon, current: false },
      { name: 'University Management', href: '/university-management', icon: BuildingIcon, current: false },
      { name: 'Course Suggestions', href: '/course-suggestions', icon: LightBulbIcon, current: false },
      { name: 'Agreement Management', href: '/agreement-management', icon: ClipboardListIcon, current: false },
      { name: 'Agreement Templates', href: '/agreement-templates', icon: DocumentDuplicateIcon, current: true },
      { name: 'Offer Management', href: '/offer-management', icon: GiftIcon, current: false },
      { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false },
    ]

    const settingsNav = [
      { name: 'Reports', href: '/reports', icon: ReportsIcon, current: false },
      { name: 'Settings', href: '/settings', icon: SettingsIcon, current: false },
      { name: 'Help', href: '/help', icon: HelpIcon, current: false },
    ]

    const statusOptions = [
      { label: 'All Templates', value: '' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Default', value: 'default' },
      { label: 'Requires Review', value: 'review' }
    ]

    const stats = computed(() => {
      const total = templates.value.length
      const active = templates.value.filter(t => t.is_active).length
      const defaultTemplates = templates.value.filter(t => t.is_default).length
      const requiresReview = templates.value.filter(t => t.requires_legal_review).length

      return { total, active, default: defaultTemplates, requiresReview }
    })

    const loadTemplates = () => {
      loading.value = true

      const resource = createResource({
        url: 'frappe.client.get_list',
        params: {
          doctype: 'Agreement Template',
          fields: [
            'name', 'template_name', 'provider', 'agreement_type',
            'service_type', 'is_default', 'is_active', 'version',
            'template_content', 'auto_generate_clauses', 'requires_legal_review',
            'creation', 'modified'
          ],
          filters: buildFilters(),
          order_by: 'creation desc'
        }
      })

      resource.fetch().then((data) => {
        templates.value = data || []
      }).catch((error) => {
        console.error('Error loading templates:', error)
        templates.value = []
      }).finally(() => {
        loading.value = false
      })
    }

    const buildFilters = () => {
      const filters = []

      if (searchQuery.value) {
        filters.push(['template_name', 'like', `%${searchQuery.value}%`])
      }

      if (providerFilter.value) {
        filters.push(['provider', 'like', `%${providerFilter.value}%`])
      }

      if (agreementTypeFilter.value) {
        filters.push(['agreement_type', 'like', `%${agreementTypeFilter.value}%`])
      }

      if (selectedStatus.value === 'active') {
        filters.push(['is_active', '=', 1])
      } else if (selectedStatus.value === 'inactive') {
        filters.push(['is_active', '=', 0])
      } else if (selectedStatus.value === 'default') {
        filters.push(['is_default', '=', 1])
      } else if (selectedStatus.value === 'review') {
        filters.push(['requires_legal_review', '=', 1])
      }

      return filters
    }

    const formatDate = (dateString) => {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleDateString()
    }

    const getActionOptions = (template) => {
      return [
        {
          label: 'Preview',
          onClick: () => previewTemplate(template)
        },
        {
          label: 'Edit',
          onClick: () => editTemplate(template)
        },
        {
          label: 'Duplicate',
          onClick: () => duplicateTemplate(template)
        },
        {
          label: template.is_active ? 'Deactivate' : 'Activate',
          onClick: () => toggleTemplateStatus(template)
        },
        {
          label: 'Set as Default',
          onClick: () => setAsDefault(template),
          disabled: template.is_default
        },
        {
          label: 'Delete',
          onClick: () => deleteTemplate(template)
        }
      ]
    }

    const createNew = () => {
      console.log('Create new template')
    }

    const previewTemplate = (template) => {
      selectedTemplate.value = template
    }

    const closePreview = () => {
      selectedTemplate.value = null
    }

    const editTemplate = (template) => {
      console.log('Edit template:', template.name)
    }

    const duplicateTemplate = (template) => {
      console.log('Duplicate template:', template.name)
    }

    const toggleTemplateStatus = (template) => {
      console.log('Toggle status for template:', template.name)
    }

    const setAsDefault = (template) => {
      console.log('Set as default template:', template.name)
    }

    const deleteTemplate = (template) => {
      console.log('Delete template:', template.name)
    }

    // Standardized sidebar functions
    const setCurrentNav = (selectedItem) => {
      navigation.forEach(item => {
        item.current = item.name === selectedItem.name
      })
      settingsNav.forEach(item => {
        item.current = false
      })
    }

    const setCurrentSettingsNav = (selectedItem) => {
      settingsNav.forEach(item => {
        item.current = item.name === selectedItem.name
      })
      navigation.forEach(item => {
        item.current = false
      })
    }

    const handleLogout = () => {
      console.log('Logout clicked')
      if (confirm('Are you sure you want to logout?')) {
        localStorage.clear()
        window.location.href = '/login'
      }
    }

    onMounted(() => {
      loadTemplates()
    })

    return {
      templates,
      loading,
      searchQuery,
      providerFilter,
      agreementTypeFilter,
      selectedStatus,
      selectedTemplate,
      sidebarOpen,
      userMenuOpen,
      userName,
      userEmail,
      providerInfo,
      navigation,
      settingsNav,
      statusOptions,
      stats,
      loadTemplates,
      formatDate,
      getActionOptions,
      createNew,
      previewTemplate,
      closePreview,
      editTemplate,
      setCurrentNav,
      setCurrentSettingsNav,
      handleLogout
    }
  }
}
</script>