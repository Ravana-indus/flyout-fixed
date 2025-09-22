<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Flyout</h1>
          </div>
          <nav class="flex space-x-8">
            <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">Home</a>
            <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">About</a>
            <a href="#" class="text-gray-500 hover:text-gray-900 transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to
            <span class="text-indigo-600">Flyout</span>
          </h2>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Your trusted platform for connecting service providers with customers. Join our community of professionals today.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Login Form -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <div class="text-center mb-8">
            <h3 class="text-2xl font-bold text-gray-900">Provider Login</h3>
            <p class="mt-2 text-gray-600">Access your provider dashboard</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                v-model="loginForm.password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="loginForm.remember"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                :loading="loginLoading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {{ loginLoading ? 'Signing in...' : 'Sign in' }}
              </Button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                </svg>
                <span class="ml-2">Facebook</span>
              </Button>

              <Button
                variant="outline"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.138 18.195 20 14.44 20 10.017 20 4.484 15.522 0 10 0z" />
                </svg>
                <span class="ml-2">GitHub</span>
              </Button>
            </div>
          </div>

          <!-- Register Button -->
          <div class="mt-8 text-center">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <Button
                variant="link"
                @click="showRegisterDialog = true"
                class="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
              >
                Register here
              </Button>
            </p>
          </div>
        </div>

        <!-- Welcome Info -->
        <div class="space-y-8">
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Why Join Flyout?</h3>
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-6 w-6 rounded-md bg-indigo-500 text-white">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <h4 class="text-lg font-medium text-gray-900">Connect with Customers</h4>
                  <p class="mt-1 text-gray-600">Access a growing network of customers looking for your services.</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-6 w-6 rounded-md bg-indigo-500 text-white">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <h4 class="text-lg font-medium text-gray-900">Manage Your Business</h4>
                  <p class="mt-1 text-gray-600">Streamline your operations with our comprehensive dashboard.</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-6 w-6 rounded-md bg-indigo-500 text-white">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <h4 class="text-lg font-medium text-gray-900">Grow Your Revenue</h4>
                  <p class="mt-1 text-gray-600">Increase your visibility and attract more customers to your business.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Support Section -->
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Support</h3>
            <p class="text-gray-600 mb-6">Need help? We're here for you 24/7.</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                variant="outline"
                @click="showSupportDialog = true"
                class="w-full justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Live Chat
              </Button>

              <Button
                variant="outline"
                @click="showEmailDialog = true"
                class="w-full justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                Email Support
              </Button>
            </div>

            <div class="mt-4">
              <Button
                variant="outline"
                @click="showFAQDialog = true"
                class="w-full justify-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center text-gray-600">
          <p>&copy; 2024 Flyout. All rights reserved.</p>
          <div class="mt-4 flex justify-center space-x-6">
            <a href="#" class="text-gray-400 hover:text-gray-500">Privacy Policy</a>
            <a href="#" class="text-gray-400 hover:text-gray-500">Terms of Service</a>
            <a href="#" class="text-gray-400 hover:text-gray-500">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Register Dialog -->
    <Dialog title="Register as Provider" v-model="showRegisterDialog" size="lg">
      <div class="p-6">
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">First Name</label>
              <input
                v-model="registerForm.firstName"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                v-model="registerForm.lastName"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              v-model="registerForm.businessName"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Service Type</label>
            <select
              v-model="registerForm.serviceType"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a service type</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="hvac">HVAC</option>
              <option value="carpentry">Carpentry</option>
              <option value="cleaning">Cleaning</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3 pt-4">
            <Button variant="outline" @click="showRegisterDialog = false">Cancel</Button>
            <Button type="submit" :loading="registerLoading">Register</Button>
          </div>
        </form>
      </div>
    </Dialog>

    <!-- Support Dialog -->
    <Dialog title="Support" v-model="showSupportDialog">
      <div class="p-6">
        <p class="text-gray-600 mb-4">Our support team is available 24/7 to help you with any questions or issues.</p>
        <div class="space-y-3">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Live chat available now</span>
          </div>
          <div class="flex items-center">
            <svg class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>Call: 1-800-FLYOUT</span>
          </div>
        </div>
      </div>
    </Dialog>

    <!-- Email Support Dialog -->
    <Dialog title="Email Support" v-model="showEmailDialog">
      <div class="p-6">
        <form @submit.prevent="sendSupportEmail" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Subject</label>
            <input
              v-model="supportForm.subject"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              v-model="supportForm.message"
              rows="4"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          
          <div class="flex justify-end space-x-3">
            <Button variant="outline" @click="showEmailDialog = false">Cancel</Button>
            <Button type="submit" :loading="supportLoading">Send</Button>
          </div>
        </form>
      </div>
    </Dialog>

    <!-- FAQ Dialog -->
    <Dialog title="Frequently Asked Questions" v-model="showFAQDialog" size="lg">
      <div class="p-6">
        <div class="space-y-4">
          <div>
            <h4 class="font-medium text-gray-900">How do I register as a provider?</h4>
            <p class="mt-1 text-gray-600">Click the "Register here" link in the login section and fill out the registration form with your business information.</p>
          </div>
          
          <div>
            <h4 class="font-medium text-gray-900">What services can I offer?</h4>
            <p class="mt-1 text-gray-600">We support various service types including plumbing, electrical, HVAC, carpentry, cleaning, and more.</p>
          </div>
          
          <div>
            <h4 class="font-medium text-gray-900">How much does it cost to join?</h4>
            <p class="mt-1 text-gray-600">Registration is free. We charge a small commission on successful service bookings.</p>
          </div>
          
          <div>
            <h4 class="font-medium text-gray-900">How do I get paid?</h4>
            <p class="mt-1 text-gray-600">Payments are processed securely through our platform and transferred to your registered bank account.</p>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { Dialog } from 'frappe-ui'

