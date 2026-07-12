/**
 * モックデータ - ローカル開発用
 */

import type { Word, Idiom, Grammar, GrammarQuestion, Reading, ReadingQuestion, Listening, ListeningQuestion } from '@/types'

/** モック単語データ（150語） */
export const mockWords: Word[] = [
  { id: '1', word: 'abandon', reading: 'əbǽndən', meaning: '～を放棄する、見捨てる', example_sentence: 'The crew abandoned the sinking ship.', example_translation: '乗組員は沈む船を放棄した。', category: '動詞', level: 1, frequency: 100 },
  { id: '2', word: 'ability', reading: 'əbíləti', meaning: '能力、才能', example_sentence: 'She has the ability to speak three languages.', example_translation: '彼女は3カ国語を話す能力がある。', category: '名詞', level: 1, frequency: 95 },
  { id: '3', word: 'absence', reading: 'ǽbsəns', meaning: '不在、欠席', example_sentence: 'His absence was noticed by everyone.', example_translation: '彼の不在は全員に気づかれた。', category: '名詞', level: 1, frequency: 90 },
  { id: '4', word: 'accept', reading: 'æksépt', meaning: '受け取る、認める', example_sentence: 'I cannot accept your offer.', example_translation: 'あなたの申し出は受け入れられません。', category: '動詞', level: 1, frequency: 88 },
  { id: '5', word: 'achieve', reading: 'ətʃíːv', meaning: '達成する、成し遂げる', example_sentence: 'She achieved her goal of becoming a doctor.', example_translation: '彼女は医師になる目標を達成しました。', category: '動詞', level: 1, frequency: 85 },
  { id: '6', word: 'act', reading: 'ǽkt', meaning: '行動する、演技する', example_sentence: 'You must act quickly.', example_translation: '素早く行動しなければならない。', category: '動詞', level: 1, frequency: 82 },
  { id: '7', word: 'action', reading: 'ǽkʃən', meaning: '行動、アクション', example_sentence: 'Actions speak louder than words.', example_translation: '行動は言葉よりも雄弁だ。', category: '名詞', level: 1, frequency: 80 },
  { id: '8', word: 'active', reading: 'ǽktiv', meaning: '活動的な、積極的な', example_sentence: 'He is an active member of the club.', example_translation: '彼はクラブの活動的なメンバーです。', category: '形容詞', level: 1, frequency: 78 },
  { id: '9', word: 'actual', reading: 'ǽktʃuəl', meaning: '実際の、現実の', example_sentence: 'This is the actual situation.', example_translation: 'これが実際の状況です。', category: '形容詞', level: 1, frequency: 75 },
  { id: '10', word: 'address', reading: 'ədrés', meaning: '住所、演説する', example_sentence: 'What is your address?', example_translation: 'あなたの住所は何ですか？', category: '名詞', level: 1, frequency: 73 },
  { id: '11', word: 'advantage', reading: 'ædvǽntidʒ', meaning: '利点、優位', example_sentence: 'Speed is a big advantage.', example_translation: 'スピードは大きな利点だ。', category: '名詞', level: 1, frequency: 70 },
  { id: '12', word: 'advice', reading: 'ædváis', meaning: 'アドバイス、忠告', example_sentence: 'Can you give me some advice?', example_translation: '私にアドバイスをくれますか？', category: '名詞', level: 1, frequency: 68 },
  { id: '13', word: 'affect', reading: 'əfékt', meaning: '影響を与える', example_sentence: 'The weather affected our plans.', example_translation: '天候が私たちの計画に影響を与えました。', category: '動詞', level: 1, frequency: 65 },
  { id: '14', word: 'afford', reading: 'əfɔ́ːrd', meaning: '（金銭的に）余裕がある', example_sentence: 'I cannot afford a new car.', example_translation: '新車を買う余裕はありません。', category: '動詞', level: 1, frequency: 63 },
  { id: '15', word: 'afraid', reading: 'əfréid', meaning: '恐れている', example_sentence: 'Don\'t be afraid of making mistakes.', example_translation: '間違いを恐れないでください。', category: '形容詞', level: 1, frequency: 60 },
  { id: '16', word: 'agent', reading: 'éidʒənt', meaning: '代理人、エージェント', example_sentence: 'My agent will handle the contract.', example_translation: '私のエージェントが契約を処理します。', category: '名詞', level: 1, frequency: 58 },
  { id: '17', word: 'agree', reading: 'əgríː', meaning: '同意する', example_sentence: 'I agree with your opinion.', example_translation: 'あなたの意見に同意します。', category: '動詞', level: 1, frequency: 55 },
  { id: '18', word: 'agreement', reading: 'əgríːmənt', meaning: '同意、協定', example_sentence: 'We reached an agreement.', example_translation: '合意に達しました。', category: '名詞', level: 1, frequency: 53 },
  { id: '19', word: 'ahead', reading: 'əhéd', meaning: '前方に、先に', example_sentence: 'Go straight ahead.', example_translation: '真っ直ぐ進んでください。', category: '副詞', level: 1, frequency: 50 },
  { id: '20', word: 'aim', reading: 'éim', meaning: 'ねらう、目標', example_sentence: 'Aim for the stars!', example_translation: '星を目指せ！', category: '動詞/名詞', level: 1, frequency: 48 },
  { id: '21', word: 'air', reading: 'ɛ́ər', meaning: '空気、大気', example_sentence: 'Fresh air is good for health.', example_translation: '新鮮な空気は健康に良い。', category: '名詞', level: 1, frequency: 45 },
  { id: '22', word: 'alarm', reading: 'əlɑ́ːrm', meaning: '警報、アラーム', example_sentence: 'The alarm went off at 6 AM.', example_translation: 'アラームが朝6時に鳴りました。', category: '名詞', level: 1, frequency: 43 },
  { id: '23', word: 'alive', reading: 'əláiv', meaning: '生きている', example_sentence: 'The plant is still alive.', example_translation: 'その植物はまだ生きている。', category: '形容詞', level: 1, frequency: 40 },
  { id: '24', word: 'allow', reading: 'əláu', meaning: '許可する', example_sentence: 'Smoking is not allowed here.', example_translation: 'ここでの喫煙は許可されていません。', category: '動詞', level: 1, frequency: 38 },
  { id: '25', word: 'almost', reading: 'ɔ́ːlmost', meaning: 'ほとんど', example_sentence: 'The work is almost done.', example_translation: '仕事はほぼ完了しました。', category: '副詞', level: 1, frequency: 35 },
  { id: '26', word: 'alone', reading: 'əlóun', meaning: '一人で、単独で', example_sentence: 'She lives alone.', example_translation: '彼女は一人で住んでいます。', category: '副詞', level: 1, frequency: 33 },
  { id: '27', word: 'along', reading: 'əlɔ́ŋ', meaning: '沿って、一緒に', example_sentence: 'Walk along the river.', example_translation: '川沿いに歩いてください。', category: '前置詞', level: 1, frequency: 30 },
  { id: '28', word: 'already', reading: 'ɔːlrédi', meaning: 'すでに', example_sentence: 'I have already finished.', example_translation: '私は既に終わらせました。', category: '副詞', level: 1, frequency: 28 },
  { id: '29', word: 'also', reading: 'ɔ́ːlsou', meaning: 'また、同様に', example_sentence: 'I also like coffee.', example_translation: '私もコーヒーが好きです。', category: '副詞', level: 1, frequency: 25 },
  { id: '30', word: 'although', reading: 'ɔːldɔ́u', meaning: '～だけれども', example_sentence: 'Although it rained, we went out.', example_translation: '雨が降りましたが、私たちは外出しました。', category: '接続詞', level: 1, frequency: 23 },
  { id: '31', word: 'always', reading: 'ɔ́ːlweiz', meaning: 'いつも', example_sentence: 'She is always on time.', example_translation: '彼女はいつも時間通りです。', category: '副詞', level: 1, frequency: 20 },
  { id: '32', word: 'amount', reading: 'əmáunt', meaning: '量、額', example_sentence: 'A large amount of money', example_translation: '多額の金', category: '名詞', level: 1, frequency: 18 },
  { id: '33', word: 'anger', reading: 'ǽŋɡər', meaning: '怒り', example_sentence: 'He could not hide his anger.', example_translation: '彼は怒りを隠せなかった。', category: '名詞', level: 1, frequency: 16 },
  { id: '34', word: 'angle', reading: 'ǽŋɡl', meaning: '角度、角', example_sentence: 'Right angle is 90 degrees.', example_translation: '直角は90度です。', category: '名詞', level: 1, frequency: 15 },
  { id: '35', word: 'angry', reading: 'ǽŋɡri', meaning: '怒った', example_sentence: 'Don\'t be angry with me.', example_translation: '私を怒らないでください。', category: '形容詞', level: 1, frequency: 14 },
  { id: '36', word: 'animal', reading: 'ǽniməl', meaning: '動物', example_sentence: 'Dogs are faithful animals.', example_translation: '犬は忠実な動物です。', category: '名詞', level: 1, frequency: 13 },
  { id: '37', word: 'announce', reading: 'ənáuns', meaning: '発表する、告知する', example_sentence: 'They announced the results.', example_translation: '彼らは結果を発表しました。', category: '動詞', level: 1, frequency: 12 },
  { id: '38', word: 'annual', reading: 'ǽnjuəl', meaning: '年1回の、毎年の', example_sentence: 'The annual meeting is in July.', example_translation: '年次総会は7月です。', category: '形容詞', level: 1, frequency: 11 },
  { id: '39', word: 'another', reading: 'ənʌ́ðər', meaning: 'もう一つの', example_sentence: 'Can I have another cup?', example_translation: 'もう一杯いただけますか？', category: '形容詞', level: 1, frequency: 10 },
  { id: '40', word: 'answer', reading: 'ǽnsər', meaning: '回答、答える', example_sentence: 'Do you know the answer?', example_translation: '答えを知っていますか？', category: '名詞', level: 1, frequency: 9 },
  { id: '41', word: 'arrive', reading: 'əráiv', meaning: '到着する', example_sentence: 'I arrived at the station on time.', example_translation: '私は駅に時間通り着きました。', category: '動詞', level: 1, frequency: 100 },
  { id: '42', word: 'ask', reading: 'ǽsk', meaning: '頼む、質問する', example_sentence: 'Can I ask you a question?', example_translation: '質問をしてもいいですか？', category: '動詞', level: 1, frequency: 98 },
  { id: '43', word: 'associate', reading: 'əsóuʃieit', meaning: '連想する、関連付ける', example_sentence: 'I associate summer with the sea.', example_translation: '夏といえば海を連想します。', category: '動詞', level: 1, frequency: 96 },
  { id: '44', word: 'assume', reading: 'əsjúːm', meaning: '仮定する、当然と思う', example_sentence: 'I assume you are tired.', example_translation: '疲れていると思います。', category: '動詞', level: 1, frequency: 94 },
  { id: '45', word: 'attempt', reading: 'ətémpt', meaning: '試みる、企てる', example_sentence: 'He attempted to climb the mountain.', example_translation: '彼は山に登ろうとしました。', category: '動詞', level: 1, frequency: 92 },
  { id: '46', word: 'attend', reading: 'əténd', meaning: '出席する', example_sentence: 'Did you attend the meeting?', example_translation: '会議に出席しましたか？', category: '動詞', level: 1, frequency: 90 },
  { id: '47', word: 'attention', reading: 'əténʃən', meaning: '注意、注目', example_sentence: 'Pay attention to the teacher.', example_translation: '先生の話をよく聞いてください。', category: '名詞', level: 1, frequency: 88 },
  { id: '48', word: 'attitude', reading: 'ǽtətùːd', meaning: '態度', example_sentence: 'She has a positive attitude.', example_translation: '彼女は前向きな態度を持っています。', category: '名詞', level: 1, frequency: 86 },
  { id: '49', word: 'attract', reading: 'ətrǽkt', meaning: '引き付ける', example_sentence: 'Flowers attract butterflies.', example_translation: '花は蝶を引き付けます。', category: '動詞', level: 1, frequency: 84 },
  { id: '50', word: 'audience', reading: 'ɔ́ːdiəns', meaning: '聴衆、観客', example_sentence: 'The audience applauded loudly.', example_translation: '観客は大きな拍手を送りました。', category: '名詞', level: 1, frequency: 82 },
]

