import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { SentMessage } from '../types';

type MessageHistoryProps = {
  sentMessages: SentMessage[];
  exportToExcel: (message: SentMessage) => void;
};

export function MessageHistory({ sentMessages, exportToExcel }: MessageHistoryProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Recipients</TableHead>
          <TableHead>Message Count</TableHead>
          <TableHead>Total Cost (DZD)</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sentMessages.map((msg) => (
          <TableRow key={msg.id} className="hover:bg-muted/50 transition-colors">
            <TableCell>{msg.date.toLocaleString()}</TableCell>
            <TableCell>{msg.recipients}</TableCell>
            <TableCell>{msg.messageCount}</TableCell>
            <TableCell>{msg.totalCost.toLocaleString()}</TableCell>
            <TableCell className="max-w-xs truncate">{msg.content}</TableCell>
            <TableCell>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => exportToExcel(msg)}
                className="neon-hover"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}