# Supabaseセットアップガイド

## 1. Supabaseプロジェクト作成（5分）

1. https://supabase.com にアクセス
2. 「New Project」をクリック
3. 以下を入力：
   - Name: `eiken-pre2-app`
   - Database Password: （任意のパスワードを記録）
   - Region: Tokyo (or closest)
4. 作成完了まで待つ（約2分）

## 2. 環境変数の設定

作成後、以下の情報を取得：

```
Project URL: https://xxxxx.supabase.co
Anon Public Key: eyJhbGc...
```

`.env.local`ファイルを作成：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=サービスロールキー
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## 3. SQLでテーブル作成

SupabaseのSQL Editorで以下を実行：

```sql
-- usersテーブル
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',
  target_date DATE,
  level INTEGER DEFAULT 1,
  exp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  total_study_time INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- wordsテーブル
CREATE TABLE words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word TEXT NOT NULL,
  reading TEXT NOT NULL,
  meaning TEXT NOT NULL,
  example_sentence TEXT NOT NULL,
  example_translation TEXT NOT NULL,
  category TEXT,
  level INTEGER DEFAULT 1,
  frequency INTEGER DEFAULT 50
);

-- idiomsテーブル
CREATE TABLE idioms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  idiom TEXT NOT NULL,
  reading TEXT NOT NULL,
  meaning TEXT NOT NULL,
  example_sentence TEXT NOT NULL,
  example_translation TEXT NOT NULL,
  category TEXT,
  level INTEGER DEFAULT 1
);

-- grammarテーブル
CREATE TABLE grammar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  subcategory TEXT,
  title TEXT NOT NULL,
  explanation TEXT NOT NULL,
  examples JSONB DEFAULT '[]'::jsonb,
  "order" INTEGER DEFAULT 0
);

-- grammar_questionsテーブル
CREATE TABLE grammar_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grammar_id UUID REFERENCES grammar(id),
  question TEXT NOT NULL,
  options JSONB DEFAULT '[]'::jsonb,
  correct_answer INTEGER DEFAULT 0,
  explanation TEXT,
  difficulty INTEGER DEFAULT 1
);

-- readingテーブル
CREATE TABLE reading (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  translation TEXT,
  words JSONB DEFAULT '[]'::jsonb,
  difficulty INTEGER DEFAULT 1,
  estimated_time INTEGER DEFAULT 300
);

-- reading_questionsテーブル
CREATE TABLE reading_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reading_id UUID REFERENCES reading(id),
  question TEXT NOT NULL,
  options JSONB DEFAULT '[]'::jsonb,
  correct_answer INTEGER DEFAULT 0,
  explanation TEXT
);

-- listeningテーブル
CREATE TABLE listening (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  audio_url TEXT,
  script TEXT NOT NULL,
  translation TEXT,
  difficulty INTEGER DEFAULT 1
);

-- listening_questionsテーブル
CREATE TABLE listening_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listening_id UUID REFERENCES listening(id),
  question TEXT NOT NULL,
  options JSONB DEFAULT '[]'::jsonb,
  correct_answer INTEGER DEFAULT 0,
  explanation TEXT
);

-- user_progressテーブル
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  status TEXT DEFAULT 'not_started',
  score INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE,
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP WITH TIME ZONE
);

-- review_scheduleテーブル
CREATE TABLE review_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content_type TEXT NOT NULL,
  content_id UUID NOT NULL,
  next_review DATE NOT NULL,
  interval INTEGER DEFAULT 1,
  ease_factor FLOAT DEFAULT 2.5,
  quality INTEGER
);

-- study_sessionsテーブル
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  content_type TEXT NOT NULL,
  duration INTEGER DEFAULT 0,
  exp_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS（Row Level Security）設定
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- その他のテーブルも公開（開発用）
ALTER TABLE words ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public words access" ON words FOR SELECT USING (true);

ALTER TABLE idioms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public idioms access" ON idioms FOR SELECT USING (true);

ALTER TABLE grammar ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public grammar access" ON grammar FOR SELECT USING (true);

ALTER TABLE grammar_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public grammar_questions access" ON grammar_questions FOR SELECT USING (true);

ALTER TABLE reading ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reading access" ON reading FOR SELECT USING (true);

ALTER TABLE reading_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reading_questions access" ON reading_questions FOR SELECT USING (true);

ALTER TABLE listening ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public listening access" ON listening FOR SELECT USING (true);

ALTER TABLE listening_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public listening_questions access" ON listening_questions FOR SELECT USING (true);

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);

ALTER TABLE review_schedule ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own reviews" ON review_schedule FOR ALL USING (auth.uid() = user_id);

ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own sessions" ON study_sessions FOR ALL USING (auth.uid() = user_id);
```

