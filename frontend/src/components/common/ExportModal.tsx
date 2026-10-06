import React, { useState } from 'react';
import { Download, FileSpreadsheet, FileJson, Check } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { exportMealsToCSV, exportJSON } from '../../utils/exportUtils';
import { mockTodayMeals, mockWeightSummary } from '../../data/mockData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    if (format === 'csv') {
      exportMealsToCSV(mockTodayMeals);
    } else {
      exportJSON({
        meals: mockTodayMeals,
        weight: mockWeightSummary,
        exportDate: new Date().toISOString()
      }, `fitsnap-backup-${new Date().toISOString().split('T')[0]}.json`);
    }

    setExported(true);
    setTimeout(() => {
      setExported(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Fitness Logs">
      <div className="space-y-4 py-2">
        <p className="text-xs text-zinc-400">
          Download your complete nutrition, meal logs, and body weight history for analysis or backup.
        </p>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-300 block">Export Format</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setFormat('csv')}
              className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                format === 'csv'
                  ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold">CSV Format</div>
                <div className="text-[10px] opacity-70">Excel / Spreadsheets</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormat('json')}
              className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                format === 'json'
                  ? 'bg-yellow-400/10 border-yellow-400 text-yellow-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <FileJson className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <div className="text-xs font-bold">JSON Data</div>
                <div className="text-[10px] opacity-70">Raw Data Backup</div>
              </div>
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            fullWidth
            onClick={handleExport}
            className="flex items-center justify-center gap-2"
          >
            {exported ? (
              <>
                <Check className="w-4 h-4 text-black" />
                Exported Successfully!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-black" />
                Download {format.toUpperCase()} File
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
