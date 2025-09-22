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
            <h2 class="text-2xl font-bold text-gray-900">Offer Management</h2>
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

      <!-- Offer Management Content -->
      <main class="p-6">
        <!-- Action Buttons -->
        <div class="mb-6">
          <Button variant="solid" @click="createNew">
            <template #prefix>
              <FeatherIcon name="plus" class="h-4 w-4" />
            </template>
            Create Offer
          </Button>
        </div>
        <!-- Stats -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Total Offers</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ stats.total }}</dd>
            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Draft</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-600">{{ stats.draft }}</dd>
            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Sent to Client</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-blue-600">{{ stats.sent }}</dd>
            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Under Negotiation</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-yellow-600">{{ stats.negotiation }}</dd>
            </div>
            <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt class="truncate text-sm font-medium text-gray-500">Accepted</dt>
              <dd class="mt-1 text-3xl font-semibold tracking-tight text-green-600">{{ stats.accepted }}</dd>
            </div>
          </div>

        <!-- Filters -->
        <div class="bg-white rounded-lg shadow p-6 mb-8">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <Input
                  v-model="searchQuery"
                  placeholder="Search offers..."
                  :debounce="300"
                  @change="loadOffers"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <Dropdown
                  :options="statusOptions"
                  v-model="selectedStatus"
                  placeholder="All Statuses"
                  @change="loadOffers"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <Dropdown
                  :options="priorityOptions"
                  v-model="selectedPriority"
                  placeholder="All Priorities"
                  @change="loadOffers"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                <Input
                  v-model="providerFilter"
                  placeholder="Filter by provider..."
                  :debounce="300"
                  @change="loadOffers"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <Input
                  v-model="serviceTypeFilter"
                  placeholder="Filter by service..."
                  :debounce="300"
                  @change="loadOffers"
                />
              </div>
            </div>
          </div>

        <!-- Offers List -->
        <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-4 py-5 sm:p-6">
              <div v-if="loading" class="text-center py-8">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p class="mt-2 text-sm text-gray-500">Loading offers...</p>
              </div>

              <div v-else-if="offers.length === 0" class="text-center py-12">
                <FeatherIcon name="gift" class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-semibold text-gray-900">No offers found</h3>
                <p class="mt-1 text-sm text-gray-500">Get started by creating a new offer for a client.</p>
                <div class="mt-6">
                  <Button variant="solid" @click="createNew">
                    <template #prefix>
                      <FeatherIcon name="plus" class="h-4 w-4" />
                    </template>
                    Create Offer
                  </Button>
                </div>
              </div>

              <div v-else class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Offer
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client & Provider
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service & Amount
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valid Until
                      </th>
                      <th class="relative px-6 py-3">
                        <span class="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="offer in offers" :key="offer.name" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div>
                            <div class="text-sm font-medium text-gray-900">
                              {{ offer.offer_title }}
                            </div>
                            <div class="text-sm text-gray-500">
                              {{ offer.name }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ offer.client_name }}</div>
                        <div class="text-sm text-gray-500">by {{ offer.provider }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ offer.service_type || 'N/A' }}</div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ formatCurrency(offer.total_amount, offer.currency) }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <Badge
                          :variant="getPriorityVariant(offer.priority)"
                          :label="offer.priority"
                        />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <Badge
                          :variant="getStatusVariant(offer.workflow_status)"
                          :label="offer.workflow_status"
                        />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ formatDate(offer.valid_until) }}</div>
                        <div class="text-sm" :class="isExpired(offer.valid_until) ? 'text-red-500' : 'text-gray-500'">
                          {{ getValidityStatus(offer.valid_until) }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Dropdown :options="getActionOptions(offer)" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Quick Actions Panel -->
          <div class="mt-8 bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Button variant="outline" @click="createFromInquiry">
                <template #prefix>
                  <FeatherIcon name="inbox" class="h-4 w-4" />
                </template>
                Create from Inquiry
              </Button>
              <Button variant="outline" @click="viewExpiredOffers">
                <template #prefix>
                  <FeatherIcon name="clock" class="h-4 w-4" />
                </template>
                View Expired Offers
              </Button>
              <Button variant="outline" @click="bulkSendOffers">
                <template #prefix>
                  <FeatherIcon name="send" class="h-4 w-4" />
                </template>
                Bulk Send Offers
              </Button>
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
  name: 'OfferManagement',
  setup() {
    const router = useRouter()
    const offers = ref([])
    const loading = ref(false)
    const searchQuery = ref('')
    const selectedStatus = ref('')
    const selectedPriority = ref('')
    const providerFilter = ref('')
    const serviceTypeFilter = ref('')

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
      { name: 'Agreement Templates', href: '/agreement-templates', icon: DocumentDuplicateIcon, current: false },
      { name: 'Offer Management', href: '/offer-management', icon: GiftIcon, current: true },
      { name: 'Calendar', href: '/calendar', icon: CalendarIcon, current: false },
    ]

    const settingsNav = [
      { name: 'Reports', href: '/reports', icon: ReportsIcon, current: false },
      { name: 'Settings', href: '/settings', icon: SettingsIcon, current: false },
      { name: 'Help', href: '/help', icon: HelpIcon, current: false },
    ]

    const statusOptions = [
      { label: 'All Statuses', value: '' },
      { label: 'Draft', value: 'Draft' },
      { label: 'Pending Review', value: 'Pending Review' },
      { label: 'Sent to Client', value: 'Sent to Client' },
      { label: 'Under Negotiation', value: 'Under Negotiation' },
      { label: 'Accepted', value: 'Accepted' },
      { label: 'Rejected', value: 'Rejected' },
      { label: 'Expired', value: 'Expired' },
      { label: 'Cancelled', value: 'Cancelled' }
    ]

    const priorityOptions = [
      { label: 'All Priorities', value: '' },
      { label: 'Low', value: 'Low' },
      { label: 'Medium', value: 'Medium' },
      { label: 'High', value: 'High' },
      { label: 'Urgent', value: 'Urgent' }
    ]

    const stats = computed(() => {
      const total = offers.value.length
      const draft = offers.value.filter(o => o.workflow_status === 'Draft').length
      const sent = offers.value.filter(o => o.workflow_status === 'Sent to Client').length
      const negotiation = offers.value.filter(o => o.workflow_status === 'Under Negotiation').length
      const accepted = offers.value.filter(o => o.workflow_status === 'Accepted').length

      return { total, draft, sent, negotiation, accepted }
    })

    const loadOffers = () => {
      loading.value = true

      const resource = createResource({
        url: 'frappe.client.get_list',
        params: {
          doctype: 'Offer',
          fields: [
            'name', 'offer_title', 'provider', 'client', 'client_name', 'client_email',
            'offer_date', 'valid_until', 'offer_status', 'workflow_status', 'priority',
            'service_type', 'country', 'total_amount', 'currency', 'inquiry_reference',
            'sent_date', 'accepted_date', 'rejected_date', 'creation', 'modified'
          ],
          filters: buildFilters(),
          order_by: 'offer_date desc'
        }
      })

      resource.fetch().then((data) => {
        offers.value = data || []
      }).catch((error) => {
        console.error('Error loading offers:', error)
        offers.value = []
      }).finally(() => {
        loading.value = false
      })
    }

    const buildFilters = () => {
      const filters = []

      if (searchQuery.value) {
        filters.push(['offer_title', 'like', `%${searchQuery.value}%`])
      }

      if (selectedStatus.value) {
        filters.push(['workflow_status', '=', selectedStatus.value])
      }

      if (selectedPriority.value) {
        filters.push(['priority', '=', selectedPriority.value])
      }

      if (providerFilter.value) {
        filters.push(['provider', 'like', `%${providerFilter.value}%`])
      }

      if (serviceTypeFilter.value) {
        filters.push(['service_type', 'like', `%${serviceTypeFilter.value}%`])
      }

      return filters
    }

    const getStatusVariant = (status) => {
      const variants = {
        'Draft': 'gray',
        'Pending Review': 'yellow',
        'Sent to Client': 'blue',
        'Under Negotiation': 'orange',
        'Accepted': 'green',
        'Rejected': 'red',
        'Expired': 'red',
        'Cancelled': 'gray'
      }
      return variants[status] || 'gray'
    }

    const getPriorityVariant = (priority) => {
      const variants = {
        'Low': 'gray',
        'Medium': 'blue',
        'High': 'orange',
        'Urgent': 'red'
      }
      return variants[priority] || 'gray'
    }

    const formatDate = (dateString) => {
      if (!dateString) return '-'
      return new Date(dateString).toLocaleDateString()
    }

    const formatCurrency = (amount, currency) => {
      if (!amount) return '-'
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD'
      }).format(amount)
    }

    const isExpired = (validUntil) => {
      if (!validUntil) return false
      return new Date(validUntil) < new Date()
    }

    const getValidityStatus = (validUntil) => {
      if (!validUntil) return ''
      const today = new Date()
      const expiryDate = new Date(validUntil)
      const diffTime = expiryDate - today
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays < 0) {
        return 'Expired'
      } else if (diffDays === 0) {
        return 'Expires today'
      } else if (diffDays <= 3) {
        return `Expires in ${diffDays} day${diffDays === 1 ? '' : 's'}`
      } else {
        return `${diffDays} days left`
      }
    }

    const getActionOptions = (offer) => {
      return [
        {
          label: 'View',
          onClick: () => viewOffer(offer)
        },
        {
          label: 'Edit',
          onClick: () => editOffer(offer)
        },
        {
          label: 'Send to Client',
          onClick: () => sendOffer(offer),
          disabled: offer.workflow_status === 'Sent to Client'
        },
        {
          label: 'Duplicate',
          onClick: () => duplicateOffer(offer)
        },
        {
          label: 'Generate Agreement',
          onClick: () => generateAgreement(offer),
          disabled: offer.workflow_status !== 'Accepted'
        },
        {
          label: 'Delete',
          onClick: () => deleteOffer(offer)
        }
      ]
    }

    const createNew = () => {
      console.log('Create new offer')
    }

    const createFromInquiry = () => {
      console.log('Create offer from inquiry')
    }

    const viewExpiredOffers = () => {
      selectedStatus.value = 'Expired'
      loadOffers()
    }

    const bulkSendOffers = () => {
      console.log('Bulk send offers')
    }

    const viewOffer = (offer) => {
      console.log('View offer:', offer.name)
    }

    const editOffer = (offer) => {
      console.log('Edit offer:', offer.name)
    }

    const sendOffer = (offer) => {
      console.log('Send offer:', offer.name)
    }

    const duplicateOffer = (offer) => {
      console.log('Duplicate offer:', offer.name)
    }

    const generateAgreement = (offer) => {
      console.log('Generate agreement for offer:', offer.name)
    }

    const deleteOffer = (offer) => {
      console.log('Delete offer:', offer.name)
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
      loadOffers()
    })

    return {
      offers,
      loading,
      searchQuery,
      selectedStatus,
      selectedPriority,
      providerFilter,
      serviceTypeFilter,
      sidebarOpen,
      userMenuOpen,
      userName,
      userEmail,
      providerInfo,
      navigation,
      settingsNav,
      statusOptions,
      priorityOptions,
      stats,
      loadOffers,
      getStatusVariant,
      getPriorityVariant,
      formatDate,
      formatCurrency,
      isExpired,
      getValidityStatus,
      getActionOptions,
      createNew,
      createFromInquiry,
      viewExpiredOffers,
      bulkSendOffers,
      setCurrentNav,
      setCurrentSettingsNav,
      handleLogout
    }
  }
}
</script>