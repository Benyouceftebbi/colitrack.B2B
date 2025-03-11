import yalidineLoginImage from "../components/yalidin-screens/yalidin-login.png"
import yalidineDevelopmentImage from "../components/yalidin-screens/yalidin-devlopment.png"
import yalidineDevelopmentImage2 from "../components/yalidin-screens/yalidin-devlpment2.png"
import webhookConfig from "../components/yalidin-screens/webhookConfig.png"

import stepOne from "../components/dhd-screens/Step-1-dhd.png"
import stepTwo from "../components/dhd-screens/Step-2-dhd.png"
import stepThree from "../components/dhd-screens/3rd-step-dhd.jpg"
import submitDhd from "../components/dhd-screens/submition-step-dhd.png"
import pending from "../components/dhd-screens/pending-step-dhd.png"
import activated from "../components/dhd-screens/activated-step-dhd.png"

export interface ProviderConfig {
  name: string
  fields: {
    [key: string]: {
      label: string
      type: string
      placeholder: string
    }
  }
  steps: {
    title: string
    description: string
    image?: string
  }[]
  languageOptions: { value: string; label: string }[]
}

export const providerConfigs: { [key: string]: ProviderConfig } = {
  "Yalidin Express": {
    name: "Yalidin Express",
    fields: {
      apiId: { label: "API ID", type: "text", placeholder: "Enter API ID" },
      apiToken: { label: "API Token", type: "text", placeholder: "Enter API Token" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Login to Yalidine Express",
        description:
          "Visit https://yalidine.app and log in to your account. If you don't have an account yet, you'll need to register first.",
        image: yalidineLoginImage,
      },
      {
        title: "Navigate to Development",
        description: "Open the hamburger menu, then click on 'Development' to access developer options.",
        image: yalidineDevelopmentImage,
      },
      {
        title: "Access Webhook Settings",
        description: "Click on 'Gérer les webhooks' to navigate to the webhook creation screen.",
        image: yalidineDevelopmentImage2,
      },
      {
        title: "Create New Webhook",
        description:
          "Follow the on-screen instructions to create a new webhook. Fill in the required information in the input fields.",
      },
      {
        title: "Copy Webhook Information",
        description:
          "Copy the name, email and link provided below and use them to set up your webhook in the Yalidine Express interface, Set the 'Type d'évènement' to the option parcel_status_updated ",
      },
      {
        title: "Enter Configuration Details",
        description: "Enter the required configuration details for Yalidine Express (You can get those info from the previous step ).",
        image: webhookConfig,
      },
      {
        title: "Finalize Setup",
        description: "Review your information and finalize the setup.",
      },
    ],
  },
  "Gupex": {
    name: "Gupex",
    fields: {
      apiId: { label: "API ID", type: "text", placeholder: "Enter API ID" },
      apiToken: { label: "API Token", type: "text", placeholder: "Enter API Token" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Login to Gupex",
        description:
          "Visit https://guepex.app/app/login.php and log in to your account. If you don't have an account yet, you'll need to register first.",
        image: yalidineLoginImage,
      },
      {
        title: "Navigate to Development",
        description: "Open the hamburger menu, then click on 'Development' to access developer options.",
        image: yalidineDevelopmentImage,
      },
      {
        title: "Access Webhook Settings",
        description: "Click on 'Gérer les webhooks' to navigate to the webhook creation screen.",
        image: yalidineDevelopmentImage2,
      },
      {
        title: "Create New Webhook",
        description:
          "Follow the on-screen instructions to create a new webhook. Fill in the required information in the input fields.",
      },
      {
        title: "Copy Webhook Information",
        description:
          "Copy the name, email and link provided below and use them to set up your webhook in the Gupex interface, Set the 'Type d'évènement' to the option parcel_status_updated ",
      },
      {
        title: "Enter Configuration Details",
        description: "Enter the required configuration details for Gupex (You can get those info from the previous step).",
        image: webhookConfig,
      },
      {
        title: "Finalize Setup",
        description: "Review your information and finalize the setup.",
      },
    ],
  },
  DHD: {
    name: "DHD",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter UPS Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start DHD Integration",
        description:
          "Begin the DHD integration process by accessing the integration page. visit the follwing link https://dhd.ecotrack.dz/market",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the DHD integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the DHD integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for DHD to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your DHD integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "Go livri": {
    name: "Go livri",
    fields: {
      apiKey: { label: "API Key", type: "text", placeholder: "Enter Go Livri API Key" },
      accountId: { label: "Account ID", type: "text", placeholder: "Enter Go Livri Account ID" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Create Go Livri Account",
        description: "Sign up for a Go Livri account if you don't have one already.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the DHD integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the DHD integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for DHD to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your DHD integration has been activated.",
        image: activated,
      },
      {
        title: "Test Integration",
        description: "Perform a test to ensure the integration is working correctly.",
      },
    ],
  },
  UPS: {
    name: "UPS",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter UPS Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Create UPS Developer Account",
        description: "Sign up for a UPS developer account at https://www.ups.com/upsdeveloperkit",
        image: stepOne,
      },
      {
        title: "Request API Access",
        description: "Request access to the UPS APIs you need for integration.",
        image: stepTwo,
      },
      {
        title: "Generate Access Key",
        description: "Generate an Access Key in your UPS developer account.",
        image: stepThree,
      },
      {
        title: "Obtain Credentials",
        description: "Obtain your User ID and Password for API authentication.",
        image: submitDhd,
      },
      {
        title: "Configure Webhook (if applicable)",
        description: "Set up webhooks for real-time notifications, if supported by UPS.",
        image: pending,
      },
      {
        title: "Enter Configuration Details",
        description: "Enter the Access Key, User ID, and Password in the configuration fields.",
        image: activated,
      },
      {
        title: "Test Integration",
        description: "Perform a test to ensure the UPS integration is working correctly.",
      },
    ],
  },
  "NOEST Express": {
    name: "NOEST Express",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter NOEST Express Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start NOEST Express Integration",
        description: "Begin the NOEST Express integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the NOEST Express integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the NOEST Express integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for NOEST Express to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your NOEST Express integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "BA CONSULT": {
    name: "BA CONSULT",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter BA CONSULT Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start BA CONSULT Integration",
        description: "Begin the BA CONSULT integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the BA CONSULT integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the BA CONSULT integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for BA CONSULT to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your BA CONSULT integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  Anderson: {
    name: "Anderson",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter Anderson Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start Anderson Integration",
        description: "Begin the Anderson integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the Anderson integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the Anderson integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for Anderson to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your Anderson integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "WORLD Express": {
    name: "WORLD Express",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter WORLD Express Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start WORLD Express Integration",
        description: "Begin the WORLD Express integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the WORLD Express integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the WORLD Express integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for WORLD Express to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your WORLD Express integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  FRET: {
    name: "FRET",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter FRET Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start FRET Integration",
        description: "Begin the FRET integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the FRET integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the FRET integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for FRET to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your FRET integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "48H": {
    name: "48H",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter 48H Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start 48H Integration",
        description: "Begin the 48H integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the 48H integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the 48H integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for 48H to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your 48H integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  Packers: {
    name: "Packers",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter Packers Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start Packers Integration",
        description: "Begin the Packers integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the Packers integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the Packers integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for Packers to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your Packers integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "Fast mail": {
    name: "Fast mail",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter Fast mail Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start Fast mail Integration",
        description: "Begin the Fast mail integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the Fast mail integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the Fast mail integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for Fast mail to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your Fast mail integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "NEGMAR Express": {
    name: "NEGMAR Express",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter NEGMAR Express Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start NEGMAR Express Integration",
        description: "Begin the NEGMAR Express integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the NEGMAR Express integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the NEGMAR Express integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for NEGMAR Express to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your NEGMAR Express integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  Expedia: {
    name: "Expedia",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter Expedia Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start Expedia Integration",
        description: "Begin the Expedia integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the Expedia integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the Expedia integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for Expedia to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your Expedia integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "Rocket Delivery": {
    name: "Rocket Delivery",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter Rocket Delivery Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start Rocket Delivery Integration",
        description: "Begin the Rocket Delivery integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the Rocket Delivery integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the Rocket Delivery integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for Rocket Delivery to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your Rocket Delivery integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "MSM GO": {
    name: "MSM GO",
    fields: {
      accessKey: { label: "Access Key", type: "text", placeholder: "Enter MSM GO Access Key" },
    },
    languageOptions: [
      { value: "fr", label: "Français" },
      { value: "ar", label: "العربية" },
    ],
    steps: [
      {
        title: "Start MSM GO Integration",
        description: "Begin the MSM GO integration process by accessing the integration page.",
        image: stepOne,
      },
      {
        title: "Enter Integration Details",
        description: "Fill in the required integration details, including your company information.",
        image: stepTwo,
      },
      {
        title: "Provide Additional Information",
        description: "Enter any additional information required for the MSM GO integration.",
        image: stepThree,
      },
      {
        title: "Submit Integration Request",
        description: "Review your information and submit the MSM GO integration request.",
        image: submitDhd,
      },
      {
        title: "Await Approval",
        description: "Your integration request is pending. Wait for MSM GO to review and approve it.",
        image: pending,
      },
      {
        title: "Integration Activated",
        description: "Congratulations! Your MSM GO integration has been activated.",
        image: activated,
      },
      {
        title: "View API Token",
        description: "Access your API token, which you'll need to configure the integration in your system.",
      },
    ],
  },
  "Maystero Delivery": {
    name: "Maystero Delivery",
    fields: {
     
    },
    languageOptions: [
     
    ],
    steps: [
      {
        title: "Comming Soon .......",
        description: "Comming Soon ....",
      
      },
     
    ],
  },}

