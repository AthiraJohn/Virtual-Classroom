export class classModel{
    constructor(
        public _id:String,
        public className:String,
        public classCode:String,
        public Teacher:String,
        public description:String,
        public Notes:[{topic:String,content:String}],
        public Assignments:[{title:String,content:String}]
    ){}
}