## 4. サンプルデータ挿入

```sql
-- サンプル単語（50語）
INSERT INTO words (word, reading, meaning, example_sentence, example_translation, category, level) VALUES
('abandon', 'əbǽndən', '～を放棄する、見捨てる', 'The crew abandoned the sinking ship.', '乗組員は沈む船を放棄した。', '動詞', 1),
('ability', 'əbíləti', '能力、才能', 'She has the ability to speak three languages.', '彼女は3カ国語を話す能力がある。', '名詞', 1),
('absence', 'ǽbsəns', '不在、欠席', 'His absence was noticed by everyone.', '彼の不在は全員に気づかれた。', '名詞', 1),
('accept', 'æksépt', '受け取る、認める', 'I cannot accept your offer.', 'あなたの申し出は受け入れられません。', '動詞', 1),
('achieve', 'ətʃíːv', '達成する、成し遂げる', 'She achieved her goal of becoming a doctor.', '彼女は医師になる目標を達成しました。', '動詞', 1),
('act', 'ǽkt', '行動する、演技する', 'You must act quickly.', '素早く行動しなければならない。', '動詞', 1),
('action', 'ǽkʃən', '行動、アクション', 'Actions speak louder than words.', '行動は言葉よりも雄弁だ。', '名詞', 1),
('active', 'ǽktiv', '活動的な、積極的な', 'He is an active member of the club.', '彼はクラブの活動的なメンバーです。', '形容詞', 1),
('actual', 'ǽktʃuəl', '実際の、現実の', 'This is the actual situation.', 'これが実際の状況です。', '形容詞', 1),
('address', 'ədrés', '住所、演説する', 'What is your address?', 'あなたの住所は何ですか？', '名詞', 1),
('advantage', 'ædvǽntidʒ', '利点、優位', 'Speed is a big advantage.', 'スピードは大きな利点だ。', '名詞', 1),
('advice', 'ædváis', 'アドバイス、忠告', 'Can you give me some advice?', '私にアドバイスをくれますか？', '名詞', 1),
('affect', 'əfékt', '影響を与える', 'The weather affected our plans.', '天候が私たちの計画に影響を与えました。', '動詞', 1),
('afford', 'əfɔ́ːrd', '（金銭的に）余裕がある', 'I cannot afford a new car.', '新車を買う余裕はありません。', '動詞', 1),
('afraid', 'əfréid', '恐れている', 'Don''t be afraid of making mistakes.', '間違いを恐れないでください。', '形容詞', 1),
('agent', 'éidʒənt', '代理人、エージェント', 'My agent will handle the contract.', '私のエージェントが契約を処理します。', '名詞', 1),
('agree', 'əgríː', '同意する', 'I agree with your opinion.', 'あなたの意見に同意します。', '動詞', 1),
('agreement', 'əgríːmənt', '同意、協定', 'We reached an agreement.', '合意に達しました。', '名詞', 1),
('ahead', 'əhéd', '前方に、先に', 'Go straight ahead.', '真っ直ぐ進んでください。', '副詞', 1),
('aim', 'éim', 'ねらう、目標', 'Aim for the stars!', '星を目指せ！', '動詞/名詞', 1),
('air', 'ɛ́ər', '空気、大気', 'Fresh air is good for health.', '新鮮な空気は健康に良い。', '名詞', 1),
('alarm', 'əlɑ́ːrm', '警報、アラーム', 'The alarm went off at 6 AM.', 'アラームが朝6時に鳴りました。', '名詞', 1),
('alive', 'əláiv', '生きている', 'The plant is still alive.', 'その植物はまだ生きている。', '形容詞', 1),
('allow', 'əláu', '許可する', 'Smoking is not allowed here.', 'ここでの喫煙は許可されていません。', '動詞', 1),
('almost', 'ɔ́ːlmost', 'ほとんど', 'The work is almost done.', '仕事はほぼ完了しました。', '副詞', 1),
('alone', 'əlóun', '一人で、単独で', 'She lives alone.', '彼女は一人で住んでいます。', '副詞', 1),
('along', 'əlɔ́ŋ', '沿って、一緒に', 'Walk along the river.', '川沿いに歩いてください。', '前置詞', 1),
('already', 'ɔːlrédi', 'すでに', 'I have already finished.', '私は既に終わらせました。', '副詞', 1),
('also', 'ɔ́ːlsou', 'また、同様に', 'I also like coffee.', '私もコーヒーが好きです。', '副詞', 1),
('although', 'ɔːldɔ́u', '～だけれども', 'Although it rained, we went out.', '雨が降りましたが、私たちは外出しました。', '接続詞', 1),
('always', 'ɔ́ːlweiz', 'いつも', 'She is always on time.', '彼女はいつも時間通りです。', '副詞', 1),
('amount', 'əmáunt', '量、額', 'A large amount of money', '多額の金', '名詞', 1),
('anger', 'ǽŋɡər', '怒り', 'He could not hide his anger.', '彼は怒りを隠せなかった。', '名詞', 1),
('angle', 'ǽŋɡl', '角度、角', 'Right angle is 90 degrees.', '直角は90度です。', '名詞', 1),
('angry', 'ǽŋɡri', '怒った', 'Don''t be angry with me.', '私を怒らないでください。', '形容詞', 1),
('animal', 'ǽniməl', '動物', 'Dogs are faithful animals.', '犬は忠実な動物です。', '名詞', 1),
('announce', 'ənáuns', '発表する、告知する', 'They announced the results.', '彼らは結果を発表しました。', '動詞', 1),
('annual', 'ǽnjuəl', '年1回の、毎年の', 'The annual meeting is in July.', '年次総会は7月です。', '形容詞', 1),
('another', 'ənʌ́ðər', 'もう一つの', 'Can I have another cup?', 'もう一杯いただけますか？', '形容詞', 1),
('answer', 'ǽnsər', '回答、答える', 'Do you know the answer?', '答えを知っていますか？', '名詞', 1),
('anxiety', 'æŋzáiəti', '不安、心配', 'Her anxiety increased.', '彼女の不安が増大しました。', '名詞', 1),
('anxious', 'ǽŋkʃəs', '不安な、心配な', 'I am anxious about the test.', 'テストについて不安です。', '形容詞', 1),
('any', 'éni', 'どんな～でも', 'Do you have any questions?', '何か質問はありますか？', '形容詞', 1),
('anyone', 'éniwʌn', '誰でも', 'Can anyone help me?', '誰か手伝ってくれませんか？', '代名詞', 1),
('anything', 'éniθiŋ', '何でも', 'Is there anything I can do?', '私にできることは何かありますか？', '代名詞', 1),
('anywhere', 'éniwɛ̀ər', 'どこでも', 'I can''t find my keys anywhere.', '鍵がどこにも見つかりません。', '副詞', 1),
('apart', 'əpɑ́ːrt', '離れて、別々に', 'The two houses are 100 meters apart.', '2つの家は100メートル離れています。', '副詞', 1),
('apartment', 'əpɑ́ːrtmənt', 'アパート', 'She lives in a small apartment.', '彼女は小さなアパートに住んでいます。', '名詞', 1),
('appear', 'əpíər', '現れる、～のように見える', 'A cat appeared from nowhere.', 'どこからともなく猫が現れました。', '動詞', 1),
('apple', 'ǽpl', 'りんご', 'An apple a day keeps the doctor away.', '一日一個のリンゴで医者要らず。', '名詞', 1);

-- サンプル熟語（10個）
INSERT INTO idioms (idiom, reading, meaning, example_sentence, example_translation, category, level) VALUES
('a lot of', 'ア ロット オブ', 'たくさんの', 'There are a lot of people here.', 'ここにはたくさんの人がいます。', '数量', 1),
('at home', 'アット ホーム', '家で', 'I am at home today.', '今日は家にいます。', '場所', 1),
('at school', 'アット スクール', '学校で', 'My children are at school.', '子供たちは学校にいます。', '場所', 1),
('at work', 'アット ワーク', '仕事で', 'He is at work now.', '彼は今仕事中です。', '場所', 1),
('by bus', 'バイ バス', 'バスで', 'I go to school by bus.', '私はバスで学校に行きます。', '交通', 1),
('by car', 'バイ カー', '車で', 'He travels by car.', '彼は車で旅行します。', '交通', 1),
('by train', 'バイ トレイン', '電車で', 'We went to Tokyo by train.', '私たちは電車で東京に行きました。', '交通', 1),
('look at', 'ルック アット', '～を見る', 'Look at the blackboard.', '黒板を見てください。', '動作', 1),
('listen to', 'リスン トゥ', '～を聞く', 'Listen to the teacher.', '先生の話を聞いてください。', '動作', 1),
('talk to', 'トーク トゥ', '～と話す', 'Can I talk to you?', 'あなたと話せますか？', '動作', 1);

-- サンプル文法（各カテゴリ1つずつ）
INSERT INTO grammar (category, subcategory, title, explanation, examples, "order") VALUES
('tense', 'present', '現在形', '現在の習慣的な行動や事実を表します。', '[
  {"sentence": "I study English every day.", "translation": "私は毎日英語を勉強します。", "note": "習慣的な行動"},
  {"sentence": "The sun rises in the east.", "translation": "太陽は東から昇ります。", "note": "普遍的な事実"}
]', 1),
('tense', 'past', '過去形', '過去の行動や出来事を表します。', '[
  {"sentence": "I went to the park yesterday.", "translation": "昨日、公園に行きました。", "note": "規則動詞"},
  {"sentence": "I ate breakfast this morning.", "translation": "今朝、朝食を食べました。", "note": "不規則動詞"}
]', 2),
('tense', 'future', '未来形', '未来の行動や予定を表します。', '[
  {"sentence": "I will visit Tokyo next week.", "translation": "来週、東京を訪れます。", "note": "will + 動詞"},
  {"sentence": "I am going to study tonight.", "translation": "今夜、勉強するつもりです。", "note": "be going to"}
]', 3),
('passive', 'basic', '受動態の基本', '動作の対象を主語にする表現です。', '[
  {"sentence": "The cake was eaten by the dog.", "translation": "ケーキは犬に食べられました。", "note": "be動詞 + 過去分詞"}
]', 4);

-- サンプル文法問題
INSERT INTO grammar_questions (grammar_id, question, options, correct_answer, explanation, difficulty) VALUES
-- 現在形
((SELECT id FROM grammar WHERE category = 'tense' AND subcategory = 'present' LIMIT 1),
'I _____ English every day.', '["study", "studied", "will study", "am studying"]', 0,
'習慣的な行動なので現在形のstudyを使います。', 1),

-- 過去形
((SELECT id FROM grammar WHERE category = 'tense' AND subcategory = 'past' LIMIT 1),
'I _____ to the park yesterday.', '["go", "went", "will go", "am going"]', 1,
'過去の出来事なので過去形のwentを使います。', 1),

-- 受動態
((SELECT id FROM grammar WHERE category = 'passive' AND subcategory = 'basic' LIMIT 1),
'The cake _____ by the dog.', '["ate", "was eaten", "is eaten", "will be eaten"]', 1,
'受動態なのでbe動詞 + 過去分詞のwas eatenを使います。', 1);

-- サンプル長文
INSERT INTO reading (title, content, translation, words, difficulty, estimated_time) VALUES
('A Day in My Life',
'My name is Tom. I am a junior high school student. I wake up at 6:30 every morning. I eat breakfast with my family. Then I go to school by bus. School starts at 8:30. I have six classes every day. My favorite subject is English. After school, I play soccer with my friends. I go home at 5:00 PM. I do my homework after dinner. I go to bed at 10:00 PM.',
'私の名前はトムです。私は中学生です。毎朝6時半に起きます。家族と一緒に朝食をとります。それからバスで学校に行きます。学校は8時半に始まります。毎日6時間授業があります。私の好きな科目は英語です。放課後、友達とサッカーをします。午後5時に家に帰ります。夕食の後、宿題をします。10時に寝ます。',
'[
  {"word": "wake up", "meaning": "起きる"},
  {"word": "subject", "meaning": "科目"},
  {"word": "homework", "meaning": "宿題"}
]', 1, 300);

-- サンプル読解問題
INSERT INTO reading_questions (reading_id, question, options, correct_answer, explanation) VALUES
((SELECT id FROM reading WHERE title = 'A Day in My Life' LIMIT 1),
'What time does Tom wake up?', '["6:00", "6:30", "7:00", "7:30"]', 1,
'本文に「I wake up at 6:30 every morning」とあるので6時半です。'),

((SELECT id FROM reading WHERE title = 'A Day in My Life' LIMIT 1),
'How does Tom go to school?', '["by car", "by bus", "by train", "on foot"]', 1,
'本文に「I go to school by bus」とあるのでバスです。'),

((SELECT id FROM reading WHERE title = 'A Day in My Life' LIMIT 1),
'What is Tom''s favorite subject?', '["Math", "Science", "English", "History"]', 2,
'本文に「My favorite subject is English」とあるので英語です。');

-- サンプルリスニング（スクリプトのみ）
INSERT INTO listening (title, script, translation, difficulty) VALUES
('At the Station',
'A: Excuse me, which train goes to Tokyo Station?
B: The train on platform 1 goes to Tokyo Station.
A: Thank you. When does it leave?
B: It leaves at 8:30.
A: I see. Does it stop at Shinagawa?
B: Yes, it stops at Shinagawa and arrives at Tokyo at 9:15.',
'A: すみません、東京駅に行く電車はどれですか？
B: 1番線の電車が東京駅に行きます。
A: ありがとうございます。何時発ですか？
B: 8時半発です。
A: そうですか。品川に止まりますか？
B: はい、品川に止まり、9時15分に東京に着きます。', 1);

-- サンプルリスニング問題
INSERT INTO listening_questions (listening_id, question, options, correct_answer, explanation) VALUES
((SELECT id FROM listening WHERE title = 'At the Station' LIMIT 1),
'Which train goes to Tokyo Station?', '["Platform 1", "Platform 2", "Platform 3", "Platform 4"]', 0,
'The train on platform 1 goes to Tokyo Stationと言っています。'),

((SELECT id FROM listening WHERE title = 'At the Station' LIMIT 1),
'What time does the train leave?', '["8:00", "8:15", "8:30", "9:00"]', 2,
'It leaves at 8:30と言っています。'),

((SELECT id FROM listening WHERE title = 'At the Station' LIMIT 1),
'What time does the train arrive at Tokyo?', '["9:00", "9:15", "9:30", "9:45"]', 1,
'arrives at Tokyo at 9:15と言っています。');
```

## 5. 認証設定

Supabaseダッシュボードで：

1. **Authentication** → **Settings**
2. **Email Auth** を有効にする
3. **Email Templates** を確認（必要に応じて日本語に編集）

## 6. 動作確認

```bash
# .env.localを設定した後
npm run dev

# ブラウザでアクセス
http://localhost:3001
```

---

完了したら、アカウント作成・ログインができるようになります！
