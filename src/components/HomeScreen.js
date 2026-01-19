import React, { useEffect, useRef, useState } from 'react';
import './HomeScreen.css';

function HomeScreen() {
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef([]);

  const sections = [
    {
      id: 1,
      title: 'Bối cảnh và vấn đề đặt ra',
      image: '/images/chuong1.jpg',
      subtitle: 'Nền tảng tư tưởng',
      description:
        'Trong tiến trình cách mạng Việt Nam, sức mạnh quần chúng là rất lớn; để biến sức mạnh đó thành thắng lợi cần một tổ chức lãnh đạo đủ bản lĩnh, trí tuệ và đạo đức. "Đảng có vững thì cách mệnh mới thành công, cũng như người cầm lái có vững thuyền mới chạy."',
      details: [
        'Lực lượng của giai cấp công nhân và nhân dân lao động rất lớn',
        'Cần có tổ chức lãnh đạo đủ bản lĩnh, trí tuệ và đạo đức',
        'Vấn đề trung tâm: Vì sao Đảng phải vững mạnh và “vững” ở phương diện nào?'
      ]
    },
    {
      id: 2,
      title: '“Đảng có vững” nghĩa là gì?',
      image: '/images/chuong2.jpg',
      subtitle: 'Ba phương diện',
      description:
        'Đảng trong sạch, vững mạnh thể hiện trên 3 phương diện: mục tiêu lý tưởng; đạo đức – văn minh; tổ chức – nguyên tắc.',
      details: [
        'Vững mục tiêu và lý tưởng: kiên định mục tiêu giải phóng dân tộc, xã hội, giai cấp, con người; mọi đường lối vì nhân dân và dân tộc',
        'Vững đạo đức và văn minh: “Đảng ta là đạo đức, là văn minh”; gương mẫu, hữu nghị, hoạt động trong khuôn khổ Hiến pháp và pháp luật',
        'Vững tổ chức và nguyên tắc: kỷ luật nghiêm, thống nhất tư tưởng và hành động; cơ chế vận hành dựa trên nguyên tắc cách mạng'
      ]
    },
    {
      id: 3,
      title: 'Nguyên tắc hoạt động của Đảng cách mạng chân chính',
      image: '/images/chuong3.jpg',
      subtitle: '7 nguyên tắc',
      description:
        'Các nguyên tắc cốt lõi bảo đảm sức mạnh và sự trong sạch của Đảng.',
      details: [
        'Tập trung dân chủ: dân chủ là nền tảng, tập trung là kết quả',
        'Tự phê bình và phê bình: thường xuyên, trung thực, đúng người đúng việc, có văn hóa',
        'Kỷ luật nghiêm minh, tự giác: sức mạnh bắt nguồn từ kỷ luật; thống nhất tư tưởng và hành động',
        'Thường xuyên tự chỉnh đốn: Đảng không có mục đích tự thân; chống quan liêu, cơ hội',
        'Đoàn kết, thống nhất trong Đảng: đặc biệt trong cấp ủy và cán bộ chủ chốt',
        'Liên hệ mật thiết với nhân dân: mối quan hệ máu thịt Đảng – Nhân dân',
        'Đoàn kết quốc tế: tính chất quốc tế của giai cấp công nhân; cách mạng Việt Nam là bộ phận của cách mạng thế giới'
      ]
    },
    {
      id: 4,
      title: 'Ý nghĩa của luận điểm “Đảng có vững…”',
      image: '/images/chuong4.jpg',
      subtitle: 'Vai trò quyết định',
      description:
        'Vì sao Đảng vững thì cách mạng mới thành công.',
      details: [
        'Định hướng đúng mục tiêu: đảm bảo cách mạng không chệch hướng trước khó khăn, thử thách',
        'Tổ chức và quy tụ lực lượng: biến sức mạnh quần chúng thành sức mạnh hành động có tổ chức',
        'Giữ vững niềm tin của nhân dân: Đảng mạnh khi gắn bó với dân; mất dân là mất tất cả',
        'Nếu Đảng không vững: nội bộ rạn nứt, kỷ luật lỏng lẻo, xa rời nhân dân – phong trào suy yếu và thất bại'
      ]
    },
    {
      id: 5,
      title: 'Liên hệ thực tiễn và kết luận',
      image: '/images/chuong5.jpg',
      subtitle: 'Giá trị hiện nay',
      description:
        'Tư tưởng Hồ Chí Minh về xây dựng Đảng giữ nguyên giá trị; “Đảng vững” là yêu cầu toàn diện.',
      details: [
        'Xây dựng Đảng trong sạch, vững mạnh là điều kiện để đất nước phát triển bền vững',
        'Giữ vững kỷ luật, đạo đức, tinh thần tự chỉnh đốn để phòng chống suy thoái và tiêu cực',
        'Mối quan hệ mật thiết với nhân dân tạo nên sức mạnh và tính chính danh của Đảng',
        'Kết luận: Đảng vững về mục tiêu, đạo đức – văn minh, tổ chức – nguyên tắc – kỷ luật; gắn bó với nhân dân và đoàn kết quốc tế'
      ]
    }
  ];

  // Intersection observer for scroll animations
  useEffect(() => {
    // Make first two sections visible immediately
    setVisibleSections(new Set(['1', '2']));
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.sectionId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px 0px 0px 0px' }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="home-screen">
      {/* Navigation Dots */}
      <div className="nav-dots">
        {sections.map((section, index) => (
          <button
            key={section.id}
            className={`nav-dot ${visibleSections.has(String(section.id)) ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            title={section.title}
          >
            <span className="dot-label">{section.subtitle}</span>
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-bg-pattern"></div>
        <div className="hero-content">
          <div className="hero-badge">HCM202</div>
          <h1 className="hero-title">Tư Tưởng Hồ Chí Minh</h1>
          <h2 className="hero-subtitle">Về Đảng Cộng Sản Việt Nam</h2>
          <div className="hero-divider"></div>
          <p className="hero-quote">
            "Đảng có vững thì cách mệnh mới thành công,<br/>
            cũng như người cầm lái có vững thuyền mới chạy."
          </p>
          <div className="scroll-indicator">
            <span>Cuộn xuống</span>
            <div className="scroll-arrow"></div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </div>

      {/* Content Sections */}
      <div className="sections-container">
        {sections.map((section, index) => (
          <div 
            key={section.id} 
            className={`section-card ${visibleSections.has(String(section.id)) ? 'visible' : ''}`}
            ref={(el) => (sectionRefs.current[index] = el)}
            data-section-id={section.id}
          >
            <div className="section-number">
              <span className="number-text">{section.id}</span>
              <span className="number-total">/5</span>
            </div>
            
            <div className="section-image-wrapper">
              <img 
                src={section.image} 
                alt={section.title}
                className="section-image"
              />
              <div className="section-overlay"></div>
            </div>

            <div className="section-info">
              <span className="section-badge">{section.subtitle}</span>
              <h3 className="section-title">{section.title}</h3>
              <p className="section-description">{section.description}</p>

              <div className="section-details show">
                <ul>
                  {section.details.map((detail, idx) => (
                    <li key={idx}>
                      <span className="detail-number">{idx + 1}</span>
                      <span className="detail-text">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="summary-section">
        <div className="summary-content">
          <span className="summary-badge">Tổng kết</span>
          <h2>Đảng Vững - Một Nguyên Lý Toàn Diện</h2>
          <div className="summary-grid">
            <div className="summary-item">
              <div className="summary-icon-wrapper">
                <span className="summary-icon">🎯</span>
              </div>
              <h4>Mục tiêu Lý tưởng</h4>
              <p>Giải phóng dân tộc, xã hội, giai cấp, con người</p>
            </div>
            <div className="summary-item">
              <div className="summary-icon-wrapper">
                <span className="summary-icon">✨</span>
              </div>
              <h4>Đạo đức - Văn minh</h4>
              <p>Hoàn thành sứ mệnh lịch sử do nhân dân giao phó</p>
            </div>
            <div className="summary-item">
              <div className="summary-icon-wrapper">
                <span className="summary-icon">⚙️</span>
              </div>
              <h4>Tổ chức - Nguyên tắc</h4>
              <p>Kỷ luật, tập trung dân chủ, tự chỉnh đốn</p>
            </div>
            <div className="summary-item">
              <div className="summary-icon-wrapper">
                <span className="summary-icon">❤️</span>
              </div>
              <h4>Gắn bó Nhân dân</h4>
              <p>Quan hệ máu thịt giữa Đảng và nhân dân</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="footer-message">
        <p>
          Chỉ khi Đảng giữ vững những nền tảng đó, cách mạng và sự nghiệp xây dựng đất nước 
          mới có thể đi tới thắng lợi.
        </p>
      </div>
    </div>
  );
}

export default HomeScreen;
