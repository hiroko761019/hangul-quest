const modes = {
  letters: { title: '🌱 Chapter1 文字の村', items: [
    // ㅏ（ア）
    ['가','カ/ガ'],['나','ナ'],['다','タ/ダ'],['라','ラ'],['마','マ'],['바','パ/バ'],['사','サ'],['아','ア'],['자','チャ/ジャ'],['차','チャ'],['카','カ'],['타','タ'],['파','パ'],['하','ハ'],
    // ㅓ（オ）
    ['거','コ/ゴ'],['너','ノ'],['더','ト/ド'],['러','ロ'],['머','モ'],['버','ポ/ボ'],['서','ソ'],['어','オ'],['저','チョ/ジョ'],['처','チョ'],['커','コ'],['터','ト'],['퍼','ポ'],['허','ホ'],
    // ㅗ（オ）
    ['고','コ/ゴ'],['노','ノ'],['도','ト/ド'],['로','ロ'],['모','モ'],['보','ポ/ボ'],['소','ソ'],['오','オ'],['조','チョ/ジョ'],['초','チョ'],['코','コ'],['토','ト'],['포','ポ'],['호','ホ'],
    // ㅜ（ウ）
    ['구','ク/グ'],['누','ヌ'],['두','トゥ/ドゥ'],['루','ル'],['무','ム'],['부','プ/ブ'],['수','ス'],['우','ウ'],['주','チュ/ジュ'],['추','チュ'],['쿠','ク'],['투','トゥ'],['푸','プ'],['후','フ'],
    // ㅡ（ウ）
    ['그','ク/グ'],['느','ヌ'],['드','トゥ/ドゥ'],['르','ル'],['므','ム'],['브','プ/ブ'],['스','ス'],['으','ウ'],['즈','チュ/ジュ'],['츠','チュ'],['크','ク'],['트','トゥ'],['프','プ'],['흐','フ'],
    // ㅣ（イ）
    ['기','キ/ギ'],['니','ニ'],['디','ティ/ディ'],['리','リ'],['미','ミ'],['비','ピ/ビ'],['시','シ'],['이','イ'],['지','チ/ジ'],['치','チ'],['키','キ'],['티','ティ'],['피','ピ'],['히','ヒ'],
    // よく出る追加母音
    ['개','ケ/ゲ'],['내','ネ'],['대','テ/デ'],['래','レ'],['매','メ'],['배','ペ/ベ'],['새','セ'],['애','エ'],['재','チェ/ジェ'],['채','チェ'],['해','ヘ'],
    ['게','ケ/ゲ'],['네','ネ'],['데','テ/デ'],['레','レ'],['메','メ'],['베','ペ/ベ'],['세','セ'],['에','エ'],['제','チェ/ジェ'],['체','チェ'],['헤','ヘ'],
    ['야','ヤ'],['여','ヨ'],['요','ヨ'],['유','ユ']
  ]},
  food: { title: '🍚 Chapter2 韓国料理の町', items: [
    ['김치','キムチ'],['비빔밥','ビビンバ'],['불고기','プルコギ'],['삼겹살','サムギョプサル'],
    ['떡볶이','トッポッキ'],['김밥','キンパ'],['된장찌개','テンジャンチゲ'],['냉면','ネンミョン'],
    ['고추장','コチュジャン'],['참기름','ごま油'],['간장','醤油'],['마늘','にんにく']
  ]},
  travel: { title: '🗺️ Chapter3 ソウル旅行クエスト', items: [
    ['서울','ソウル'],['인천공항','仁川空港'],['김포공항','金浦空港'],['명동','明洞'],
    ['홍대','弘大'],['성수','聖水'],['강남','江南'],['광장시장','広蔵市場'],
    ['동대문','東大門'],['한강','漢江'],['지하철','地下鉄'],['버스','バス'],
    ['택시','タクシー'],['출구','出口'],['입구','入口'],['환승','乗り換え'],
    ['화장실','トイレ'],['편의점','コンビニ'],['호텔','ホテル'],['계산','お会計'],
    ['이거 주세요','これください'],['얼마예요','いくらですか'],['물 주세요','水ください'],['감사합니다','ありがとうございます']
  ]},
  bts: { title: '💜 Chapter4 BTSの森', items: [
    ['지민','ジミン'],['정국','ジョングク'],['뷔','V / テテ'],['방탄소년단','BTS'],
    ['아미','ARMY'],['사랑해요','愛してます'],['보고 싶어요','会いたいです'],['괜찮아요','大丈夫です']
  ]},
  recipe: { title: '👩‍🍳 Chapter5 レシピの塔', items: [
    ['양파','玉ねぎ'],['대파','長ねぎ'],['계란','卵'],['두부','豆腐'],
    ['돼지고기','豚肉'],['소고기','牛肉'],['닭고기','鶏肉'],['물','水'],
    ['넣다','入れる'],['볶다','炒める'],['끓이다','煮る/沸かす'],['썰다','切る'],
    ['한 큰술','大さじ1'],['반 컵','半カップ'],['약불','弱火'],['중불','中火']
  ]}
};

