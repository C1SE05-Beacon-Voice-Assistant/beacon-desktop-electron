const guide = {
  introduction:
    "Giới thiệu: Beacon là ứng dụng trợ lý ảo được tạo ra với mục đích hỗ trợ người khiếm thị trong việc sử dụng máy tính cá nhân một cách dễ dàng. Với Beacon, ứng dụng sẽ giúp người khiếm thị truy cập internet để nghe nhạc và đọc báo một cách thuận tiện và thoải mái.",

  requirements:
    "Yêu cầu: Để có trải nghiệm tốt nhất, bạn nên có micro hoặc ở một nơi yên tĩnh để Beacon có thể nhận diện giọng nói và lọc tạp âm hiệu quả nhất. Máy tính cần được kết nối với internet.",

  play_music: `Để phát nhạc hãy nói Phát nhạc hoặc Nghe nhạc kèm tên bài hát. 
  Ví dụ: Phát bài hát Anh nhớ em người yêu cũ 
  Beacon sẽ tìm và phát bài hát Anh nhớ em người yêu cũ cho bạn. 
  Để dừng nội dung đang phát, hãy nói Dừng hoặc Tạm dừng. 
  Để tiếp tục phát nội dung sau khi đã tạm dừng, hãy nói Tiếp tục hoặc Phát tiếp.
  Để chuyển sang nội dung tiếp theo, hãy nói Nội dung tiếp theo hoặc Bài tiếp theo`,

  control_vol: `Để tăng âm lượng, hãy nói Tăng âm lượng hoặc Tăng tiếng. 
  Để giảm âm lượng, hãy nói Giảm âm lượng hoặc Giảm tiếng. 
  Để đặt âm lượng thành nhỏ nhất, hãy nói Âm lượng nhỏ nhất hoặc Tắt tiếng.
  Để đặt âm lượng thành lớn nhất, hãy nói Âm lượng lớn nhất hoặc Bật tiếng. 
  Để tắt tiếng, hãy nói Tắt tiếng hoặc Mất tiếng. 
  Để bật tiếng sau khi đã tắt tiếng, hãy nói Bật tiếng hoặc Quay lại tiếng. 
  Để đặt mức âm lượng mong muốn, hãy nói Đặt âm lượng kèm theo số lượng. Ví dụ: Đặt âm lượng 20`,

  read_news: `Để tìm tin tức nóng nhất hãy sử dụng những từ như tin tức, bản tin kèm theo nóng nhất hoặc nóng hổi nhất. 
  Ví dụ: Những tin tức gây sốt đang diễn ra hiện tại. 
  Để tìm tin tức mới nhất hãy sử dụng những từ như tin tức, bản tin kèm theo từ những từ như mới nhất hoặc gần đây. 
  Ví dụ: Tìm những bản tin mới nhất. 
  Để tìm tin tức được đọc nhiều nhất bằng cách sử dụng từ như tin tức, bản tin kèm theo từ :được đọc nhiều nhất. 
  Ví dụ: Tìm những bài báo được đọc nhiều nhất.
  Để tìm kiếm tin tức theo từ khóa hãy nói sử dụng những từ như tin tức, bản tin kèm theo từ khóa mà bạn muốn tìm kiếm. 
  Ví dụ: Tìm tin tức về đội tuyển bóng đá Việt Nam
  Kết quả của những lệnh trên sẽ là 1 danh sách bài báo gồm nhiều nhất 3 bài.
  Để chọn 1 trong danh sách bài báo để đọc hãy nói: Đọc bài báo kèm với số thứ tự. Ví dụ: Đọc bài báo số 1
  `,
};

module.exports = {
  guide,
};
