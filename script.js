const STORAGE_KEY = 'hangulQuestVer12';

const vowelSets = [
  {id:'a',icon:'🌲',title:'アの森',desc:'ㅏの文字を読もう',vowel:'ㅏ',target:14},
  {id:'eo',icon:'🛤️',title:'オの小道',desc:'ㅓの文字を読もう',vowel:'ㅓ',target:14},
  {id:'o',icon:'⛰️',title:'オの丘',desc:'ㅗの文字を読もう',vowel:'ㅗ',target:14},
  {id:'u',icon:'🏞️',title:'ウの川',desc:'ㅜの文字を読もう',vowel:'ㅜ',target:14},
  {id:'eu',icon:'🌾',title:'ウの草原',desc:'ㅡの文字を読もう',vowel:'ㅡ',target:14},
  {id:'i',icon:'🌸',title:'イの庭',desc:'ㅣの文字を読もう',vowel:'ㅣ',target:14}
];

const itemMap = {
  'ㅏ':[
    ['가','カ/ガ'],['나','ナ'],['다','タ/ダ'],['라','ラ'],['마','マ'],['바','パ/バ'],['사','サ'],
    ['아','ア'],['자','チャ/ジャ'],['차','チャ'],['카','カ'],['타','タ'],['파','パ'],['하','ハ']
  ],
  'ㅓ':[
    ['거','コ/ゴ'],['너','ノ'],['더','ト/ド'],['러','ロ'],['머','モ'],['버','ポ/ボ'],['서','ソ'],
    ['어','オ'],['저','チョ/ジョ'],['처','チョ'],['커','コ'],['터','ト'],['퍼','ポ'],['허','ホ']
  ],
  'ㅗ':[
    ['고','コ/ゴ'],['노','ノ'],['도','ト/ド'],['로','ロ'],['모','モ'],['보','ポ/ボ'],['소','ソ'],
    ['오','オ'],['조','チョ/ジョ'],['초','チョ'],['코','コ'],['토','ト'],['포','ポ'],['호','ホ']
  ],
  'ㅜ':[
    ['구','ク/グ'],['누','ヌ'],['두','トゥ/ドゥ'],['루','ル'],['무','ム'],['부','プ/ブ'],['수','ス'],
    ['우','ウ'],['주','チュ/ジュ'],['추','チュ'],['쿠','ク'],['투','トゥ'],['푸','プ'],['후','フ']
  ],
  'ㅡ':[
    ['그','ク/グ'],['느','ヌ'],['드','トゥ/ドゥ'],['르','ル'],['므','ム'],['브','プ/ブ'],['스','ス'],
    ['으','ウ'],['즈','チュ/ジュ'],['츠','チュ'],['크','ク'],['트','トゥ'],['프','プ'],['흐','フ']
  ],
  'ㅣ':[
    ['기','キ/ギ'],['니','ニ'],['디','ティ/ディ'],['리','リ'],['미','ミ'],['비','ピ/ビ'],['시','シ'],
    ['이','イ'],['지','チ/ジ'],['치','チ'],['키','キ'],['티','ティ'],['피','ピ'],['히','ヒ']
  ],
  'ㅑ':[
    ['갸','キャ/ギャ'],['냐','ニャ'],['댜','テャ/デャ'],['랴','リャ'],['먀','ミャ'],['뱌','ピャ/ビャ'],['샤','シャ'],
    ['야','ヤ'],['쟈','チャ/ジャ'],['챠','チャ'],['캬','キャ'],['탸','テャ'],['퍄','ピャ'],['햐','ヒャ']
  ],
  'ㅕ':[
    ['겨','キョ/ギョ'],['녀','ニョ'],['뎌','ティョ/ディョ'],['려','リョ'],['며','ミョ'],['벼','ピョ/ビョ'],['셔','ショ'],
    ['여','ヨ'],['져','チョ/ジョ'],['쳐','チョ'],['켜','キョ'],['텨','ティョ'],['펴','ピョ'],['혀','ヒョ']
  ],
  'ㅛ':[
    ['교','キョ/ギョ'],['뇨','ニョ'],['됴','ティョ/ディョ'],['료','リョ'],['묘','ミョ'],['뵤','ピョ/ビョ'],['쇼','ショ'],
    ['요','ヨ'],['죠','チョ/ジョ'],['쵸','チョ'],['쿄','キョ'],['툐','ティョ'],['표','ピョ'],['효','ヒョ']
  ],
  'ㅠ':[
    ['규','キュ/ギュ'],['뉴','ニュ'],['듀','テュ/デュ'],['류','リュ'],['뮤','ミュ'],['뷰','ピュ/ビュ'],['슈','シュ'],
    ['유','ユ'],['쥬','チュ/ジュ'],['츄','チュ'],['큐','キュ'],['튜','テュ'],['퓨','ピュ'],['휴','ヒュ']
  ]
};

