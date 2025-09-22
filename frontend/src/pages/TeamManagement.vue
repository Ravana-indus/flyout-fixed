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
              </router-link>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <div class="flex-1 relative z-0 flex overflow-hidden">
        <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div class="p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h1 class="text-2xl font-semibold text-gray-900">Team Management</h1>
                <p class="text-gray-600">Manage your team members, roles, and permissions</p>
              </div>
              <Button variant="solid" @click="createNew">
                <template #prefix><FeatherIcon name="plus" class="w-4 h-4" /></template>
                Add Team Member
              </Button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div class="flex items-center">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <UsersIcon class="w-6 h-6 text-blue-600" />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-blue-600">Total Members</p>
                    <p class="text-2xl font-bold text-blue-900">{{ stats.total }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                <div class="flex items-center">
                  <div class="p-2 bg-green-100 rounded-lg">
                    <CheckCircleIcon class="w-6 h-6 text-green-600" />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-green-600">Active</p>
                    <p class="text-2xl font-bold text-green-900">{{ stats.active }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div class="flex items-center">
                  <div class="p-2 bg-yellow-100 rounded-lg">
                    <ClockIcon class="w-6 h-6 text-yellow-600" />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-yellow-600">Pending</p>
                    <p class="text-2xl font-bold text-yellow-900">{{ stats.pending }}</p>
                  </div>
                </div>
              </div>

              <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                <div class="flex items-center">
                  <div class="p-2 bg-red-100 rounded-lg">
                    <XCircleIcon class="w-6 h-6 text-red-600" />
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-red-600">Inactive</p>
                    <p class="text-2xl font-bold text-red-900">{{ stats.inactive }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-4 flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <Input
                  type="text"
                  placeholder="Search team members..."
                  v-model="searchTerm"
                  class="w-full"
                >
                  <template #prefix>
                    <FeatherIcon name="search" class="w-4 h-4 text-gray-400" />
                  </template>
                </Input>
              </div>

              <div class="flex gap-2">
                <select
                  v-model="selectedStatus"
                  class="w-40 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
                <select
                  v-model="selectedUserType"
                  class="w-40 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option v-for="option in userTypeOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="bg-white rounded-lg border">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50 border-b">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Team Member
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact Info
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role & Type
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="member in filteredMembers" :key="member.name" class="hover:bg-gray-50">
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10">
                            <img
                              v-if="member.user_image"
                              class="h-10 w-10 rounded-full"
                              :src="member.user_image"
                              :alt="member.full_name"
                            />
                            <div
                              v-else
                              class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center"
                            >
                              <span class="text-sm font-medium text-indigo-600">
                                {{ getInitials(member.full_name) }}
                              </span>
                            </div>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ member.full_name }}</div>
                            <div class="text-sm text-gray-500">{{ member.username }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div>
                          <div class="text-sm text-gray-900">{{ member.email }}</div>
                          <div class="text-sm text-gray-500" v-if="member.mobile_no">{{ member.mobile_no }}</div>
                          <div class="text-sm text-gray-500" v-if="member.location">{{ member.location }}</div>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div>
                          <div class="text-sm font-medium text-gray-900">{{ member.role_profile_name || 'No Role' }}</div>
                          <div class="text-sm text-gray-500">{{ member.user_type }}</div>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <Badge
                          :variant="getStatusVariant(member.enabled)"
                          size="md"
                        >
                          {{ member.enabled ? 'Active' : 'Inactive' }}
                        </Badge>
                      </td>
                      <td class="px-6 py-4">
                        <div class="text-sm text-gray-900">
                          {{ formatDate(member.last_active) }}
                        </div>
                        <div class="text-sm text-gray-500">
                          Last login: {{ formatDate(member.last_login) }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex space-x-2">
                          <Button size="sm" variant="outline" @click="viewMember(member)">
                            View
                          </Button>
                          <Dropdown :options="getActionOptions(member)">
                            <Button size="sm" variant="ghost">
                              <FeatherIcon name="more-horizontal" class="w-4 h-4" />
                            </Button>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div v-if="filteredMembers.length === 0" class="text-center py-8">
                <UsersIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 class="text-sm font-medium text-gray-900 mb-1">No team members found</h3>
                <p class="text-sm text-gray-500">Get started by adding your first team member.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { createResource } from 'frappe-ui'

const {
  Button,
  Input,
  Badge,
  Dropdown,
  FeatherIcon
} = window.frappe?.ui || {}

const UsersIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
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

const CheckCircleIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

const ClockIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

const XCircleIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

// Navigation Icon components
const DashboardIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`
}

const JobsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`
}

const CustomersIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`
}

const CalendarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
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

const ReportsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`
}

const SettingsIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`
}

const HelpIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
}

export default {
  name: 'TeamManagement',
  components: {
    Button,
    Input,
    Badge,
    Dropdown,
    FeatherIcon,
    UsersIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon
  },
  data() {
    return {
      sidebarOpen: false,
      userMenuOpen: false,
      userName: 'John Provider',
      userEmail: 'john.provider@example.com',
      providerInfo: {
        companyName: 'Company Name',
        licenseNumber: 'Loading...'
      },

      // Navigation
      navigation: [
        { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon, current: false },
        { name: 'Jobs', href: '/jobs', icon: JobsIcon, current: false, count: 5 },
        { name: 'Customers', href: '/customers', icon: CustomersIcon, current: false },
        { name: 'Inquiries', href: '/inquiries', icon: InquiriesIcon, current: false, count: 12 },
        { name: 'Accepted Inquiries', href: '/accepted-inquiries', icon: AcceptedIcon, current: false, count: 8 },
        { name: 'Applications', href: '/applications', icon: ApplicationIcon, current: false },
        { name: 'University Applications', href: '/university-applications', icon: UniversityIcon, current: false },
        { name: 'Visa Applications', href: '/visa-applications', icon: PassportIcon, current: false },
        { name: 'Team Management', href: '/team-management', icon: UsersIcon, current: true },
        { name: 'Course Management', href: '/course-management', icon: BookIcon, current: false },
        { name: 'University Management', href: '/university-management', icon: BuildingIcon, current: false },
        { name: 'Course Suggestions', href: '/course-suggestions', icon: LightBulbIcon, current: false },
        { name: 'Agreement Management', href: '/agreement-management', icon: ClipboardListIcon, current: false },
        { name: 'Agreement Templates', href: '/agreement-templates', icon: DocumentDuplicateIcon, current: false },
        { name: 'Offer Management', href: '/offer-management', icon: GiftIcon, current: false },
        { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false },
      ],

      settingsNav: [
        { name: 'Reports', href: '/reports', icon: ReportsIcon, current: false },
        { name: 'Settings', href: '/settings', icon: SettingsIcon, current: false },
        { name: 'Help', href: '/help', icon: HelpIcon, current: false },
      ],

      searchTerm: '',
      selectedStatus: '',
      selectedUserType: '',

      statusOptions: [
        { label: 'All Status', value: '' },
        { label: 'Active', value: '1' },
        { label: 'Inactive', value: '0' }
      ],

      userTypeOptions: [
        { label: 'All Types', value: '' },
        { label: 'System User', value: 'System User' },
        { label: 'Website User', value: 'Website User' }
      ],

      teamMembers: []
    }
  },
  computed: {
    filteredMembers() {
      if (!this.teamMembers) return []

      console.log('Team Members data:', this.teamMembers)
      return this.teamMembers.filter(member => {
        const matchesSearch = !this.searchTerm ||
          member.full_name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          member.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          member.username?.toLowerCase().includes(this.searchTerm.toLowerCase())

        const matchesStatus = !this.selectedStatus || member.enabled.toString() === this.selectedStatus
        const matchesUserType = !this.selectedUserType || member.user_type === this.selectedUserType

        return matchesSearch && matchesStatus && matchesUserType
      })
    },

    stats() {
      if (!this.teamMembers) {
        return { total: 0, active: 0, pending: 0, inactive: 0 }
      }

      const data = this.teamMembers
      return {
        total: data.length,
        active: data.filter(member => member.enabled === 1).length,
        pending: data.filter(member => !member.last_login && member.enabled === 1).length,
        inactive: data.filter(member => member.enabled === 0).length
      }
    }
  },
  mounted() {
    console.log('Loading Team Members data...')
    this.loadTeamMembers()
  },
  methods: {
    setCurrentNav(item) {
      this.navigation.forEach(nav => nav.current = false)
      this.settingsNav.forEach(nav => nav.current = false)
      item.current = true
    },

    loadTeamMembers() {
      const resource = createResource({
        url: 'frappe.client.get_list',
        params: {
          doctype: 'User',
          fields: [
            'name', 'email', 'first_name', 'last_name', 'full_name', 'username',
            'enabled', 'user_type', 'role_profile_name', 'user_image',
            'mobile_no', 'phone', 'location', 'bio', 'gender', 'birth_date',
            'last_active', 'last_login', 'language', 'time_zone',
            'creation', 'modified'
          ],
          filters: {
            user_type: ['!=', 'Guest'],
            enabled: ['in', [0, 1]]
          },
          order_by: 'full_name asc'
        }
      })

      resource.fetch().then((data) => {
        this.teamMembers = data || []
        console.log('Loaded team members:', this.teamMembers)
      }).catch((error) => {
        console.error('Error loading team members:', error)
        this.teamMembers = []
      })
    },

    formatDate(dateString) {
      if (!dateString) return 'Never'
      return new Date(dateString).toLocaleDateString()
    },

    getStatusVariant(enabled) {
      return enabled ? 'green' : 'red'
    },

    getInitials(fullName) {
      if (!fullName) return '?'
      return fullName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2)
    },

    getActionOptions(member) {
      return [
        {
          label: 'Edit Profile',
          icon: 'edit',
          onClick: () => this.editMember(member)
        },
        {
          label: 'View Permissions',
          icon: 'shield',
          onClick: () => this.viewPermissions(member)
        },
        {
          label: member.enabled ? 'Deactivate' : 'Activate',
          icon: member.enabled ? 'user-x' : 'user-check',
          onClick: () => this.toggleMemberStatus(member)
        },
        {
          label: 'Reset Password',
          icon: 'key',
          onClick: () => this.resetPassword(member)
        },
        {
          label: 'Delete',
          icon: 'trash-2',
          onClick: () => this.deleteMember(member)
        }
      ]
    },

    createNew() {
      window.location.href = `/app/user/new`
    },

    viewMember(member) {
      window.location.href = `/app/user/${member.name}`
    },

    editMember(member) {
      window.location.href = `/app/user/${member.name}`
    },

    viewPermissions(member) {
      console.log('View permissions for:', member.name)
    },

    toggleMemberStatus(member) {
      if (confirm(`Are you sure you want to ${member.enabled ? 'deactivate' : 'activate'} ${member.full_name}?`)) {
        console.log('Toggle status for:', member.name)
      }
    },

    resetPassword(member) {
      if (confirm(`Send password reset email to ${member.full_name}?`)) {
        console.log('Reset password for:', member.name)
      }
    },

    deleteMember(member) {
      if (confirm(`Are you sure you want to delete ${member.full_name}? This action cannot be undone.`)) {
        console.log('Delete member:', member.name)
      }
    }
  }
}
</script>