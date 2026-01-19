import React, { useEffect } from "react";
import "./VietnameseIdeologyScreen.css";

const VietnameseIdeologyScreen = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="ideology-container">
      <button
        className="back-button"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          onBack();
        }}
      >
        ⬅️ Quay lại Lobby
      </button>
      <h1>Tư Tưởng Hồ Chí Minh Về Đảng Cộng Sản Việt Nam</h1>
      <div className="ideology-content">
        <section className="quote-section">
          <blockquote className="main-quote">
            "Đảng có vững thì cách mệnh mới thành công, cũng như người cầm lái
            có vững thuyền mới chạy."
          </blockquote>
        </section>

        <section>
          <h2>1. Bối cảnh và vấn đề đặt ra</h2>
          <p>
            Trong tiến trình cách mạng Việt Nam, Hồ Chí Minh khẳng định lực
            lượng của giai cấp công nhân và nhân dân lao động là rất lớn. Tuy
            nhiên, để biến sức mạnh đó thành thắng lợi cách mạng, cần có một tổ
            chức lãnh đạo đủ bản lĩnh, trí tuệ và đạo đức.
          </p>
          <p>Từ đó, Người nhấn mạnh luận điểm cốt lõi:</p>
          <p className="highlight">
            "Đảng có vững thì cách mệnh mới thành công, cũng như người cầm lái
            có vững thuyền mới chạy."
          </p>
          <p>
            Luận điểm này đặt ra một vấn đề trung tâm:
            <br />
            <em>
              Vì sao Đảng phải vững mạnh và "vững" được hiểu là vững ở những
              phương diện nào để đảm bảo thắng lợi cách mạng?
            </em>
          </p>
        </section>

        <section>
          <h2>2. Nội dung tư tưởng: "Đảng có vững" nghĩa là gì?</h2>
          <p>
            Theo tư tưởng Hồ Chí Minh, "Đảng có vững" trước hết là Đảng trong
            sạch, vững mạnh, được thể hiện trên 3 phương diện chính:
          </p>

          <div className="sub-section">
            <h3>2.1. Vững về mục tiêu và lý tưởng</h3>
            <ul>
              <li>
                Đảng phải kiên định mục tiêu lớn: lãnh đạo đấu tranh giải phóng
                dân tộc, giải phóng xã hội, giải phóng giai cấp, giải phóng con
                người.
              </li>
              <li>
                Vì vậy, cương lĩnh, đường lối, chủ trương và mọi hoạt động thực
                tiễn của Đảng phải hướng về lợi ích của nhân dân và dân tộc.
              </li>
            </ul>
          </div>

          <div className="sub-section">
            <h3>2.2. Vững về đạo đức và văn minh</h3>
            <p>Hồ Chí Minh khẳng định:</p>
            <p className="highlight">"Đảng ta là đạo đức, là văn minh."</p>
            <p>Điều đó thể hiện ở:</p>
            <ul>
              <li>
                Hoàn thành sứ mệnh lịch sử do nhân dân giao phó: giành độc lập
                và đem lại tự do, ấm no, hạnh phúc cho nhân dân
              </li>
              <li>
                Đội ngũ đảng viên là những chiến sĩ tiên phong, gương mẫu trong
                công tác và đời sống
              </li>
              <li>Quan hệ quốc tế trong sáng vì hòa bình, hữu nghị, hợp tác</li>
              <li>
                Hoạt động trong khuôn khổ Hiến pháp và pháp luật; Đảng không
                đứng trên dân tộc, không đứng trên nhân dân
              </li>
              <li>
                Là tổ chức tiêu biểu cho lương tâm, trí tuệ và danh dự của dân
                tộc
              </li>
            </ul>
          </div>

          <div className="sub-section">
            <h3>2.3. Vững về tổ chức và nguyên tắc hoạt động</h3>
            <p>
              Một Đảng cách mạng chân chính phải giữ vững các nguyên tắc cơ bản:
            </p>
            <ul>
              <li>
                <strong>Tập trung dân chủ:</strong> dân chủ là nền tảng, tập
                trung là kết quả; tránh độc đoán chuyên quyền hoặc dựa dẫm tập
                thể
              </li>
              <li>
                <strong>Tự phê bình và phê bình:</strong> là việc làm thường
                xuyên, "như mỗi ngày phải rửa mặt"; trung thực, đúng người đúng
                việc, có văn hóa
              </li>
              <li>
                <strong>Kỷ luật nghiêm minh, tự giác:</strong> sức mạnh của Đảng
                bắt nguồn từ kỷ luật; thống nhất tư tưởng và hành động
              </li>
              <li>
                <strong>Thường xuyên tự chỉnh đốn:</strong> Đảng không có mục
                đích tự thân; không phải tổ chức để làm quan phát tài; tự chỉnh
                đốn là nhiệm vụ quan trọng
              </li>
              <li>
                <strong>Đoàn kết, thống nhất trong Đảng:</strong> đặc biệt trong
                cấp ủy và cán bộ chủ chốt; dựa trên nền tảng Mác–Lênin và đường
                lối của Đảng
              </li>
              <li>
                <strong>Liên hệ mật thiết với nhân dân:</strong> Đảng là bộ phận
                của dân tộc; quan hệ Đảng – Nhân dân là quan hệ máu thịt
              </li>
              <li>
                <strong>Đoàn kết quốc tế:</strong> xuất phát từ tính chất quốc
                tế của giai cấp công nhân; cách mạng Việt Nam là bộ phận của
                cách mạng thế giới
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2>
            3. Ý nghĩa của luận điểm: Vì sao "Đảng vững" thì cách mạng mới thành
            công?
          </h2>
          <p>
            Luận điểm "Đảng có vững…" khẳng định vai trò quyết định của Đảng ở 3
            điểm:
          </p>
          <ul>
            <li>
              <strong>Định hướng đúng mục tiêu:</strong> đảm bảo cách mạng không
              chệch hướng trước khó khăn, thử thách
            </li>
            <li>
              <strong>Tổ chức và quy tụ lực lượng:</strong> biến sức mạnh quần
              chúng thành sức mạnh hành động có tổ chức
            </li>
            <li>
              <strong>Giữ vững niềm tin của nhân dân:</strong> Đảng mạnh khi gắn
              bó với dân; mất dân là mất tất cả
            </li>
          </ul>
          <p className="important-note">Nói cách khác, nếu Đảng không vững:</p>
          <ul>
            <li>nội bộ dễ rạn nứt</li>
            <li>kỷ luật lỏng lẻo</li>
            <li>xa rời nhân dân</li>
          </ul>
          <p className="conclusion">
            ➜ phong trào cách mạng suy yếu và thất bại.
          </p>
        </section>

        <section>
          <h2>4. Liên hệ thực tiễn hiện nay</h2>
          <p>
            Trong bối cảnh hiện đại, tư tưởng Hồ Chí Minh về xây dựng Đảng vẫn
            giữ nguyên giá trị. Thực tiễn cho thấy:
          </p>
          <ul>
            <li>
              xây dựng Đảng trong sạch, vững mạnh là điều kiện để đất nước phát
              triển bền vững
            </li>
            <li>
              việc giữ vững kỷ luật, đạo đức, tinh thần tự chỉnh đốn có ý nghĩa
              quyết định trong phòng chống suy thoái và tiêu cực
            </li>
            <li>
              mối quan hệ mật thiết với nhân dân tiếp tục là nền tảng tạo nên
              sức mạnh và tính chính danh của Đảng
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Kết luận</h2>
          <p>Tư tưởng Hồ Chí Minh:</p>
          <p className="highlight">
            "Đảng có vững thì cách mệnh mới thành công…"
          </p>
          <p>
            là một nguyên lý có giá trị lý luận và thực tiễn sâu sắc. "Đảng
            vững" không phải là khẩu hiệu, mà là yêu cầu toàn diện về:
          </p>
          <ul>
            <li>mục tiêu lý tưởng</li>
            <li>đạo đức – văn minh</li>
            <li>tổ chức – nguyên tắc – kỷ luật</li>
            <li>gắn bó với nhân dân và đoàn kết quốc tế</li>
          </ul>
          <p className="final-note">
            Chỉ khi Đảng giữ vững những nền tảng đó, cách mạng và sự nghiệp xây
            dựng đất nước mới có thể đi tới thắng lợi.
          </p>
        </section>
      </div>
    </div>
  );
};

export default VietnameseIdeologyScreen;