/** モック熟語データ（50個） */
export const mockIdioms: Idiom[] = [
  { id: '1', idiom: 'a lot of', reading: 'ア ロット オブ', meaning: 'たくさんの', example_sentence: 'There are a lot of people here.', example_translation: 'ここにはたくさんの人がいます。', category: '数量', level: 1 },
  { id: '2', idiom: 'at home', reading: 'アット ホーム', meaning: '家で', example_sentence: 'I am at home today.', example_translation: '今日は家にいます。', category: '場所', level: 1 },
  { id: '3', idiom: 'at school', reading: 'アット スクール', meaning: '学校で', example_sentence: 'My children are at school.', example_translation: '子供たちは学校にいます。', category: '場所', level: 1 },
  { id: '4', idiom: 'at work', reading: 'アット ワーク', meaning: '仕事で', example_sentence: 'He is at work now.', example_translation: '彼は今仕事中です。', category: '場所', level: 1 },
  { id: '5', idiom: 'by bus', reading: 'バイ バス', meaning: 'バスで', example_sentence: 'I go to school by bus.', example_translation: '私はバスで学校に行きます。', category: '交通', level: 1 },
  { id: '6', idiom: 'by car', reading: 'バイ カー', meaning: '車で', example_sentence: 'He travels by car.', example_translation: '彼は車で旅行します。', category: '交通', level: 1 },
  { id: '7', idiom: 'by train', reading: 'バイ トレイン', meaning: '電車で', example_sentence: 'We went to Tokyo by train.', example_translation: '私たちは電車で東京に行きました。', category: '交通', level: 1 },
  { id: '8', idiom: 'look at', reading: 'ルック アット', meaning: '～を見る', example_sentence: 'Look at the blackboard.', example_translation: '黒板を見てください。', category: '動作', level: 1 },
  { id: '9', idiom: 'listen to', reading: 'リスン トゥ', meaning: '～を聞く', example_sentence: 'Listen to the teacher.', example_translation: '先生の話を聞いてください。', category: '動作', level: 1 },
  { id: '10', idiom: 'talk to', reading: 'トーク トゥ', meaning: '～と話す', example_sentence: 'Can I talk to you?', example_translation: 'あなたと話せますか？', category: '動作', level: 1 },
  { id: '11', idiom: 'wait for', reading: 'ウェイト フォー', meaning: '～を待つ', example_sentence: 'I am waiting for my friend.', example_translation: '友達を待っています。', category: '動作', level: 1 },
  { id: '12', idiom: 'look for', reading: 'ルック フォー', meaning: '～を探す', example_sentence: 'I am looking for my keys.', example_translation: '鍵を探しています。', category: '動作', level: 1 },
  { id: '13', idiom: 'depend on', reading: 'ディペンド オン', meaning: '～に依存する', example_sentence: 'Success depends on effort.', example_translation: '成功は努力に依存します。', category: '関係', level: 1 },
  { id: '14', idiom: 'interested in', reading: 'イントレステッド イン', meaning: '～に興味がある', example_sentence: 'I am interested in music.', example_translation: '音楽に興味があります。', category: '感情', level: 1 },
  { id: '15', idiom: 'good at', reading: 'グッド アット', meaning: '～が得意', example_sentence: 'She is good at math.', example_translation: '彼女は数学が得意です。', category: '能力', level: 1 },
  { id: '16', idiom: 'bad at', reading: 'バッド アット', meaning: '～が苦手', example_sentence: 'I am bad at sports.', example_translation: '私は運動が苦手です。', category: '能力', level: 1 },
  { id: '17', idiom: 'afraid of', reading: 'アフレイド オブ', meaning: '～を恐れている', example_sentence: 'Don\'t be afraid of mistakes.', example_translation: '間違いを恐れないで。', category: '感情', level: 1 },
  { id: '18', idiom: 'famous for', reading: 'フェイマス フォー', meaning: '～で有名な', example_sentence: 'Japan is famous for sushi.', example_translation: '日本は寿司で有名です。', category: '特徴', level: 1 },
  { id: '19', idiom: 'different from', reading: 'ディファレント フロム', meaning: '～とは異なる', example_sentence: 'This is different from that.', example_translation: 'これはあれとは異なります。', category: '比較', level: 1 },
  { id: '20', idiom: 'same as', reading: 'セイム アズ', meaning: '～と同じ', example_sentence: 'This car is the same as mine.', example_translation: 'この車は私のと同じです。', category: '比較', level: 1 },
]

