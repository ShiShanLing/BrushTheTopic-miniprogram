import { Topic } from "../assets/default-datas";
import { TopicType } from "./default-datas";

export class AppSercive {

 static getTopicType():TopicType[]{
      return require('./default-datas').topicType;
  }

  static getTopicDatas():Topic[]{
    return require('./default-datas').dataJson;
  }

}