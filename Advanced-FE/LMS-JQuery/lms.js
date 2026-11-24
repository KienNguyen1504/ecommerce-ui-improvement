(function(){
'use strict';
const $id=id=>document.getElementById(id);
function deadlineFor(activity){
 const dates=activity.querySelector('.activity-dates, .activity-due-date, .availabilityinfo, .description');
 const text=(dates?dates.textContent:activity.textContent).trim();
 const match=text.match(/(?:Hạn nộp|Due|Deadline|Ngày kết thúc)\s*:?\s*([^\n|]+)/i);
 return match ? match[1].trim() : (dates?text:'Chưa hiển thị hạn nộp');
}
function analyzeDOM(container){
 const sections=[...container.querySelectorAll('.course-section, .section.course-section, .topics .section')];
 const allAssignments=[...container.querySelectorAll('.modtype_assign')];
 const topics=sections.map((section,index)=>{
  const title=section.querySelector('.sectionname, .section-title, .sectionname a, h3, h2')?.textContent.trim()||('Chủ đề '+(index+1));
  const exercises=[...section.querySelectorAll('.modtype_assign')].map(a=>({
    title:a.querySelector('.instancename, .activityname, a')?.textContent.trim()||'Bài tập không tên',
    deadline:deadlineFor(a)
  }));
  return {title,exercises};
 });
 const fifth=allAssignments[4];
 return {total:allAssignments.length,fifth:fifth?{title:fifth.querySelector('.instancename, .activityname, a')?.textContent.trim()||'Bài tập thứ 5',deadline:deadlineFor(fifth)}:null,topics};
}
function analyzeJquery(root){
 const $=window.jQuery;
 const assignments=$(root).find('.modtype_assign');
 const fifth=assignments.eq(4);
 const topics=[];
 $(root).find('.course-section').each(function(index){
  const $section=$(this);const ex=[];
  $section.find('.modtype_assign').each(function(){
   ex.push({title:$(this).find('.instancename').first().text().trim(),deadline:deadlineFor(this)});
  });
  topics.push({title:$section.find('.sectionname').first().text().trim()||'Chủ đề '+(index+1),exercises:ex});
 });
 return {total:assignments.length,fifth:fifth.length?{title:fifth.find('.instancename').first().text().trim(),deadline:deadlineFor(fifth[0])}:null,topics};
}
function renderReport(data){
 const target=$id('lmsResults');if(!target)return;
 target.replaceChildren();
 const small=document.createElement('p');small.textContent=data.total+' bài tập được tìm thấy';small.className='section-note';target.append(small);
 const fifth=document.createElement('div');fifth.className='fifth';fifth.textContent=data.fifth?('Bài nộp thứ 5: '+data.fifth.title+' — '+data.fifth.deadline):'Không có đủ 5 bài nộp trên trang.';target.append(fifth);
 for(const topic of data.topics){
  const box=document.createElement('div');box.className='topic-report';const b=document.createElement('strong');b.textContent=topic.title;box.append(b);
  const note=document.createElement('p');note.style.cssText='color:#75839c;font-size:12px;margin:3px 0 7px';note.textContent=topic.exercises.length?topic.exercises.length+' bài tập':'Không có bài tập';box.append(note);
  if(topic.exercises.length){const ul=document.createElement('ul');for(const ex of topic.exercises){const li=document.createElement('li');li.textContent=ex.title+' · '+ex.deadline;ul.append(li);}box.append(ul);}target.append(box);
 }
}
function run(){const mock=$id('mockCourse');const data=window.jQuery?analyzeJquery(mock):analyzeDOM(mock);console.log('Kết quả phân tích LMS (dữ liệu mẫu):',data);renderReport(data);}
$id('analyzeBtn')?.addEventListener('click',run);
window.addEventListener('DOMContentLoaded',run);
})();