/** モック文法データ */
export const mockGrammar: Grammar[] = [
  {
    id: 'g1',
    category: 'tense',
    subcategory: 'present',
    title: '現在形',
    explanation: '現在の習慣的な行動や事実を表します。\n\n• 肯定文: 主語 + 動詞の原形(s/es)\n• 否定文: 主語 + don\'t/doesn\'t + 動詞\n• 疑問文: Do/Does + 主語 + 動詞?\n\n※三人称単数現在では動詞に-s/-esをつけます',
    examples: [
      { sentence: 'I study English every day.', translation: '私は毎日英語を勉強します。', note: '習慣的な行動' },
      { sentence: 'The sun rises in the east.', translation: '太陽は東から昇ります。', note: '普遍的な事実' },
      { sentence: 'She plays tennis on weekends.', translation: '彼女は週末にテニスをします。', note: '三人称単数現在' },
    ],
    order: 1,
  },
  {
    id: 'g2',
    category: 'tense',
    subcategory: 'past',
    title: '過去形',
    explanation: '過去の行動や出来事を表します。\n\n• 規則動詞: 動詞 + -ed\n• 不規則動詞: 特別な形に変化\n\n※過去形は時制を表すので、昨日・先週などの過去を表す言葉とよく使われます。',
    examples: [
      { sentence: 'I went to the park yesterday.', translation: '昨日、公園に行きました。', note: '不規則動詞' },
      { sentence: 'She studied math last night.', translation: '彼女は昨夜数学を勉強しました。', note: '規則動詞' },
      { sentence: 'They played soccer last week.', translation: '彼らは先週サッカーをしました。', note: '規則動詞' },
    ],
    order: 2,
  },
  {
    id: 'g3',
    category: 'tense',
    subcategory: 'future',
    title: '未来形',
    explanation: '未来の行動や予定を表します。\n\n• will + 動詞の原形: 単純な未来\n• be going to + 動詞の原形: 意図的な未来・予測\n• 現在進行形: 近い未来の予定',
    examples: [
      { sentence: 'I will visit Tokyo next week.', translation: '来週、東京を訪れます。', note: 'will + 動詞' },
      { sentence: 'It is going to rain tomorrow.', translation: '明日は雨が降るでしょう。', note: '予測' },
      { sentence: 'We are meeting at 3 PM.', translation: '午後3時に会います。', note: '近い未来の予定' },
    ],
    order: 3,
  },
  {
    id: 'g4',
    category: 'passive',
    subcategory: 'basic',
    title: '受動態の基本',
    explanation: '動作の対象を主語にする表現です。\n\n構文: be動詞 + 過去分詞 + (by + 動作主)\n\n• 能動態: He wrote the letter.\n• 受動態: The letter was written by him.',
    examples: [
      { sentence: 'The cake was eaten by the dog.', translation: 'ケーキは犬に食べられました。', note: '過去の受動態' },
      { sentence: 'English is spoken in many countries.', translation: '英語は多くの国で話されています。', note: '現在の受動態' },
      { sentence: 'The book will be published next month.', translation: 'その本は来月出版されます。', note: '未来の受動態' },
    ],
    order: 4,
  },
  {
    id: 'g5',
    category: 'infinitive',
    subcategory: 'basic',
    title: '不定詞（基本）',
    explanation: 'to + 動詞の原形の形で、様々な意味を表します。\n\n• 名詞的用法: 「～すること」\n• 形容詞的用法: 「～するための」\n• 副詞的用法: 「～ために」',
    examples: [
      { sentence: 'I want to go to Japan.', translation: '日本に行きたいです。', note: '名詞的用法' },
      { sentence: 'I have a lot of work to do.', translation: 'やるべき仕事がたくさんあります。', note: '形容詞的用法' },
      { sentence: 'He went to the library to study.', translation: '彼は勉強するために図書館に行きました。', note: '副詞的用法' },
    ],
    order: 5,
  },
  {
    id: 'g6',
    category: 'gerund',
    subcategory: 'basic',
    title: '動名詞',
    explanation: '動詞の-ing形で名詞のように使われます。\n\n• 主語: Swimming is fun.\n• 目的語: I like reading.\n• 前置詞の目的語: Thank you for helping.',
    examples: [
      { sentence: 'Swimming is good exercise.', translation: '泳ぐことは良い運動です。', note: '主語としての動名詞' },
      { sentence: 'I enjoy playing tennis.', translation: 'テニスをするのを楽しんでいます。', note: '目的語としての動名詞' },
      { sentence: 'She is good at singing.', translation: '彼女は歌うのが上手です。', note: '前置詞の後ろの動名詞' },
    ],
    order: 6,
  },
  {
    id: 'g7',
    category: 'relative_pronoun',
    subcategory: 'basic',
    title: '関係代名詞の基本',
    explanation: '先行詞（名詞）を修飾する節を導く詞です。\n\n• 主格: who（人）、which（物）、that（両方）\n• 目的格: whom（人）、which（物）、that（両方）\n• 所有格: whose（人・物）',
    examples: [
      { sentence: 'The man who is standing there is my teacher.', translation: 'そこに立っている人は私の先生です。', note: 'who（主格）' },
      { sentence: 'This is the book which I bought yesterday.', translation: 'これが昨日買った本です。', note: 'which（目的格）' },
      { sentence: 'I know a girl whose father is a doctor.', translation: '父が医者である少女を知っています。', note: 'whose（所有格）' },
    ],
    order: 7,
  },
  {
    id: 'g8',
    category: 'comparison',
    subcategory: 'basic',
    title: '比較の基本',
    explanation: '事物を比較する表現です。\n\n• 原級: as ～ as（～と同じくらい）\n• 比較級: ～er / more ～（より～）\n• 最上級: the ～est / the most ～（最も～）',
    examples: [
      { sentence: 'She is as tall as her sister.', translation: '彼女は姉と同じ背の高さです。', note: '原級' },
      { sentence: 'This book is more interesting than that one.', translation: 'この本はあの本より面白いです。', note: '比較級' },
      { sentence: 'Mt. Fuji is the highest mountain in Japan.', translation: '富士山は日本で一番高い山です。', note: '最上級' },
    ],
    order: 8,
  },
]

