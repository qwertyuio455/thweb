document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("button[onclick='showSurvey()']").addEventListener("click", showSurvey);
    document.getElementById("surveyForm").addEventListener("submit", submitSurvey);
});

function showSurvey() {
    const fullName = document.getElementById("fullName").value;
    const cccd = document.getElementById("cccd").value;
    const address = document.getElementById("address").value;
    const dobInputs = document.querySelectorAll("#dob input");
    
    if (!fullName || !cccd || !address || !dobInputs[0].value || !dobInputs[1].value || !dobInputs[2].value) {
        alert("Vui lòng nhập đầy đủ thông tin cá nhân!");
        return;
    }
    
    document.getElementById("surveyContainer").style.display = "block";
    document.getElementById("result").style.display = "none";
    generateSurvey();
}

const surveyData = [
    // Nhóm 1: Đúng/Sai
    { type: "trueFalse", question: "Máu được chia thành bốn nhóm chính: A, B, AB và O.", correct: "true" },
    { type: "trueFalse", question: "Một người nhóm máu O có thể nhận máu từ bất kỳ nhóm máu nào.", correct: "false" },
    { type: "trueFalse", question: "Hiến máu thường xuyên có thể giúp cơ thể tạo ra máu mới.", correct: "true" },
    { type: "trueFalse", question: "Người hiến máu phải trên 18 tuổi và có sức khỏe tốt.", correct: "true" },
    { type: "trueFalse", question: "Hiến máu có thể làm suy giảm miễn dịch của cơ thể.", correct: "false" },
    { type: "trueFalse", question: "Phụ nữ mang thai có thể tham gia hiến máu nếu đủ điều kiện sức khỏe.", correct: "false" },
    { type: "trueFalse", question: "Hiến máu có thể giúp giảm nguy cơ mắc bệnh tim mạch.", correct: "true" },
    { type: "trueFalse", question: "Một lần hiến máu tiêu chuẩn thường lấy khoảng 250ml máu.", correct: "false" },
    { type: "trueFalse", question: "Người có hình xăm vẫn có thể hiến máu nếu đã xăm hơn 6 tháng.", correct: "true" },
    { type: "trueFalse", question: "Hiến máu có thể gây nghiện vì cơ thể mất đi một lượng máu.", correct: "false" },


    // Nhóm 2: Chọn 1 trong 4 đáp án
    {
        type: "multipleChoice",
        question: "Tần suất tối đa mà nam giới có thể hiến máu toàn phần là bao lâu?",
        options: ["3 tháng/lần", "6 tháng/lần", "9 tháng/lần", "12 tháng/lần"],
        correct: "3 tháng/lần"
      },
      {
        type: "multipleChoice",
        question: "Nhóm máu nào được xem là nhóm máu 'cho phổ biến'?",
        options: ["A", "B", "AB", "O"],
        correct: "O"
      },
      {
        type: "multipleChoice",
        question: "Thành phần chính nào của máu giúp đông máu?",
        options: ["Hồng cầu", "Tiểu cầu", "Bạch cầu", "Huyết tương"],
        correct: "Tiểu cầu"
      },
      {
        type: "multipleChoice",
        question: "Lượng máu tối đa mà một người có thể hiến trong một lần là bao nhiêu?",
        options: ["150ml", "250ml", "450ml", "550ml"],
        correct: "450ml"
      },
      {
        type: "multipleChoice",
        question: "Hiến máu có thể giúp phát hiện bệnh nào sau đây?",
        options: ["Bệnh tim mạch", "Viêm gan B", "Đau dạ dày", "Viêm khớp"],
        correct: "Viêm gan B"
      },
      {
        type: "multipleChoice",
        question: "Sau khi hiến máu, người hiến máu nên làm gì?",
        options: ["Uống nhiều nước", "Hạn chế vận động mạnh", "Nghỉ ngơi đủ", "Tất cả các ý trên"],
        correct: "Tất cả các ý trên"
      },
      {
        type: "multipleChoice",
        question: "Ai KHÔNG đủ điều kiện hiến máu?",
        options: ["Người bị thiếu máu nặng", "Người có huyết áp ổn định", "Người tập thể dục thường xuyên", "Người có cân nặng trên 50kg"],
        correct: "Người bị thiếu máu nặng"
      },
      {
        type: "multipleChoice",
        question: "Lợi ích sức khỏe nào sau đây không liên quan đến hiến máu?",
        options: ["Giảm nguy cơ đột quỵ", "Giảm cân nhanh chóng", "Giảm sắt dư thừa trong cơ thể", "Kích thích tủy xương sản xuất máu mới"],
        correct: "Giảm cân nhanh chóng"
      },
      {
        type: "multipleChoice",
        question: "Bao lâu sau khi hiến máu thì cơ thể sẽ bù đắp lại lượng máu đã hiến?",
        options: ["1 ngày", "1 tuần", "1 tháng", "3 tháng"],
        correct: "1 tuần"
      },
      {
        type: "multipleChoice",
        question: "Cơ quan nào chịu trách nhiệm tiếp nhận và phân phối máu tại Việt Nam?",
        options: ["Viện Huyết học - Truyền máu Trung ương", "Bộ Y tế", "Hội Chữ thập đỏ Việt Nam", "Bệnh viện Bạch Mai"],
        correct: "Viện Huyết học - Truyền máu Trung ương"
      },
   
    // Nhóm 3: Chọn nhiều đáp án
    {
        type: "multiSelect",
        question: "Những ai có thể tham gia hiến máu?",
        options: [
          "Người từ 18 - 60 tuổi",
          "Người có cân nặng trên 45kg",
          "Người có huyết áp ổn định",
          "Người đang mắc bệnh cảm cúm"
        ],
        correct: ["Người từ 18 - 60 tuổi", "Người có cân nặng trên 45kg", "Người có huyết áp ổn định"]
      },
      {
        type: "multiSelect",
        question: "Những yếu tố nào ảnh hưởng đến khả năng hiến máu?",
        options: [
          "Cân nặng",
          "Tình trạng sức khỏe",
          "Tiền sử bệnh lý",
          "Chiều cao"
        ],
        correct: ["Cân nặng", "Tình trạng sức khỏe", "Tiền sử bệnh lý"]
      },
      {
        type: "multiSelect",
        question: "Người hiến máu cần tránh điều gì sau khi hiến?",
        options: [
          "Nghỉ ngơi",
          "Uống rượu bia",
          "Mang vác nặng",
          "Chơi thể thao cường độ cao"
        ],
        correct: ["Uống rượu bia", "Mang vác nặng", "Chơi thể thao cường độ cao"]
      },
      {
        type: "multiSelect",
        question: "Hiến máu giúp cơ thể cải thiện gì?",
        options: [
          "Tuần hoàn máu",
          "Giảm nguy cơ bệnh tim",
          "Làm cơ thể già đi nhanh hơn",
          "Sản sinh hồng cầu mới"
        ],
        correct: ["Tuần hoàn máu", "Giảm nguy cơ bệnh tim", "Sản sinh hồng cầu mới"]
      },
      {
        type: "multiSelect",
        question: "Những ai không được hiến máu?",
        options: [
          "Người bị viêm gan B",
          "Người đang mang thai",
          "Người vừa phẫu thuật",
          "Người có huyết áp bình thường"
        ],
        correct: ["Người bị viêm gan B", "Người đang mang thai", "Người vừa phẫu thuật"]
      },
      {
        type: "multiSelect",
        question: "Trước khi hiến máu, người hiến cần làm gì?",
        options: [
          "Nghỉ ngơi đầy đủ",
          "Ăn nhẹ, tránh đồ ăn nhiều dầu mỡ",
          "Uống đủ nước",
          "Uống rượu bia"
        ],
        correct: ["Nghỉ ngơi đầy đủ", "Ăn nhẹ, tránh đồ ăn nhiều dầu mỡ", "Uống đủ nước"]
      },
      {
        type: "multiSelect",
        question: "Hiến máu có tác dụng gì đối với xã hội?",
        options: [
          "Cung cấp máu cho người bệnh cần truyền máu",
          "Góp phần cứu sống nhiều người",
          "Nâng cao ý thức cộng đồng về sức khỏe",
          "Làm giảm dân số"
        ],
        correct: ["Cung cấp máu cho người bệnh cần truyền máu", "Góp phần cứu sống nhiều người", "Nâng cao ý thức cộng đồng về sức khỏe"]
      },
      {
        type: "multiSelect",
        question: "Tần suất hiến máu hợp lý đối với một người khỏe mạnh là bao lâu một lần?",
        options: [
          "Nam giới: cách nhau ít nhất 12 tuần",
          "Nữ giới: cách nhau ít nhất 16 tuần",
          "Hiến máu hàng tuần",
          "Không giới hạn số lần hiến"
        ],
        correct: ["Nam giới: cách nhau ít nhất 12 tuần", "Nữ giới: cách nhau ít nhất 16 tuần"]
      },
      {
        type: "multiSelect",
        question: "Những điều cần lưu ý sau khi hiến máu?",
        options: [
          "Nghỉ ngơi tại chỗ ít nhất 10-15 phút",
          "Uống nhiều nước để cơ thể hồi phục",
          "Tránh thức khuya, làm việc quá sức",
          "Tập thể dục cường độ cao ngay lập tức"
        ],
        correct: ["Nghỉ ngơi tại chỗ ít nhất 10-15 phút", "Uống nhiều nước để cơ thể hồi phục", "Tránh thức khuya, làm việc quá sức"]
      },
      {
        type: "multiSelect",
        question: "Những lợi ích lâu dài của hiến máu đối với sức khỏe là gì?",
        options: [
          "Giúp giảm sắt dư thừa trong cơ thể",
          "Cải thiện lưu thông máu",
          "Giảm nguy cơ mắc bệnh tim mạch",
          "Gây suy nhược cơ thể"
        ],
        correct: ["Giúp giảm sắt dư thừa trong cơ thể", "Cải thiện lưu thông máu", "Giảm nguy cơ mắc bệnh tim mạch"]
      },
   
    // Nhóm 4: Tự luận
    { type: "essay", question: "Bạn có từng hiến máu chưa? Nếu có, hãy mô tả trải nghiệm của bạn." },
    { type: "essay", question: "Theo bạn, những lợi ích lớn nhất của việc hiến máu là gì?" },
    { type: "essay", question: "Bạn nghĩ gì về việc tổ chức các ngày hội hiến máu thường xuyên?" },
    { type: "essay", question: "Nếu bạn chưa từng hiến máu, điều gì khiến bạn còn do dự?" },
    { type: "essay", question: "Hãy chia sẻ một câu chuyện về hiến máu mà bạn biết." },
    { type: "essay", question: "Làm thế nào để khuyến khích mọi người tham gia hiến máu?" },
    { type: "essay", question: "Theo bạn, tại sao hiến máu lại quan trọng đối với cộng đồng?" },
    { type: "essay", question: "Bạn có đề xuất gì để cải thiện quy trình hiến máu tại Việt Nam?" },
    { type: "essay", question: "Hãy mô tả cảm giác của bạn sau khi hiến máu." },
    { type: "essay", question: "Nếu có cơ hội, bạn có sẵn sàng trở thành người hiến máu thường xuyên không? Tại sao?" },
];


