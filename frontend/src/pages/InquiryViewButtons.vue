<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
    </div>
    <div class="p-6">
      <div class="grid grid-cols-1 gap-3">
        <!-- Primary Actions -->
        <div class="space-y-3">
          <Button
            v-if="canAccept"
            @click="acceptInquiry"
            class="w-full"
            variant="solid"
            :loading="loading.accept"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Accept Inquiry
          </Button>

          <Button
            v-if="canConvert"
            @click="convertToApplication"
            class="w-full"
            variant="solid"
            :loading="loading.convert"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Convert to Application
          </Button>

          <Button
            v-if="canQualify"
            @click="qualifyInquiry"
            class="w-full"
            variant="solid"
            :loading="loading.qualify"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Qualify Inquiry
          </Button>
        </div>

        <!-- Secondary Actions -->
        <div class="pt-3 border-t border-gray-200 space-y-3">
          <Button
            @click="editInquiry"
            variant="outline"
            class="w-full"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit Inquiry
          </Button>

          <Button
            @click="assignProvider"
            variant="outline"
            class="w-full"
            :loading="loading.assign"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Assign Provider
          </Button>

          <Button
            @click="updatePriority"
            variant="outline"
            class="w-full"
            :loading="loading.priority"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
            </svg>
            Update Priority
          </Button>

          <Button
            @click="addNotes"
            variant="outline"
            class="w-full"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Add Notes
          </Button>
        </div>

        <!-- Communication Actions -->
        <div class="pt-3 border-t border-gray-200 space-y-3">
          <Button
            @click="contactClient"
            variant="outline"
            class="w-full"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Contact Client
          </Button>

          <Button
            @click="generateProposal"
            variant="outline"
            class="w-full"
            :loading="loading.proposal"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Generate Proposal
          </Button>
        </div>

        <!-- Status Actions -->
        <div class="pt-3 border-t border-gray-200 space-y-3">
          <div class="text-sm font-medium text-gray-700 mb-2">Change Status</div>

          <Button
            v-if="inquiry.status !== 'Open'"
            @click="updateStatus('Open')"
            variant="outline"
            size="sm"
            class="w-full"
            :loading="loading.status"
          >
            Mark as Open
          </Button>

          <Button
            v-if="inquiry.status !== 'Qualified'"
            @click="updateStatus('Qualified')"
            variant="outline"
            size="sm"
            class="w-full"
            :loading="loading.status"
          >
            Mark as Qualified
          </Button>

          <Button
            v-if="inquiry.status !== 'Converted'"
            @click="updateStatus('Converted')"
            variant="outline"
            size="sm"
            class="w-full"
            :loading="loading.status"
          >
            Mark as Converted
          </Button>
        </div>

        <!-- Danger Zone -->
        <div class="pt-3 border-t border-red-200 space-y-3">
          <Button
            @click="rejectInquiry"
            variant="outline"
            class="w-full text-red-600 border-red-300 hover:bg-red-50"
            :loading="loading.reject"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Reject Inquiry
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, call, toast } from 'frappe-ui'

