//时间格式化
export function dateFormat(date:Date, option:string):string {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var week = date.getDay()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  
  function getWeek(n:number) {
    switch(n) {
      case 1:
        return '星期一'
      case 2:
        return '星期二'
      case 3:
        return '星期三'
      case 4:
        return '星期四'
      case 5:
        return '星期五'
      case 6:
        return '星期六'
      case 7:
        return '星期日'
        default:
        return ""
    }
  }
  //获取 年月日
  if (option == 'YY-MM-DD') return [year, month, day].map(formatNumber).join('-')
  //获取 年月
  if (option == 'YY-MM') return [year, month].map(formatNumber).join('-')

  //获取 年
  if (option == 'YY') return [year].map(formatNumber).toString()

  //获取 月
  if (option == 'MM') return  [mont].map(formatNumber).toString()

  //获取 日
  if (option == 'DD') return [day].map(formatNumber).toString()

  //获取 年月日 周一 至 周日
  if (option == 'YY-MM-DD Week')  return [year, month, day].map(formatNumber).join('-') + ' ' + getWeek(week)

  //获取 月日 周一 至 周日
  if (option == 'MM-DD Week')  return [month, day].map(formatNumber).join('-') + ' ' + getWeek(week)

  //获取 周一 至 周日
  if (option == 'Week')  return getWeek(week)

  //获取 时分秒
  if (option == 'hh-mm-ss') return [hour, minute, second].map(formatNumber).join(':')

  //获取 时分
  if (option == 'hh-mm') return [hour, minute].map(formatNumber).join(':')

  //获取 分秒
  if (option == 'mm-dd') return [minute, second].map(formatNumber).join(':')

  //获取 时
  if (option == 'hh')  return [hour].map(formatNumber).toString()

  //获取 分
  if (option == 'mm')  return [minute].map(formatNumber).toString()

  //获取 秒
  if (option == 'ss') return [second].map(formatNumber).toString()

  //默认 时分秒 年月日
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//时间字符串转时间戳
/**
 * 只支持 2023-03-31 这种
 * 
*/
export function dateStrFormatTimestamp(dateStr:string):number{
  var resData = dateStr.replace(/-/g, '/')
  return (new Date(resData)).getTime()
}
//时间戳转date字符串 
/**
 * 返回数据类型 2023-03-31
 * 
*/
// export function timestampFormatDateStr(timestamp:number):string{
  
  
//   return "";
// }
/*
let tempDate = new Date()
    var year = tempDate.getFullYear()
    var month = tempDate.getMonth() + 1
    var day = tempDate.getDate()
    var timeStr = `${year}-${month}-${day}`
    console.log(`timeStr==${timeStr}`);
    var resData = timeStr.replace(/-/g, '/')
    let timestamp = (new Date(resData)).getTime()
    console.log("timestamp==", timestamp);
    let nowTime = new Date(timestamp);
    console.log("又转换为时间戳==", nowTime);
    console.log("当前时间----", nowTime);
*/


  
export function base64_encode(str:string) {
  var c1, c2, c3;
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var i = 0, len = str.length, string = '';
 
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == len) {
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt((c1 & 0x3) << 4);
      string += "==";
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == len) {
      string += base64EncodeChars.charAt(c1 >> 2);
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      string += base64EncodeChars.charAt((c2 & 0xF) << 2);
      string += "=";
      break;
    }
    c3 = str.charCodeAt(i++);
    string += base64EncodeChars.charAt(c1 >> 2);
    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    string += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return string
}


export var Base64 = {

  // private property
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

  // public method for encoding
  , encode: function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = Base64._utf8_encode(input);

    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      }
      else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
    } // Whend 

    return output;
  } // End Function encode 


  // public method for decoding
  , decode: function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }

      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

    } // Whend 

    output = Base64._utf8_decode(output);

    return output;
  } // End Function decode 


  // private method for UTF-8 encoding
  , _utf8_encode: function (string) {
    var utftext = "";
    string = string.replace(/\r\n/g, "\n");

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    } // Next n 

    return utftext;
  } // End Function _utf8_encode 

  // private method for UTF-8 decoding
  , _utf8_decode: function (utftext) {
    var string = "";
    var i = 0;
    var c, c1, c2, c3;
    c = c1 = c2 = 0;

    while (i < utftext.length) {
      c = utftext.charCodeAt(i);

      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if ((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }

    } // Whend 

    return string;
  } // End Function _utf8_decode 

}
