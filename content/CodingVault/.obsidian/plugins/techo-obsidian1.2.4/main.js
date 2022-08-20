
var obsidian = require('obsidian');
//必要的预先定义的值
const DEFAULT_SETTINGS = {
    "weekStartDay": "周日",
    "backPattern":"网格",
    "svgWidth":200,
    "sumWidth":200,
    "sumHeight":300,
    "weatherWeekSum": true,
    "weekClassName": 'a',
    "weatherUseLine": true,
    "timeBarWidth": 10,
    "timeBarRadius":5,
    "timeBarLocated":0,
    "timeLineRadius":6,
    "timeLineWidth":4,
    "timeLineDash":"30,10",
    "timeLineLocated":10,
    "timeNoteWidth":170,
    "timeNoteLocated":15,
    "timeNoteRadius":4,
    "timeNoteStrokewidth":5,
    "timeNoteStrokeDash":"10,20",
    "showTodo":true,
    "showSchedule":true,
    "showNobill":true,
    "showBillLable":false,
    "showBillWidth":1000
};
// 必要的函数
// "1,3-8,10"=>1,3,4,5,6,7,8,10
function getNumberByString(str){
    var arr=str.split(',')
    var resultNumber=[]
    for(var i=0;i<arr.length;i++){
        if(/^\d+-\d+$/.test(arr[i])){
            var numbers=arr[i].match(/\d+/g).map(Number).sort()
            var starNumber=numbers[0]
            var endNumber=numbers[1]
            for(var j=starNumber;j<=endNumber;j++){
                resultNumber.push(j)
            }
        }else{
            resultNumber.push(Number(arr[i]))
        }
    }
    return resultNumber
}
// var str="1,3-8,10"
//接受一个数组，删除空值‘’
function filterarr(arr){
    if(Array.isArray(arr)){
        return arr.filter(word=> !word.match(/^\s*$/))
    }else{
        return []
    }
    
}