let currentMode = 'letters';
let pool = [...modes[currentMode].items];
let deck = [];
let current = null;
let score = 0, total = 0, streak = 0;
let wrongs = [];
let answered = false;

const $ = id => document.getElementById(id);
const modeButtons = $('modeButtons'), choices = $('choices');

function shuffle(arr){ return [...arr].sort(() => Math.random() - 0.5); }
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

function renderModes(){
  modeButtons.innerHTML = '';
  Object.entries(modes).forEach(([key, mode]) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = mode.title.replace(/^.+? /,'');
    btn.className = key === currentMode ? 'active' : '';
    btn.addEventListener('click', () => setMode(key));
    modeButtons.appendChild(btn);
  });
}

function setMode(key){
  currentMode = key;
  pool = [...modes[key].items];
  deck = [];
  renderModes();
  nextQuestion();
}

function makeChoices(answer){
  const allAnswers = modes[currentMode].items.map(i => i[1]);
  const options = new Set([answer]);
  while(options.size < 4) options.add(pick(allAnswers));
  return shuffle([...options]);
}

function nextQuestion(){
  answered = false;
  $('result').textContent = '';
  $('result').className = 'result';
  $('modeTitle').textContent = modes[currentMode].title;
  if(!deck.length) deck = shuffle(pool);
  current = deck.pop();
  $('question').textContent = current[0];
  $('hint').textContent = currentMode === 'letters' ? `全${pool.length}文字・同じ問題は一周するまで出ないよ` : '読み・意味を選んでね';
  choices.innerHTML = '';
  makeChoices(current[1]).forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = opt;
    btn.addEventListener('click', () => answer(btn, opt));
    choices.appendChild(btn);
  });
}

function answer(btn, opt){
  if(answered) return;
  answered = true;
  total++;
  if(opt === current[1]){
    score++; streak++;
    btn.classList.add('correct');
    $('result').textContent = '正解！いい感じ！';
    $('result').className = 'result ok';
  } else {
    streak = 0;
    btn.classList.add('wrong');
    wrongs.push(current);
    $('result').textContent = `おしい！正解は「${current[1]}」`;
    $('result').className = 'result bad';
    [...choices.children].forEach(b => { if(b.textContent === current[1]) b.classList.add('correct'); });
  }
  updateStats();
}

function updateStats(){
  $('score').textContent = score;
  $('total').textContent = total;
  $('streak').textContent = streak;
  const unique = [...new Map(wrongs.map(w => [w[0], w])).values()];
  $('wrongList').textContent = unique.length ? unique.map(w => `${w[0]} → ${w[1]}`).join(' / ') : 'まだ間違いはないよ。天才か。';
}

$('nextBtn').addEventListener('click', nextQuestion);
$('reviewBtn').addEventListener('click', () => {
  const unique = [...new Map(wrongs.map(w => [w[0], w])).values()];
  if(!unique.length){ $('wrongList').textContent = '復習する問題がない！すばらしい。'; return; }
  modes.review = { title: '🔥 復習の洞窟', items: unique };
  setMode('review');
});

renderModes();
nextQuestion();