/** モック文法問題データ */
export const mockGrammarQuestions: GrammarQuestion[] = [
  // 現在形
  { id: 'gq1', grammar_id: 'g1', question: 'I _____ English every day.', options: ['study', 'studies', 'studied', 'studying'], correct_answer: 0, explanation: '習慣的な行動なので現在形のstudyを使います。', difficulty: 1 },
  { id: 'gq2', grammar_id: 'g1', question: 'She _____ to school by bus.', options: ['go', 'goes', 'going', 'went'], correct_answer: 1, explanation: '三人称単数現在なのでgoesを使います。', difficulty: 1 },
  { id: 'gq3', grammar_id: 'g1', question: 'They _____ soccer on weekends.', options: ['play', 'plays', 'playing', 'played'], correct_answer: 0, explanation: '複数主語なので原形のplayを使います。', difficulty: 1 },
  // 過去形
  { id: 'gq4', grammar_id: 'g2', question: 'I _____ to the park yesterday.', options: ['go', 'went', 'will go', 'going'], correct_answer: 1, explanation: '過去の出来事なので過去形のwentを使います。', difficulty: 1 },
  { id: 'gq5', grammar_id: 'g2', question: 'She _____ breakfast this morning.', options: ['eat', 'eats', 'ate', 'eating'], correct_answer: 2, explanation: '過去の出来事なので過去形のateを使います。', difficulty: 1 },
  // 受動態
  { id: 'gq6', grammar_id: 'g4', question: 'The cake _____ by the dog.', options: ['ate', 'was eaten', 'is eaten', 'will be eaten'], correct_answer: 1, explanation: '受動態なのでbe動詞 + 過去分詞のwas eatenを使います。', difficulty: 1 },
  { id: 'gq7', grammar_id: 'g4', question: 'English _____ in many countries.', options: ['speaks', 'is spoken', 'was spoken', 'speaking'], correct_answer: 1, explanation: '現在の受動態なのでis spokenを使います。', difficulty: 1 },
  // 不定詞
  { id: 'gq8', grammar_id: 'g5', question: 'I want _____ Japan.', options: ['visit', 'to visit', 'visiting', 'visited'], correct_answer: 1, explanation: 'wantの後ろにはto不定詞が続きます。', difficulty: 1 },
  // 動名詞
  { id: 'gq9', grammar_id: 'g6', question: 'I enjoy _____ tennis.', options: ['play', 'to play', 'playing', 'played'], correct_answer: 2, explanation: 'enjoyの後ろには動名詞が続きます。', difficulty: 1 },
  // 関係代名詞
  { id: 'gq10', grammar_id: 'g7', question: 'The man _____ is standing there is my teacher.', options: ['who', 'which', 'whom', 'whose'], correct_answer: 0, explanation: '人を表す主格の関係代名詞whoを使います。', difficulty: 1 },
]