function makeItems(vowel){
  return itemMap[vowel];
}

const basicVowels = [
  ['아','ア'],['어','オ'],['오','オ'],['우','ウ'],['으','ウ'],['이','イ'],
  ['야','ヤ'],['여','ヨ'],['요','ヨ'],['유','ユ']
];

const yItems = [...makeItems('ㅑ'),...makeItems('ㅕ'),...makeItems('ㅛ'),...makeItems('ㅠ')];

const stages = [
  {id:'vowels',icon:'💧',title:'母音の泉',desc:'基本母音10個',target:10,items:basicVowels},
  ...vowelSets.map(v=>({...v,items:makeItems(v.vowel)})),
  {id:'y',icon:'🌙',title:'ヤ・ヨ・ユの夜道',desc:'ㅑ ㅕ ㅛ ㅠ を攻略',target:20,items:yItems},
  {id:'mix',icon:'🪨',title:'まぎらわしい洞窟',desc:'全エリアからランダム出題',target:30,items:[]},
  {id:'boss',icon:'🏰',title:'村長の試練',desc:'40問クリアで文字の村制覇',target:40,items:[]}
];

const allLearningItems = [
  ...basicVowels,
  ...vowelSets.flatMap(v=>makeItems(v.vowel)),
  ...yItems
];
stages[8].items = allLearningItems;
stages[9].items = allLearningItems;

const defaults = {
  score:0,total:0,streak:0,exp:0,level:1,
  learned:[],wrongs:[],todayLearned:[],lastDate:'',
  clears:{},unlocked:0,currentStage:0
};

let state = load();
let currentStage = Math.min(state.currentStage || 0, stages.length-1);
let current = null;
let deck = [];
let answered = false;
let reviewMode = false;

const $ = id => document.getElementById(id);

function load(){
  try{return {...defaults,...JSON.parse(localStorage.getItem(STORAGE_KEY))}}catch{return {...defaults}}
}
function save(){state.currentStage=currentStage;localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function shuffle(a){
  const b=[...a];
  for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}
  return b;
}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function unique(a){return [...new Map(a.map(x=>[x[0],x])).values()]}
function today(){
  const d=new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}