function generateSurvey() {
    const questionsContainer = document.getElementById("questions");
    questionsContainer.innerHTML = "";

    surveyData.forEach((item, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const label = document.createElement("label");
        label.textContent = `${index + 1}. ${item.question}`;
        questionDiv.appendChild(label);

        if (item.type === "trueFalse" || item.type === "multipleChoice") {
            item.options = item.options || ["true", "false"];
            item.options.forEach(option => {
                questionDiv.innerHTML += `<br><label><input type='radio' name='q${index}' value='${option}'> ${option}</label>`;
            });
        } else if (item.type === "multiSelect") {
            item.options.forEach(option => {
                questionDiv.innerHTML += `<br><label><input type='checkbox' name='q${index}' value='${option}'> ${option}</label>`;
            });
        } else if (item.type === "essay") {
            questionDiv.innerHTML += `<br><label><input type='text' name='q${index}' style='width: 100%;'></label>`;
        }

        questionsContainer.appendChild(questionDiv);
    });
}

function submitSurvey(event) {
    event.preventDefault();

    // Ẩn toàn bộ phần container chứa thông tin cá nhân và khảo sát
    document.querySelector('.container').classList.add('hidden');
    
    // Hiển thị phần kết quả
    let resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');
    resultDiv.style.display = 'block'; // Đảm bảo hiển thị
    
    resultDiv.innerHTML = '<h2>Kết quả khảo sát</h2><p>Cảm ơn bạn đã tham gia khảo sát!</p>';
    
    let answers = new FormData(document.getElementById('surveyForm'));
    let answerList = '<ul>';
    let index = 1; // Bắt đầu từ 1
    answers.forEach((value, key) => {
        answerList += `<li>Câu ${index}: ${value}</li>`;
        index++; // Tăng số thứ tự lên 1
    });
    answerList += '</ul>';
    resultDiv.innerHTML += answerList;
}