/** モック長文データ */
export const mockReading: Reading[] = [
  {
    id: 'r1',
    title: 'A Day in My Life',
    content: 'My name is Tom. I am a junior high school student. I wake up at 6:30 every morning. I eat breakfast with my family. Then I go to school by bus. School starts at 8:30. I have six classes every day. My favorite subject is English. After school, I play soccer with my friends. I go home at 5:00 PM. I do my homework after dinner. I go to bed at 10:00 PM.\n\nOn weekends, I usually go to the library to study. Sometimes I watch movies with my family. I want to be a doctor in the future, so I study hard every day.',
    translation: '私の名前はトムです。私は中学生です。毎朝6時半に起きます。家族と一緒に朝食をとります。それからバスで学校に行きます。学校は8時半に始まります。毎日6時間授業があります。私の好きな科目は英語です。放課後、友達とサッカーをします。午後5時に家に帰ります。夕食の後、宿題をします。10時に寝ます。\n\n週末はたいてい図書館へ勉強に行きます。時々家族と映画を見ます。将来医師になりたいので、毎日勉強しています。',
    words: [
      { word: 'wake up', meaning: '起きる' },
      { word: 'subject', meaning: '科目' },
      { word: 'homework', meaning: '宿題' },
    ],
    difficulty: 1,
    estimated_time: 300,
  },
  {
    id: 'r2',
    title: 'The Library',
    content: 'I love going to the library. There are many books there. I can read about anything I want. My favorite books are about animals and science. Last week, I read a book about dolphins. It was very interesting.\n\nThe library is also a good place to study. It is quiet and peaceful. Many students go there after school to do their homework. Sometimes, I meet my friends there and we study together.',
    translation: '私は図書館に行くのが大好きです。そこにはたくさんの本があります。何についてでも読むことができます。私のお気に入りの本は動物と科学についての本です。先週、イルカについての本を読みました。とても面白かったです。\n\n図書館は勉強する良い場所でもあります。静かで平和です。多くの学生が放課後宿題をするためにそこに行きます。時々、そこで友達に会って、一緒に勉強します。',
    words: [
      { word: 'dolphin', meaning: 'イルカ' },
      { word: 'peaceful', meaning: '平和な' },
    ],
    difficulty: 1,
    estimated_time: 300,
  },
]

