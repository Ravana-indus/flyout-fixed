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

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-1">
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
                  'ml-auto px-2 py-1 text-xs font-medium rounded-full',
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

    <!-- Main content -->
    <main class="flex-1 lg:ml-0">
      <div class="p-6 lg:p-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-gray-900">University Applications</h1>
              <p class="mt-1 text-sm text-gray-600">Manage university applications and track progress</p>
            </div>
            <div class="flex items-center space-x-4">
              <Button @click="showFilterDialog = true" variant="outline">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707v4.586a1 1 0 01-.293.707l-2 2A1 1 0 0111 21v-6.586a1 1 0 00-.293-.707L4.293 7.293A1 1 0 014 6.586V4z"></path>
                </svg>
                Filter
              </Button>
              <Button @click="loadUniversityApplications" variant="outline">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Applications</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
              </div>
              <div class="p-3 bg-blue-100 rounded-lg">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">In Progress</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.inProgress }}</p>
              </div>
              <div class="p-3 bg-yellow-100 rounded-lg">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Offers Received</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.offersReceived }}</p>
              </div>
              <div class="p-3 bg-green-100 rounded-lg">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Service Fees</p>
                <p class="text-2xl font-bold text-gray-900">${{ stats.totalFees.toLocaleString() }}</p>
              </div>
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Debug Panel -->
        <div v-if="showDebug" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h4 class="text-sm font-medium text-green-800">Debug Info - University Applications:</h4>
              <div class="text-xs text-green-700 mt-2 grid grid-cols-2 gap-4">
                <div>
                  <div><strong>State:</strong></div>
                  <div>Loading: {{ loading }}</div>
                  <div>University Applications: {{ universityApplications.length }}</div>
                  <div>Filtered: {{ filteredUniversityApplications.length }}</div>
                  <div>User: {{ userName }}</div>
                  <div>Email: {{ userEmail }}</div>
                </div>
                <div>
                  <div><strong>Provider Info:</strong></div>
                  <div>ID: {{ providerInfo.id }}</div>
                  <div>Name: {{ providerInfo.name }}</div>
                  <div>Email: {{ providerInfo.email }}</div>
                  <div>License: {{ providerInfo.licenseNumber }}</div>
                  <div><strong>App Status:</strong></div>
                  <div>Resources: {{ $resources ? 'Available' : 'Missing' }}</div>
                  <div>Current URL: {{ currentUrl }}</div>
                </div>
              </div>
            </div>
            <Button @click="showDebug = false" variant="ghost" size="sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </Button>
          </div>
        </div>

        <!-- University Applications List -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">University Applications</h3>
              <div class="flex items-center space-x-4">
                <select v-model="statusFilter" @change="filterUniversityApplications" class="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="all">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Applied">Applied</option>
                  <option value="Offer Received">Offer Received</option>
                  <option value="Offer Rejected">Offer Rejected</option>
                  <option value="Closed">Closed</option>
                </select>
                <select v-model="sortBy" @change="sortUniversityApplications" class="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                  <option value="university">Sort by University</option>
                  <option value="deadline">Sort by Deadline</option>
                </select>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table v-if="filteredUniversityApplications.length > 0" class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Fee</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="uniApp in filteredUniversityApplications" :key="uniApp.name" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ uniApp.name }}</div>
                        <div class="text-sm text-gray-500">{{ uniApp.application || 'N/A' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ uniApp.university || 'N/A' }}</div>
                    <div class="text-sm text-gray-500">{{ uniApp.academic_year || '' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ uniApp.course || 'N/A' }}</div>
                    <div class="text-sm text-gray-500">{{ uniApp.intake_period || '' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(uniApp.status)">
                      {{ uniApp.status || 'Draft' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          class="bg-blue-600 h-2 rounded-full"
                          :style="{ width: (uniApp.progress_percentage || 0) + '%' }"
                        ></div>
                      </div>
                      <span class="ml-2 text-sm text-gray-900">{{ uniApp.progress_percentage || 0 }}%</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(uniApp.application_deadline) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${{ (uniApp.service_fee || 0).toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button @click="viewUniversityApplication(uniApp)" variant="ghost" size="sm">
                      View
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Empty State -->
            <div v-else class="text-center py-12">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No university applications found</h3>
              <p class="mt-1 text-sm text-gray-500">
                <span v-if="universityApplications.length === 0">
                  Use the debug panel above to load data.
                </span>
                <span v-else>
                  Adjust filters or load more data.
                </span>
              </p>
              <div v-if="universityApplications.length === 0" class="mt-4 space-x-2">
                <Button @click="testApiConnection" class="bg-green-600 text-white">Test API & Load Real Data</Button>
                <Button @click="loadTestData" variant="outline">Load Test Data</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Filter Dialog -->
    <Dialog title="Filter University Applications" v-model="showFilterDialog">
      <div class="p-6">
        <form @submit.prevent="applyFilters" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Date From</label>
              <input
                v-model="filters.dateFrom"
                type="date"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Date To</label>
              <input
                v-model="filters.dateTo"
                type="date"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Status</label>
            <select v-model="filters.status" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Applied">Applied</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Offer Rejected">Offer Rejected</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">University</label>
            <input
              v-model="filters.university"
              type="text"
              placeholder="Search by university name"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div class="flex justify-end space-x-3">
            <Button @click="clearFilters" variant="outline">Clear</Button>
            <Button type="submit">Apply Filters</Button>
          </div>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { Button, Dialog } from 'frappe-ui'

// Icon components
const HomeIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>
  `
}

const DashboardIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
    </svg>
  `
}

const CustomersIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  `
}

const InquiriesIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  `
}

const AcceptedIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  `
}

const ApplicationIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
  `
}

const UniversityIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
    </svg>
  `
}

const PassportIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
    </svg>
  `
}

const UsersIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"></path>
    </svg>
  `
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

const CalendarIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
  `
}

const ReportsIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
    </svg>
  `
}

const SettingsIcon = {
  template: `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
    </svg>
  `
}

export default {
  name: 'UniversityApplication',
  data() {
    return {
      sidebarOpen: false,
      userMenuOpen: false,
      userName: 'Loading...',
      userEmail: 'Loading...',
      showDebug: false,
      currentUrl: window.location.href,

      navigation: [
        { name: 'Home', href: '/', icon: HomeIcon, current: false },
        { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon, current: false },
        { name: 'Customers', href: '/customers', icon: CustomersIcon, current: false },
        { name: 'Inquiries', href: '/inquiries', icon: InquiriesIcon, current: false, count: 12 },
        { name: 'Accepted Inquiries', href: '/accepted-inquiries', icon: AcceptedIcon, current: false, count: 8 },
        { name: 'Applications', href: '/applications', icon: ApplicationIcon, current: false },
        { name: 'University Applications', href: '/university-applications', icon: UniversityIcon, current: true },
        { name: 'Visa Applications', href: '/visa-applications', icon: PassportIcon, current: false },
        { name: 'Team Management', href: '/team-management', icon: UsersIcon, current: false },
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
      ],

      providerInfo: {
        id: 'PROV-00067',
        name: 'Global Education Services',
        email: 'admin@globaledu.com',
        licenseNumber: 'LIC-GES-2023-001'
      },

      // University Applications data
      universityApplications: [],
      filteredUniversityApplications: [],

      // Filters and sorting
      statusFilter: 'all',
      sortBy: 'date',
      showFilterDialog: false,
      filters: {
        dateFrom: '',
        dateTo: '',
        status: '',
        university: ''
      },

      // Loading and error states
      loading: false,

      // Statistics
      stats: {
        total: 0,
        inProgress: 0,
        offersReceived: 0,
        totalFees: 0
      },

      selectedUniversityApplication: null,
    }
  },
  resources: {
    universityApplications: {
      url: 'frappe.client.get_list',
      params: {
        doctype: 'University Application',
        fields: [
          'name', 'application', 'provider', 'client', 'provider_course',
          'university', 'course', 'service_fee', 'status', 'application_deadline',
          'application_submitted_date', 'response_expected_date', 'offer_received_date',
          'university_application_id', 'academic_year', 'intake_period', 'course_duration',
          'tuition_fees', 'application_fee_amount', 'fee_payment_status', 'offer_type',
          'scholarship_offered', 'scholarship_amount', 'assigned_staff', 'progress_percentage',
          'current_stage', 'priority', 'creation', 'modified'
        ]
      },
      onSuccess(data) {
        console.log('✅ University Applications loaded via resource:', data)
        this.universityApplications = data || []
        this.filteredUniversityApplications = [...this.universityApplications]
        this.calculateStats()
      },
      onError(error) {
        console.error('❌ Failed to load university applications via resource:', error)
        this.universityApplications = []
        this.filteredUniversityApplications = []
      }
    },
    user: {
      url: 'frappe.auth.get_logged_user',
      onSuccess(user) {
        this.userName = user.full_name || user.name || 'Unknown User'
        this.userEmail = user.email || 'No email'
      }
    }
  },
  methods: {
    setCurrentNav(item) {
      this.navigation.forEach(nav => nav.current = false)
      item.current = true
      this.sidebarOpen = false
    },

    setCurrentSettingsNav(item) {
      this.settingsNav.forEach(nav => nav.current = false)
      item.current = true
      this.sidebarOpen = false
    },

    handleLogout() {
      console.log('Logout clicked')
      // Add logout logic here
    },

    async loadUniversityApplications() {
      this.loading = true
      try {
        console.log('Loading university applications using Frappe resource...')
        console.log('Resource object:', this.$resources.universityApplications)

        if (this.$resources.universityApplications && this.$resources.universityApplications.fetch) {
          await this.$resources.universityApplications.fetch()
        } else if (this.$resources.universityApplications && this.$resources.universityApplications.reload) {
          await this.$resources.universityApplications.reload()
        } else {
          console.log('Resource methods available:', Object.keys(this.$resources.universityApplications || {}))
          throw new Error('No fetch or reload method available on resource')
        }
      } catch (error) {
        console.error('Failed to load university applications:', error)
        console.log('Falling back to test data...')
        this.universityApplications = this.getTestData()
        this.filteredUniversityApplications = [...this.universityApplications]
        this.calculateStats()
      } finally {
        this.loading = false
      }
    },

    calculateStats() {
      this.stats.total = this.universityApplications.length
      this.stats.inProgress = this.universityApplications.filter(ua => ua.status === 'Applied').length
      this.stats.offersReceived = this.universityApplications.filter(ua => ua.status === 'Offer Received').length

      // Calculate total service fees
      this.stats.totalFees = this.universityApplications.reduce((total, uniApp) => {
        const serviceFee = uniApp.service_fee || 0
        return total + serviceFee
      }, 0)

      // Update navigation count
      const universityNav = this.navigation.find(item => item.name === 'University Applications')
      if (universityNav) {
        universityNav.count = this.stats.total
      }
    },

    filterUniversityApplications() {
      if (this.statusFilter === 'all') {
        this.filteredUniversityApplications = [...this.universityApplications]
      } else {
        this.filteredUniversityApplications = this.universityApplications.filter(
          uniApp => uniApp.status === this.statusFilter
        )
      }
      this.sortUniversityApplications()
    },

    sortUniversityApplications() {
      this.filteredUniversityApplications.sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return a.name.localeCompare(b.name)
          case 'status':
            return (a.status || '').localeCompare(b.status || '')
          case 'university':
            return (a.university || '').localeCompare(b.university || '')
          case 'deadline':
            return new Date(b.application_deadline || b.creation) - new Date(a.application_deadline || a.creation)
          case 'date':
          default:
            return new Date(b.creation) - new Date(a.creation)
        }
      })
    },

    getStatusClass(status) {
      const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
      switch (status?.toLowerCase()) {
        case 'draft':
          return `${baseClasses} bg-gray-100 text-gray-800`
        case 'applied':
          return `${baseClasses} bg-blue-100 text-blue-800`
        case 'offer received':
          return `${baseClasses} bg-green-100 text-green-800`
        case 'offer rejected':
          return `${baseClasses} bg-red-100 text-red-800`
        case 'closed':
          return `${baseClasses} bg-gray-100 text-gray-800`
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`
      }
    },

    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString()
    },

    viewUniversityApplication(uniApp) {
      this.selectedUniversityApplication = uniApp
      console.log('Viewing university application:', uniApp)
    },

    async testApiConnection() {
      console.log('🧪 Testing API connection for University Applications...')
      this.loading = true

      try {
        await this.loadRealUniversityApplicationsNow()
      } catch (error) {
        console.error('❌ API connection test failed:', error)
        this.loadTestData()
      } finally {
        this.loading = false
      }
    },

    async loadRealUniversityApplicationsNow() {
      console.log('Force loading university applications using direct API call...')
      this.loading = true

      try {
        const response = await fetch('/api/method/frappe.client.get_list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Frappe-CSRF-Token': frappe.csrf_token,
          },
          body: JSON.stringify({
            doctype: 'University Application',
            fields: [
              'name', 'application', 'provider', 'client', 'provider_course',
              'university', 'course', 'service_fee', 'status', 'application_deadline',
              'application_submitted_date', 'response_expected_date', 'offer_received_date',
              'university_application_id', 'academic_year', 'intake_period', 'course_duration',
              'tuition_fees', 'application_fee_amount', 'fee_payment_status', 'offer_type',
              'scholarship_offered', 'scholarship_amount', 'assigned_staff', 'progress_percentage',
              'current_stage', 'priority', 'creation', 'modified'
            ]
          })
        })

        const data = await response.json()

        if (data && data.message && Array.isArray(data.message)) {
          this.universityApplications = data.message
          this.filteredUniversityApplications = [...this.universityApplications]
          this.calculateStats()
          alert(`✅ SUCCESS: Loaded ${this.universityApplications.length} real university applications!`)
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error) {
        console.error('❌ Direct API call failed:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    loadTestData() {
      console.log('Loading test data for university applications...')
      this.universityApplications = this.getTestData()
      this.filteredUniversityApplications = [...this.universityApplications]
      this.calculateStats()
    },

    getTestData() {
      return [
        {
          name: 'UA-APP-001-MIT-CS',
          application: 'APP-001',
          provider: 'PROV-00067',
          client: 'CLIENT-001',
          provider_course: 'PC-001',
          university: 'Massachusetts Institute of Technology',
          course: 'Computer Science',
          service_fee: 5000,
          status: 'Applied',
          application_deadline: '2024-01-15',
          application_submitted_date: '2024-01-10',
          response_expected_date: '2024-03-15',
          offer_received_date: null,
          university_application_id: 'MIT-CS-2024-001',
          academic_year: '2024-2025',
          intake_period: 'Fall',
          course_duration: '4 Years',
          tuition_fees: 55000,
          application_fee_amount: 100,
          fee_payment_status: 'Paid',
          offer_type: 'No Offer',
          scholarship_offered: 0,
          scholarship_amount: 0,
          assigned_staff: 'john.doe@company.com',
          progress_percentage: 75,
          current_stage: 'University Review',
          priority: 'High',
          creation: '2024-01-05 10:00:00'
        },
        {
          name: 'UA-APP-002-Stanford-EE',
          application: 'APP-002',
          provider: 'PROV-00067',
          client: 'CLIENT-002',
          provider_course: 'PC-002',
          university: 'Stanford University',
          course: 'Electrical Engineering',
          service_fee: 4500,
          status: 'Offer Received',
          application_deadline: '2024-02-01',
          application_submitted_date: '2024-01-25',
          response_expected_date: '2024-04-01',
          offer_received_date: '2024-03-20',
          university_application_id: 'STAN-EE-2024-002',
          academic_year: '2024-2025',
          intake_period: 'Fall',
          course_duration: '4 Years',
          tuition_fees: 58000,
          application_fee_amount: 125,
          fee_payment_status: 'Paid',
          offer_type: 'Conditional Offer',
          scholarship_offered: 1,
          scholarship_amount: 15000,
          assigned_staff: 'jane.smith@company.com',
          progress_percentage: 90,
          current_stage: 'Offer Processing',
          priority: 'High',
          creation: '2024-01-15 14:30:00'
        },
        {
          name: 'UA-APP-003-Harvard-MBA',
          application: 'APP-003',
          provider: 'PROV-00067',
          client: 'CLIENT-003',
          provider_course: 'PC-003',
          university: 'Harvard University',
          course: 'Master of Business Administration',
          service_fee: 6000,
          status: 'Draft',
          application_deadline: '2024-03-15',
          application_submitted_date: null,
          response_expected_date: null,
          offer_received_date: null,
          university_application_id: null,
          academic_year: '2024-2025',
          intake_period: 'Fall',
          course_duration: '2 Years',
          tuition_fees: 75000,
          application_fee_amount: 200,
          fee_payment_status: 'Pending',
          offer_type: 'No Offer',
          scholarship_offered: 0,
          scholarship_amount: 0,
          assigned_staff: 'mike.jones@company.com',
          progress_percentage: 25,
          current_stage: 'Document Collection',
          priority: 'Medium',
          creation: '2024-02-01 09:15:00'
        }
      ]
    },

    applyFilters() {
      let filtered = [...this.universityApplications]

      if (this.filters.dateFrom) {
        filtered = filtered.filter(ua => {
          const date = new Date(ua.creation)
          return date >= new Date(this.filters.dateFrom)
        })
      }

      if (this.filters.dateTo) {
        filtered = filtered.filter(ua => {
          const date = new Date(ua.creation)
          return date <= new Date(this.filters.dateTo)
        })
      }

      if (this.filters.status) {
        filtered = filtered.filter(ua => ua.status === this.filters.status)
      }

      if (this.filters.university) {
        filtered = filtered.filter(ua =>
          ua.university?.toLowerCase().includes(this.filters.university.toLowerCase())
        )
      }

      this.filteredUniversityApplications = filtered
      this.showFilterDialog = false
    },

    clearFilters() {
      this.filters = {
        dateFrom: '',
        dateTo: '',
        status: '',
        university: ''
      }
      this.filteredUniversityApplications = [...this.universityApplications]
    }
  },
  mounted() {
    console.log('University Applications component mounted, loading data...')
    this.loadUniversityApplications()
  },
  components: {
    Button,
    Dialog
  }
}
</script>

<style scoped>
/* Custom styles for university applications page */
.sidebar-transition {
  transition: transform 0.3s ease-in-out;
}

.stat-card {
  @apply bg-white p-6 rounded-lg shadow;
}

.stat-icon {
  @apply p-3 rounded-lg;
}
</style>