"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, X } from "lucide-react"

interface TermsConditionsProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsConditions({ open, onOpenChange }: TermsConditionsProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 gap-0 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-6">
          <DialogHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <FileText className="h-6 w-6" />
              </div>
              <DialogTitle className="text-2xl font-bold">Terms and Conditions</DialogTitle>
            </div>
            <div className="text-indigo-100 mt-2 text-sm">Last updated: 01-01-2025</div>
          </DialogHeader>
         
        </div>

        <ScrollArea className="max-h-[calc(90vh-120px)] p-6">
          <div className="text-base text-gray-800 dark:text-gray-200 space-y-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">App Name: Colitrack</p>

              <p className="mb-4">
                By using this application ("Colitrack"), you agree to be bound by these Terms and Conditions ("Terms"), which
                govern your access to and use of our services. If you do not agree with any part of these Terms, you
                must not use the App.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  1
                </span>
                Definitions
              </h3>
              <div className="ml-9">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <div className="font-medium mb-1">User</div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm">
                      Any individual or entity using the App.
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <div className="font-medium mb-1">Service</div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm">
                      The app's features, including but not limited to messaging, order tracking, retargeting campaigns,
                      and AI-powered order retrieval.
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <div className="font-medium mb-1">Tokens</div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm">
                      The credit system used to interact with the Service's features.
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <div className="font-medium mb-1">Account</div>
                    <div className="text-gray-700 dark:text-gray-300 text-sm">
                      The User's registered profile in the App.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  2
                </span>
                License to Use the App
              </h3>
              <div className="ml-9">
                <p className="mb-3">
                  We grant you a limited, non-exclusive, non-transferable license to use the App for your internal
                  business or personal use, subject to these Terms.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-400 mb-3">
                  <div className="font-medium mb-2">You agree not to:</div>
                  <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>Use the App for any illegal or unauthorized purpose.</li>
                    <li>Interfere with or disrupt the servers or networks connected to the Service.</li>
                    <li>Reverse engineer or attempt to access the source code or algorithms.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  3
                </span>
                Account Responsibilities
              </h3>
              <div className="ml-9">
                <p className="mb-3">You are responsible for:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Maintaining the confidentiality of your login credentials and API keys.</li>
                  <li>All activities that occur under your account.</li>
                  <li>Providing accurate and complete information when registering.</li>
                </ul>
                <p>You must immediately notify us of any unauthorized use of your account.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  4
                </span>
                Use of Tokens
              </h3>
              <div className="ml-9">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs mt-0.5">
                        •
                      </div>
                      <div>Tokens are consumed based on usage of features (e.g., messaging, AI retrieval).</div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs mt-0.5">
                        •
                      </div>
                      <div>
                        Attempts to illegally insert, modify, or manipulate tokens will result in an automatic penalty
                        of -30,000 tokens per violation.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs mt-0.5">
                        •
                      </div>
                      <div>
                        We reserve the right to suspend or terminate accounts involved in repeated abuse or fraudulent
                        behavior.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  5
                </span>
                API Tokens and Security
              </h3>
              <div className="ml-9">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="mb-0">
                    Your API tokens and authentication keys are securely encrypted and stored using industry-standard
                    security protocols. These keys are never exposed in plain text and are safeguarded to prevent
                    unauthorized access.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  6
                </span>
                Fair Use Policy
              </h3>
              <div className="ml-9">
                <p className="mb-3">To ensure consistent performance for all users:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Automated abuse of the platform is prohibited.</li>
                  <li>
                    Retargeting and message campaigns must comply with applicable communication laws and customer
                    consent requirements.
                  </li>
                  <li>
                    We reserve the right to suspend accounts that significantly degrade system performance or violate
                    fair use.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  7
                </span>
                Data Usage
              </h3>
              <div className="ml-9">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400">
                  <p className="mb-0">
                    Data you provide to the App (including customer contact details and order data) is used strictly to
                    enhance and improve the performance and services of the App. This may include internal analytics, AI
                    optimization, and system enhancements. We do not use your data for any purposes beyond improving
                    your experience and ensuring the platform functions as intended.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  8
                </span>
                Intellectual Property
              </h3>
              <div className="ml-9">
                <p>
                  All content, features, code, and trademarks related to the App are the exclusive property of Colitrack
                  or its licensors. You may not use, copy, or redistribute any part of the App without written
                  permission.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  9
                </span>
                Termination
              </h3>
              <div className="ml-9">
                <p className="mb-3">We may suspend or terminate your access to the App at any time if:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>You violate these Terms</li>
                  <li>You misuse the platform (e.g., illegal token use, abuse of features)</li>
                  <li>Your behavior threatens the security, integrity, or performance of the App</li>
                </ul>
                <p>You may also terminate your account at any time by contacting support.</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  10
                </span>
                Limitation of Liability
              </h3>
              <div className="ml-9">
                <p className="mb-3">To the fullest extent permitted by law, we are not liable for any:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of data, revenue, or reputation</li>
                  <li>Service interruptions or errors beyond our reasonable control</li>
                </ul>
                <p>Use of the App is provided "as-is" and "as available."</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  11
                </span>
                Governing Law
              </h3>
              <div className="ml-9">
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of Algeria. Any disputes
                  shall be resolved through arbitration or courts in Algeria.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  12
                </span>
                Changes to Terms
              </h3>
              <div className="ml-9">
                <p>
                  We reserve the right to modify these Terms at any time. Updated Terms will be posted within the App.
                  Your continued use of the App after changes are made constitutes your agreement to the revised Terms.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 w-7 h-7 rounded-full flex items-center justify-center mr-2 text-sm">
                  13
                </span>
                Contact Us
              </h3>
              <div className="ml-9">
                <p>
                  For questions or concerns about these Terms:
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
            I Accept
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