/** モック読解問題データ */
export const mockReadingQuestions: ReadingQuestion[] = [
  { id: 'rq1', reading_id: 'r1', question: 'What time does Tom wake up?', options: ['6:00', '6:30', '7:00', '7:30'], correct_answer: 1, explanation: '本文に「I wake up at 6:30」とあるので6時半です。' },
  { id: 'rq2', reading_id: 'r1', question: 'How does Tom go to school?', options: ['by car', 'by bus', 'by train', 'on foot'], correct_answer: 1, explanation: '本文に「I go to school by bus」とあるのでバスです。' },
  { id: 'rq3', reading_id: 'r1', question: 'What is Tom\'s favorite subject?', options: ['Math', 'Science', 'English', 'History'], correct_answer: 2, explanation: '本文に「My favorite subject is English」とあるので英語です。' },
  { id: 'rq4', reading_id: 'r1', question: 'What does Tom want to be in the future?', options: ['a teacher', 'a doctor', 'a scientist', 'an engineer'], correct_answer: 1, explanation: '本文に「I want to be a doctor」とあるので医師です。' },
  { id: 'rq5', reading_id: 'r2', question: 'What are the writer\'s favorite books about?', options: ['sports and music', 'animals and science', 'history and art', 'cooking and travel'], correct_answer: 1, explanation: '本文に「My favorite books are about animals and science」とあります。' },
]

