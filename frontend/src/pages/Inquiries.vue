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
            <h2 class="text-2xl font-bold text-gray-900">Inquiries</h2>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Refresh Button -->
            <Button @click="loadInquiries" variant="outline" size="sm" :loading="loading">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh
            </Button>

            <!-- Filter Button -->
            <Button @click="showFilterDialog = true" variant="outline" size="sm">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
              </svg>
              Filter
            </Button>

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

      <!-- Inquiries Content -->
      <main class="p-6">
        <!-- Debug Info (remove in production) -->
        <div v-if="true" class="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h4 class="text-sm font-medium text-yellow-800">Debug Info:</h4>
              <div class="text-xs text-yellow-700 mt-2 grid grid-cols-2 gap-4">
                <div>
                  <div><strong>State:</strong></div>
                  <div>Loading: {{ loading }}</div>
                  <div>Inquiries: {{ inquiries.length }}</div>
                  <div>Filtered: {{ filteredInquiries.length }}</div>
                  <div>User: {{ userName }}</div>
                  <div>Email: {{ userEmail }}</div>
                </div>
                <div>
                  <div><strong>Provider Info:</strong></div>
                  <div>Company: {{ providerInfo.companyName }}</div>
                  <div>License: {{ providerInfo.licenseNumber }}</div>
                  <div><strong>App Status:</strong></div>
                  <div>Custom app port: 8080</div>
                  <div>Resources: {{ $resources ? 'Available' : 'Missing' }}</div>
                  <div>Current URL: {{ currentUrl }}</div>
                  <div>Frappe UI loaded: {{ frappeUiLoaded }}</div>
                </div>
              </div>
            </div>
            <div class="space-x-2 flex-shrink-0">
              <div class="flex flex-col space-y-2">
                <div class="space-x-2">
                  <Button @click="testApiConnection" size="sm" class="bg-blue-600 text-white">Test API & Load Real Data</Button>
                  <Button @click="loadRealInquiriesNow" size="sm" class="bg-green-600 text-white">Force Load Real Data</Button>
                </div>
                <div class="space-x-2">
                  <Button @click="loadInquiries" size="sm" variant="outline">Retry API (with fallback)</Button>
                  <Button @click="loadTestData" size="sm" variant="outline">Load Test Data</Button>
                </div>
                <div class="space-x-2">
                  <Button @click="loadUserInfo" size="sm" variant="outline">Retry User Info</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pending</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Responded</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.responded }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Converted</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.converted }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Inquiries List -->
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900">All Inquiries</h3>
              <div class="flex items-center space-x-2">
                <select v-model="statusFilter" @change="filterInquiries" class="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="all">All Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Matched">Matched</option>
                  <option value="Converted">Converted</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <select v-model="sortBy" @change="sortInquiries" class="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Countries</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="inquiry in filteredInquiries" :key="inquiry.name">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ inquiry.client_name || 'Unknown Client' }}</div>
                        <div class="text-sm text-gray-500">{{ inquiry.client_email || 'No email' }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ inquiry.priority || 'Medium' }}</div>
                    <div class="text-sm text-gray-500">{{ inquiry.client_id || 'No ID' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      <span v-if="inquiry.budget_min || inquiry.budget_max">
                        {{ inquiry.budget_min || 0 }} - {{ inquiry.budget_max || 0 }} {{ inquiry.currency || 'USD' }}
                      </span>
                      <span v-else class="text-gray-500">Not specified</span>
                    </div>
                    <div class="text-xs text-gray-500">{{ inquiry.budget_flexibility || 'Flexible' }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ inquiry.preferred_countries || 'Any' }}</div>
                    <div v-if="inquiry.alternative_countries" class="text-xs text-gray-500">Alt: {{ inquiry.alternative_countries }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(inquiry.inquiry_date || inquiry.creation) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getStatusClass(inquiry.status)">
                      {{ inquiry.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button @click="viewInquiry(inquiry)" variant="outline" size="sm" class="mr-2">Quick View</Button>
                    <Button @click="openDetailView(inquiry)" variant="outline" size="sm" class="mr-2">Detail View</Button>
                    <Button @click="respondToInquiry(inquiry)" size="sm">Respond</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Empty State -->
          <div v-if="filteredInquiries.length === 0" class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No inquiries loaded</h3>
            <p class="mt-1 text-sm text-gray-500">
              <span v-if="inquiries.length === 0">
                Use the debug panel above to load data:
              </span>
              <span v-else>
                Adjust filters or load more data.
              </span>
            </p>
            <div v-if="inquiries.length === 0" class="mt-4 space-x-2">
              <Button @click="testApiConnection" class="bg-blue-600 text-white">Test API & Load Real Data</Button>
              <Button @click="loadTestData" variant="outline">Load Test Data</Button>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- View Inquiry Dialog -->
    <Dialog title="Inquiry Details" v-model="showViewDialog" size="lg">
      <div class="p-6" v-if="selectedInquiry">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="text-sm font-medium text-gray-500">Client Information</h4>
            <div class="mt-2 space-y-2">
              <div><span class="font-medium">Name:</span> {{ selectedInquiry.client_name || 'Unknown' }}</div>
              <div><span class="font-medium">Email:</span> {{ selectedInquiry.client_email || 'N/A' }}</div>
              <div><span class="font-medium">Phone:</span> {{ selectedInquiry.client_phone || 'N/A' }}</div>
              <div><span class="font-medium">Client ID:</span> {{ selectedInquiry.client_id || 'N/A' }}</div>
              <div><span class="font-medium">Inquiry Date:</span> {{ formatDate(selectedInquiry.inquiry_date) }}</div>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-medium text-gray-500">Inquiry Details</h4>
            <div class="mt-2 space-y-2">
              <div><span class="font-medium">Status:</span>
                <span :class="getStatusClass(selectedInquiry.status)" class="ml-2">
                  {{ selectedInquiry.status }}
                </span>
              </div>
              <div><span class="font-medium">Priority:</span> {{ selectedInquiry.priority || 'Medium' }}</div>
              <div><span class="font-medium">Created:</span> {{ formatDate(selectedInquiry.creation) }}</div>
              <div v-if="selectedInquiry.budget_min || selectedInquiry.budget_max">
                <span class="font-medium">Budget:</span>
                {{ selectedInquiry.budget_min || 0 }} - {{ selectedInquiry.budget_max || 0 }} {{ selectedInquiry.currency || 'USD' }}
              </div>
              <div><span class="font-medium">Budget Flexibility:</span> {{ selectedInquiry.budget_flexibility || 'N/A' }}</div>
            </div>
          </div>
        </div>
        
        <div class="mt-6">
          <h4 class="text-sm font-medium text-gray-500">Description</h4>
          <div class="mt-2 p-4 bg-gray-50 rounded-md">
            <p class="text-gray-900" v-html="selectedInquiry.description || 'No description provided'"></p>
          </div>
        </div>

        <div class="mt-6">
          <h4 class="text-sm font-medium text-gray-500">Location & Language Requirements</h4>
          <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <div><span class="font-medium">Preferred Countries:</span> {{ selectedInquiry.preferred_countries || 'Any' }}</div>
              <div v-if="selectedInquiry.alternative_countries"><span class="font-medium">Alternative Countries:</span> {{ selectedInquiry.alternative_countries }}</div>
            </div>
            <div class="space-y-2">
              <div><span class="font-medium">Required Languages:</span> {{ selectedInquiry.required_languages || 'Not specified' }}</div>
              <div v-if="selectedInquiry.alternative_languages"><span class="font-medium">Alternative Languages:</span> {{ selectedInquiry.alternative_languages }}</div>
            </div>
          </div>
        </div>

        <div v-if="selectedInquiry.special_requirements" class="mt-6">
          <h4 class="text-sm font-medium text-gray-500">Special Requirements</h4>
          <div class="mt-2 p-4 bg-gray-50 rounded-md">
            <p class="text-gray-900" v-html="selectedInquiry.special_requirements"></p>
          </div>
        </div>

        <div v-if="selectedInquiry.conversion_notes" class="mt-6">
          <h4 class="text-sm font-medium text-gray-500">Conversion Notes</h4>
          <div class="mt-2 p-4 bg-gray-50 rounded-md">
            <p class="text-gray-900" v-html="selectedInquiry.conversion_notes"></p>
          </div>
        </div>
        
        <div class="mt-6 flex justify-end space-x-3">
          <Button variant="outline" @click="showViewDialog = false">Close</Button>
          <Button @click="respondToInquiry(selectedInquiry); showViewDialog = false">Respond</Button>
        </div>
      </div>
    </Dialog>

    <!-- Respond to Inquiry Dialog -->
    <Dialog title="Respond to Inquiry" v-model="showRespondDialog" size="lg">
      <div class="p-6" v-if="selectedInquiry">
        <form @submit.prevent="sendResponse" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Response Type</label>
            <select v-model="responseForm.type" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              <option value="email">Email Response</option>
              <option value="call">Phone Call</option>
              <option value="quote">Send Quote</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Subject</label>
            <input
              v-model="responseForm.subject"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Response to your inquiry"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              v-model="responseForm.message"
              rows="6"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Type your response here..."
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Update Status</label>
            <select v-model="responseForm.newStatus" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              <option value="Submitted">Mark as Submitted</option>
              <option value="Under Review">Mark as Under Review</option>
              <option value="Matched">Mark as Matched</option>
              <option value="Converted">Mark as Converted</option>
              <option value="Cancelled">Mark as Cancelled</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" type="button" @click="showRespondDialog = false">Cancel</Button>
            <Button type="submit" :loading="sendingResponse">Send Response</Button>
          </div>
        </form>
      </div>
    </Dialog>

    <!-- Filter Dialog -->
    <Dialog title="Filter Inquiries" v-model="showFilterDialog">
      <div class="p-6">
        <form @submit.prevent="applyFilters" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Date Range</label>
            <div class="grid grid-cols-2 gap-4">
              <input
                v-model="filters.dateFrom"
                type="date"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <input
                v-model="filters.dateTo"
                type="date"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Priority</label>
            <select v-model="filters.priority" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Location</label>
            <input
              v-model="filters.location"
              type="text"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Filter by location"
            />
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" type="button" @click="clearFilters">Clear</Button>
            <Button type="submit">Apply Filters</Button>
          </div>
        </form>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { Dialog } from 'frappe-ui'

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

export default {
  name: 'Inquiries',
  data() {
    return {
      sidebarOpen: false,
      userMenuOpen: false,
      userName: 'Loading...',
      userEmail: 'Loading...',
      providerInfo: {
        companyName: 'Loading...',
        licenseNumber: 'Loading...',
        specializations: []
      },
      loading: false,
      
      // Navigation
      navigation: [
        { name: 'Dashboard', href: '/dashboard', icon: DashboardIcon, current: false },
        { name: 'Jobs', href: '/jobs', icon: JobsIcon, current: false, count: 5 },
        { name: 'Customers', href: '/customers', icon: CustomersIcon, current: false },
        { name: 'Inquiries', href: '/inquiries', icon: InquiriesIcon, current: true, count: 12 },
        { name: 'Accepted Inquiries', href: '/accepted-inquiries', icon: AcceptedIcon, current: false },
        { name: 'Applications', href: '/applications', icon: ApplicationIcon, current: false },
        { name: 'University Applications', href: '/university-applications', icon: UniversityIcon, current: false },
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
        { name: 'Help', href: '/help', icon: HelpIcon, current: false },
      ],
      
      // Stats
      stats: {
        total: 0,
        pending: 0,
        responded: 0,
        converted: 0
      },
      
      // Inquiries data
      inquiries: [],
      filteredInquiries: [],

      // Filters and sorting
      statusFilter: 'all',
      sortBy: 'date',
      
      // Dialog states
      showViewDialog: false,
      showRespondDialog: false,
      showFilterDialog: false,
      
      // Selected inquiry
      selectedInquiry: null,
      
      // Response form
      responseForm: {
        type: 'email',
        subject: '',
        message: '',
        newStatus: 'Under Review'
      },
      sendingResponse: false,
      
      // Filters
      filters: {
        dateFrom: '',
        dateTo: '',
        priority: '',
        location: ''
      },

    }
  },
  computed: {
    currentUrl() {
      return window.location.origin
    },
    frappeUiLoaded() {
      return typeof Button !== 'undefined'
    }
  },
  resources: {
    inquiries: {
      url: 'frappe.client.get_list',
      params: {
        doctype: 'Inquiry',
        fields: [
          'name', 'client_name', 'client_email', 'client_phone', 'client_id',
          'inquiry_date', 'priority', 'status', 'description', 'special_requirements',
          'budget_min', 'budget_max', 'currency', 'budget_flexibility',
          'preferred_countries', 'alternative_countries', 'required_languages',
          'alternative_languages', 'conversion_date', 'conversion_notes',
          'selected_provider', 'creation', 'modified'
        ],
        order_by: 'creation desc',
        limit_page_length: 0
      },
      auto: false,
      onSuccess(data) {
        console.log('✅ Inquiries loaded via resource:', data)
        this.inquiries = data || []
        this.filteredInquiries = [...this.inquiries]
        this.calculateStats()
      },
      onError(error) {
        console.error('❌ Failed to load inquiries via resource:', error)
        this.inquiries = []
        this.filteredInquiries = []
      }
    },
    user: {
      url: 'frappe.auth.get_logged_user',
      auto: true,
      onSuccess(data) {
        console.log('✅ User info loaded:', data)
        this.userName = data.full_name || data.name || 'Provider User'
        this.userEmail = data.email || data.name || 'provider@example.com'
      },
      onError(error) {
        console.error('❌ Failed to load user info:', error)
        this.userName = 'Provider User'
        this.userEmail = 'provider@example.com'
      }
    }
  },
  methods: {
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
      // For custom app, implement proper logout
      console.log('Logout clicked')
      if (confirm('Are you sure you want to logout?')) {
        // Clear any local session data
        localStorage.clear()
        // Redirect to main Frappe site login
        window.location.href = '/login'
      }
    },
    
    async loadInquiries() {
      this.loading = true
      try {
        console.log('Loading inquiries using Frappe resource...')
        console.log('Resource object:', this.$resources.inquiries)

        if (this.$resources.inquiries && this.$resources.inquiries.fetch) {
          await this.$resources.inquiries.fetch()
        } else if (this.$resources.inquiries && this.$resources.inquiries.reload) {
          await this.$resources.inquiries.reload()
        } else {
          console.log('Resource methods available:', Object.keys(this.$resources.inquiries || {}))
          throw new Error('No fetch or reload method available on resource')
        }
      } catch (error) {
        console.error('Failed to load inquiries:', error)
        console.log('Falling back to test data...')
        this.inquiries = this.getTestData()
        this.filteredInquiries = [...this.inquiries]
        this.calculateStats()
      } finally {
        this.loading = false
      }
    },

    async loadUserInfo() {
      try {
        console.log('Loading user info using Frappe resource...')
        // User resource is set to auto: true, so it loads automatically
        // But we can also trigger it manually if needed
        await this.$resources.user.fetch()
      } catch (error) {
        console.error('Failed to load user info:', error)
      }
    },
    
    calculateStats() {
      this.stats.total = this.inquiries.length
      this.stats.pending = this.inquiries.filter(i => i.status === 'Draft').length
      this.stats.responded = this.inquiries.filter(i => i.status === 'Submitted').length
      this.stats.converted = this.inquiries.filter(i => i.status === 'Converted').length

      // Update navigation count
      const inquiriesNav = this.navigation.find(item => item.name === 'Inquiries')
      if (inquiriesNav) {
        inquiriesNav.count = this.stats.total
      }
    },
    
    filterInquiries() {
      if (this.statusFilter === 'all') {
        this.filteredInquiries = [...this.inquiries]
      } else {
        this.filteredInquiries = this.inquiries.filter(
          inquiry => inquiry.status === this.statusFilter
        )
      }
      this.sortInquiries()
    },
    
    sortInquiries() {
      this.filteredInquiries.sort((a, b) => {
        switch (this.sortBy) {
          case 'name':
            return (a.client_name || '').localeCompare(b.client_name || '')
          case 'status':
            return a.status.localeCompare(b.status)
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
        case 'submitted':
          return `${baseClasses} bg-blue-100 text-blue-800`
        case 'under review':
          return `${baseClasses} bg-yellow-100 text-yellow-800`
        case 'matched':
          return `${baseClasses} bg-purple-100 text-purple-800`
        case 'converted':
          return `${baseClasses} bg-green-100 text-green-800`
        case 'cancelled':
          return `${baseClasses} bg-red-100 text-red-800`
        default:
          return `${baseClasses} bg-gray-100 text-gray-800`
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    
    viewInquiry(inquiry) {
      this.selectedInquiry = inquiry
      this.showViewDialog = true
    },

    openDetailView(inquiry) {
      this.$router.push(`/inquiry/${inquiry.name}`)
    },

    respondToInquiry(inquiry) {
      this.selectedInquiry = inquiry
      this.responseForm.subject = `Response to your inquiry - ${inquiry.client_name || 'Client'}`
      this.responseForm.message = `Dear ${inquiry.client_name || 'Client'},\n\nThank you for your inquiry. We have received your request and will get back to you shortly with more information.\n\nBest regards,\nFlyout Team`
      this.showRespondDialog = true
    },
    
    async sendResponse() {
      this.sendingResponse = true
      try {
        // Update inquiry status using $call method
        await this.$call('frappe.client.set_value', {
          doctype: 'Inquiry',
          name: this.selectedInquiry.name,
          fieldname: 'status',
          value: this.responseForm.newStatus
        })

        // Optionally, create a communication record
        // This would be handled by a custom server method in a real implementation
        console.log('Response sent:', {
          inquiry_name: this.selectedInquiry.name,
          response_type: this.responseForm.type,
          subject: this.responseForm.subject,
          message: this.responseForm.message
        })

        this.showRespondDialog = false
        this.resetResponseForm()
        this.loadInquiries()
      } catch (error) {
        console.error('Failed to send response:', error)
      } finally {
        this.sendingResponse = false
      }
    },
    
    resetResponseForm() {
      this.responseForm = {
        type: 'email',
        subject: '',
        message: '',
        newStatus: 'Under Review'
      }
    },
    
    applyFilters() {
      // Apply additional filters
      let filtered = [...this.inquiries]
      
      if (this.filters.dateFrom) {
        filtered = filtered.filter(inquiry => 
          new Date(inquiry.creation) >= new Date(this.filters.dateFrom)
        )
      }
      
      if (this.filters.dateTo) {
        filtered = filtered.filter(inquiry => 
          new Date(inquiry.creation) <= new Date(this.filters.dateTo)
        )
      }
      
      if (this.filters.priority) {
        filtered = filtered.filter(inquiry =>
          inquiry.priority === this.filters.priority
        )
      }
      
      if (this.filters.location) {
        filtered = filtered.filter(inquiry =>
          (inquiry.preferred_countries || '').toLowerCase().includes(this.filters.location.toLowerCase()) ||
          (inquiry.alternative_countries || '').toLowerCase().includes(this.filters.location.toLowerCase())
        )
      }
      
      this.filteredInquiries = filtered
      this.showFilterDialog = false
    },

    getTestData() {
      return [
        {
          name: 'INQ-TEST-001',
          client_name: 'John Smith',
          client_email: 'john.smith@example.com',
          client_phone: '+1-555-0123',
          client_id: 'CLI001',
          inquiry_date: '2025-01-15',
          priority: 'High',
          status: 'Submitted',
          description: 'Looking for immigration services to Canada',
          budget_min: 5000,
          budget_max: 10000,
          currency: 'USD',
          budget_flexibility: 'Somewhat Flexible',
          preferred_countries: 'Canada',
          alternative_countries: 'Australia',
          required_languages: 'English',
          creation: '2025-01-15 10:30:00'
        },
        {
          name: 'INQ-TEST-002',
          client_name: 'Maria Garcia',
          client_email: 'maria.garcia@example.com',
          client_phone: '+1-555-0456',
          client_id: 'CLI002',
          inquiry_date: '2025-01-14',
          priority: 'Medium',
          status: 'Draft',
          description: 'Student visa assistance needed',
          budget_min: 2000,
          budget_max: 5000,
          currency: 'USD',
          budget_flexibility: 'Flexible',
          preferred_countries: 'United States',
          alternative_countries: 'United Kingdom',
          required_languages: 'English, Spanish',
          creation: '2025-01-14 14:20:00'
        },
        {
          name: 'INQ-TEST-003',
          client_name: 'Ahmed Hassan',
          client_email: 'ahmed.hassan@example.com',
          client_phone: '+1-555-0789',
          client_id: 'CLI003',
          inquiry_date: '2025-01-13',
          priority: 'Low',
          status: 'Under Review',
          description: 'Family reunification process',
          budget_min: 3000,
          budget_max: 8000,
          currency: 'USD',
          budget_flexibility: 'Not Flexible',
          preferred_countries: 'Germany',
          alternative_countries: 'Netherlands',
          required_languages: 'English, Arabic',
          creation: '2025-01-13 09:15:00'
        }
      ]
    },

    loadTestData() {
      console.log('Loading test data...')
      this.inquiries = this.getTestData()
      this.filteredInquiries = [...this.inquiries]
      this.calculateStats()
    },

    async testApiConnection() {
      console.log('🧪 Testing API connection to Frappe backend...')
      this.loading = true

      try {
        // Test 1: Check if we can reach the API endpoint
        console.log('Test 1: Checking API endpoint availability...')

        const endpoints = [
          '/api/method/frappe.client.get_list',
          '/api/method/frappe.client.get_value',
          '/api/method/ping'
        ]

        for (const endpoint of endpoints) {
          try {
            console.log(`Testing endpoint: ${endpoint}`)
            const response = await fetch(endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                doctype: 'DocType',
                fieldname: 'name',
                filters: { name: 'User' }
              })
            })

            console.log(`${endpoint} - Status:`, response.status, response.statusText)

            if (response.ok) {
              const data = await response.json()
              console.log(`${endpoint} - Response:`, data)

              // If this endpoint works, try to get inquiries
              if (endpoint === '/api/method/frappe.client.get_list') {
                console.log('✅ API endpoint working, trying to get inquiries...')
                await this.loadRealInquiriesNow()
                return
              }
            }
          } catch (endpointError) {
            console.log(`${endpoint} - Failed:`, endpointError.message)
          }
        }

        // If we get here, no endpoints worked
        throw new Error('No working API endpoints found')

      } catch (error) {
        console.error('❌ API connection test failed:', error)
        alert(`❌ API connection failed: ${error.message}

This custom Vue app (port 8080) needs to connect to the Frappe backend.
Check:
1. Is the Frappe site running?
2. Are CORS settings configured?
3. Is the API endpoint correct?`)
      } finally {
        this.loading = false
      }
    },

    async loadRealInquiriesNow() {
      console.log('Force loading inquiries using all available methods...')
      this.loading = true

      try {
        // Method 1: Try resource
        if (this.$resources.inquiries && (this.$resources.inquiries.fetch || this.$resources.inquiries.reload)) {
          console.log('Method 1: Using resource...')
          if (this.$resources.inquiries.fetch) {
            await this.$resources.inquiries.fetch()
          } else {
            await this.$resources.inquiries.reload()
          }
          console.log(`✅ Resource method: Loaded ${this.inquiries.length} inquiries`)
        } else {
          throw new Error('Resource method not available')
        }

        if (this.inquiries.length > 0) {
          alert(`✅ SUCCESS: Loaded ${this.inquiries.length} real inquiries!`)
        } else {
          alert('⚠️ No inquiries found in the system')
        }
      } catch (resourceError) {
        console.error('❌ Resource method failed:', resourceError)

        try {
          // Method 2: Try direct frappe call
          console.log('Method 2: Using direct frappe call...')
          const response = await fetch('/api/method/frappe.client.get_list', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              doctype: 'Inquiry',
              fields: [
                'name', 'client_name', 'client_email', 'client_phone', 'client_id',
                'inquiry_date', 'priority', 'status', 'description', 'special_requirements',
                'budget_min', 'budget_max', 'currency', 'budget_flexibility',
                'preferred_countries', 'alternative_countries', 'required_languages',
                'alternative_languages', 'conversion_date', 'conversion_notes',
                'selected_provider', 'creation', 'modified'
              ],
              order_by: 'creation desc'
            })
          })

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }

          const data = await response.json()
          console.log('✅ Direct API response:', data)

          if (data && data.message && Array.isArray(data.message)) {
            this.inquiries = data.message
            this.filteredInquiries = [...this.inquiries]
            this.calculateStats()
            alert(`✅ SUCCESS: Loaded ${this.inquiries.length} real inquiries via direct API!`)
          } else {
            throw new Error('Invalid response format')
          }
        } catch (apiError) {
          console.error('❌ Direct API call failed:', apiError)
          alert(`❌ All methods failed: ${apiError.message}`)
        }
      } finally {
        this.loading = false
      }
    },

    clearFilters() {
      this.filters = {
        dateFrom: '',
        dateTo: '',
        priority: '',
        location: ''
      }
      this.filteredInquiries = [...this.inquiries]
    }
  },
  mounted() {
    console.log('Component mounted, loading data...')
    // User resource has auto: true, so it loads automatically
    // Load inquiries using the proper resource
    this.loadInquiries()
  },
  components: {
    Dialog,
  }
}
</script>

<style scoped>
/* Custom styles for inquiries page */
.sidebar-transition {
  transition: transform 0.3s ease-in-out;
}

.z-40 {
  z-index: 40;
}

.z-50 {
  z-index: 50;
}

.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.focus\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-indigo-500:focus {
  --tw-ring-color: #6366f1;
}

.focus\:border-indigo-500:focus {
  border-color: #6366f1;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
