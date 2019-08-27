const mongoose = require('mongoose');

const { Schema } = mongoose;    //비구조화 할당으로 꺼내옴
const { Types: ObjectId } = Schema;
const commentSchema = new Schema({
    commenter: {
        type: ObjectId,
        required: true,
        ref: 'User',    // User스키마의 id를 사용하겠다
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// type: 자료형, required: 필수여부, unique: 고유여부, default: 기본값
// _id 작성자 댓글내용 생성일

module.exports = mongoose.model('Comment', commentSchema);
// mongoose.model(모델명, 스키마, 컬렉션명)