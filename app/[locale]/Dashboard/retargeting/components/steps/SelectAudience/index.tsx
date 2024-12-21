import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ClientGroupSelector } from './ClientGroupSelector';
import { ExcelFileUploader } from './ExcelFileUploader';
import type { RetargetingCampaignHook } from '../../../types';

type SelectAudienceProps = {
  campaign: RetargetingCampaignHook;
};

export function SelectAudience({ campaign }: SelectAudienceProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Campaign Details</h3>
            <p className="text-sm text-muted-foreground">Token per SMS: {campaign.CHARACTER_LIMIT} DZD</p>
          </div>
          <div>
            <p className="text-sm">Total Recipients: {campaign.totalRecipients}</p>
            <p className="text-sm">Estimated Cost: {campaign.totalCost.toLocaleString()} DZD</p>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <Label>Select Audience Source</Label>
            <RadioGroup 
              value={campaign.audienceSource} 
              onValueChange={(value) => campaign.setAudienceSource(value as 'group' | 'excel')}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <Label htmlFor="group">Select Client Group</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel">Upload Excel File</Label>
              </div>
            </RadioGroup>
          </div>

          {campaign.audienceSource === 'group' ? (
            <ClientGroupSelector campaign={campaign} />
          ) : (
            <ExcelFileUploader campaign={campaign} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}