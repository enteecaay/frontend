import React, { useEffect } from 'react';
import './AIUsageScreen.css';

const AIUsageScreen = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="ai-usage-container">
      <h1>AI Usage</h1>
      <div className="ai-usage-content">
        <section>
          <h2>PHẦN 1. AI USAGE – ỨNG DỤNG AI TRONG BÀI LÀM</h2>
          <div className="sub-section">
            <h3>1.1. Soạn quiz dựa trên nội dung nhóm soạn (ChatGPT)</h3>
            <p><strong>Công cụ sử dụng:</strong> ChatGPT (OpenAI), NotebookLM</p>
            <p><strong>Mục đích sử dụng:</strong> Hỗ trợ tạo câu hỏi trắc nghiệm và câu hỏi ôn tập nhằm củng cố nội dung lý luận về vai trò của Đảng Cộng sản Việt Nam và giúp người học tự đánh giá mức độ hiểu bài. AI không tự tạo nội dung lý luận, mà chỉ dựa trên nội dung do Nhóm đã biên soạn.</p>
            <p><strong>Quy trình sử dụng AI:</strong></p>
            <ul>
              <li>Nhóm hoàn thành phần nội dung lý thuyết (vai trò lãnh đạo của Đảng, ý nghĩa câu nói của Hồ Chí Minh).</li>
              <li>Nội dung này được đưa vào ChatGPT để yêu cầu tạo quiz phục vụ ôn tập.</li>
              <li>Nhóm chọn lọc, chỉnh sửa, loại bỏ các câu hỏi chưa phù hợp với giáo trình LLCT.</li>
            </ul>
            <p><strong>Prompt tiêu biểu đã sử dụng:</strong> "Dựa trên nội dung sau về vai trò lãnh đạo của Đảng Cộng sản Việt Nam và câu nói 'Đảng có vững cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy', hãy tạo 5 câu hỏi trắc nghiệm (4 đáp án) và 2 câu hỏi tự luận ngắn để ôn tập. Không bổ sung kiến thức ngoài nội dung đã cung cấp."</p>
            <p><strong>Kết quả AI tạo ra:</strong> Gợi ý bộ câu hỏi trắc nghiệm và tự luận. Một số câu hỏi được điều chỉnh lại thuật ngữ để phù hợp với văn phong học thuật LLCT.</p>
            <p><strong>Phần chỉnh sửa của sinh viên:</strong> Đối chiếu với giáo trình và nghị quyết để sửa lại khái niệm chính trị, loại bỏ các cách diễn đạt mang tính suy diễn, thống nhất cách dùng thuật ngữ.</p>
          </div>
          <div className="sub-section">
            <h3>1.2. Hỗ trợ code (GitHub Copilot, ChatGPT)</h3>
            <p><strong>Công cụ sử dụng:</strong> GitHub Copilot, ChatGPT</p>
            <p><strong>Mục đích sử dụng:</strong> Hỗ trợ viết mã nguồn kỹ thuật cho trang web / ứng dụng trình bày nội dung và module quiz. AI chỉ hỗ trợ về mặt kỹ thuật, không tham gia vào nội dung lý luận chính trị.</p>
            <p><strong>Nội dung AI hỗ trợ:</strong> Gợi ý cấu trúc file code, cách xử lý logic hiển thị câu hỏi – đáp án, hàm chấm điểm quiz, giải thích lỗi cú pháp và tối ưu code.</p>
            <p><strong>Prompt tiêu biểu đã sử dụng:</strong> "Hãy giúp viết một đoạn JavaScript đơn giản để hiển thị câu hỏi trắc nghiệm, cho phép người dùng chọn đáp án và hiển thị kết quả sau khi hoàn thành."</p>
            <p><strong>Phần sinh viên thực hiện:</strong> Tự thiết kế nội dung câu hỏi, tự tích hợp code vào hệ thống, tự kiểm tra, chỉnh sửa để phù hợp với mục tiêu học tập.</p>
          </div>
        </section>
        <section>
          <h2>PHẦN 2. NGUỒN THÔNG TIN UY TÍN SỬ DỤNG (ĐỐI CHIẾU – KIỂM CHỨNG)</h2>
          <p>Toàn bộ nội dung lý thuyết KHÔNG lấy trực tiếp từ AI, mà được đối chiếu từ các nguồn chính thống sau:</p>
          <div className="sub-section">
            <h4>2.1. Giáo trình chính thức</h4>
            <ul>
              <li>Giáo trình Tư tưởng Hồ Chí Minh – NXB Chính trị Quốc gia Sự thật (Phần: Vai trò của Đảng Cộng sản Việt Nam)</li>
              <li>Giáo trình Đường lối Cách mạng của Đảng Cộng sản Việt Nam</li>
            </ul>
          </div>
          <div className="sub-section">
            <h4>2.2. Văn kiện – nghị quyết</h4>
            <ul>
              <li>Văn kiện Đại hội XIII của Đảng</li>
              <li>Điều lệ Đảng Cộng sản Việt Nam</li>
              <li>Toàn tập Hồ Chí Minh, đặc biệt: Đường Kách mệnh (1927), Các bài viết về xây dựng Đảng</li>
            </ul>
          </div>
          <div className="sub-section">
            <h4>2.3. Nguồn chính thống</h4>
            <ul>
              <li>Cổng thông tin điện tử Đảng Cộng sản Việt Nam: <a href="https://dangcongsan.vn" target="_blank" rel="noopener noreferrer">https://dangcongsan.vn</a></li>
              <li>Nhà xuất bản Chính trị Quốc gia Sự thật</li>
            </ul>
            <p>AI chỉ được sử dụng sau khi nội dung đã được kiểm chứng từ các nguồn trên.</p>
          </div>
        </section>
        <section>
          <h2>PHẦN 3. CAM KẾT VỀ VIỆC SỬ DỤNG AI (CÓ TRÁCH NHIỆM)</h2>
          <p>Nhóm cam kết:</p>
          <ul>
            <li>Không sử dụng AI để viết toàn bộ nội dung lý luận chính trị.</li>
            <li>AI chỉ đóng vai trò: Công cụ hỗ trợ kỹ thuật, Gợi ý hình thức thể hiện (quiz, sơ đồ, code).</li>
            <li>Nhóm chịu hoàn toàn trách nhiệm về: Tính chính xác của nội dung, Quan điểm chính trị và học thuật trong bài làm.</li>
          </ul>
        </section>
        <section>
          <h2>PHẦN 4. CAM KẾT LIÊM CHÍNH HỌC THUẬT</h2>
          <p>Nhóm cam kết thực hiện đầy đủ 3 nguyên tắc liêm chính học thuật:</p>
          <ul className="academic-integrity-list">
            <li><strong>Không để AI làm thay toàn bộ:</strong> Nội dung cốt lõi do sinh viên nghiên cứu từ giáo trình, văn kiện Đảng.</li>
            <li><strong>Phân định rõ AI output và phần sinh viên chỉnh sửa:</strong> AI chỉ tạo quiz/code, sinh viên chọn lọc, chỉnh sửa và hoàn thiện.</li>
            <li><strong>Đối chiếu nguồn chính thống:</strong> Mọi thông tin AI gợi ý đều được kiểm chứng bằng giáo trình LLCT và văn bản chính thức.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AIUsageScreen;