export default {
  name: 'Home',
  data() {
    return {
      // Login form
      loginForm: {
        email: '',
        password: '',
        remember: false
      },
      loginLoading: false,
      
      // Register form
      registerForm: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        businessName: '',
        serviceType: ''
      },
      registerLoading: false,
      
      // Support form
      supportForm: {
        subject: '',
        message: ''
      },
      supportLoading: false,
      
      // Dialog states
      showRegisterDialog: false,
      showSupportDialog: false,
      showEmailDialog: false,
      showFAQDialog: false,
    }
  },
  resources: {
    ping: {
      url: 'ping',
    },
    login: {
      url: 'login',
      method: 'POST',
      onSuccess: (data) => {
        // Handle successful login
        console.log('Login successful:', data)
        // Redirect to dashboard or update UI
      },
      onError: (error) => {
        // Handle login error
        console.error('Login failed:', error)
      }
    },
    register: {
      url: 'register_provider',
      method: 'POST',
      onSuccess: (data) => {
        // Handle successful registration
        console.log('Registration successful:', data)
        this.showRegisterDialog = false
        // Reset form
        this.registerForm = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          businessName: '',
          serviceType: ''
        }
      },
      onError: (error) => {
        // Handle registration error
        console.error('Registration failed:', error)
      }
    },
    supportEmail: {
      url: 'send_support_email',
      method: 'POST',
      onSuccess: (data) => {
        // Handle successful email send
        console.log('Support email sent:', data)
        this.showEmailDialog = false
        // Reset form
        this.supportForm = {
          subject: '',
          message: ''
        }
      },
      onError: (error) => {
        // Handle email send error
        console.error('Failed to send support email:', error)
      }
    }
  },
  methods: {
    async handleLogin() {
      this.loginLoading = true
      try {
        await this.$resources.login.submit({
          email: this.loginForm.email,
          password: this.loginForm.password
        })
      } catch (error) {
        console.error('Login error:', error)
      } finally {
        this.loginLoading = false
      }
    },
    
    async handleRegister() {
      this.registerLoading = true
      try {
        await this.$resources.register.submit(this.registerForm)
      } catch (error) {
        console.error('Registration error:', error)
      } finally {
        this.registerLoading = false
      }
    },
    
    async sendSupportEmail() {
      this.supportLoading = true
      try {
        await this.$resources.supportEmail.submit(this.supportForm)
      } catch (error) {
        console.error('Support email error:', error)
      } finally {
        this.supportLoading = false
      }
    }
  },
  components: {
    Dialog,
  },
}
</script>

<style scoped>
/* Custom styles for better appearance */
.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #dbeafe, #e0e7ff);
}

.rounded-2xl {
  border-radius: 1rem;
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Animation for smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus styles for accessibility */
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
</style>
