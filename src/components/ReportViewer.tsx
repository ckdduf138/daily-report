import React, { useState } from 'react';

import { formatTime } from '../utils/transalte';

import { Report } from '../types/Common';

interface ReportViewerProps {
  reports: Report[];
  delete_report: (id: string) => void;
  edit_report: (report: Report) => void;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ reports, delete_report, edit_report }) => {
  const [expandedReportIndex, setExpandedReportIndex] = useState<number | null>(null);

  const handleClick = (index: number, report: Report) => {
    if (expandedReportIndex === index) {
      setExpandedReportIndex(null);
      edit_report(report);
    } else {
      setExpandedReportIndex(index);
    }
  };

  const handleDelete = (id: string) => {
    delete_report(id);
  };

  return (
    <div>
      {reports.length === 0 ? (
        <p className="text-center text-gray-500">오늘 하루도 기록해봅시다.</p>
      ) : (
        <ul className="mt-2">
          {reports.map((report, index) => (
            <li
              key={index}
              className={`flex flex-col p-2 rounded mb-2 cursor-pointer transition-all duration-300 ease-in-out border-2 ${
                expandedReportIndex === index ? 'border-black' : 'border-transparent'
              } bg-gray-100`}
              onClick={() => handleClick(index, report)}
              style={{
                height: expandedReportIndex === index ? 'auto' : '60px',
                overflow: 'hidden',
                position: 'relative',
              }}
            >

            {/* 일반 보기 */}
            <div className="text-black">
              <span>{formatTime(report.startTime)} ~ {formatTime(report.endTime)}</span>
              <p>{expandedReportIndex !== index ? report.content.slice(0, 50) : ''}</p>
            </div>

            {/* 상세보기 */}
            {expandedReportIndex === index && (
              <p>{report.content}</p>
            )}

            
            {/* 리포트 삭제 버튼 */}
            <img
              src={`${process.env.PUBLIC_URL}/images/home/ic-cross-circle.svg`}
              alt="Delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(report.id);
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                cursor: 'pointer',
              }}
            />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportViewer;
