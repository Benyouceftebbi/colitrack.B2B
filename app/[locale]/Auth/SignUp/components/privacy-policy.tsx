"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, X } from "lucide-react"

interface PrivacyPolicyProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PrivacyPolicy({ open, onOpenChange }: PrivacyPolicyProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6">
          <DialogHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Shield className="h-6 w-6" />
              </div>
              <DialogTitle className="text-2xl font-bold">Privacy Policy</DialogTitle>
            </div>
            <div className="text-indigo-100 mt-2 text-sm">Last updated: 01-01-2025</div>
          </DialogHeader>
          
        </div>

        <ScrollArea className="max-h-[calc(90vh-120px)] p-6">
          <div className="text-base text-gray-800 dark:text-gray-200 space-y-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">App Name: Colitrack</p>

              <p className="mb-4">
                At COLITRACK ("we", "us", "our"), your privacy and trust are our top priority. This Privacy Policy
                explains how we collect, use, and protect your information when you use our app ("Service"). By using
                the app, you agree to the practices described in this policy.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  1
                </span>
                Information We Collect
              </h3>
              <div className="ml-9">
                <p className="mb-3">
                  We collect and process the following types of data solely to operate and improve the app:
                </p>

                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border-l-4 border-indigo-400">
                    <h4 className="font-medium mb-2">Account Information</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Name, email, encrypted password</li>
                      <li>Profile or company details</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-medium mb-2">Messaging & Campaign Data</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Messages sent via the platform</li>
                      <li>Retargeting campaign content and interaction data</li>
                      <li>Delivery statuses and metadata</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border-l-4 border-purple-400">
                    <h4 className="font-medium mb-2">Order & Package Data</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Order numbers</li>
                      <li>Tracking and delivery status</li>
                      <li>Customer details (if provided by you)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border-l-4 border-teal-400">
                    <h4 className="font-medium mb-2">Usage & Performance Data</h4>
                    <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Token usage history</li>
                      <li>Logs from AI order retrieval interactions</li>
                      <li>Session-based feature usage to improve performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  2
                </span>
                How We Use Your Information
              </h3>
              <div className="ml-9">
                <p className="mb-3">
                  Your data is used strictly to enhance the core functionality and performance of our services. We use
                  it to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Operate and improve messaging, retargeting, and AI features</li>
                  <li>Ensure smooth and efficient platform performance</li>
                  <li>Detect and resolve bugs or anomalies</li>
                  <li>Perform anonymized internal analysis for improvement</li>
                </ul>
                <p>All usage of data is done with the goal of improving the service for the user.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  3
                </span>
                API Tokens & Keys Security
              </h3>
              <div className="ml-9">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="mb-0">
                    We take the security of your API tokens and keys very seriously. All API keys and authentication
                    tokens stored in our system are encrypted using industry-standard encryption algorithms. Your
                    private keys are never exposed in plain text, and access is strictly limited within our
                    infrastructure. This ensures that even in the unlikely event of unauthorized access, your sensitive
                    tokens remain protected and unreadable. You do not need to worry about leaks or external access to
                    your tokens — we've implemented strong security protocols to guarantee their safety.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  4
                </span>
                Token Misuse & Enforcement
              </h3>
              <div className="ml-9">
                <p className="mb-3">To maintain system integrity and fair usage:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>
                    Any unauthorized attempt to add or manipulate tokens will result in an automatic deduction of 30,000
                    tokens per attempt.
                  </li>
                  <li>Repeated abuse may lead to account suspension or permanent ban.</li>
                </ul>
                <p>This policy is enforced to protect both our platform and its users.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  5
                </span>
                Data Security
              </h3>
              <div className="ml-9">
                <p className="mb-3">We maintain a comprehensive set of security practices, including:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>End-to-end data encryption</li>
                  <li>Strict access controls and permissions</li>
                  <li>Real-time monitoring and threat detection</li>
                  <li>Routine audits and vulnerability patching</li>
                </ul>
                <p>
                  While no system can be 100% immune to risks, we are committed to using every available measure to
                  protect your information.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  6
                </span>
                Data Retention
              </h3>
              <div className="ml-9">
                <p className="mb-3">We keep data only as long as required to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Provide and improve services</li>
                  <li>Meet legal and operational obligations</li>
                </ul>
                <p>
                  If you choose to delete your account, your data will be securely removed or anonymized unless we are
                  required to retain it by law.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  7
                </span>
                Your Rights
              </h3>
              <div className="ml-9">
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Access and review your data</li>
                  <li>Correct any inaccurate information</li>
                  <li>Request full deletion of your account and personal data</li>
                  <li>Limit or object to how your data is processed (where applicable)</li>
                </ul>
                <p>Contact us at colitrackdz@gmail.com to make any requests related to your data.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  8
                </span>
                Changes to This Policy
              </h3>
              <div className="ml-9">
                <p>
                  If we change this Privacy Policy, we will notify you via the app or email. Your continued use of the
                  Service after such changes constitutes your agreement to the updated policy.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  9
                </span>
                Contact Us
              </h3>
              <div className="ml-9">
                <p>
                  If you have questions about this Privacy Policy or how your data is handled:
                  <span className="inline-block bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-2 font-mono text-sm">
                    colitrackdz@gmail.com
                  </span>
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all"
          >
            I Understand
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
