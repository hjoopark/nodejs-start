const mongoose = require('mongoose');

const { Schema } = mongoose;    //비구조화 할당으로 꺼내옴
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    married: {
        type: Boolean,
        required: true,
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now,

    },
});
// type: 자료형, required: 필수여부, unique: 고유여부, default: 기본값
// _id 이름 나이 결혼여부 자기소개 생성일

module.exports = mongoose.model('User', userSchema);