export default {
  name: 'InquiryViewButtons',
  components: {
    Button
  },
  props: {
    inquiry: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: {
        accept: false,
        convert: false,
        qualify: false,
        assign: false,
        priority: false,
        proposal: false,
        status: false,
        reject: false
      }
    }
  },
  resources: {
    // Add any needed resources here
  },
  computed: {
    canAccept() {
      // Can accept inquiries that are available for provider acceptance
      // Based on server analysis: Matched status indicates ready for provider acceptance
      return ['Draft', 'Open', 'New', 'Submitted', 'Matched'].includes(this.inquiry.status)
    },
    canConvert() {
      return ['Accepted', 'Qualified'].includes(this.inquiry.status)
    },
    canQualify() {
      return ['Open', 'Accepted'].includes(this.inquiry.status)
    }
  },
  methods: {
    async acceptInquiry() {
      if (!confirm('Are you sure you want to accept this inquiry? This will create an Accepted Inquiry record for your provider.')) {
        return
      }

      this.loading.accept = true
      try {
        // Try multiple API endpoints in order of preference
        let success = false
        let message = ''

        // 1. Try the full accept_inquiry API first
        try {
          const response = await call('accept_inquiry', {
            inquiry_name: this.inquiry.name
          })

          if (response && response.success) {
            success = true
            message = response.message || 'Inquiry accepted successfully and Accepted Inquiry record created'
          }
        } catch (apiError) {
          console.warn('Full accept_inquiry API failed:', apiError)
        }

        // 2. Try the simple accept_inquiry_simple API
        if (!success) {
          try {
            const response = await call('accept_inquiry_simple', {
              inquiry_name: this.inquiry.name
            })

            if (response && response.success) {
              success = true
              message = response.message || 'Inquiry accepted successfully'
            }
          } catch (simpleApiError) {
            console.warn('Simple accept_inquiry API failed:', simpleApiError)
          }
        }

        // 3. Fallback to direct status update
        if (!success) {
          await call('frappe.client.set_value', {
            doctype: 'Inquiry',
            name: this.inquiry.name,
            fieldname: 'status',
            value: 'Accepted'
          })
          success = true
          message = 'Inquiry status updated to Accepted successfully'
        }

        if (success) {
          this.$emit('inquiry-updated')
          this.showSuccessToast(message)

          // Navigate to accepted inquiries page if we created a record
          if (message.includes('Accepted Inquiry record')) {
            setTimeout(() => {
              this.$router.push('/accepted-inquiries')
            }, 2000)
          }
        }
      } catch (error) {
        console.error('Accept inquiry error:', error)
        this.showErrorToast('Failed to accept inquiry', error)
      } finally {
        this.loading.accept = false
      }
    },

    async convertToApplication() {
      if (!confirm('Are you sure you want to convert this inquiry to a University Application? This will create a new application record.')) {
        return
      }

      this.loading.convert = true
      try {
        // First, get the Application record linked to this inquiry
        let applicationId = null
        if (this.inquiry.application) {
          // Use existing application
          applicationId = this.inquiry.application
        } else {
          // Find Application by client_id that might be linked
          const applications = await call('frappe.client.get_list', {
            doctype: 'Application',
            filters: {
              client_id: this.inquiry.client_id
            },
            fields: ['name'],
            limit: 1
          })

          if (applications && applications.length > 0) {
            applicationId = applications[0].name
          }
        }

        // Create University Application with proper field mapping
        const universityAppData = {
          doctype: 'University Application',
          application: applicationId,
          client: this.inquiry.client_id,
          status: 'Draft',
          priority: this.inquiry.priority || 'Medium',
          application_deadline: this.inquiry.deadline || null,
          academic_year: new Date().getFullYear(),
          intake_period: 'Fall', // Default, can be customized
          current_stage: 'Application Preparation',
          progress_percentage: 10,
          assigned_staff: frappe.session.user,
          internal_notes: `Converted from Inquiry: ${this.inquiry.name}\n\nOriginal Description: ${this.inquiry.description || ''}\n\nSpecial Requirements: ${this.inquiry.special_requirements || 'None'}\n\nBudget Range: ${this.inquiry.budget_min || 0} - ${this.inquiry.budget_max || 0} ${this.inquiry.currency || 'USD'}`
        }

        const response = await call('frappe.client.insert', {
          doc: universityAppData
        })

        // Update inquiry status and link to the new university application
        await call('frappe.client.set_value', {
          doctype: 'Inquiry',
          name: this.inquiry.name,
          fieldname: {
            status: 'Converted',
            conversion_date: new Date().toISOString().split('T')[0],
            conversion_notes: `Converted to University Application: ${response.message.name}`
          }
        })

        this.$emit('inquiry-updated')
        this.showSuccessToast('Inquiry converted to University Application successfully')

        // Navigate to the university applications page
        this.$router.push('/university-applications')
      } catch (error) {
        console.error('Convert inquiry error:', error)
        this.showErrorToast('Failed to convert inquiry', error)
      } finally {
        this.loading.convert = false
      }
    },

    async qualifyInquiry() {
      this.loading.qualify = true
      try {
        await call('frappe.client.set_value', {
          doctype: 'Inquiry',
          name: this.inquiry.name,
          fieldname: 'status',
          value: 'Qualified'
        })
        this.$emit('inquiry-updated')
        this.$toast({
          title: 'Success',
          text: 'Inquiry qualified successfully',
          icon: 'check',
          iconClasses: 'text-green-600'
        })
      } catch (error) {
        this.$toast({
          title: 'Error',
          text: 'Failed to qualify inquiry: ' + error.message,
          icon: 'x',
          iconClasses: 'text-red-600'
        })
      } finally {
        this.loading.qualify = false
      }
    },

    editInquiry() {
      // Navigate to edit mode or open edit modal
      this.$router.push(`/inquiry/${this.inquiry.name}/edit`)
    },

    async assignProvider() {
      this.loading.assign = true
      try {
        // Get available providers
        const providers = await call('frappe.client.get_list', {
          doctype: 'Provider',
          filters: {
            is_active: 1
          },
          fields: ['name', 'provider_name', 'rating', 'country'],
          limit: 10
        })

        if (!providers || providers.length === 0) {
          this.showErrorToast('No active providers found')
          return
        }

        // For now, assign to the first available provider (in a real app, this would be a modal selection)
        const selectedProvider = providers[0]

        await call('frappe.client.set_value', {
          doctype: 'Inquiry',
          name: this.inquiry.name,
          fieldname: 'selected_provider',
          value: selectedProvider.name
        })

        this.$emit('inquiry-updated')
        this.showSuccessToast(`Assigned to provider: ${selectedProvider.provider_name}`)
      } catch (error) {
        console.error('Assign provider error:', error)
        this.showErrorToast('Failed to assign provider', error)
      } finally {
        this.loading.assign = false
      }
    },

    async updatePriority() {
      this.loading.priority = true
      try {
        const priorities = ['Low', 'Medium', 'High', 'Urgent']
        const currentIndex = priorities.indexOf(this.inquiry.priority || 'Medium')
        const nextIndex = (currentIndex + 1) % priorities.length
        const newPriority = priorities[nextIndex]

        await call('frappe.client.set_value', {
          doctype: 'Inquiry',
          name: this.inquiry.name,
          fieldname: 'priority',
          value: newPriority
        })

        this.$emit('inquiry-updated')
        this.showSuccessToast(`Priority updated to ${newPriority}`)
      } catch (error) {
        console.error('Update priority error:', error)
        this.showErrorToast('Failed to update priority', error)
      } finally {
        this.loading.priority = false
      }
    },

    async addNotes() {
      const notes = prompt('Enter notes for this inquiry:')
      if (!notes) return

      try {
        const currentNotes = this.inquiry.conversion_notes || ''
        const timestamp = new Date().toLocaleString()
        const newNotes = currentNotes + `\n\n[${timestamp}] ${notes}`

        await call('frappe.client.set_value', {
          doctype: 'Inquiry',
          name: this.inquiry.name,
          fieldname: 'conversion_notes',
          value: newNotes
        })

        this.$emit('inquiry-updated')
        this.showSuccessToast('Notes added successfully')
      } catch (error) {
        console.error('Add notes error:', error)
        this.showErrorToast('Failed to add notes', error)
      }
    },

    contactClient() {
      // Open email client or contact modal
      if (this.inquiry.client_email) {
        window.open(`mailto:${this.inquiry.client_email}?subject=Regarding your inquiry ${this.inquiry.name}`)
      } else {
        this.$toast({
          title: 'Error',
          text: 'No email address available for this client',
          icon: 'x',
          iconClasses: 'text-red-600'
        })
      }
    },

    async generateProposal() {
      this.loading.proposal = true
      try {
        // Create a proposal document or communication
        const proposalContent = `
Dear ${this.inquiry.client_name},

Thank you for your inquiry (${this.inquiry.name}) submitted on ${new Date(this.inquiry.inquiry_date).toLocaleDateString()}.

Based on your requirements:
- Budget Range: ${this.inquiry.budget_min || 0} - ${this.inquiry.budget_max || 0} ${this.inquiry.currency || 'USD'}
- Preferred Countries: ${this.inquiry.preferred_countries || 'Not specified'}
- Required Languages: ${this.inquiry.required_languages || 'Not specified'}

We have prepared a customized proposal for your needs. Our team will contact you within 24 hours to discuss the details.

Best regards,
Flyout Team
        `

        // Create a communication record
        const communication = await call('frappe.client.insert', {
          doc: {
            doctype: 'Communication',
            subject: `Proposal for Inquiry ${this.inquiry.name}`,
            content: proposalContent,
            sender: frappe.session.user_email,
            recipients: this.inquiry.client_email,
            reference_doctype: 'Inquiry',
            reference_name: this.inquiry.name,
            communication_type: 'Communication',
            status: 'Open'
          }
        })

        this.showSuccessToast('Proposal generated and sent to client')
      } catch (error) {
        console.error('Generate proposal error:', error)
        this.showErrorToast('Failed to generate proposal', error)
      } finally {
        this.loading.proposal = false
      }
    },

    async updateStatus(newStatus) {
      this.loading.status = true
      try {
        const updateData = {
          status: newStatus
        }

        // Add timestamp for specific status changes
        if (newStatus === 'Converted') {
          updateData.conversion_date = new Date().toISOString().split('T')[0]
        }

        await call('frappe.client.set_value', {
          doctype: 'Inquiry',
          name: this.inquiry.name,
          fieldname: updateData
        })

        this.$emit('inquiry-updated')
        this.showSuccessToast(`Status updated to ${newStatus}`)
      } catch (error) {
        console.error('Update status error:', error)
        this.showErrorToast('Failed to update status', error)
      } finally {
        this.loading.status = false
      }
    },

    async rejectInquiry() {
      const reason = prompt('Please provide a reason for rejecting this inquiry:')
      if (!reason) return

      this.loading.reject = true
      try {
        if (confirm('Are you sure you want to reject this inquiry? This action cannot be undone.')) {
          // Update status and add rejection notes
          await call('frappe.client.set_value', {
            doctype: 'Inquiry',
            name: this.inquiry.name,
            fieldname: {
              status: 'Cancelled', // Using 'Cancelled' as it's a standard ERPNext status
              conversion_notes: (this.inquiry.conversion_notes || '') + `\n\n[${new Date().toLocaleString()}] REJECTED: ${reason}`
            }
          })

          // Send rejection notification to client
          try {
            await call('frappe.client.insert', {
              doc: {
                doctype: 'Communication',
                subject: `Inquiry ${this.inquiry.name} - Status Update`,
                content: `Dear ${this.inquiry.client_name},\n\nWe regret to inform you that your inquiry (${this.inquiry.name}) has been cancelled.\n\nReason: ${reason}\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nFlyout Team`,
                sender: frappe.session.user_email,
                recipients: this.inquiry.client_email,
                reference_doctype: 'Inquiry',
                reference_name: this.inquiry.name,
                communication_type: 'Communication',
                status: 'Open'
              }
            })
          } catch (commError) {
            console.warn('Failed to send rejection notification:', commError)
          }

          this.$emit('inquiry-updated')
          this.showSuccessToast('Inquiry rejected and client notified')
        }
      } catch (error) {
        console.error('Reject inquiry error:', error)
        this.showErrorToast('Failed to reject inquiry', error)
      } finally {
        this.loading.reject = false
      }
    },

    // Helper methods for toast notifications
    showSuccessToast(message) {
      toast({
        title: 'Success',
        text: message,
        icon: 'check',
        iconClasses: 'text-green-600'
      })
    },

    showErrorToast(title, error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        text: title + (error?.message ? ': ' + error.message : ''),
        icon: 'x',
        iconClasses: 'text-red-600'
      })
    }
  }
}
</script>