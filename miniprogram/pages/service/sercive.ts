
import { Topic, TopicType } from "./default-datas";



export class AppSercive {

  static GlobalTopics:Topic[] = [];

 static getTopicType():TopicType[]{
      return require('./default-datas').topicType;
  }

  static getTopicDatas():Topic[]{
    return require('./default-datas').dataJson;
  }

  // //通过id获取整个 topic
  // static getTopicById(topics:Topic[], topicId:string):Topic|undefined{
    
  //   return tempTopic;
  // }


}