/** モックリスニングデータ */
export const mockListening: Listening[] = [
  {
    id: 'l1',
    title: 'At the Station',
    audio_url: '',
    script: 'A: Excuse me, which train goes to Tokyo Station?\nB: The train on platform 1 goes to Tokyo Station.\nA: Thank you. When does it leave?\nB: It leaves at 8:30.\nA: I see. Does it stop at Shinagawa?\nB: Yes, it stops at Shinagawa and arrives at Tokyo at 9:15.',
    translation: 'A: すみません、東京駅に行く電車はどれですか？\nB: 1番線の電車が東京駅に行きます。\nA: ありがとうございます。何時発ですか？\nB: 8時半発です。\nA: そうですか。品川に止まりますか？\nB: はい、品川に止まり、9時15分に東京に着きます。',
    difficulty: 1,
  },
  {
    id: 'l2',
    title: 'Shopping',
    audio_url: '',
    script: 'A: Can I help you?\nB: Yes, I\'m looking for a shirt.\nA: What size do you need?\nB: Medium, please.\nA: How about this blue one?\nB: That\'s nice. How much is it?\nA: It\'s 3,000 yen.\nB: I\'ll take it.',
    translation: 'A: 何かお手伝いしましょうか？\nB: はい、シャツを探しているんです。\nA: どんなサイズが必要ですか？\nB: Mサイズをお願いします。\nA: この青いのはどうですか？\nB: いいですね。いくらですか？\nA: 3000円です。\nB: それを買います。',
    difficulty: 1,
  },
]

