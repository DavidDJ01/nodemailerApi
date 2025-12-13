const express = require("express")
const nodeMailer = require("nodemailer")

const route = express.Router()

route.get("/checkAccount", (req, res, next) => {
    res.send({
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS ? "Có pass" : "Không có pass"
    });
})


route.get("/invte", (req, res, next) => {
    res.send(" Welcome to my team! (^-^)")
})

route.post("/sendmailer", async (req, res, next) => {
    var guest = {
        email: req.body.gmail,
        hoTen: req.body.hoTen,
        sdt: req.body.sdt
    }



    var transporter = nodeMailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    await new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error)
                reject(error)
            } else {
                console.log("Server is ready to take our message")
                resolve(success)
            }
        })
    })

    const mailData = {
        from: "yen29012006@gmail.com",
        to: `chidao1080@gmail.com`,
        subject: "Thông tin học viên đăng ký",
        text: " send message",
        html: `<table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <tr>
        <td style="max-width: 600px; margin: 0 auto; background: #ffffff; padding: 20px; border-radius: 6px;">

            <h2 style="font-size: 20px; margin-bottom: 15px; color: #333;">
                Halo Center thân mến,
            </h2>

            <p style="font-size: 15px; line-height: 1.6; color: #444;">
                Hệ thống vừa tiếp nhận một tín hiệu mới đầy tích cực từ website – 
                một học viên đã chủ động gửi thông tin và bày tỏ mong muốn đồng hành cùng Halo 
                trên chặng đường chinh phục tiếng Anh.  
                <br><br>
                Dưới đây là toàn bộ thông tin mà học viên đã gửi:
            </p>

            <!-- Thông tin học viên -->
            <table width="100%" cellpadding="8" cellspacing="0" style="background: #fafafa; border: 1px solid #ddd; border-radius: 4px; margin: 15px 0;">
                <tr>
                    <td style="font-size: 14px; color: #333; font-weight: bold;">Email:</td>
                    <td style="font-size: 14px; color: #0066ff; font-weight: bold;">
                        ${guest.email}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 14px; color: #333; font-weight: bold;">Họ và tên:</td>
                    <td style="font-size: 14px; color: #0066ff; font-weight: bold;">
                        ${guest.hoTen}
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 14px; color: #333; font-weight: bold;">Số điện thoại:</td>
                    <td style="font-size: 14px; color: #0066ff; font-weight: bold;">
                        ${guest.sdt}
                    </td>
                </tr>
            </table>

            <p style="font-size: 15px; line-height: 1.6; color: #444;">
                Khóa học quan tâm:  
                <br><br>

                Vui lòng kiểm tra và liên hệ học viên trong thời gian sớm nhất.  
                <br><br>
                Chúc đội ngũ một ngày làm việc thuận lợi và mang lại thêm nhiều giá trị cho học viên.
                <br><br>
                Trân trọng,
                <br>
                <strong>Prime Aura</strong>
            </p>

        </td>
    </tr>
</table>
`
    }

    await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err, info) => {
          
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log(info)
                resolve(info)
            }
        })
    })

    res.status(200).json({status : "Oke"})

})

module.exports = route