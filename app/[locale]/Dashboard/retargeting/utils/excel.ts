import * as XLSX from 'xlsx';

export async function parseExcelFile(file: File): Promise<string[]> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  return jsonData[0] as string[];
}

export function exportToExcel(data: Record<string, any>, filename: string) {
  const worksheet = XLSX.utils.json_to_sheet([data]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Campaign");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}