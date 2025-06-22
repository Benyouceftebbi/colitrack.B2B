"use client";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { functions } from "@/firebase/firebase";
import { httpsCallable } from "firebase/functions";
import { useEffect, useState } from "react";
import { MetaLogo } from "./meta-logo";
import { useTranslations } from "next-intl";
import { LoadingButton } from "@/components/ui/LoadingButton";

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

export default function FacebookConnect({shopId,setShopData}) {
 const t = useTranslations("ai-order-retriever")
 const [isLoading, setIsLoading] = useState(false);
  // Load Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "2431951540507023", // Replace with your actual App ID
        cookie: true,
        xfbml: true,
        version: "v22.0",
      });
    };

    (function (d, s, id) {
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      const fjs = d.getElementsByTagName(s)[0];
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  // Handle login
const handleLogin = () => {
  setIsLoading(true);
  window.FB.login(
  (response: any) => {
      if (response.authResponse) {
        const token = response.authResponse.accessToken;

        try {
       fetchPages(token, shopId); // wait for fetchPages to complete
        } catch (err) {
          console.error("❌ Error during fetchPages:", err);
        } finally {
          setIsLoading(false); // done after everything finishes
        }
      } else {
        console.warn("User cancelled login or did not authorize.");
        setIsLoading(false); // set false if user cancels
      }
    },
    {
      scope:
        "email,public_profile,pages_show_list,pages_read_engagement,pages_manage_metadata,pages_messaging,instagram_basic,instagram_manage_messages",
    }
  );
};

const fetchPages = (token: string, shopId: string) => {
  window.FB.api("/me/accounts", { access_token: token }, async (res: any) => {
    if (res?.data) {
   await Promise.all(
        res.data.map(async (page: any) => {
          return new Promise((resolve) => {
            window.FB.api(
              `/${page.id}?fields=instagram_business_account`,
              { access_token: page.access_token },
              async (igRes: any) => {
                const instagramId = igRes?.instagram_business_account?.id || null;
                let isMetaConnected = false;

                // ✅ If the page has an IG Business account, trigger backend function
                if (instagramId) {
                  try {
                    const exchangeFacebookTokens = httpsCallable(
                      functions,
                      "exchangeFacebookTokens"
                    );

                    const result = await exchangeFacebookTokens({
                      shortLivedToken: token,
                      targetPageId: page.id,
                      instagramId,
                      shopId,
                    });
                        
                        console.log("result",result.data);
                        
                        setShopData((prev)=> ({...prev,
                          facebookId:result.data.facebookId,
                          instagramId:result.data.instagramId,
                          metaAccessToken: result.data.encryptedToken,
                          isFacebookConnected: result.data.isMetaConnected,
                        }));

                        isMetaConnected = result.data.isMetaConnected;
                    console.log("📦 Backend stored tokens:", result.data);
                  } catch (err) {
                    console.error("❌ Error calling Cloud Function:", err);
                  }
                }

                resolve({
                  ...page,
                  instagram_business_account: instagramId,
                });
              }
            );
          });
        })
      );

    
    } else {
      console.error("Failed to fetch pages", res);
    }
  });
};



  return (
<Tooltip>
  <TooltipTrigger asChild>
    <Button
      asChild
      variant="outline"
      disabled={isLoading}
      className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20 w-full sm:w-auto"
      //onClick={handleLogin}
    >
      <span className="flex items-center">
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 mr-2 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          <MetaLogo className="mr-2 h-5 w-5" />
        )}
        {isLoading ? "Connecting..." : t("connectMeta")}
      </span>
    </Button>
  </TooltipTrigger>

  <TooltipContent className="max-w-sm text-sm">
    Connect your Facebook Page to automatically retrieve and process customer orders from Messenger conversations using AI.
  </TooltipContent>
</Tooltip>
  );
}
