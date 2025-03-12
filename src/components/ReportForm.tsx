import React, { useEffect, useState } from 'react';

import { formatTime } from '../utils/transalte';

interface Report {
  id: number;
  startTime: string;
  endTime: string;
  content: string;
}

interface ReportFormProps {
  reports: Report[];
  onSubmit: (startTime: string, endTime: string, content: string) => void;
  onClose: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ reports, onSubmit, onClose }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    setStartTime(reports[reports.length - 1].endTime);

    const currentTime = new Date();
    setEndTime(`${currentTime.getHours()}:${currentTime.getMinutes()}`);
  }, [reports]);

  const handleSubmit = () => {
    if (startTime && endTime && content.trim()) {
      onSubmit(startTime, endTime, content);
      setStartTime('');
      setEndTime('');
      setContent('');
    }
  };

  const isFormValid = startTime && endTime && content.trim();

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-7xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">리포트 추가하기</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">시작 시간</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">종료 시간</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40 resize-none"
            placeholder="내용을 입력해주세요.."
          />
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            className="bg-gray-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            onClick={onClose}
          >
            취소
          </button>
          <button
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-lg shadow-md transition duration-300 ${
              isFormValid
                ? 'bg-gray-700 hover:bg-gray-800 text-white'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