function timeLast(numberString1,numberString2,weatherNumber){
    starTimeCode=numberString1
    endTimeCode=numberString2
    var starTime=parseInt(starTimeCode.slice(0,2))*60+parseInt(starTimeCode.slice(2,4))
    var endTime=parseInt(endTimeCode.slice(0,2))*60+parseInt(endTimeCode.slice(2,4))
    var timeLastnumber=endTime-starTime
    var timeLast=timeLastnumber>=0?timeLastnumber:1440+timeLastnumber
    
    if(weatherNumber){
        return timeLast/60
    }else{
        var hours=parseInt(timeLast/60)
        var minutes=timeLast%60
        return Array(2-String(hours).length+1).join('0')+hours+Array(2-String(minutes).length+1).join('0')+minutes;
    }
}
//接受data字符串，返回一个数组，数组有12个元素，每个元素是每月待办的数组
function getMonthTodo(str){
    let months=[
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
    ]
    // [[0,月计划1],[0,月计划2],[1,月计划3]]
    let monthTodoReg=/#\s\d{1,2}[M|月]\n[^#]+/g
    let monthTodos=str.match(monthTodoReg)
    monthTodos=filterarr(monthTodos)
    
    // .replace(/\n#$/,'')
    for(var i=0;i<monthTodos.length;i++){
        // 获取月份字符串
        var monthStr=monthTodos[i].match(/#\s\d{1,2}[M|月]\n/i)[0]
        //获取月份数字
        var monthNumber=monthStr.match(/\d{1,2}/i)[0]

        //删掉每月月份字符串
        monthTodos[i]=monthTodos[i].replace(monthStr,"")
        //删掉每月月计划末尾的#
        monthTodos[i]=monthTodos[i].replace(/\n#$/,'')
        //根据 -[x]分割每月计划
        monthTodos[i]=monthTodos[i].split(/\n/)
        monthTodos[i]=filterarr(monthTodos[i])
        //将每项计划分割为状态码和字符串
        for(var j=0;j<monthTodos[i].length;j++){
            var todoArr=[]
            if(monthTodos[i][j].match(/^\s*-\s*\[\s*x\s*\]\s*/)){
                todoArr[0]=1
                todoArr[1]=monthTodos[i][j].replace(/^\s*-\s*\[\s*x\s*\]\s*/,'')
                monthTodos[i][j]=todoArr
            }else if(monthTodos[i][j].match(/^\s*-\s*\[\s*\]\s*/)){
                todoArr[0]=0
                todoArr[1]=monthTodos[i][j].replace(/^\s*-\s*\[\s*\]\s*/,'')
                monthTodos[i][j]=todoArr
            }else{
                console.log('这里出错了')
            }

        }
        months[monthNumber-1]=monthTodos[i]
    }
    return months
}
//接受周数、原始数据，返回该周的todo
function getThisWeekTodo(number,str){
    let weekTodoReg=new RegExp(('##\\s+'+number+'[W|周]\\n[^#]+'),'g') 
    let weekTodos=str.match(weekTodoReg)
    weekTodos=filterarr(weekTodos)
    let ThisWeekTodo=[]
    //对于拿到的每一个今日Todo字符串
    for(var i=0;i<weekTodos.length;i++){
        
        weekTodos[i]=weekTodos[i].replace(/^##\s+\d{1,2}[W|周]\n/,'')
        weekTodos[i]=weekTodos[i].replace(/\s*#/,'')
        weekTodos[i]=weekTodos[i].split(/\n/)
        weekTodos[i]=filterarr(weekTodos[i])
        for(var j=0;j<weekTodos[i].length;j++){
            var todoarr=[]
            //已完成
            if(weekTodos[i][j].match(/^\s*-\s*\[\s*x\s*\]\s*/)){
                todoarr[0]=1
                todoarr[1]=weekTodos[i][j].replace(/^\s*-\s*\[\s*x\s*\]\s*/,'')
                ThisWeekTodo.push(todoarr)
            //未完成
            }else if(weekTodos[i][j].match(/^\s*-\s*\[\s*\]\s*/)){
                todoarr[0]=0
                todoarr[1]=weekTodos[i][j].replace(/^\s*-\s*\[\s*\]\s*/,'')
                ThisWeekTodo.push(todoarr)
            }else{
                // console.log('这里出错了')
                // console.log(i,j,weekTodos[i][j])
            }
        }
        
        
    }
    return ThisWeekTodo
}

// 接受日期，返回这一天的todo,1/22 =>
function getThisDayTodo(dayStr,dataStr){
    let dayTodoReg=new RegExp('###\\s+'+dayStr+'\\s+[^#]+','g')
    let dayTodos=dataStr.match(dayTodoReg)
    dayTodos=filterarr(dayTodos)
    let thisDayTodo=[]
    //对于拿到的每一个今天数组元素 i：拿到的第i个今天的记录
    for(var i=0;i<dayTodos.length;i++){
        //去除日期
        dayTodos[i]=dayTodos[i].replace(/^###\s+\d{1,2}\/\d{1,2}[^\n]*/,'')
        dayTodos[i]=dayTodos[i].match(/-\s*\[\s*x?\s*\][^\n]*/g)
        dayTodos[i]=filterarr(dayTodos[i])
        //j：第j个记录
        for(var j=0;j<dayTodos[i].length;j++){
            var todoarr=[]
            if(dayTodos[i][j].match(/^\s*-\s*\[\s*x\s*\]\s*/)){
                todoarr[0]=1
                todoarr[1]=dayTodos[i][j].replace(/^\s*-\s*\[\s*x\s*\]\s*/,'')
                thisDayTodo.push(todoarr)
            }else if(dayTodos[i][j].match(/^\s*-\s*\[\s*\]\s*/)){
                todoarr[0]=0
                todoarr[1]=dayTodos[i][j].replace(/^\s*-\s*\[\s*\]\s*/,'')
                thisDayTodo.push(todoarr)
            }else{
                console.log('出错了')
            }
        }
    }
    return thisDayTodo
}

//接受日期返回这一天的log日志
//  ["0050", "0630", "0540", "a", "睡觉"]
// ["0720", "0830", "0110", "b", "吃饭"]
// ["0900", "1200", "0300", "w1", "工作项目1"]
function getThisDayLog(dayStr,data){
    let dayLogReg=new RegExp('###\\s+'+dayStr+'\\s+[^#]+','g')
    let dayLogs=data.match(dayLogReg)
    dayLogs=filterarr(dayLogs)
    let thisDayLog=[]
    //对于拿到的每一个今天数组元素 i：拿到的第i个今天的记录
    for(var i=0;i<dayLogs.length;i++){
        //去除日期
        dayLogs[i]=dayLogs[i].replace(/^###\s+\d{1,2}\/\d{1,2}[^\n]*/,'')
        dayLogs[i]=dayLogs[i].match(/\d{4}-\d{4}\s+[a-y][0-9]{0,2} [^\n]*/g)
        dayLogs[i]=filterarr(dayLogs[i])
        
        for(var j=0;j<dayLogs[i].length;j++){
            var thisLog=[]
            var thisLogTimeStrs=[]
            dayLogs[i][j]=dayLogs[i][j].split(/\s/)
            thisLogTimeStrs=dayLogs[i][j].shift().split(/-/)
            thisLog.push(thisLogTimeStrs[0])
            thisLog.push(thisLogTimeStrs[1])
            thisLog.push(timeLast(thisLogTimeStrs[0],thisLogTimeStrs[1],false))

            thisLog.push(dayLogs[i][j].shift())
            thisLog.push(dayLogs[i][j].join(' '))

            thisDayLog.push(thisLog)
        }
        
    }
    return thisDayLog
}
function getThisDaySchedule(dayStr,data){
    let dayLogReg=new RegExp('###\\s+'+dayStr+'\\s+[^#]+','g')
    let dayLogs=data.match(dayLogReg)
    dayLogs=filterarr(dayLogs)
    let thisDayLog=[]
    //对于拿到的每一个今天数组元素 i：拿到的第i个今天的记录
    for(var i=0;i<dayLogs.length;i++){
        //去除日期
        dayLogs[i]=dayLogs[i].replace(/^###\s+\d{1,2}\/\d{1,2}[^\n]*/,'')
        dayLogs[i]=dayLogs[i].match(/\d{4}-\d{4}\sz[0-9]? [^\n]*/g)
        dayLogs[i]=filterarr(dayLogs[i])
        for(var j=0;j<dayLogs[i].length;j++){
            var thisLog=[]
            var thisLogTimeStrs=[]
            dayLogs[i][j]=dayLogs[i][j].split(/\s/)
            thisLogTimeStrs=dayLogs[i][j].shift().split(/-/)
            thisLog.push(thisLogTimeStrs[0])
            thisLog.push(thisLogTimeStrs[1])
            thisLog.push(timeLast(thisLogTimeStrs[0],thisLogTimeStrs[1],false))

            thisLog.push(dayLogs[i][j].shift())
            thisLog.push(dayLogs[i][j].join(' '))

            thisDayLog.push(thisLog)
        }
        
    }
    return thisDayLog
}

//接受日期，返回这一天的账单
function getThisDayBill(dayStr,data){
    let dayBillReg=new RegExp('###\\s+'+dayStr+'\\s+[^#]+','g')
    let dayBills=data.match(dayBillReg)
    dayBills=filterarr(dayBills)
    let thisDayBill=[]
    //对于拿到的每一个今天数组元素 i：拿到的第i个今天的记录
    for(var i=0;i<dayBills.length;i++){
        //去掉标题
        dayBills[i]=dayBills[i].replace(/^###\s+\d{1,2}\/\d{1,2}[^\n]*/,'')
        dayBills[i]=dayBills[i].match(/[+|-][\d|\.]+\s[A-Z][0-9]?\s[^\n]*/g)
        dayBills[i]=filterarr(dayBills[i])
        for(var j=0;j<dayBills[i].length;j++){
            var thisBill=[]
            dayBills[i][j]=dayBills[i][j].split(/\s/)
            thisBill.push(dayBills[i][j].shift())
            thisBill.push(dayBills[i][j].shift())
            thisBill.push(dayBills[i][j].join(' '))
            thisDayBill.push(thisBill)
        }
    }
    return thisDayBill
}
//接受日期，返回这一天的日记
function getThisDayDiarry(dayStr,dataStr){
    let dayDiarryReg=new RegExp('###\\s+'+dayStr+'\\s+[^#]+','g')
    let dayDiarrys=dataStr.match(dayDiarryReg)
    // dayDiarrys=filterarr(dayDiarrys)
    
    let thisDayDiarrys=[]
    //对于拿到的每一个今天数组元素 i：拿到的第i个今天的记录
    for(var i=0;i<dayDiarrys.length;i++){
        //去掉标题
        dayDiarrys[i]=dayDiarrys[i].replace(/^###\s+\d{1,2}\/\d{1,2}[^\n]*\n/,'')
        dayDiarrys[i]=dayDiarrys[i].replace(/-\s*\[\s*x?\s*\][^\n]*\n/g,'')
        dayDiarrys[i]=dayDiarrys[i].replace(/\d{4}-\d{4}\s[a-z][0-9]? [^\n]*\n/g,'')
        dayDiarrys[i]=dayDiarrys[i].replace(/[+|-]\d+\s[A-Z][0-9]?\s[^\n]*\n/g,'')
        thisDayDiarrys.push(dayDiarrys[i])
    }
    thisDayDiarrys=thisDayDiarrys.join('\n')
    return thisDayDiarrys

}
function monthToDay(year,month){
    var day=new Date(year,month,1,0,0,0)
    day.setDate(day.getDate()-1)
    var monthdays=day.getDate()
    var daysArr=[]
    for(var i=1;i<=monthdays;i++){
        var today=''+month+'/'+i
        daysArr.push(today)
    }
    return  daysArr
}
//输入年份，月份返回一个月历数组
// [
//    [年,周],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形]
//    [年,周],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形]
//    [年,周],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形]
//    [年,周],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形]
//    [年,周],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形]
//    [年,周],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形]
//    [年,周],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形],[日期,是否隐形]
//]
function monthToMoreDay(year,month,starAtSunday){
    var monthFirstDay=new Date(year,month-1,1,0,0,0)
    var monthLastDay=new Date(year,month,1,0,0,0)
    monthLastDay.setDate(monthLastDay.getDate()-1)
    var firstDay=new Date()
    var lastDay=new Date()
    if(starAtSunday){
        firstDay.setTime(monthFirstDay.getTime()-(monthFirstDay.getDay()*24*60*60*1000))
        lastDay.setTime(monthLastDay.getTime()+((6-monthLastDay.getDay())*24*60*60*1000))
    }else{
        var moveFront=[-6,0,-1,-2,-3,-4,-5]
        var moveBack=[0,6,5,4,3,2,1]
        firstDay.setTime(monthFirstDay.getTime()+(moveFront[monthFirstDay.getDay()]*24*60*60*1000))
        lastDay.setTime(monthLastDay.getTime()+(moveBack[monthLastDay.getDay()]*24*60*60*1000))
    }
    var result=[]
    var thisweek=[]
    var today=new Date
    for(var i=firstDay.getTime();i<=lastDay.getTime();i+=(24*60*60*1000)){
        today.setTime(i)
        if((today.getDay()+Number(starAtSunday))==1){

            thisweek=[]
            thisweek.push([year,todayWeekNumber(today,starAtSunday)])
            
        }
        var dayStr=''+(today.getMonth()+1)+'/'+today.getDate()
        thisweek.push([dayStr,((month==(today.getMonth()+1))?1:0)])


        function weatherWeekend(starAtSunday,today){
            if(starAtSunday){
                return  today.getDay()==6
            }else{
                return today.getDay()==0
            }
        }
        if(weatherWeekend(starAtSunday,today)){
            result.push(thisweek)
        }
    }
    return result
}
function todayWeekNumber(thisday,starAtSunday){
    //今年第一天设为本年的一月一日
    var thisYearFirstDay=new Date()
    thisYearFirstDay.setTime(thisday.getTime())
    thisYearFirstDay.setMonth(0)
    thisYearFirstDay.setDate(1)
    thisYearFirstDay.setHours(0)
    thisYearFirstDay.setMinutes(0)
    thisYearFirstDay.setSeconds(0)
    //为避开凌晨零点零时算那天的问题，将一年初始时间向前调整1min
    thisYearFirstDay.setTime(thisYearFirstDay.getTime()-60*1000)
    //以周日开始
    if(starAtSunday){
        thisYearFirstDay.setTime(thisYearFirstDay.getTime()-(thisYearFirstDay.getDay()*24*60*60*1000))
        
    }else{
        var moveFront=[-6,0,-1,-2,-3,-4,-5]
        var moveBack=[0,6,5,4,3,2,1]
        thisYearFirstDay.setTime(thisYearFirstDay.getTime()+(moveFront[thisYearFirstDay.getDay()]*24*60*60*1000))
    }
    
    var starDay=thisYearFirstDay.getTime()
    var today=thisday.getTime()
    return parseInt(1+(today-starDay)/(7*24*60*60*1000))
}
//输入年份 周数 返回本周七天日期
//['12/19', '12/20', '12/21', '12/22', '12/23', '12/24', '12/25']
function weekToDay(year,weeknumber,starAtSunday){
    var firstDayAtYear=new Date(year,0,1,0,0,0)
    // var todayWeek=firstDayAtYear.getDay()
    if(starAtSunday){
        weeknumber=weeknumber-1
        movefront=[0,-1,-2,-3,-4,-5,-6]
        firstDayAtYear.setTime(firstDayAtYear.getTime()+(movefront[firstDayAtYear.getDay()]*24*60*60*1000))
        
    }else{
        movefront=[-6,0,-1,-2,-3,-4,-5]
        firstDayAtYear.setTime(firstDayAtYear.getTime()+(movefront[firstDayAtYear.getDay()]*24*60*60*1000))
    }
    // weeknumber=weeknumber-1
    var today=new Date()
    today.setTime(firstDayAtYear.getTime()+weeknumber*7*24*60*60*1000)
    var weekDay=[]
    for(var i=0;i<7;i++){
        var month=today.getMonth()+1
        var day=today.getDate()
        
        var dayArr=[''+month+'/'+day,today.getDay()]
        today.setTime(today.getTime()+24*60*60*1000)
        weekDay.push(dayArr)
    }
    return weekDay
}
//接受 年月数、月历数组，返回月历表格
//绘制时间线svg
function getSvgByLog(arr,i,weatherStarAtSunday,settings){
    
    var svgWidth=settings.svgWidth
    // parseInt((window.screen.availWidth)/12)
    



    var useTimeColor=false       //使用时间分类颜色作为笔记的背景色？
    
    var thisDayWeekDay=weatherStarAtSunday?[0,1,2,3,4,5,6][i]:[1,2,3,4,5,6,0][i]
    var thisDayWeekDayBc=(thisDayWeekDay==0||thisDayWeekDay==6)?'var(--weekendSvgBcakgroundColr)':'var(--svgBcakgroundColr)'
    
    var result="<svg width="
    result+=svgWidth
    result+="px height="
    result+=Number(svgWidth)*3.6
    result+="px viewBox='0 0 200 720' style='background: "
    result+=thisDayWeekDayBc
    result+=";'>\n"

    switch (settings.backPattern){
        case '网格':
            result +=draline(36,20,10,20)
        break;
        case '空格':

        break;
        case '横线':
            result +=draline(36,20,0,0)
        break;

    }
    
    result +=draTimeLine()
    result +="</svg>\n"

    
    return result
    function draline(hnumber,hstep,vnumber,vstep){
                        
        var result=""
        // "<svg width="
        // result+=200
        // result+="px height="
        // result+=720
        // result+="px viewBox='0 0 200 720' style='background: #eee;'>\n"
        var hlocated=0
        var vlocated=0
        for (var i=0;i<hnumber;i++){
            hlocated=hstep*i
            result +="<line  x1='0'  y1='"
            result +=hlocated
            result +="' x2='200' y2='"
            result +=hlocated
            //20*12=240
            if((hlocated%240==0)|(i==0)){
                //非整点
                result +="' stroke="
                result+="var(--clockLine)"
                result+=" stroke-width='2'/> \n"
            } else if(hlocated%120==0){  //9,15,21
                result +="' stroke="
                result+="var(--shline)"
                result+=" stroke-width='1'/> \n"
            }else{//整点
                result +="' stroke="
                result+="var(--hline)"
                result+=" stroke-width='1'/> \n"
            }
        }
        // <line x1='35' y1='0' x2='35' y2='700' stroke='#333'  stroke-width='0.5'/>
        for (var j=0;j<vnumber;j++){
            vlocated=vstep*j
            result +="<line x1='"
            result +=vlocated
            result +="' y1='0' x2='"
            result +=vlocated
            result +="' y2='720' stroke="
            result+="var(--hline)"
            result+="  stroke-width='1'/> \n"
            
        }
        // result +="</svg>\n"
        return result
    }
    

    function draTimeLine(){
        var result=""
        // 对于每一条日程
        
        // 对于每一条记录
        for (var i=0;i<arr.length;i++){
            var starTimeCode=arr[i][0]
            var endTimeCode=arr[i][1]
            var starTime=parseInt(starTimeCode.slice(0,2))+parseInt(starTimeCode.slice(2,4))/60
            var endTime=parseInt(endTimeCode.slice(0,2))+parseInt(endTimeCode.slice(2,4))/60
            var timeLast=endTime-starTime

            var timeClass=arr[i][3]

            var colorCode='var(--'+timeClass.slice(0,1)+'color)'
            
            // 分割时间笔记
            
            var timeNote=arr[i][4]//时间备注
            // =========================
            // 绘制时间线rect
            if(settings.weatherUseLine){
                result+="<circle cx='"
                result+=settings.timeLineLocated
                result+="' cy='"
                result+=(starTime-6)*40
                result+="' r='"
                result+=settings.timeLineRadius
                result+="' stroke-width='1' stroke='var(--svgStrokeColor)' fill='"
                result+=colorCode
                result+="'/>"

                result+="<circle cx='"
                result+=settings.timeLineLocated
                result+="' cy='"
                result+=(endTime-6)*40
                result+="' r='"
                result+=settings.timeLineRadius
                result+="' stroke-width='1' stroke='var(--svgStrokeColor)' fill='"
                result+=colorCode
                result+="'/>"

                result+="<line x1='"
                result+=settings.timeLineLocated
                result+="' y1='"
                result+=(starTime-6)*40
                result+="' x2='"
                result+=settings.timeLineLocated
                result+="' y2='"
                result+=(endTime-6)*40
                result+="' stroke='"
                result+=colorCode
                result+="' stroke-width='"
                result+=settings.timeLineWidth
                result+="'  stroke-dasharray='"
                result+=settings.timeLineDash
                result+="'/>"

            }else{
                result +="<rect width='"
                result+=settings.timeBarWidth
                result+="' height='"   //时间条
                result +=timeLast*40
                result +="' x='"
                result+=settings.timeBarLocated
                result+="' y='"
                result +=(starTime-6)*40
                result +="' fill='"
                result +=colorCode
                result +="' rx='"
                result+=settings.timeBarRadius
                result+="' ry='"
                result+=settings.timeBarRadius
                result+="'/>\n"
            }
            
            
            // =========================
            //画方框rect
            result +="<rect width='"
            result+=settings.timeNoteWidth
            result+="' height='"   //方框
            result +=timeLast*40
            result +="' x='"
            result+=settings.timeNoteLocated
            result+="' y='"
            result +=(starTime-6)*40
            result +="' fill="
            
            if(useTimeColor){
                result +=colorCode
            }else{
                result+="var(--timeNoteBackgroundColor)"
            }
            // 
            
            result +=" rx='"
            result+=settings.timeNoteRadius
            result+="' ry='"
            result+=settings.timeNoteRadius
            result+="' stroke-width='"
            result+=settings.timeNoteStrokewidth
            result+="' stroke-dasharray='"
            result+=settings.timeNoteStrokeDash
            result+="' stroke="
            result+="var(--timeNoteBordeColor)"
            result+=" />\n"
            // =========================

            if(starTime>=6){
                result+="<foreignObject width='"
                result+=settings.timeNoteWidth
                result+="' height='"
                result+=timeLast*40
                result+="' x='"
                result+=settings.timeNoteLocated
                result+="' y='"
                result+=(starTime-6)*40
                result+="' >\n<body xmlns='http://www.w3.org/1999/xhtml'>\n<div class='time-note'>"
                result+=timeNote
                result+="</div>\n</body>\n</foreignObject>"
            }else{
                result+="<foreignObject width='"
                result+=settings.timeNoteWidth
                result+="' height='"
                result+=(endTime-6)*40
                result+="' x='"
                result+=settings.timeNoteLocated
                result+="' y=0>\n<body xmlns='http://www.w3.org/1999/xhtml'>\n<div class='time-note'>"
                result+=timeNote
                result+="</div>\n</body>\n</foreignObject>"
            }
        }
        
        return result
        
    }

}
function creatMonthTable(year,month,monthArr,monthPlan,data,weatherStarAtSunday,settings){
    let table=document.createElement('table')
    table.setAttribute('id',year+'年'+month+'月')
    let th=document.createElement('tr')
    if(weatherStarAtSunday){
        th.innerHTML="<th class='monthPlan'>"+year+'年'+month+"月</th><th class='weekNumber '>周</th><th class='sunday week'>周日</th><th class='monday week'>周一</th><th class='tuesday week'>周二</th><th class='wednesday week'>周三</th><th class=' thursday week'>周四</th><th class='friday week'>周五</th><th class='saturday week'>周六</th>"
    }else{
        th.innerHTML="<th class='monthPlan'>"+year+'年'+month+"月</th><th class='weekNumber '>周</th><th class='monday week'>周一</th><th class='tuesday week'>周二</th><th class='wednesday week'>周三</th><th class=' thursday week'>周四</th><th class='friday week'>周五</th><th class='saturday week'>周六</th><th class='sunday week'>周日</th>"
    
    }
    table.appendChild(th)

    let tr1=document.createElement('tr')

    let td1_1=document.createElement('td')
    td1_1.setAttribute('rowspan',monthArr.length)
    td1_1.setAttribute('class','monthPlan')
    let monthTeskArr=monthPlan[(month-1)]
    //对于每条月计划
    for(var i=0;i<monthTeskArr.length;i++){
        let input=document.createElement('input')
        let label=document.createElement('label')
        if(monthTeskArr[i][0]){
            
            input.setAttribute('data-line','0')
            input.setAttribute('type','checkbox')
            input.setAttribute('checked','')
            input.setAttribute('class','task-list-item-checkbox233')
            //待办1：给复选框绑定事件动作
            let thisId=year+'-'+month+'-233'+i23
            input.setAttribute('id',thisId)
            
            label.setAttribute('for',thisId)
            label.append(document.createTextNode(monthTeskArr[i][1]))
        }else{
            input.setAttribute('data-line','1')
            
            input.setAttribute('type','checkbox')
            input.setAttribute('class','class="task-list-item-checkbox')
            input.setAttribute('id',year+'-'+month+'i')
            
            label.setAttribute('for',year+'-'+month+'i')
            label.append(document.createTextNode(monthTeskArr[i][1]))
        }
        td1_1.appendChild(input)
        td1_1.appendChild(label)
        td1_1.appendChild(document.createElement('br'))
    }
    tr1.appendChild(td1_1)
    //对于某一周
    for(var i=0;i<monthArr.length;i++){
        let weekdays=[]
        //j 对于某一周第j天
        for(var j=0;j<monthArr[i].length;j++){
            let thisTd=document.createElement('td')
            let title=document.createElement('h6')

            
            let tesk=document.createElement('p')
            let schedule=document.createElement('p')
            schedule.setAttribute('class','schedule')
            //对于每日
            if(j){
                let todayStr=monthArr[i][j][0]
                let todayTodos=getThisDayTodo(todayStr,data)
                let todaySchedule=getThisDaySchedule(todayStr,data)
                //将日期h6添加到td中
                // let tdClassKind=''
                title.append(document.createTextNode(todayStr))
                thisTd.appendChild(title)
                thisTd.setAttribute('id',todayStr)
                //将周几添加到单元格td的类名属性
                let weekClassArr=['sunday','monday','tuesday','wednesday','thursday','firday','saturday','sunday']
                let tdClassKind=weatherStarAtSunday?weekClassArr[j-1]:weekClassArr[j]
                tdClassKind+="  week "
                // thisTd.setAttribute{class,}
                //如果是本月日期
                if (monthArr[i][j][1]){
                //疑问 每周数组都是以周日开头的吗？
                //答 是的，内部使用时默认以周日开头
                    tdClassKind+='thisMonth'
                    thisTd.setAttribute('class',tdClassKind)
                    //对于今日每一条待办
                    //添加tesk段落
                    for(var dayTeskNumber=0;dayTeskNumber<todayTodos.length;dayTeskNumber++){
                        let input=document.createElement('input')
                        let label=document.createElement('label')
                        // 本条待办已完成
                        if(todayTodos[dayTeskNumber][0]){
                            input.setAttribute('data-line','0')
                            input.setAttribute('type','checkbox')
                            input.setAttribute('checked','')
                            input.setAttribute('class','task-list-item-checkbox done')
                            input.setAttribute('id',todayStr+'-'+dayTeskNumber)
                            
                            label.setAttribute('for',todayStr+'-'+dayTeskNumber)
                            label.append(document.createTextNode(todayTodos[dayTeskNumber][1]))
                        }else{
                        //本条待办未完成
                            input.setAttribute('data-line','1')
                            
                            input.setAttribute('type','checkbox')
                            input.setAttribute('class','task-list-item-checkbox todo')
                            input.setAttribute('id',todayStr+'-'+dayTeskNumber)
                            
                            label.setAttribute('for',todayStr+'-'+dayTeskNumber)
                            label.append(document.createTextNode(todayTodos[dayTeskNumber][1]))
                        }
                        tesk.appendChild(input)
                        tesk.appendChild(label)
                        tesk.appendChild(document.createElement('br'))

                        
                        
                    }
                    if(settings.showTodo){thisTd.appendChild(tesk)}
                    
                    //添加schedule段落
                    if(todaySchedule.length){
                        for(var dayScheduleNumber=0;dayScheduleNumber<todaySchedule.length;dayScheduleNumber++){
                            let mydiv=document.createElement('div')
                            mydiv.innerText=todaySchedule[dayScheduleNumber][0]+'-'+todaySchedule[dayScheduleNumber][1]+':\t'+todaySchedule[dayScheduleNumber][4]
                            let thisClass='schedule  '+todaySchedule[dayScheduleNumber][3]
                            mydiv.setAttribute('class',thisClass)
                            schedule.appendChild(mydiv)
                            // schedule.appendChild(document.createElement('br'))
    
    
                            
                            
                        }
                        if(settings.showSchedule){thisTd.appendChild(schedule)}
                        
                    }
                    
                //反之非本月日期
                }else{
                //如果非本月日期
                    tdClassKind+='notthisMonth'
                    thisTd.setAttribute('class',tdClassKind)
                }
            }else{
            //对于周计划
                title.append(document.createTextNode(''+monthArr[i][j][1]))
                thisTd.appendChild(title)
                thisTd.setAttribute('class','weekNumber')
            }
            weekdays.push(thisTd)
        }
        //第一周加到tr1
        if(i==0){
            for(var k=0;k<weekdays.length;k++){
                tr1.appendChild(weekdays[k])
            }
            table.appendChild(tr1)
        }else{
            let thisTr=document.createElement('tr')
            for(var k=0;k<weekdays.length;k++){
                thisTr.appendChild(weekdays[k])
            }
            table.appendChild(thisTr)
        }
    }
    table.setAttribute('class','techo-month-table')
    return table
}
//生成周计划需要的数据
//哪一年 第几周 据此生成一周七天的日期列表
//根据列表查询每日对应的todo 、log
//
function creatweekTable(year,weekNumber,weatherStarAtSunday,data,settings){
    //默认标准是以周日起始
    //只选出一周七天日期，不标明每日是周几
    //周几需要结合是否周日开头、第几天来判断
    let weekArr=weekToDay(year,weekNumber,1)

    let title=[]
    let plan=[]
    let log=[]
    title.push([year+'年 第'+weekNumber+'周'])
    for(var i=0;i<weekArr.length;i++){
        let weekday=weatherStarAtSunday?['周日','周一','周二','周三','周四','周五','周六']:['周一','周二','周三','周四','周五','周六','周日']
        let thisTitle=[weekArr[i][0]+'  '+weekday[weekArr[i][1]]]
        title.push(thisTitle)
    }
    //直接指明某一日的log plan 所有不需要确认一周起始时间
    plan.push(getThisWeekTodo(weekNumber,data))
    
    for(var j=0;j<weekArr.length;j++){
        var thisTodo=getThisDayTodo(weekArr[j][0],data)
        
        plan.push(thisTodo)
    }

    for(var k=0;k<weekArr.length;k++){
        var thisLog=getThisDayLog(weekArr[k][0],data)
        log.push(thisLog)
    }
    ThisWeekArr=[title,plan,log]
    
// +++++++++++++++++++++++++++++++
    //设置好基本的表格框架
    let weekTable=document.createElement('table')
    weekTable.setAttribute('class','techo-week-table')
    let weekTablethead=document.createElement('thead')
    let weekTabletbody=document.createElement('tbody')
    let tr1=document.createElement('tr')
    tr1.setAttribute('class','firstLine')
    let tr2=document.createElement('tr')
    tr2.setAttribute('class','secondLine')
    let tr3=document.createElement('tr')
    tr3.setAttribute('class','thirdLine')

    weekTablethead.appendChild(tr1)
    weekTable.appendChild(weekTablethead)

    weekTabletbody.appendChild(tr2)
    weekTabletbody.appendChild(tr3)
    weekTable.appendChild(weekTabletbody)
    //++++++++++++++++++++++++++++++++
    //写入第一行标题
    let tr1InnerHTML=''
    for(var l=0;l<title.length;l++){
        var thisDayWeekDay=weatherStarAtSunday?['sunday','monday','tuesday','wednesday','thursday','firday','saturday'][l-1]:['monday','tuesday','wednesday','thursday','firday','saturday','sunday'][l-1]
        
        if(l){
            tr1InnerHTML+="<td class='day "
            tr1InnerHTML+=thisDayWeekDay
            tr1InnerHTML+="  title'>"
            tr1InnerHTML+=title[l]
            tr1InnerHTML+="</td>"
        }else{
            tr1InnerHTML+="<td class='week title'>"
            tr1InnerHTML+=title[l]
            tr1InnerHTML+="</td>"
        }
        

    }
    tr1.innerHTML=tr1InnerHTML
    //写入第二行计划
    let tr2InnerHTML=''
    for(var m=0;m<plan.length;m++){
        var thisDayWeekDay=weatherStarAtSunday?['sunday','monday','tuesday','wednesday','thursday','firday','saturday'][m-1]:['monday','tuesday','wednesday','thursday','firday','saturday','sunday'][m-1]
        if(m){//对于每天的todo
            //看这里
            

            tr2InnerHTML+="<td class='day  "
            tr2InnerHTML+=thisDayWeekDay
            tr2InnerHTML+="  plan' >"
        }else{//对于周计划中每一条todo
            tr2InnerHTML+="<td class='week plan week-plan' rowspan='2' >"
        }
        
        tr2InnerHTML+="<div>"
        for(var i=0;i<plan[m].length;i++){
           
            //任务已完成
            if(plan[m][i][0]){
                tr2InnerHTML+="<input data-line='0' type='checkbox' checked='' class='task-list-item-checkbox done' id='"
                tr2InnerHTML+=year+'/'+weekNumber+'-'+m
                tr2InnerHTML+="'>\n<label for='"
                tr2InnerHTML+=year+'/'+weekNumber+'-'+m
                tr2InnerHTML+="'>"
                tr2InnerHTML+=plan[m][i][1]
                tr2InnerHTML+="</label>"
                tr2InnerHTML+="<br>"
            }else{
            //任务未完成
                tr2InnerHTML+="<input data-line='1' type='checkbox' class='task-list-item-checkbox todo'  id='"
                tr2InnerHTML+=year+'/'+weekNumber+'-'+m
                tr2InnerHTML+="'>\n<label for='"
                tr2InnerHTML+=year+'/'+weekNumber+'-'+m
                tr2InnerHTML+="'>"
                tr2InnerHTML+=plan[m][i][1]
                tr2InnerHTML+="</label>"
                tr2InnerHTML+="<br>"
                // <input data-line='1' type='checkbox' class='class=&quot;task-list-item-checkbox todo' id='5/17-0'>
            }
            
        }
        
        tr2InnerHTML+="</div>"
        //如果允许汇总就开搞！！
        if(settings.weatherWeekSum&&(m==0)){
            
            let reg=/[a-z]/
            let className=String(settings.weekClassName.match(reg))

            let weekSumArr=[]
            let weekSumTime=0
            //对于每一天
            for(var dayCount=0;dayCount<7;dayCount++){
                
                let todayTimSum=0
                //对于每一条记录
                for(var i=0;i<ThisWeekArr[2][dayCount].length;i++){
                    //如果是本类时间
                    if(ThisWeekArr[2][dayCount][i][3].match(new RegExp("^"+className,"i"))){
                        let timeLast=ThisWeekArr[2][dayCount][i][2]
                        let thisLogTime=parseInt(timeLast.slice(0,2))+parseInt(timeLast.slice(2,4))/60

                        todayTimSum+=thisLogTime
                        weekSumTime+=thisLogTime
                    }
                }
                weekSumArr.push(todayTimSum.toFixed(1))
            }
            weekSumArr.push(weekSumTime.toFixed(3))
            //数据准备完成
            tr2InnerHTML+=drwWeekTime(className,weekSumArr)


            function drwWeekTime(className,weekSumArr){
                // "sumWidth":200,
                // "sumHeight":300,
                let w=settings.sumWidth
                let h=settings.sumHeight
                let localArr=[w,h,2*w,2*h]

                //看这里
                let result="<div class='weekSum'>"
                result+="<svg width="+w+"px height="+h+"px viewBox='0 0 "+w+" "+h+"' style='background: #00000000;'>"
                result+="<rect width='"+w+"' height='"+h+"' x='0' y='0' fill='var(--weekSumSvgBc)' stroke='black' stroke-width='2' rx='"+(0.05*w)+"' ry='"+(0.05*w)+"' />"
                
                result+="<text x='"+(0.05*w)+"' y='"+(h*0.05)+"' font-size='15'  fill='var(--nomal)'>"+className+"类时间合计：</text>"
                result+="<text x='"+(0.05*w)+"' y='"+(h*0.15)+"' font-size='"+parseInt(10+h/30)+"' fill='var(--"+className+"color)'>"+weekSumArr[7]+" h</text>"
                result+="<line x1='"+(0.05*w)+"' y1='"+(h*0.06)+"' x2='"+(0.9*w)+"' y2='"+(h*0.06)+"'stroke='var(--nomal)' stroke-width='1' />"
                for(var i=0;i<7;i++){
                    let weekday=settings.weekStartDay=='周日'?['日','一','二','三','四','五','六'][i]:['一','二','三','四','五','六','日'][i]
                    result+="<text x='"+(0.07*w)+"' y='"+((0.26+0.1*i)*h)+"' font-size='15' text-anchor='middle' fill='var(--nomal)' >"+weekday+"</text>"
                    result+="<line x1='"+(0.15*w)+"' y1='"+((0.25+0.1*i)*h)+"' x2='"+(0.8*w)+"' y2='"+((0.25+0.1*i)*h)+"'stroke='var(--nomal)' stroke-width='1' />"
                    result+="<text x='"+(0.9*w)+"' y='"+((0.26+0.1*i)*h)+"' font-size='15' text-anchor='middle' fill='var(--nomal)'>"+weekSumArr[i]+" h</text>"
                    result+="<rect width='"+(weekSumArr[i]*0.65*w/24)+"' height='"+20+"' x='"+(0.15*w)+"' y='"+((0.25+0.1*i)*h-10)+"' fill='var(--"+className+"color)'/>"
                }
                result+="<line x1='"+(0.15*w)+"' y1='"+((0.2)*h)+"' x2='"+(0.15*w)+"' y2='"+((0.9)*h)+"'stroke='var(--nomal)' stroke-width='1' />"
                result+="<line x1='"+(0.8*w)+"' y1='"+((0.2)*h)+"' x2='"+(0.8*w)+"' y2='"+((0.9)*h)+"'stroke='var(--nomal)' stroke-width='1' />"
                result+="</svg>"
                result+="</div>"
                return result

            }
        }
        tr2InnerHTML+="</td>"
        
        
    }
    tr2.innerHTML=tr2InnerHTML

    //写入第三行log
    let tr3InnerHTML=''
    
    for(var n=0;n<log.length;n++){
        var thisDayWeekDay=weatherStarAtSunday?['sunday','monday','tuesday','wednesday','thursday','firday','saturday'][n]:['monday','tuesday','wednesday','thursday','firday','saturday','sunday'][n]
        
        tr3InnerHTML+="<td class='day "
        tr3InnerHTML+=thisDayWeekDay
        tr3InnerHTML+="  log' >"
        let logSVG=getSvgByLog(log[n],n,weatherStarAtSunday,settings)
        tr3InnerHTML+=logSVG
        tr3InnerHTML+="</td>"
    }
    tr3.innerHTML=tr3InnerHTML



    // rowspan='2' 
    return weekTable


}
//每日小计（表内） 每月小计（表脚）
function creatBillTable(year,monthNumber,data,settings){
    let table=document.createElement('table')
    let thead=document.createElement('thead')
    let tbody=document.createElement('tbody')
    let tfoot=document.createElement('tfoot')
    table.appendChild(thead)
    table.appendChild(tbody)
    table.appendChild(tfoot)
    //+++++++++++++++++++++++
    //打标签
    table.setAttribute('class','techo-bill-table')
    //++++++++++++++++++++++
    //准备数据

    let billArr=[]
    let thisMonthCost=0
    let thisMonthSalery=0
    let monthArr=monthToDay(year,monthNumber)
    //对于每一天 
    for(var daycount=0;daycount<monthArr.length;daycount++){
        let todayBill=[]
        let todayArr=[]
        let todayCose=0
        todayArr.push(monthArr[daycount])
        todayBill=getThisDayBill(monthArr[daycount],data)
        
        //对于每一天账目记录
        for(var count=0;count<todayBill.length;count++){
            todayCose+=Number(todayBill[count][0])
            if(todayBill[count][0]>0){
                thisMonthSalery+=Number(todayBill[count][0])
            }else{
                thisMonthCost+=Number(todayBill[count][0])
            }
            
        }
        todayArr.push(todayBill)
        

        todayArr.push(todayCose)
        billArr.push(todayArr)
    }

    
    // ++++++++++++++++++++++
    //绘制账单
    thead.innerHTML="<th class='bill-day'>日期</th><th class='bill-cost'>金额</th><th class='bill-class'>分类</th><th class='bill-note'>备注</th><th class='today-cost'>今日小计</th>"
    let tbodyInnerHTML=''
    //对于本月的每一天
    for(var i=0;i<billArr.length;i++){
        //如果有开销记录则
        if(billArr[i][1].length){
            
            //对于每一份开销记录
            for(var j=0;j<billArr[i][1].length;j++){
                
                if(j==0){
                    tbodyInnerHTML+="<tr class='hasBill'><td class='bill-day' rowspan='"
                    tbodyInnerHTML+=billArr[i][1].length
                    tbodyInnerHTML+="'>"
                    tbodyInnerHTML+=billArr[i][0]
                    tbodyInnerHTML+="</td>"
                }else{
                    tbodyInnerHTML+="<tr class='hasBill '>"
                }
                if(billArr[i][1][j][0]>0){
                    tbodyInnerHTML+="<td class='bill-cost  salery'>"
                }else{
                    tbodyInnerHTML+="<td class='bill-cost  cost' >"
                }
                
                tbodyInnerHTML+=billArr[i][1][j][0]
                tbodyInnerHTML+="</td>"

                tbodyInnerHTML+="<td class='bill-class'>"
                tbodyInnerHTML+=billArr[i][1][j][1]
                tbodyInnerHTML+="</td>"

                tbodyInnerHTML+="<td class='bill-note'>"
                tbodyInnerHTML+=billArr[i][1][j][2]
                tbodyInnerHTML+="</td>"
                //如果是当天第一天记录，将汇总小计写在这里
                if(j==0){
                    tbodyInnerHTML+="<td class='today-cost' rowspan='"
                    tbodyInnerHTML+=billArr[i][1].length
                    tbodyInnerHTML+="'>"
                    tbodyInnerHTML+=billArr[i][2]
                    tbodyInnerHTML+="</td></tr>"
                }else{
                    tbodyInnerHTML+="</tr>"
                }
            }
        }else if(settings.showNobill){
        //没有开销记录
            tbodyInnerHTML+="<tr class='nobill'><td class='bill-day'>"
            tbodyInnerHTML+=billArr[i][0]
            tbodyInnerHTML+="</td><td class='bill-cost'> - </td><td class='bill-class'> - </td><td class='bill-note'> - </td><td class='today-cost'> - </td></tr>"
        }else{}
    }
    tbody.innerHTML=tbodyInnerHTML
    
    tfoot.innerHTML="<th colspan='2'> "+monthNumber+"月汇总</th><td>总收入："+thisMonthSalery+"</td><td>总支出："+(thisMonthCost)+"</td><td>合计："+(thisMonthCost+thisMonthSalery)+"</td>"




    return table
}

//根据年份、月份、data 绘制本月支出曲线
function creatBillShow(year,monthNumber,data,settings){
    // +++++++++++++++++
    // 准备数据
    let BillArr=[]
    let monthCost=0
    let monthSalary=0
    let monthSubtotal=0
    let monthArr=monthToDay(year,monthNumber)

    let maxCost=0
    let maxSalery=0
    //对于每一天 
    for(var daycount=0;daycount<monthArr.length;daycount++){
        
        
        let todayCost=0
        let todaySalary=0
        let todaySubtotal=0
        
        let todayBill=getThisDayBill(monthArr[daycount],data)
        //对于每一天账目记录
        for(var count=0;count<todayBill.length;count++){
            if(todayBill[count][0]>0){
                todaySalary+=Number(todayBill[count][0])
                monthSalary+=Number(todayBill[count][0])
                
            }else{
                todayCost+=Number(todayBill[count][0])
                monthCost+=Number(todayBill[count][0])
                

            }
            
        }
        maxSalery=todaySalary>maxSalery?todaySalary:maxSalery
        maxCost=(-todayCost)>maxCost?(-todayCost):maxCost
        
        
        todaySubtotal=todayCost+todaySalary
        BillArr.push([monthArr[daycount],todayCost,todaySalary,todaySubtotal])
    }
    let maxMoney=Math.max(maxSalery,maxCost)
    monthSubtotal=monthCost+monthSalary
    //BillArr
    //monthCost,  monthSalary,  monthSubtotal
    // maxCost maxSalery maxMoney
    
    // ++++++++++++++++++++
    // 修饰数据
    
    // ++++++++++++++++++++++++++++++
    // 绘图
    let width=settings.showBillWidth
    let height=width*4/9
    let result="<svg width="+width+"px  height="+height+"px  viewBox='0 0 900 400' style='background: var(--billShowBc);'> "
    
    result+="<rect width='860' height='340' x='20' y='20' fill='#ff880000' stroke='#000' />"
    result+="<line x1='40' y1='360' x2='840' y2='360'stroke='black' stroke-width='2' />"
    // result+="<polyline points='10,10 100,20 80,85 28,55' fill='#00000000' stroke='#000000' stroke-width='2'/>"
    let firstDayOfMonth=new Date(year,monthNumber-1,1)
    
    let starDay=firstDayOfMonth.getDay()
    let hstep=25
    let vstep=25
    let x0=20
    let y0=20
    let x1=800
    let y1=360
    let daysNumber=BillArr.length
    result+=draline(x0,y0,x1,y1,hstep,vstep,starDay,daysNumber)
    

    result+=draBill(BillArr,maxMoney,vstep,x0,y0+20,y1)
    result+="<text x='"
    result+=800
    result+="' y='"
    result+=45
    result+="' font-size='20' fill='var(--billDay)' >"
    result+=(year+'/'+monthNumber)
    result+="</text>"

// 看这里 添加本月合计消费多少 收入多少 结余多少
// monthCost,  monthSalary,  monthSubtotal
    result+="<text x='"
    result+=800
    result+="' y='"
    result+=80
    result+="' font-size='10' fill='var(--billDay)' >"
    result+="总支出："
    result+=monthCost
    result+="</text>"

    // ===================
    result+="<text x='"
    result+=800
    result+="' y='"
    result+=95
    result+="' font-size='10' fill='var(--billDay)' >"
    result+="总收入："
    result+=monthSalary
    result+="</text>"
    // ===============
    result+="<text x='"
    result+=800
    result+="' y='"
    result+=110
    result+="' font-size='10' fill='var(--billDay)' >"
    result+="总结余："
    result+=monthSubtotal
    result+="</text>"
    
    //starDay 输入本月内第一周开始那天 是几号？ 据此划分竖向的背景线
    
    // result+="<rect width='60' height='40' x='20' y='10' fill='#0088ff' />"
    // result+="<rect width='850' height='380' x='30' y='30' fill='#ff0000' />"
    
    result+=" </svg>"
    return result
    function  draline(x0,y0,x1,y1,hstep,vstep,starDay,daysNumber){
                        
        var lineresult=""
        var text=''
        var hlocated=0
        var vlocated=0
        var hnumber=parseInt((y1-y0)/hstep)
        var vnumber=parseInt((x1-x0)/vstep)
        // 横向
        for (var i=0;i<hnumber;i++){
            hlocated=hstep*i
            lineresult +="<line  x1='"
            lineresult +=x0
            lineresult +="'  y1='"
            lineresult +=(y1-hlocated)
            lineresult +="' x2='"
            lineresult +=x1
            lineresult +="' y2='"
            lineresult +=(y1-hlocated)
            //20*12=240
            if((i%10==0)|(i==0)){
                //非整点
                lineresult +="' stroke="
                lineresult +="var(--tenLine)"
                lineresult +=" stroke-width='1'/> \n"
            } else if(i%5==0){  //9,15,21
                lineresult +="' stroke="
                lineresult +="var(--fiveLine)"
                lineresult +=" stroke-width='1'/> \n"
            }else{//整点
                lineresult +="' stroke="
                lineresult +="var(--line)"
                lineresult +=" stroke-width='1'/> \n"
            }
        }
        // <line x1='35' y1='0' x2='35' y2='700' stroke='#333'  stroke-width='0.5'/>
        // 纵向
        for (var j=0;j<vnumber;j++){
            vlocated=vstep*j
            lineresult +="<line  x1='"
            lineresult +=(x0+vlocated)
            lineresult +="'  y1='"
            lineresult +=y0
            lineresult +="' x2='"
            lineresult +=(x0+vlocated)
            lineresult +="' y2='"
            lineresult +=y1
            //20*12=240
            if(j%7==(7-starDay)){
                //整周
                lineresult +="' stroke="
                lineresult +="var(--weekLine)"
                lineresult +=" stroke-width='1'/> \n"
            } else {
                lineresult +="' stroke="
                lineresult +="var(--line)"
                lineresult +=" stroke-width='1'/> \n"
            }
           

        }
        for(var k=0;k<daysNumber;k++){
            vlocated=vstep*k
            text+="<text x='"
            text+=(x0+vlocated)
            text+="' y='"
            text+=y1+15
            text+="' font-size='15' fill='var(--billDay)' text-anchor='middle'>"
            text+=(k+1)
            text+="</text> "

        }
        lineresult+=text
        // lineresult +="</svg>\n"

        return lineresult
    }
    function draBill(BillArr,maxMoney,vstep,x0,y0,y1){
        let BillAmend=[]
        for(var i=0;i<BillArr.length;i++){
            let todayBill=[]
            todayBill.push((i)*vstep+x0)
            todayBill.push(-(BillArr[i][1]/maxMoney)*(y1-y0))
            
            todayBill.push((BillArr[i][2]/maxMoney)*(y1-y0))
            todayBill.push((BillArr[i][3]/maxMoney)*(y1-y0))
            BillAmend.push(todayBill)
        }

        result=""
        let cost="<polyline points='"
        let salery="<polyline points='"
        let costtext=''
        let saleryText=''
        // text="<text x='10' y='50' font-size='4'  text-anchor='middle'>Hello_world</text> "
        for(var j=0;j<BillAmend.length;j++){
            cost+=BillAmend[j][0]+','+(y1-BillAmend[j][1])+'  '
            salery+=BillAmend[j][0]+","+(y1-BillAmend[j][2])+'  '

            if(settings.showBillLable){
                costtext+="<rect width='25' height='20' x='"
                costtext+=BillAmend[j][0]-12
                costtext+="' y='"
                costtext+=(y1-BillAmend[j][1])-27
                costtext+="' fill='var(--billCostLableBc)' rx='3' ry='8'/>"

                costtext+="<text x='"
                costtext+=BillAmend[j][0]
                costtext+="' y='"
                costtext+=(y1-BillAmend[j][1])-12
                costtext+="' font-size='15' fill='var(--billCostLable)'  text-anchor='middle'>"
                costtext+=BillArr[j][1]
                costtext+="</text> "


                saleryText+="<rect width='25' height='20' x='"
                saleryText+=BillAmend[j][0]-12
                saleryText+="' y='"
                saleryText+=(y1-BillAmend[j][2])-27
                saleryText+="' fill='var(--billSaleryLableBc)' rx='3' ry='8'/>"

                saleryText+="<text x='"
                saleryText+=BillAmend[j][0]
                saleryText+="' y='"
                saleryText+=(y1-BillAmend[j][2])-12
                saleryText+="' font-size='15'  fill='var(--billSaleryLable)' text-anchor='middle'>"
                saleryText+=BillArr[j][2]
                saleryText+="</text> "
            }
            
           
        }
        
        cost+="' fill='#00000000' stroke='var(--costLine)' stroke-width='2'/>"
        salery+="' fill='#00000000' stroke='var(--saleryLine)' stroke-width='2'/>"
        result+=cost
        result+=salery
        if(settings.showBillLable){
            result+=costtext
            result+=saleryText
        }
        return result
    }

}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}
// 将字符串转换成数字构成的数组
// "1,3-8,10"=>1,3,4,5,6,7,8,10
function getNumberByString(str){
    var arr=str.split(',')
    var resultNumber=[]
    for(var i=0;i<arr.length;i++){
        if(/\d+-\d+/.test(arr[i])){
            var numbers=arr[i].match(/\d+/g).map(Number).sort()
            
            var starNumber=numbers[1]<numbers[0]?numbers[1]:numbers[0]
            var endNumber=numbers[1]>numbers[0]?numbers[1]:numbers[0]
            for(var j=starNumber;j<=endNumber;j++){
                resultNumber.push(j)
            }
        }else{
            resultNumber.push(Number(arr[i]))
        }
        
    }
    return resultNumber
}


// 定义函数，返回当前页面的文本
// 定义函数，统计当前页面需要的数据
// 定义函数，

// var UserSettings=.

class MyPlugin extends obsidian.Plugin {
    async onload() {
        await this.loadSettings();
        this.addRibbonIcon('dice', 'Sample Plugin', () => {
            new obsidian.Notice('This is a notice!');
        });
        this.addStatusBarItem().setText('Status Bar Text');
        this.addCommand({
            id: 'open-sample-modal',
            name: 'Open Sample Modal',
            checkCallback: (checking) => {
                let leaf = this.app.workspace.activeLeaf;
                if (leaf) {
                    if (!checking) {
                        new SampleModal(this.app).open();
                    }
                    return true;
                }
                return false;
            }
        });
        
        this.registerCodeMirror((cm) => {//重新开启插件触发
            console.log('codemirror 60行 插件已重新触发',cm);
        });
        this.registerDomEvent(document, 'click', (evt) => {
        });
        // this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
        this.registerMarkdownPostProcessor((el, ctx) => __awaiter(this, void 0, void 0, function* () {
            // var data=app.workspace.activeLeaf.view.file.unsafeCachedData
            let data=app.workspace.activeLeaf.view.lastSavedData
            let sourcePath=ctx.sourcePath
            let weatherTechoReg=/techo\d{4}\S*\.md$/
            // console.log(app.workspace.activeLeaf)
            // console.log(app.workspace.activeLeaf.view.lastSavedData)
            //如果是规定的标题格式则
            if(sourcePath.match(weatherTechoReg)){
                let settings=app.plugins.plugins["ObsidianPlugin-Techo"].settings
                let year=sourcePath.match(/\d{4}/)
                let weatherStarAtSunday=(settings.weekStartDay=='周日')?1:0
                if (el.querySelector('code.language-techo-month')) {
                    
                    let monthPlan=getMonthTodo(data)
                    let commandArr=getNumberByString(el.innerText.replace(/\n\s*复制/,''))
                    
                    for (var count=0;count<commandArr.length;count++){
                        let monthArr=monthToMoreDay(year,commandArr[count],weatherStarAtSunday)
                        let table=creatMonthTable(year,commandArr[count],monthArr,monthPlan,data,weatherStarAtSunday,settings)
                        el.appendChild(table)
                    }
                }else if(el.querySelector('code.language-techo-week')){
                   
                    let commandArr=getNumberByString(el.innerText.replace(/\n\s*复制/,'')) 
                    for (var count=0;count<commandArr.length;count++){
                        let table=creatweekTable(year,commandArr[count],weatherStarAtSunday,data,settings)
                        el.appendChild(table)
                    }
                    
                    
                    // el.innerHTML="<div>**周计划**</div>";
                }else if(el.querySelector('code.language-techo-bill')){
                    let commandArr=getNumberByString(el.innerText.replace(/\n\s*复制/,'')) 
                    for (var count=0;count<commandArr.length;count++){
                        let table=creatBillTable(year,commandArr[count],data,settings)
                        el.appendChild(table)
                    }
                    // el.innerHTML="<div>**账单统计**</div>";
                    // el.innerHTML=''
                }else if(el.querySelector('code.language-techo-showBill')){
                    let commandArr=getNumberByString(el.innerText.replace(/\n\s*复制/,'')) 
                    
                    for (var count=0;count<commandArr.length;count++){
                        let SVG=document.createElement("svg")
                        SVG.innerHTML=creatBillShow(year,commandArr[count],data,settings)
                        
                        el.appendChild(SVG)
                    }
                    // el.innerHTML="<div>**时间统计**</div>";
                    // el.innerHTML=''
                }else{
                    el.innerHTML=''
                    // el.innerHTML="<div>**其他内容**</div>";
                    // el.innerHTML="<h1>标题</h1>"
                    
                }
            }
            // var weatherTecho=
            
            
        }));

        // await this.loadOptions();
        this.addSettingTab(new SampleSettingTab(this.app, this));
        
        
    }
    async writeOptions(changeOpts) {
        this.settings.update((old) => (Object.assign(Object.assign({}, old), changeOpts(old))));
        await this.saveData(this.options);
    }
                            // async writeOptions(changeOpts) {
                            //     settings.update((old) => (Object.assign(Object.assign({}, old), changeOpts(old))));
                            //     await this.saveData(this.options);
                            // }
    
    loadProcessor() {
        this.registerMarkdownPostProcessor((el, ctx) => __awaiter(this, void 0, void 0, function* () {
            // Only process the frontmatter
            if (!el.querySelector('code.language-techo-weak')) {
                return;
            }
            const banner = document.createElement('div');
        }));
    }
    loadSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
        });
        
    }
    saveSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveData(this.settings);
        });
    }
    
}
class SampleModal extends obsidian.Modal {
    constructor(app) {
        super(app);
    }
    onOpen() {
        let { contentEl } = this;
        contentEl.setText('Woah!');
    }
    onClose() {
        let { contentEl } = this;
        contentEl.empty();
    }
}
class SampleSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    saveSettings({ rerenderSettings = false, refreshViews = false } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.plugin.saveData(this.plugin.settings);
           
            if (rerenderSettings) {
                this.display();
            }
        });
    }
    display() {
        const weekdays = ["周日","周一"];
        const weekBackground=["空白","横线","网格"]
        const hh="2"



        let { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h1', { text: 'techo设置' });
        containerEl.createEl('h2', { text: '周计划视图' });
        containerEl.createEl('h3', { text: '常规' });

        new obsidian.Setting(containerEl)
        .setName('每周第一天')
        .setDesc("当前值： "+this.plugin.settings.weekStartDay)

        .addDropdown(dropdown => {
            // dropdown.setValue(this.plugin.settings.weekStartDay)
            dropdown.addOption('周日','请选择')
            dropdown.onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.weekStartDay= value;
                yield this.plugin.saveSettings();
            }))
            weekdays.forEach((arr) => {//day 数组元素 i索引
                dropdown.addOption(arr,arr);//实际值、显示
            })
        });

        new obsidian.Setting(containerEl)
        .setName('背景图案')
        .setDesc("当前值： "+this.plugin.settings.backPattern)
        .addDropdown(dropdown => {
            dropdown.onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.backPattern= value;
                yield this.plugin.saveSettings();
            }))
            
            dropdown.addOption('空白','请选择')
            weekBackground.forEach((arr, i) => {//day 数组元素 i索引
                dropdown.addOption(arr, weekBackground[i]);//实际值、显示
            })
        });
        new obsidian.Setting(containerEl)
            .setName('时间轴svg宽度')
            .setDesc('输入数字，建议200')
            .addText(text => {
            text.inputEl.type = 'number';
            text.setValue(String(this.plugin.settings.svgWidth));
            text.setPlaceholder(`文本框提示文字`);
            text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.svgWidth = val ? parseInt(val) : null;
                yield this.saveSettings();
            }));
        });
    //     "sumWidth":200,
    // "sumHeight":300,


        new obsidian.Setting(containerEl)
            .setName('是否开启周计划统计')
            .setDesc('')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.weatherWeekSum)
                .onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.weatherWeekSum = val;
                    yield this.saveSettings({ rerenderSettings: true, refreshViews: true });
                }
            )));
            
    // weatherWeekSum 
    // weekClassName
    // showweekSumLable
        if (this.plugin.settings.weatherWeekSum) {
            new obsidian.Setting(containerEl)
                .setName('统计类名')
                .setDesc('输入一个英文字母')
                .addText(text => {
                // text.inputEl.type = 'string';
                text.setValue(String(this.plugin.settings.weekClassName));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.weekClassName = val;
                    yield this.saveSettings();
                }));
            });
           
            new obsidian.Setting(containerEl)
            .setName('周汇总项宽度')
            .setDesc('输入数字，建议200')
            .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.sumWidth));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.sumWidth = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
            new obsidian.Setting(containerEl)
            .setName('周汇总项高度')
            .setDesc('输入数字，建议200')
            .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.sumHeight));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.sumHeight = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
        //     "sumWidth":200,
        // "sumHeight":300,

        }

        containerEl.createEl('h3', { text: '时间轴样式' });
        // +==========================\
        new obsidian.Setting(containerEl)
            .setName('是否改用点线形式的时间轴')
            .setDesc('默认使用圆角矩形样式的时间轴')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.weatherUseLine)
                .onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.weatherUseLine = val;
                    yield this.saveSettings({ rerenderSettings: true, refreshViews: true });
                }
            )));
    // Embed banner height
        if (this.plugin.settings.weatherUseLine) {
            new obsidian.Setting(containerEl)
                .setName('点半径')
                .setDesc('输入数字，建议0-10')
                .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.timeLineRadius));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.timeLineRadius = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
            new obsidian.Setting(containerEl)
                .setName('线宽')
                .setDesc('输入数字，建议0-10')
                .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.timeLineWidth));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.timeLineWidth = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
            new obsidian.Setting(containerEl)
                .setName('虚线线型')
                .setDesc('用英文逗号分割数字。0代表实线，5,5代表每隔5像素画一段虚线')
                .addText(text => {
                text.setValue(String(this.plugin.settings.timeLineDash));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    var reg=/^\d+(,\d+)*$/
                    
                    this.plugin.settings.timeLineDash = reg.test(val) ?  val: this.plugin.settings.timeLineDash;
                    // this.plugin.settings.timeLineDash = reg.test(val)? val:this.plugin.settings.timeLineDash
                    // this.plugin.settings.timeLineDash = val? val:this.plugin.settings.timeLineDash
                    yield this.saveSettings();
                }));
            });
            new obsidian.Setting(containerEl)
                .setName('位置')
                .setDesc('输入数字，建议0-10')
                .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.timeLineLocated));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.timeLineLocated = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
        }else{
            new obsidian.Setting(containerEl)
                .setName('时间轴宽度')
                .setDesc('输入数字，建议0-10')
                .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.timeBarWidth));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.timeBarWidth = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
            new obsidian.Setting(containerEl)
                .setName('时间轴圆角')
                .setDesc('输入数字，建议0-10')
                .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.timeBarRadius));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.timeBarRadius = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
            new obsidian.Setting(containerEl)
                .setName('时间轴位置')
                .setDesc('输入数字，建议0-10')
                .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.timeBarLocated));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.timeBarLocated = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
            
           


        }
        // ===================
        

        containerEl.createEl('h3', { text: '时间备注样式' });
        new obsidian.Setting(containerEl)
            .setName('宽度')
            .setDesc('输入数字，建议0-10')
            .addText(text => {
            text.inputEl.type = 'number';
            text.setValue(String(this.plugin.settings.timeNoteWidth));
            text.setPlaceholder(`文本框提示文字`);
            text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.timeNoteWidth = val ? parseInt(val) : null;
                yield this.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('位置')
            .setDesc('输入数字，建议0-10')
            .addText(text => {
            text.inputEl.type = 'number';
            text.setValue(String(this.plugin.settings.timeNoteLocated));
            text.setPlaceholder(`文本框提示文字`);
            text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.timeNoteLocated = val ? parseInt(val) : null;
                yield this.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('圆角')
            .setDesc('输入数字，建议0-10')
            .addText(text => {
            text.inputEl.type = 'number';
            text.setValue(String(this.plugin.settings.timeNoteRadius));
            text.setPlaceholder(`文本框提示文字`);
            text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.timeNoteRadius = val ? parseInt(val) : null;
                yield this.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('描边宽度')
            .setDesc('输入数字，建议0-10')
            .addText(text => {
            text.inputEl.type = 'number';
            text.setValue(String(this.plugin.settings.timeNoteStrokewidth));
            text.setPlaceholder(`文本框提示文字`);
            text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.timeNoteStrokewidth = val ? parseInt(val) : null;
                yield this.saveSettings();
            }));
        });
        new obsidian.Setting(containerEl)
            .setName('描边线型')
            .setDesc('用英文逗号分割数字。0代表实线，5,5代表每隔5像素画一段虚线，n代表无描边')
            .addText(text => {
            text.setValue(String(this.plugin.settings.timeNoteStrokeDash));
            text.setPlaceholder(`文本框提示文字`);
            text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                var reg=/^\d+(,\d+)*$|n/
                this.plugin.settings.timeNoteStrokeDash = reg.test(val) ? val: this.plugin.settings.timeLineDash;
                yield this.saveSettings();
            }));
        });

        containerEl.createEl('h2', { text: '月历视图' });
        new obsidian.Setting(containerEl)
        .setName(("是否显示待办"))
        .setDesc(("在月历视图显示待办"))
        .addToggle((containerEl=>{containerEl.setValue(this.plugin.settings.showTodo),
            containerEl.onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.showTodo= value;
                yield this.plugin.saveSettings();
            }))
        }))
        new obsidian.Setting(containerEl)
        .setName(("是否显示日程"))
        .setDesc(("在月历视图显示日程"))
        .addToggle((containerEl=>{containerEl.setValue(this.plugin.settings.showSchedule),
            containerEl.onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.showSchedule= value;
                yield this.plugin.saveSettings();
            }))
        }))

        containerEl.createEl('h2', { text: '账单设置' });
        new obsidian.Setting(containerEl)
        .setName(("是否显示无开销日"))
        .setDesc(("开启后若当日无记录则显示--"))
        .addToggle((containerEl=>{containerEl.setValue(this.plugin.settings.showNobill),
            containerEl.onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.showNobill= value;
                yield this.plugin.saveSettings();
            }))
        }))
        // showBillLable
        new obsidian.Setting(containerEl)
        .setName(("是否显示账单数据标签"))
        .setDesc(("绘制月账单折线图"))
        .addToggle((containerEl=>{containerEl.setValue(this.plugin.settings.showBillLable),
            containerEl.onChange((value) => __awaiter(this, void 0, void 0, function* () {
                this.plugin.settings.showBillLable= value;
                yield this.plugin.saveSettings();
            }))
        }))

        new obsidian.Setting(containerEl)
                .setName('账单统计图宽度')
                .setDesc('输入数字，建议1000')
                .addText(text => {
                text.inputEl.type = 'number';
                text.setValue(String(this.plugin.settings.showBillWidth));
                text.setPlaceholder(`文本框提示文字`);
                text.onChange((val) => __awaiter(this, void 0, void 0, function* () {
                    this.plugin.settings.showBillWidth = val ? parseInt(val) : null;
                    yield this.saveSettings();
                }));
            });
        // showBillWidth
    }
}


module.exports = MyPlugin;