/** モックリスニング問題データ */
export const mockListeningQuestions: ListeningQuestion[] = [
  { id: 'lq1', listening_id: 'l1', question: 'Which train goes to Tokyo Station?', options: ['Platform 1', 'Platform 2', 'Platform 3', 'Platform 4'], correct_answer: 0, explanation: '「The train on platform 1 goes to Tokyo Station」と言っています。' },
  { id: 'lq2', listening_id: 'l1', question: 'What time does the train leave?', options: ['8:00', '8:15', '8:30', '9:00'], correct_answer: 2, explanation: '「It leaves at 8:30」と言っています。' },
  { id: 'lq3', listening_id: 'l1', question: 'What time does the train arrive at Tokyo?', options: ['9:00', '9:15', '9:30', '9:45'], correct_answer: 1, explanation: '「arrives at Tokyo at 9:15」と言っています。' },
  { id: 'lq4', listening_id: 'l2', question: 'What is the customer looking for?', options: ['a shirt', 'pants', 'shoes', 'a hat'], correct_answer: 0, explanation: '「I\'m looking for a shirt」と言っています。' },
  { id: 'lq5', listening_id: 'l2', question: 'What size does the customer need?', options: ['Small', 'Medium', 'Large', 'Extra Large'], correct_answer: 1, explanation: '「Medium, please」と言っています。' },
]

/**
 * ランダムにデータを取得するユーティリティ
 */
export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, array.length))
}

/**
 * IDでデータを取得するユーティリティ
 */
export function getItemById<T extends { id: string }>(array: T[], id: string): T | undefined {
  return array.find(item => item.id === id)
}