function syncDay(){
  if(state.lastDate!==today()){state.lastDate=today();state.todayLearned=[];save()}
}
function needExp(){return state.level*50}
function addExp(n){
  state.exp+=n;
  if(state.exp>=needExp()){
    state.exp-=needExp();state.level++;
    $('modalLevel').textContent=state.level;$('modal').hidden=false;celebrate(34);
  }
}
function title(){
  if((state.clears.boss||0)>=stages[9].target)return '文字の村マスター';
  if(state.learned.length>=80)return '文字の探検家';
  return 'ハングル見習い';
}
function renderStats(){
  $('score').textContent=state.score;$('total').textContent=state.total;$('streak').textContent=state.streak;
  $('learnedCount').textContent=state.learned.length;$('level').textContent=state.level;
  $('exp').textContent=state.exp;$('nextExp').textContent=needExp();
  $('expFill').style.width=`${Math.min(100,state.exp/needExp()*100)}%`;
  $('levelHint').textContent=`あと${Math.max(1,Math.ceil((needExp()-state.exp)/10))}問くらいでレベルアップ！`;
  $('titleBadge').textContent=title();
}
function renderStages(){
  const root=$('stageMap');root.innerHTML='';
  stages.forEach((s,i)=>{
    const unlocked=i<=state.unlocked;
    const c=state.clears[s.id]||0;
    const done=c>=s.target;
    const b=document.createElement('button');
    b.type='button';b.disabled=!unlocked;
    b.className=`stage${i===currentStage&&!reviewMode?' active':''}${!unlocked?' locked':''}`;
    b.innerHTML=`<span class="stage-icon">${unlocked?s.icon:'🔒'}</span>
      <span><span class="stage-name">${s.title}</span><span class="stage-desc">${s.desc}</span></span>
      <span class="stage-status">${done?'クリア✨':unlocked?`${Math.min(c,s.target)}/${s.target}`:'未解放'}</span>`;
    b.onclick=()=>{reviewMode=false;currentStage=i;deck=[];renderAll();nextQuestion();$('quizCard').scrollIntoView({behavior:'smooth'})};
    root.appendChild(b);
  });
}
function currentPool(){return reviewMode?unique(state.wrongs):stages[currentStage].items}
function makeChoices(answer,type){
  const source=unique(allLearningItems);
  const candidates=type==='reading'?source.map(x=>x[1]):source.map(x=>x[0]);
  const set=new Set([answer]);
  while(set.size<4)set.add(pick(candidates));
  return shuffle([...set]);
}
function nextQuestion(){
  const pool=currentPool();
  if(!pool.length){
    reviewMode=false;message('復習完了！文字の村へ戻ろう。','🎉');renderAll();return;
  }
  answered=false;$('nextBtn').disabled=true;
  $('result').textContent='';$('result').className='result';
  if(!deck.length)deck=shuffle(pool);
  current=deck.pop();
  const reading=Math.random()<.62;
  const s=reviewMode?{title:'復習の小屋',icon:'🔥'}:stages[currentStage];
  $('stageTitle').textContent=`${s.icon} ${s.title}`;
  $('stageProgress').textContent=reviewMode?`${unique(state.wrongs).length}文字を復習中`:`${Math.min(state.clears[s.id]||0,s.target)} / ${s.target}`;
  $('questionType').textContent=reading?'読み方':'文字さがし';
  $('questionLabel').textContent=reading?'この文字はどう読む？':`「${current[1]}」はどれ？`;
  $('question').textContent=reading?current[0]:'？';

  const correct=reading?current[1]:current[0];
  const root=$('choices');root.innerHTML='';
  makeChoices(correct,reading?'reading':'letter').forEach(opt=>{
    const b=document.createElement('button');b.type='button';b.textContent=opt;
    b.onclick=()=>answer(b,opt,correct);root.appendChild(b);
  });
}
function answer(btn,opt,correct){
  if(answered)return;answered=true;state.total++;
  [...$('choices').children].forEach(b=>b.disabled=true);
  if(opt===correct){
    state.score++;state.streak++;btn.classList.add('correct');addExp(10);
    if(!state.learned.includes(current[0]))state.learned.push(current[0]);
    if(!state.todayLearned.includes(current[0]))state.todayLearned.push(current[0]);
    if(reviewMode)state.wrongs=state.wrongs.filter(x=>x[0]!==current[0]);
    else{
      const s=stages[currentStage];state.clears[s.id]=(state.clears[s.id]||0)+1;
      if(state.clears[s.id]===s.target && currentStage<stages.length-1){
        state.unlocked=Math.max(state.unlocked,currentStage+1);
        message(`${s.title}クリア！「${stages[currentStage+1].title}」が開いたよ！`,'🎉');celebrate(30);
      }else message(pick(['やった！読めたね！','いい感じ！文字と音がつながってきたよ。','잘했어요！ よくできました！','その調子！次もいってみよう。']),'🧚');
    }
    $('result').textContent=state.streak>=5?`正解！${state.streak}問連続✨`:'正解！ +10 EXP';
    $('result').className='result ok';animate('flash');
    if(state.streak%5===0)celebrate(16);
  }else{
    state.streak=0;btn.classList.add('wrong');
    const right=[...$('choices').children].find(b=>b.textContent===correct);if(right)right.classList.add('correct');
    state.wrongs=unique([...state.wrongs,current]);
    $('result').textContent=`おしい！正解は「${correct}」`;
    $('result').className='result bad';animate('shake');
    message('大丈夫。復習の小屋に入れておいたよ。一緒に覚えよう！','🌱');
  }
  save();renderAll();$('nextBtn').disabled=false;
}
function animate(cls){const q=$('quizCard');q.classList.remove(cls);void q.offsetWidth;q.classList.add(cls)}
function message(text,icon){
  $('hanguriMessage').textContent=text;
  document.querySelector('.companion-name').textContent=`${icon} ハングリ`;
}
function renderToday(){
  $('todayCount').textContent=`${state.todayLearned.length}文字`;
  const root=$('todayLetters');
  if(!state.todayLearned.length){root.className='chips empty';root.textContent='正解するとここに増えるよ。'}
  else{root.className='chips';root.innerHTML=state.todayLearned.map(x=>`<span class="chip">${x}</span>`).join('')}
}
function renderReview(){
  const w=unique(state.wrongs);$('wrongCount').textContent=`${w.length}問`;
  $('wrongList').textContent=w.length?w.slice(0,10).map(x=>`${x[0]} → ${x[1]}`).join(' / ')+(w.length>10?' …':''):'まだ間違いはないよ。天才か。';
  $('reviewBtn').disabled=!w.length;
}
function renderDictionary(){
  const all=unique(allLearningItems);$('dictionaryCount').textContent=`${state.learned.length} / ${all.length}`;
  $('dictionary').innerHTML=all.map(x=>state.learned.includes(x[0])
    ?`<div class="dictionary-item"><span class="char">${x[0]}</span><span class="read">${x[1]}</span></div>`
    :`<div class="dictionary-item locked"><span class="char">？</span><span class="read">未発見</span></div>`).join('');
}
function renderAll(){renderStats();renderStages();renderToday();renderReview();renderDictionary()}
function celebrate(n=24){
  const root=$('confetti'),colors=['#7656d6','#f58a45','#22a06b','#f5c84b','#e05b9f'];
  for(let i=0;i<n;i++){
    const p=document.createElement('span');p.className='confetti';
    p.style.left=`${Math.random()*100}%`;p.style.background=pick(colors);p.style.animationDelay=`${Math.random()*.3}s`;
    root.appendChild(p);setTimeout(()=>p.remove(),1600);
  }
}
$('nextBtn').onclick=nextQuestion;
$('reviewBtn').onclick=()=>{if(!state.wrongs.length)return;reviewMode=true;deck=[];renderAll();nextQuestion();$('quizCard').scrollIntoView({behavior:'smooth'})};
$('resetBtn').onclick=()=>{if(!confirm('すべての冒険記録をリセットしますか？'))return;localStorage.removeItem(STORAGE_KEY);state={...defaults};currentStage=0;deck=[];reviewMode=false;syncDay();renderAll();nextQuestion();message('母音の泉から、もう一度冒険スタート！','🌱')};
$('closeModal').onclick=()=>{$('modal').hidden=true};
document.querySelector('[data-scroll="village"]').onclick=()=>document.getElementById('village').scrollIntoView({behavior:'smooth'});
syncDay();renderAll();nextQuestion();
