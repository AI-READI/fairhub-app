<template>
  <main class="flex w-full flex-col pr-6">
    <div>
      <h2>Data Upload Guide</h2>

      <p class="py-4">
        Before you begin, make sure your data is properly formatted and meets any required
        specifications to ensure a smooth upload process. This step-by-step guide helps you securely
        upload your data to Azure Storage. Each step includes important details to ensure a
        successful upload process.
      </p>

      <n-divider />

      <div
        class="bg-white-50 flex flex-col items-start gap-3 rounded-lg p-2 shadow-sm dark:bg-gray-900"
      >
        <div class="p-2">
          <div>
            <div class="mb-2 flex items-center gap-2">
              <f-icon
                icon="mdi:numeric-1-circle"
                class="text-3xl text-blue-500 hover:text-blue-400"
              />

              <h2 class="text-xl font-semibold">Prepare Your Data</h2>
            </div>

            <p class="mb-2 text-gray-600">
              Before uploading, ensure your data is properly organized:
            </p>

            <ul class="mb-4 list-inside list-disc space-y-1 text-gray-600">
              <li>Files should be in the correct format (CSV, JSON, or specified format)</li>

              <li>Data should be properly structured according to study requirements</li>

              <li>All required fields should be present and properly formatted</li>

              <li>Sensitive data should be properly anonymized</li>

              <li>File names should be clear and descriptive</li>
            </ul>
          </div>
        </div>

        <n-divider />

        <div class="p-2">
          <div>
            <div class="mb-2 flex items-center gap-2">
              <f-icon
                icon="mdi:numeric-2-circle"
                class="text-3xl text-blue-500 hover:text-blue-400"
              />

              <h2 class="text-xl font-semibold">Download Storage Explorer</h2>
            </div>

            <p class="mb-4 text-gray-600">
              Azure Storage Explorer is a free tool that makes it easy to manage your files in Azure
              storage. It provides a user-friendly interface for uploading, downloading, and
              managing your data.
            </p>

            <div class="flex gap-4">
              <n-button
                to="https://azure.microsoft.com/en-us/products/storage/storage-explorer/#download"
                type="default"
                class="bg-sky-100 text-sky-500"
                size="medium"
              >
                <template #icon>
                  <f-icon icon="typcn:vendor-microsoft" />
                </template>
                Windows
              </n-button>

              <n-button type="default" class="bg-sky-100 text-sky-500" size="medium">
                <template #icon>
                  <f-icon icon="wpf:macos" />
                </template>
                macOS
              </n-button>

              <n-button class="bg-sky-100 text-sky-500" size="medium">
                <template #icon>
                  <f-icon icon="mdi:linux" />
                </template>
                Linux
              </n-button>
            </div>

            <p class="mt-2 text-sm text-gray-500">
              System Requirements: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 18.04+)
            </p>
          </div>
        </div>

        <n-divider />

        <div class="p-2">
          <div>
            <div class="mb-2 flex items-center gap-2">
              <f-icon
                icon="mdi:numeric-3-circle"
                class="text-3xl text-blue-500 hover:text-blue-400"
              />

              <h2 class="text-xl font-semibold">Access Azure Storage</h2>
            </div>

            <p class="mb-2 text-gray-600">
              Use the following Azure storage URL to connect to your study's storage container.
              You'll need this URL when setting up Azure Storage Explorer.
            </p>

            <div class="flex items-center gap-2">
              <p class="flex-1 rounded bg-gray-50 p-3 font-mono text-sm">
                https://envisionportal.blob.core.windows.net/AI-READI/{{ studyId }}
              </p>

              <n-button
                icon="i-mdi-content-copy"
                type="neutral"
                variant="ghost"
                @click="
                  copyToClipboard(
                    `https://envisionportal.blob.core.windows.net/study-data/${studyId}`
                  )
                "
              />
            </div>

            <p class="mt-2 text-sm text-gray-500">
              Tip: Save this URL for future reference. You'll need it each time you want to access
              your study's storage.
            </p>
          </div>
        </div>

        <n-divider />

        <div class="p-2">
          <div>
            <div class="mb-2 flex items-center gap-2">
              <f-icon
                icon="mdi:numeric-4-circle"
                class="text-3xl text-blue-500 hover:text-blue-400"
              />

              <h2 class="text-xl font-semibold">Upload Files</h2>
            </div>

            <p class="mb-2 text-gray-600">Using Azure Storage Explorer:</p>

            <ol class="mb-4 list-inside list-decimal space-y-1 text-gray-600">
              <li>Open Azure Storage Explorer</li>

              <li>Connect to your study's storage using the URL provided above</li>

              <li>Navigate to the correct container</li>

              <li>Drag and drop your validated files or use the upload button</li>

              <li>Monitor the upload progress</li>
            </ol>
          </div>
        </div>

        <n-divider />

        <div class="p-2">
          <div>
            <div class="mb-2 flex items-center gap-2">
              <f-icon
                icon="mdi:numeric-5-circle"
                class="text-3xl text-blue-500 hover:text-blue-400"
              />

              <h2 class="text-xl font-semibold">Verify Upload</h2>
            </div>

            <p class="mb-2 text-gray-600">After uploading, verify that:</p>

            <ul class="mb-4 list-inside list-disc space-y-1 text-gray-600">
              <li>All files have been successfully uploaded</li>

              <li>File sizes match your original files</li>

              <li>You can open and view the files in Azure Storage Explorer</li>

              <li>File permissions are set correctly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts"></script>
